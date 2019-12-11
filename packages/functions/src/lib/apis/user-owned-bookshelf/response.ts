export interface UserOwnedBookshelfItemResponse {
  acquisitionDate: number;
  asin: string;
  authors: string[];
  detailPageUrl: string;
  lastAnnotationDate: number;
  percentageRead: number;
  productUrl: string;
  title: string;
  webReaderUrl: string;
}

export interface UserOwnedBookshelfApiResponse {
  length: number;
  itemsList: UserOwnedBookshelfItemResponse[];
}
