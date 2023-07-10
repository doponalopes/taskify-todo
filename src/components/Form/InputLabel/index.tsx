import { FormControl, FormLabel, Input } from "@chakra-ui/react";

import { InputLabelTypes } from "types/inputLabel";

export function InputLabel({ gridColumn, isRequired, label, ...rest }: InputLabelTypes) {
  return (
    <FormControl isRequired={isRequired} gridColumn={gridColumn}>
      <FormLabel fontWeight="normal">{label}</FormLabel>
      <Input
        bg="gray.200"
        border="none"
        {...rest} />
    </FormControl>
  )
}