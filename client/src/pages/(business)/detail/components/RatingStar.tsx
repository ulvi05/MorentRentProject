import StarFilled from "@/assets/icons/star-filled.svg";
import StarOutlined from "@/assets/icons/star-outlined.svg";

type Props = {
  rating: number;
};

export const RatingStar = ({ rating }: Props) => {
  return (
    <div className="flex gap-x-1.5 items-center">
      {[1, 2, 3, 4, 5].map((star) => {
        if (star <= Math.round(rating)) {
          return <img key={star} src={StarFilled} alt="star" />;
        }
        return <img key={star} src={StarOutlined} alt="star" />;
      })}
    </div>
  );
};
