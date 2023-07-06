import { Select as ChakraSelect, FormControl, FormLabel } from '@chakra-ui/react'

import { SelectTypes } from 'types/selectInputTypes'

export function SelectInput({ isRequired = false, label, data, ...rest }: SelectTypes) {
  return (
    <FormControl isRequired={isRequired}>
      <FormLabel fontWeight="normal" htmlFor='owner'>{label}</FormLabel>
      <ChakraSelect
        bg="gray.200"
        border="none" {...rest}
      >
        <option value="">Selecione...</option>
        {data?.map(({ value, label }) => (
          <option key={value} value={value}>{label}</option>
        ))}
      </ChakraSelect>
    </FormControl>
  )
}