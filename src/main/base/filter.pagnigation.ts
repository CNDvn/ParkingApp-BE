import { ApiProperty } from '@nestjs/swagger';

export enum Sort {
  ASC = 'ASC',
  DESC = 'DESC',
}

export class FilterPaginationBase {
  @ApiProperty({
    type: String,
    description: 'SizePage(Summary of element on page)',
    default: '5',
    required: false,
  })
  sizePage: string | number;

  @ApiProperty({
    type: String,
    description: 'CurrentPage',
    default: '1',
    required: false,
  })
  currentPage: string | number;

  @ApiProperty({
    enum: Sort,
    description: 'Sort Ascending or Descending by name',
    required: false,
    default: Sort.ASC,
  })
  sort: Sort;
}

export class IPaginateResponse<T> {
  data: T[];

  count: number;

  currentPage: number;

  nextPage: number;

  prevPage: number;

  lastPage: number;
}

export function paginateResponse<T>(
  data: [T[], number],
  page: number,
  limit: number,
): IPaginateResponse<T> {
  const [result, total]: [T[], number] = data;
  page = +page;
  const lastPage: number = Math.ceil(total / limit);
  const nextPage: number = page + 1 > lastPage ? null : page + 1;
  const prevPage: number = page - 1 < 1 ? null : page - 1;
  return {
    data: result,
    count: total,
    currentPage: page,
    nextPage: nextPage,
    prevPage: prevPage,
    lastPage: lastPage,
  };
}
