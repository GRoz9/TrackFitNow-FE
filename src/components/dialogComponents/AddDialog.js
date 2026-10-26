"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  InputAdornment,
  Button,
  Snackbar,
  IconButton,
  Box,
  Stack,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function AddDialog({
  label = "Value",
  unit = "",
  currentValue = 0,
  goalValue = null,
  onUpdate,
}) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [lastValue, setLastValue] = useState(currentValue);
  const [prevValue, setPrevValue] = useState(currentValue);

  const openDialog = () => {
    setIsDialogOpen(true);
    setSnackbarOpen(false);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setInputValue("");
  };

  const closeSnackbar = (_, reason) => {
    if (reason !== "clickaway") setSnackbarOpen(false);
  };

  const handleInputChange = (event) => {
    const numericValue = event.target.value.replace(/[^\d.]/g, ""); // allow decimals
    setInputValue(numericValue);
  };

  const handleUpdate = () => {
    if (!inputValue) return;

    const newValue = parseFloat(inputValue);
    if (isNaN(newValue)) return;

    setPrevValue(currentValue);
    setLastValue(newValue);

    onUpdate?.(newValue);
    setSnackbarOpen(true);
    closeDialog();
  };

  const handleUndo = () => {
    onUpdate?.(prevValue);
    setSnackbarOpen(false);
  };

  return {
    openDialog,
    ValueDialog: (
      <div className="flex flex-col justify-evenly h-full bg-cyan-100 shadow-xl rounded-xl text-center">
        <div className="flex flex-col gap-4 m-4">
          <Dialog open={isDialogOpen} keepMounted onClose={closeDialog}>
            <DialogTitle>Set {label}</DialogTitle>
            <DialogContent>
              <Box
                component="form"
                sx={{ "& > :not(style)": { m: 1, width: "25ch" } }}
                noValidate
                autoComplete="off"
              >
                <Stack spacing={2} direction="row">
                  <TextField
                    label={label}
                    variant="outlined"
                    placeholder={
                      goalValue
                        ? `Current: ${currentValue}${unit} / Goal: ${goalValue}${unit}`
                        : `Current: ${currentValue}${unit}`
                    }
                    value={inputValue}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (/^\d*\.?\d{0,2}$/.test(value)) {
                        setInputValue(value);
                      }
                    }}
                    type="text"
                    inputMode="decimal"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        if (inputValue) handleUpdate();
                      }
                    }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">{unit}</InputAdornment>
                      ),
                    }}
                  />
                </Stack>
              </Box>
            </DialogContent>
            <DialogActions>
              <Button variant="text" color="error" onClick={closeDialog}>
                Cancel
              </Button>
              <Button
                variant="contained"
                onClick={handleUpdate}
                disabled={!inputValue}
              >
                Save
              </Button>
            </DialogActions>
          </Dialog>
        </div>

        <Snackbar
          open={snackbarOpen}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          autoHideDuration={2000}
          onClose={closeSnackbar}
          message={`You set your ${label.toLowerCase()} to ${lastValue}${unit}`}
          sx={{
            "& .MuiSnackbarContent-root": {
              backgroundColor: "white",
              color: "black",
            },
          }}
          action={
            <>
              <Button color="secondary" size="small" onClick={handleUndo}>
                UNDO
              </Button>
              <IconButton size="small" color="inherit" onClick={closeSnackbar}>
                <CloseIcon fontSize="small" />
              </IconButton>
            </>
          }
        />
      </div>
    ),
  };
}
