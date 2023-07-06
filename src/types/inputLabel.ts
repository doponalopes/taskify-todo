import { InputProps } from "@chakra-ui/react";

export type InputLabelTypes = InputProps & {
  isRequired?: boolean;
  label: string;
}
