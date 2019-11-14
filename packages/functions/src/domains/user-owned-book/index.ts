export interface UserOwnedBook {
  asin: string;
  title: string;
  detailPageUrl: string;
  productUrl: string;
  ignored: boolean;
  user: string;
}

export type Book = Omit<UserOwnedBook, 'user'>;

