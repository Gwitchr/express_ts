export interface IToken {
  user: IUserRequest;
}

export interface IUserRequest {
  _id: string;
  role: number;
  email: number;
}
