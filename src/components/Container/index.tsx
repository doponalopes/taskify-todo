import { ReactNode } from "react";
import { Container as ChakraContainer, ContainerProps } from "@chakra-ui/react";

type Props = ContainerProps & {
  children: ReactNode
}

export function Container({ children, ...rest }: Props) {
  return (
    <ChakraContainer maxW='container.xl' {...rest}>
      {children}
    </ChakraContainer>
  )
}