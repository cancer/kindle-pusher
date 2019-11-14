export interface UserOwnedBookDocument {
  asin: string
  user: string;
  ignored: boolean;
  createdAt: string;
  updatedAt: string;
}