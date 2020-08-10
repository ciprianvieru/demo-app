export interface User {
  username: string;
}

export interface StoredUser extends User {
  password: string;
}
