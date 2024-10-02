export interface IFindAllInputDto {
  total?: number;
  page?: number;
}

export interface IFindAllOutputDto<T> {
  items: T[];
  meta: {
    totalItems: number;
    totalPages: number;
    currentPage: number;
    totalItemsInPage: number;
  };
}
