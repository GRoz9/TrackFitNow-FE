import React from "react";
import { Avatar } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import Fab from "@mui/material/Fab";

export const ProfilePage = () => {
  return (
    <div className="flex flex-col bg-cyan-100 shadow-xl rounded-2xl w-full h-full py-6 px-4 sm:px-8 gap-8">
      <div className="flex flex-row gap-8">
        <div className="w-1/4 h-full">
          {/* <Avatar className="w-full h-full"></Avatar> */}
          <div className="flex flex-col w-full h-full">
            <Avatar sx={{ width: "100%", height: "100%" }} />
            <div>Name</div>
            <div>Edit Profile</div>
          </div>
        </div>
        <div className="w-full">Profile Page</div>
      </div>
    </div>
  );
};
