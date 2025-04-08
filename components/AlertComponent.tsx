"use client";
import React from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal, Info } from "lucide-react";

type Props = {
  text: string;
  title: string;
  type: "info" | "error";
};

const AlertComponent = ({ text, title, type }: Props) => {
  return (
    <Alert>
      {type === "info" ? (
        <Info className="h-4 w-4" />
      ) : (
        <Terminal className="h-4 w-4" />
      )}
      {title !== "" && <AlertTitle>{title}</AlertTitle>}
      <AlertDescription>{text}</AlertDescription>
    </Alert>
  );
};

export default AlertComponent;
