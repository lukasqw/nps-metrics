/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, useContext, useState, ReactNode } from "react";

interface DialogContextProps {
  isDialogOpen: boolean;
  dialogParams: IDialogParams;
  setDialogOpen: (isOpen: boolean) => void;
  setDialogParams: (params: IDialogParams) => void;
}

export interface IDialogParams {
  title: string;
  prompt: string;
}

const DialogContext = createContext<DialogContextProps | undefined>(undefined);

export const DialogProvider = ({ children }: { children: ReactNode }) => {
  const [isDialogOpen, setDialogOpen] = useState<boolean>(false);
  const [dialogParams, setDialogParams] = useState<IDialogParams>({
    title: "",
    prompt: "",
  });

  return (
    <DialogContext.Provider
      value={{ isDialogOpen, dialogParams, setDialogOpen, setDialogParams }}
    >
      {children}
    </DialogContext.Provider>
  );
};

export const useDialog = () => {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error("useDialog must be used within a DialogProvider");
  }
  return context;
};
