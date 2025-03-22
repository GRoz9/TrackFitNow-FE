import React from "react";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

export const FormSuccess = (props) => {
  if (!props.message) return null;

  return (
    <div className=" bg-emerald-500/20 text-emerald-500 text-sm font-medium p-3 rounded-md flex items-center gap-x-2 my-4">
      <CheckCircleOutlineIcon className="h-4 w-4" />
      <p>{props.message}</p>
    </div>
  );
};
