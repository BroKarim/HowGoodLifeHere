import React, { ReactNode } from "react";

interface CodeProps {
  children: ReactNode;
}
export const Code: React.FC<CodeProps> = ({ children }) => {
  return (
    <div className="">
      <code className="m-2 block w-full select-all overflow-auto rounded-md bg-muted p-3 sm:m-4">{children}</code>
    </div>
  );
};
