import React, { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => {
  return <div className="max-w-[1200px] mx-auto px-6 md:px-8">{children}</div>;
};

export default Container;
