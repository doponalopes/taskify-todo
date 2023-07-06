import { ReactNode } from "react";
import { ButtonProps } from "@chakra-ui/react";

export type ButtonTypes = ButtonProps & {
  color: 'blue' | 'gray';
  children: ReactNode;
}
