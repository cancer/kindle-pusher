export interface UserResponse {
  user: {
    auth0Id: string;
    pushDestination: string;
    bookShelfApi: string;
    createdAt: string;
    updatedAt: string;
  } | null;
}