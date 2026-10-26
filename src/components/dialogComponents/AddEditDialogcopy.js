"use client";
import React, { useState, useRef } from "react";
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
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function ValueEditorDialog({
  label = "Value",
  unit = "",
  currentValue = 0,
  goalValue = null,
  onUpdate,
}) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [lastAmount, setLastAmount] = useState(0);
  const [prevValue, setPrevValue] = useState(currentValue);

  const dialogTypeRef = useRef(null);
  const lastActionType = useRef("");

  const openDialog = (type) => {
    if (!isDialogOpen) {
      dialogTypeRef.current = type;
      setIsDialogOpen(true);
      setSnackbarOpen(false);
    }
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setInputValue("");
  };

  const showSnackbar = (amount, actionType) => {
    setLastProteinAmount(amount);
    lastActionType.current = actionType;
    setSnackbarOpen(true);
  };
  const closeSnackbar = (_, reason) => {
    if (reason !== "clickaway") setSnackbarOpen(false);
  };

  const handleInputChange = (event) => {
    const numericValue = event.target.value.replace(/\D/g, "");
    setInputValue(numericValue);
  };

  const handleUpdate = () => {
    if (!inputValue) return;

    const entered = parseFloat(inputValue);
    const newValue =
      dialogTypeRef.current === "add" ? currentValue + entered : entered;

    setPrevValue(currentValue);
    onUpdate?.(newValue);
    showSnackbar(entered, dialogTypeRef.current);
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
        <div className="flex flex-col gap-4 max-lg:m-2 m-4">
          <Dialog open={isDialogOpen} keepMounted onClose={closeDialog}>
            <DialogTitle>
              {dialogTypeRef.current === "add"
                ? `Add ${label}`
                : `Edit ${label}`}
            </DialogTitle>
            <DialogContent>
              <TextField
                label={label}
                variant="outlined"
                placeholder={
                  goalValue
                    ? `Current: ${currentValue}${unit} / Goal: ${goalValue}${unit}`
                    : `Current: ${currentValue}${unit}`
                }
                value={inputValue}
                onChange={handleInputChange}
                type="tel"
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
                {dialogTypeRef.current === "add" ? "Add" : "Save"}
              </Button>
            </DialogActions>
          </Dialog>
        </div>

        <Snackbar
          open={snackbarOpen}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          autoHideDuration={2000}
          onClose={closeSnackbar}
          message={`You have ${
            lastActionType.current === "add" ? "added" : "set"
          } ${lastAmount}${unit} ${label.toLowerCase()}!`}
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
