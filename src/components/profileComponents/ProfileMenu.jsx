import React, { useState } from "react";

import {
  Avatar,
  Box,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  Tooltip,
  Typography,
} from "@mui/material";
import Logout from "@mui/icons-material/Logout";
import Settings from "@mui/icons-material/Settings";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import Link from "next/link";

export const ProfileMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const id = open ? "simple-popover" : undefined;

  async function logout() {
    try {
      await fetch("http://localhost:8080/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      window.location.href = "/login";
    } catch (error) {
      console.error("Logout failed", error);
    }
  }

  return (
    <div>
      <Box>
        <Tooltip title="Account Menu">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar sx={{ width: 36, height: 36 }}></Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        disableScrollLock
      >
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <ManageAccountsIcon fontSize="small" />
          </ListItemIcon>
          <Link href="/profile">Your Profile</Link>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          <Link href="/settings">Settings</Link>
        </MenuItem>
        <MenuItem onClick={logout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </div>
  );
};
