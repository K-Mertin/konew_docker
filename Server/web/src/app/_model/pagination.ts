export interface Pagination {
    pageNumber: number;
    pageSize: number;
    totalCount: number;
    totalPages: number;
}

export class PaginatedResult<T> {
    result: T;
    pagination: Pagination;
}
