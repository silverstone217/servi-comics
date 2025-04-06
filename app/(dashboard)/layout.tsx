import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
}
const LayoutDashboard = ({ children }: Props) => {
  return <div>{children}</div>;
};

export default LayoutDashboard;
