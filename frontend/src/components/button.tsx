import clsx from "clsx";
import { ReactNode } from "react";

type ButtonProps = {
  onClick?: () => void;
  children: ReactNode;
  className?: string;
};

export const Button = ({ onClick, children, className }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={clsx(
        className,
        "text-white bg-black min-w-[80px] text-right p-2 pl-12 rounded-none border-0 "
      )}>
      {children}
    </button>
  );
};
