import { Container as ChakraContainer } from "@chakra-ui/react";

import { ContainerTypes } from "types/containerTypes";

export function Container({ children, ...rest }: ContainerTypes) {
  return (
    <ChakraContainer maxW='container.xl' {...rest}>
      {children}
    </ChakraContainer>
  )
}