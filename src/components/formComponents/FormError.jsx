import React from "react";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

export const FormError = (props) => {
  if (!props.message) return null;

  return (
    <div className="bg-red-600/20 text-red-500 text-sm font-medium p-3 rounded-md flex items-center gap-x-2 my-4">
      <WarningAmberIcon className="h-4 w-4" />
      <p>{props.message}</p>
    </div>
  );
};
