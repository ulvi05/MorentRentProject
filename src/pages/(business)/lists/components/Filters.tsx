import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { FilterIcon } from "lucide-react";
import { useRef, useState } from "react";
import { useOnClickOutside } from "usehooks-ts";

const filters = [
  {
    label: "t y p e",
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
  {
    label: "c a p a c i t y",
    options: [
      {
        value: "2",
        label: "2 Person",
        count: 7,
      },
      {
        value: "4",
        label: "4 Person",
        count: 3,
      },
      {
        value: "6",
        label: "6 Person",
        count: 5,
      },
      {
        value: "8",
        label: "8 And More",
        count: 6,
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
          "p-8 bg-white w-[360px] h-[calc(100vh-94px)] overflow-auto md:h-[calc(100vh-128px)] fixed top-[94px] md:top-[128px] z-20 duration-200 pb-20",
          isOpen ? "left-0" : "-left-[360px] xl:left-0"
        )}
      >
        <div className="flex flex-col gap-y-8 lg:gap-y-14">
          {filters.map((filter) => (
            <div key={filter.label}>
              <h4 className="text-xs font-semibold tracking-[-0.24px] text-secondary mb-7 uppercase ">
                {filter.label}
              </h4>
              <div className="flex flex-col gap-y-4 lg:gap-y-8">
                {filter.options.map((option) => (
                  <div key={option.label} className="flex items-center gap-x-2">
                    <Checkbox
                      id={`${filter.label}-${option.value}`}
                      className="w-5 h-5"
                    />
                    <label
                      htmlFor={`${filter.label}-${option.value}`}
                      className="text-lg font-semibold text-secondary lg:text-xl leading-[150%] tracking-[-0.4px] cursor-pointer"
                    >
                      {option.label}{" "}
                      <span className="text-secondary-300">
                        ({option.count})
                      </span>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          ))}
          <div>
            <h4 className="text-xs font-semibold tracking-[-0.24px] text-secondary mb-7 uppercase ">
              Price
            </h4>
            <div>
              <Slider className="cursor-pointer" />
              <p className="text-secondary text-lg lg:text-xl font-semibold tracking-[-0.4px] leading-[150%] mt-4">
                Max. $100.00
              </p>
            </div>
          </div>
        </div>
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
