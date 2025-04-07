import Header from "@/components/dashboard/Header";
import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
}
const LayoutDashboard = ({ children }: Props) => {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
};

export default LayoutDashboard;
