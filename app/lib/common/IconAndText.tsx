"use client";
import { ReactElement, ReactNode } from "react";

type ButtonProps = {
  text: ReactNode;
  icon: ReactElement;
};
export const IconAndText = ({ icon, text }: ButtonProps) => {
  return (
    <>
      {icon}
      {text}
    </>
  );
};
