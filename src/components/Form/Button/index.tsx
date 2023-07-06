
import { Button as ChakraButton } from "@chakra-ui/react";

import { ButtonTypes } from "types/buttonTypes";

export function Button({ children, color, ...rest }: ButtonTypes) {
  return (
    <ChakraButton
      colorScheme={color}
      fontWeight="medium"
      {...rest}
    >
      {children}
    </ChakraButton>
  )
}