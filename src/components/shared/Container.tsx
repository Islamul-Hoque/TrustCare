// import React from "react";

// const Container = ({ children }) => {
//     return <div className="max-w-[1200px] mx-auto">{children}</div>;
// };

// export default Container;



import React, { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => {
  return <div className="max-w-[1200px] mx-auto">{children}</div>;
};

export default Container;
