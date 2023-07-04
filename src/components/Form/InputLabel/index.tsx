import { FormControl, FormLabel, Input, InputProps } from "@chakra-ui/react";

type Props = InputProps & {
  isRequired: boolean;
  label: string;
}

export function InputLabel({ isRequired, label, ...rest }: Props) {
  return (
    <FormControl isRequired={isRequired}>
      <FormLabel>{label}</FormLabel>
      <Input {...rest} />
    </FormControl>
  )
}