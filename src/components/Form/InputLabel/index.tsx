import { FormControl, FormLabel, Input, InputProps } from "@chakra-ui/react";

type Props = InputProps & {
  isRequired?: boolean;
  label: string;
}

export function InputLabel({ isRequired, label, ...rest }: Props) {
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