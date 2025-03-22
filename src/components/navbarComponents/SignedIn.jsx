import React from "react";
import ProfileDropDown from "./ProfileDropDown";
import Image from "next/image";

const SignedIn = (props) => {
  console.log(props.isProfileToggled);
  return (
    <div>
      <button
        type="button"
        className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
        id="user-menu-button"
        aria-expanded="false"
        aria-haspopup="true"
        onClick={props.ProfileDropDown}
      >
        <span className="absolute -inset-1.5"></span>
        <span className="sr-only">Open user menu</span>
        <Image
          className="h-8 w-8 rounded-full"
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          alt=""
        />
      </button>
      {/* <ProfileDropDown /> */}
      {props.isProfileToggled ? <ProfileDropDown /> : ""}
    </div>
  );
};

export default SignedIn;
