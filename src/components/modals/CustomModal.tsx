import { ErrorRounded } from "@mui/icons-material";
import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { observer } from "mobx-react-lite";
import * as React from "react";
import { useCallback, useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

import { addRow, editRow } from "../../api/dataApi";
import { IModalData } from "../../interfaces/modals";
import dataStore from "../../store/data";
import userStore from "../../store/user";
interface ModalProps {
  open: boolean;
  setOpen: Function;
  modalName: "Добавить" | "Изменить";
}
export const CustomModal: React.FC<ModalProps> = ({
  open,
  setOpen,
  modalName,
}) => {
  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit: SubmitHandler<IModalData> = useCallback(
    (data) => {
      if (modalName === "Добавить") {
        addRow(data);
      } else {
        editRow(data);
      }
      setOpen(false);
    },
    [modalName, setOpen]
  );

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<IModalData>({
    defaultValues: {
      name: dataStore.currentContact?.name,
      phone: dataStore.currentContact?.phone,
    },
  });

  useEffect(() => {
    reset({ ...dataStore.currentContact });
  }, [dataStore.currentContact, modalName, reset]);

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{modalName}</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              autoFocus
              margin="dense"
              label="Имя"
              fullWidth
              required
              variant="standard"
              {...register("name", { required: "true" })}
            />
            <TextField
              autoFocus
              margin="dense"
              label="Телефон"
              type="string"
              fullWidth
              required
              {...register("phone", {
                required: "true",
                pattern: /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/,
              })}
              variant="standard"
            />
            {errors.phone && <small>Неверный формат для номера телефона</small>}
            <DialogActions>
              <Button onClick={handleClose}>Отмена</Button>
              <Button type={"submit"}>Сохранить</Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default observer(CustomModal);
