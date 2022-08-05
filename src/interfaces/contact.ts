export enum SortDirectionType {
  ASC = "ASC",
  DESC = "DESC",
}

export enum SortType {
  NAME = "name",
  PHONE = "phone",
}

export interface IContact {
  id: string;
  name: string;
  phone: string;
}

export interface IContactStore {
  _query: string;
  _sortBy: SortType;
  _sortDirection: SortDirectionType;
  _pages: number;
  _count: number;
  _contacts: IContact[];
  _page: number;
  _limit: number;
  _currentContact: IContact | null;
}

export interface IFetchData {
  rows: IContact[];
  count: number;
}
