import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { FilterIcon } from "lucide-react";
import { useRef, useState } from "react";
import { useOnClickOutside } from "usehooks-ts";

const filters = [
  {
    label: "Type",
    options: [
      {
        value: "sport",
        label: "Sport",
        count: 5,
      },
      {
        value: "suv",
        label: "SUV",
        count: 12,
      },
      {
        value: "mpv",
        label: "MPV",
        count: 16,
      },
      {
        value: "sedan",
        label: "Sedan",
        count: 20,
      },
      {
        value: "coupe",
        label: "Coupe",
        count: 14,
      },
      {
        value: "hatcback",
        label: "Hatcback",
        count: 14,
      },
    ],
  },
];

export const Filters = () => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  function toggle() {
    setIsOpen(!isOpen);
  }

  function HandleClose() {
    setIsOpen(false);
  }

  useOnClickOutside(ref, HandleClose);

  return (
    <>
      <div
        ref={ref}
        className={cn(
          "bg-white w-[360px] h-[calc(100vh-94px)] md:h-[calc(100vh-128px)] fixed top-[94px] md:top-[128px] z-20 duration-200",
          isOpen ? "left-0" : "-left-[360px] xl:left-0"
        )}
      >
        Filters
      </div>
      <Button
        variant={"outline"}
        onClick={toggle}
        className="mt-4 ml-6 -mb-4 xl:hidden w-fit lg:ml-8"
      >
        <FilterIcon className="text-primary" />
      </Button>
    </>
  );
};
