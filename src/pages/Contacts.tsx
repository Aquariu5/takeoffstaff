import {
  Box,
  Button,
  Grid,
  Pagination,
  TextField,
  Typography,
} from "@mui/material";
import { observer } from "mobx-react-lite";
import React, { useCallback, useEffect, useState } from "react";

import { getData } from "../api/dataApi";
import { IContact } from "../interfaces/contact";
import dataStore from "../store/data";
import infoStore from "../store/info";
import userStore from "../store/user";
import CustomModal from "../components/modals/CustomModal";
import SortPanel from "../components/SortPanel";
import Contact from "../components/Contact";
import { deleteRow } from "../api/dataApi";
import { useDebouce } from "../hooks/useDebounce";
const Contacts: React.FC = () => {
  useEffect(() => {
    getData();
  }, [
    dataStore.page,
    dataStore.sorBy,
    dataStore.sortDirection,
    dataStore.count,
  ]);

  const debounceQuery = useDebouce(getData, 1000);

  useEffect(() => {
    debounceQuery();
  }, [debounceQuery, dataStore.query]);

  const [open, setOpen] = useState<boolean>(false);
  const [modalName, setModalName] = useState<"Добавить" | "Изменить">(
    "Добавить"
  );

  const add = useCallback(() => {
    setOpen(true);
    setModalName("Добавить");
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    userStore.changeAuth();
  }, []);

  const edit = useCallback((contact: IContact) => {
    if (userStore.isAuth) {
      dataStore.setContact(contact);
      setOpen(true);
      setModalName("Изменить");
    } else {
      infoStore.setAlert(true, "Не авторизован", "error");
    }
  }, []);

  const drop = useCallback((contact: IContact) => {
    if (userStore.isAuth) {
      deleteRow(contact);
    } else {
      infoStore.setAlert(true, "Не авторизован", "error");
    }
  }, []);

  const changePage = useCallback(
    (event: React.ChangeEvent<unknown>, page: number) => {
      dataStore.setPage(page);
    },
    []
  );

  const onChangeQuery = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dataStore.setQuery(e.target.value);
    },
    []
  );

  const search = useCallback(() => {
    getData();
  }, []);

  return (
    <Box p={4}>
      <Grid container mb={2} gap={1}>
        <Grid item md={7}>
          <TextField label="Поиск" fullWidth onChange={onChangeQuery} />
        </Grid>
        <Button onClick={search} variant={"contained"}>
          Найти
        </Button>
      </Grid>

      <Grid container direction={"row"} gap={2}>
        <Grid item md={8}>
          {dataStore.contacts.map((contact) => (
            <Contact
              key={contact.id}
              contact={contact}
              edit={edit}
              drop={drop}
            />
          ))}
          {dataStore.contacts.length === 0 && dataStore.query && (
            <Typography variant={"button"}>Нет соответствий</Typography>
          )}
          <Box p={2}>
            <Pagination
              onChange={changePage}
              count={dataStore.pages}
              color="primary"
            />
          </Box>
        </Grid>
        <Grid item>
          <Grid container direction={"column"} gap={1}>
            <Button onClick={add} variant={"contained"}>
              Добавить
            </Button>
            <Button onClick={logout} variant={"contained"}>
              Выйти
            </Button>
          </Grid>
        </Grid>

        <Grid>
          <SortPanel />
        </Grid>
      </Grid>

      <CustomModal open={open} setOpen={setOpen} modalName={modalName} />
    </Box>
  );
};

export default observer(Contacts);
