import { Textarea as ChakraTextarea, FormControl, FormLabel } from '@chakra-ui/react'

import { TextareaTypes } from 'types/textAreaTypes'

export function Textarea({ gridColumn, isRequired, label, ...rest }: TextareaTypes) {
  return (
    <FormControl isRequired={isRequired} gridColumn={gridColumn}>
      <FormLabel fontWeight="normal">{label}</FormLabel>

      <ChakraTextarea
        bg="gray.200"
        border="none"
        {...rest}
      />
    </FormControl>
  )
}