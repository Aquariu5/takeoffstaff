import { IContact, IFetchData } from "../interfaces/contact";
import { IModalData } from "../interfaces/modals";

import dataStore from "../store/data";
import infoStore from "../store/info";
import { api } from "./api";

export const getData = () => {
  api
    .get<IFetchData>("/contacts", {
      params: {
        page: dataStore.page,
        sortby: dataStore.sorBy,
        sortdirection: dataStore.sortDirection,
        query: dataStore._query,
      },
    })
    .then((res) => {
      console.log("res", res.data);
      dataStore.setContacts(res.data.rows);
      dataStore.setCount(res.data.count);
    });
};
export const addRow = (data: IModalData) => {
  api.post<IContact>("/contacts", data).then((res) => {
    dataStore.addContact(res.data);
    infoStore.setAlert(true, "Контакт добавлен", "success");
  });
};

export const editRow = (data: IModalData) => {
  api
    .put<IContact>("/contacts", { ...data, id: dataStore.currentContact?.id })
    .then((res) => dataStore.editContact(res.data))
    .catch((res) => infoStore.setAlert(true, res.response.data.error, "error"));
};

export const deleteRow = (data: IModalData) => {
  api
    .delete<IContact>("/contacts", {
      data: {
        ...data,
      },
    })
    .then((res) => {
      dataStore.deleteContact(res.data);
      infoStore.setAlert(
        true,
        `Контакт ${data.name.toUpperCase()} удален`,
        "success"
      );
    })
    .catch((res) => infoStore.setAlert(true, res.response.data.error, "error"));
};
