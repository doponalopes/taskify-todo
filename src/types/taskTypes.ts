export type TaskProps = {
  id: string;
  title: string;
  text: string;
  onwerName: string;
  ownerUid: string;
  createdAt: number;
  deliveryDate: number;
  blocked: boolean;
  completed: boolean;
}

export type TaskTypes = TaskProps & {
  onOpenRegisterUpdate: () => void;
}