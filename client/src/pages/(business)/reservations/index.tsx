import DynamicHelmet from "@/components/shared/DynamicHelmet";
import Loader from "@/components/shared/Loader";
import { RenderIf } from "@/components/shared/RenderIf";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { QUERY_KEYS } from "@/constants/query-keys";
import { calculateDateDifference, formatDate } from "@/lib/utils";
import reservationService from "@/services/reservation";
import reviewService from "@/services/review";
import { Rent, Reservation, ReservationStatus } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { toast } from "sonner";
// @ts-ignore
import ReactStars from "react-rating-stars-component";

const ReservationsPage = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: [QUERY_KEYS.RESERVATIONS],
    queryFn: reservationService.getAll,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div className="text-red-500">Error loading reservations.</div>;
  }

  const items = data?.data.items || [];

  return (
    <>
      <DynamicHelmet pageTitle="Reservations" />
      <div className="container flex flex-col pt-4 pb-8 lg:pt-8 lg:pb-16 gap-y-4">
        <h2 className="text-2xl font-semibold text-muted-foreground">
          Your Reservations
        </h2>
        {items.length > 0 ? (
          items.map((reservation: Reservation) => (
            <ReservationCard key={reservation._id} reservation={reservation} />
          ))
        ) : (
          <div className="text-lg text-center text-muted-foreground">
            No reservations found.
          </div>
        )}
      </div>
    </>
  );
};

const ReservationCard = ({ reservation }: { reservation: Reservation }) => {
  const rent = reservation.rent as Rent;
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: reservationService.cancel,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.RESERVATIONS],
      });
    },
  });

  function handleCancelReservation() {
    mutate({ id: reservation._id });
  }

  const showReview =
    !reservation.hasReview &&
    reservation.status === ReservationStatus.Approved &&
    new Date(reservation.endDate) < new Date();
  return (
    <div className="relative p-4 bg-white rounded-lg shadow-md">
      <div className="flex items-end justify-between">
        <div className="flex items-center">
          <img
            src={rent.images[0]}
            alt={"rent image"}
            className="object-cover w-24 h-24 rounded-lg"
          />
          <div className="ml-4">
            <div className="flex items-center gap-x-4">
              <h2 className="text-lg font-bold text-gray-800">{rent.name}</h2>
              <p className="text-xs text-gray-400 translate-y-0.5">
                {formatDate(reservation.startDate)} -{" "}
                {formatDate(reservation.endDate)}
              </p>
            </div>
            <p className="text-muted-foreground">
              {rent.price} <span className="text-sm">{rent.currency}</span> x{" "}
              {calculateDateDifference(
                reservation.startDate,
                reservation.endDate
              )}{" "}
              days
            </p>
            <p className="mt-1 text-xs text-muted-foreground max-w-[360px]">
              {rent.description}
            </p>
          </div>
        </div>
        <div className="absolute right-3 top-3">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <ReservationCardStatus status={reservation.status} />
              </TooltipTrigger>
              <TooltipContent className="text-white capitalize bg-muted-foreground">
                {reservation.status}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <RenderIf condition={reservation.status === ReservationStatus.Pending}>
          <div>
            <Button
              onClick={handleCancelReservation}
              disabled={isPending}
              size="sm"
              variant={"destructive"}
            >
              <RenderIf condition={isPending}>
                <Loader className="w-5 h-5 border-white" />
              </RenderIf>
              Cancel Reservation
            </Button>
          </div>
        </RenderIf>
      </div>
      <RenderIf condition={showReview}>
        <WriteReview rentId={rent._id} reservationId={reservation._id} />
      </RenderIf>
    </div>
  );
};

const ReservationCardStatus = ({ status }: { status: ReservationStatus }) => {
  switch (status) {
    case ReservationStatus.Pending:
      return (
        <span className="inline-block w-3 h-3 bg-yellow-500 rounded-full" />
      );
    case ReservationStatus.Approved:
      return (
        <span className="inline-block w-3 h-3 bg-green-500 rounded-full" />
      );
    case ReservationStatus.Rejected:
      return <span className="inline-block w-3 h-3 bg-red-500 rounded-full" />;
    case ReservationStatus.Cancelled:
      return <span className="inline-block w-3 h-3 bg-gray-500 rounded-full" />;
  }
};

const WriteReview = ({
  rentId,
  reservationId,
}: {
  rentId: string;
  reservationId: string;
}) => {
  const [rating, setRating] = useState(1);
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: reviewService.create,
    onSuccess: () => {
      toast.success("Review submitted successfully. It will published soon");
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.RESERVATIONS],
      });
    },
  });

  function onSubmitReview() {
    if (!contentRef.current || !contentRef.current.value) {
      return;
    }
    mutate({
      rating,
      content: contentRef.current.value,
      rentId,
      reservationId,
    });
  }
  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold">Write a review</h3>
      <div className="flex flex-col gap-x-4">
        <div className="w-fit">
          <ReactStars
            count={5}
            value={rating}
            onChange={setRating}
            size={28}
            activeColor="#ffd700"
          />
        </div>
        <Textarea
          ref={contentRef}
          placeholder="Write your review here..."
          className="w-full h-24 p-2 border border-gray-200 rounded-lg"
        />
      </div>
      <Button
        disabled={isPending}
        onClick={onSubmitReview}
        size="sm"
        className="mt-2"
      >
        <RenderIf condition={isPending}>
          <Loader className="w-5 h-5 border-white" />
        </RenderIf>
        Submit Review
      </Button>
    </div>
  );
};

export default ReservationsPage;
