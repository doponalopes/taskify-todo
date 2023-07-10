import { ReactNode } from "react";

import { types } from "store/reducers/AuthReducer";

export type Action = {
  type: typeof types[keyof typeof types];
  payload?: any;
};

export type AuthContextTypes = {
  children: ReactNode
}

export type UsersStatusType = {
  id?: string;
  userId: string;
  username: string;
  online: boolean;
}
