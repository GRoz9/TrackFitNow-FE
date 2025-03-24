"use client";
import React, { useState, useRef } from "react";
import { BarTracker } from "../Trackers_GraphsComponents/TrackerBar";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  InputAdornment,
  Button,
  Fab,
  Box,
  Stack,
  Snackbar,
  IconButton,
} from "@mui/material";

export const ProteinTracker = (props) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [protein, setProtein] = useState(15);
  const [proteinGoal] = useState(props.proteinTarget);
  const [inputValue, setInputValue] = useState("");
  const [lastProteinAmount, setLastProteinAmount] = useState(0);
  const [prevProtein, setPrevProtein] = useState(15); // Store previous protein value

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
    if (reason !== "clickaway") {
      setSnackbarOpen(false);
    }
  };

  const handleInputChange = (event) => {
    const numericValue = event.target.value.replace(/\D/g, "");
    setInputValue(numericValue);
  };

  const handleProteinUpdate = () => {
    if (!inputValue) return;

    const enteredProtein = parseInt(inputValue, 10);
    setPrevProtein(protein); // Store current protein before updating

    setProtein((prev) => {
      return dialogTypeRef.current === "add"
        ? Math.min(prev + enteredProtein, proteinGoal)
        : Math.min(enteredProtein, proteinGoal);
    });

    showSnackbar(enteredProtein, dialogTypeRef.current);
    closeDialog();
  };

  const handleUndo = () => {
    setProtein(prevProtein); // Revert to previous value
    setSnackbarOpen(false);
  };

  return (
    <div className="flex flex-col justify-evenly h-full bg-cyan-100 shadow-xl rounded-xl text-center">
      <div className="flex flex-col gap-4 max-lg:m-2 m-4">
        <h1>Protein Target - {proteinGoal}g</h1>

        <BarTracker
          labels={["Target", "g"]}
          progressDate={{ current: protein, goal: proteinGoal }}
          sx={{ height: 15, borderRadius: 5 }}
        />

        <div className="flex justify-evenly w-full z-0">
          <Fab
            color="primary"
            aria-label="add"
            onClick={() => openDialog("add")}
          >
            <AddIcon />
          </Fab>
          <Fab aria-label="edit" onClick={() => openDialog("edit")}>
            <EditIcon />
          </Fab>
        </div>

        <Dialog open={isDialogOpen} keepMounted onClose={closeDialog}>
          <DialogTitle>
            {dialogTypeRef.current === "add"
              ? "Add Protein Amount"
              : "Edit Protein Amount"}
          </DialogTitle>
          <DialogContent>
            <Box
              component="form"
              sx={{ "& > :not(style)": { m: 1, width: "25ch" } }}
              noValidate
              autoComplete="off"
            >
              <Stack spacing={2} direction="row">
                <TextField
                  label="Protein"
                  variant="outlined"
                  placeholder={`Current: ${protein}g / Goal: ${proteinGoal}g`}
                  value={inputValue}
                  onChange={handleInputChange}
                  type="tel"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      if (inputValue) {
                        handleProteinUpdate();
                      }
                    }
                  }}
                  slotProps={{
                    input: {
                      inputMode: "numeric",
                      pattern: "[0-9]",
                      endAdornment: (
                        <InputAdornment position="end">g</InputAdornment>
                      ),
                    },
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
              onClick={handleProteinUpdate}
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
        } ${lastProteinAmount}g of protein!`}
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
  );
};
