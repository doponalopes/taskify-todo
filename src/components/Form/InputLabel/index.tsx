import { FormControl, FormLabel, Input } from "@chakra-ui/react";

import { InputLabelTypes } from "types/inputLabel";

export function InputLabel({ isRequired, label, ...rest }: InputLabelTypes) {
  return (
    <FormControl isRequired={isRequired}>
      <FormLabel fontWeight="normal">{label}</FormLabel>
      <Input
        bg="gray.200"
        border="none"
        {...rest} />
    </FormControl>
  )
}