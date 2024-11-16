import ArrowDownImg from "@/assets/icons/arrow-down.svg";
import { useRef, useState } from "react";
import { RenderIf } from "./RenderIf";
import { useOnClickOutside } from "usehooks-ts";

type Props = {
  label: string;
  placeholder: string;
  options: { label: string; value: string }[];
  //   value: string;
  //   onChange: () => (value: string) => void;
};

export const CustomSelect = ({ label, options, placeholder }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  function openMenu() {
    setIsOpen(!isOpen);
  }

  function closeMenu() {
    setIsOpen(false);
  }

  useOnClickOutside(ref, closeMenu);

  return (
    <div>
      <h5 className="text-base font-bold text-secondary-500 leading-[20px] tracking-[-0.32px] mb-2">
        {label}
      </h5>

      <div ref={ref} className="relative">
        <div onClick={openMenu} className="flex justify-between cursor-pointer">
          <p className="text-xs text-secondary-300 font-medium tracking-[-0.24px]">
            {placeholder}
          </p>
          <img src={ArrowDownImg} alt="arrow-down" />
        </div>
        <RenderIf condition={isOpen}>
          <div className="absolute z-20 w-full mt-1 bg-white border top-6 border-secondary/50">
            <ul>
              {options.map((option) => (
                <li
                  key={option.value}
                  className="p-2 cursor-pointer hover:bg-information/60"
                >
                  {option.label}
                </li>
              ))}
            </ul>
          </div>
        </RenderIf>
      </div>
    </div>
  );
};
