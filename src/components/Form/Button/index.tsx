import { ReactNode } from "react";
import { Button as ChakraButton, ButtonProps } from "@chakra-ui/react";

type Props = ButtonProps & {
  color: 'blue' | 'gray';
  children: ReactNode;
}

export function Button({ children, color }: Props) {
  return (
    <ChakraButton colorScheme={color} fontWeight="medium">{children}</ChakraButton>
  )
}