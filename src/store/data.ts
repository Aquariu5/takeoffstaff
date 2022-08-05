import { makeAutoObservable } from "mobx";
import {
  IContact,
  IContactStore,
  SortDirectionType,
  SortType,
} from "../interfaces/contact";
import { IModalData } from "../interfaces/modals";

class DataStore implements IContactStore {
  _query: string;
  _count: number;
  _pages: number;
  _contacts: IContact[];
  _page: number;
  _limit: number;
  _currentContact: IContact | null;
  _sortBy: SortType;
  _sortDirection: SortDirectionType;
  constructor() {
    this._contacts = [];
    this._page = 1;
    this._limit = 3;
    this._currentContact = null;
    this._count = 0;
    this._pages = 1;
    this._query = "";
    this._sortBy = SortType.NAME;
    this._sortDirection = SortDirectionType.ASC;
    makeAutoObservable(this);
  }

  setCount(count: number) {
    this._count = count;
    this._pages = Math.ceil(count / this._limit);
  }

  setPage(page: number) {
    this._page = page;
  }
  setLimit(limit: number) {
    this._limit = limit;
  }

  setContacts(contacts: IContact[]) {
    this._contacts = contacts;
  }

  setQuery(query: string) {
    this._query = query;
  }
  setContact(contact: IContact) {
    this._currentContact = contact;
  }

  addContact(contact: IContact) {
    this._count += 1;
    this._pages = Math.ceil(this._count / this._limit);
  }

  editContact(data: IModalData) {
    let idx = this._contacts.findIndex(
      (el) => el.id === this._currentContact?.id
    );
    if (idx != -1) {
      this._contacts[idx] = { ...this._contacts[idx], ...data };
    }
  }

  deleteContact(data: IContact) {
    let idx = this._contacts.findIndex((el) => el.id === data.id);
    if (idx != -1) {
      this._contacts.splice(idx, 1);
      this._count -= 1;
    }
  }

  setSortBy(sort: SortType) {
    this._sortBy = sort;
  }

  setDirection(direction: SortDirectionType) {
    this._sortDirection = direction;
  }

  get currentContact() {
    return this._currentContact;
  }

  get query() {
    return this._query;
  }
  get contacts() {
    return this._contacts;
  }

  get count() {
    return this._count;
  }

  get page() {
    return this._page;
  }

  get pages() {
    return this._pages;
  }

  get sorBy() {
    return this._sortBy;
  }

  get sortDirection() {
    return this._sortDirection;
  }
}

export default new DataStore();
