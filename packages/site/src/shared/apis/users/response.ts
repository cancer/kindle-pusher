export interface UserResponse {
  user: {
    auth0Id: string;
    createdAt: string;
    updatedAt: string;
  } | null;
}