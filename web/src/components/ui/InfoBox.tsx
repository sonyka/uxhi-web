import { ReactNode } from "react";

interface InfoBoxProps {
  children: ReactNode;
  className?: string;
}

export function InfoBox({ children, className = "" }: InfoBoxProps) {
  return (
    <div className={`bg-teal-50 border border-teal-100 rounded-[20px] p-6 ${className}`}>
      {children}
    </div>
  );
}
