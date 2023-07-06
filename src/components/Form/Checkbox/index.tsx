import { Checkbox as ChakraCheckbox } from "@chakra-ui/react"

import { CheckboxTypes } from "types/checkboxTypes"

export function Checkbox({ label, ...rest }: CheckboxTypes) {
  return (
    <ChakraCheckbox
      colorScheme='blue'
      borderColor="blue.200"
      {...rest}
    >
      {label}
    </ChakraCheckbox>
  )
}