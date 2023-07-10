import { ReactNode } from "react";

import { types } from "store/reducers/TaskReducer";

export type TaskProps = {
  id: string;
  title: string;
  text: string;
  ownerName: string;
  ownerUid: string;
  createdAt?: string;
  deliveryDate?: string;
  blocked: boolean;
  completed: boolean;
}

export type TaskContextTypes = {
  children: ReactNode
}

export type Action = {
  type: typeof types[keyof typeof types];
  payload?: any;
};

export type TaskTypes = TaskProps & {
  onOpenRegisterUpdate: () => void;
}

export type RegisterUpdateTaskTypes = {
  title: string;
  text: string;
  deliveryDate: string;
  blocked: boolean;
  ownerName: string;
  ownerUid: string;
}

export type TaskFilterTypes = {
  ownerUid?: string;
  createdAt?: string;
  deliveryDate?: string;
  researchField?: string;
  visualization: string;
}

export type FilterTaskTypes = {
  isOpen: boolean;
  onClose: () => void;
}