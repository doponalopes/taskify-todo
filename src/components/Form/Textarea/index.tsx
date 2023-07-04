import {
  Textarea as ChakraTextarea,
  FormControl,
  FormLabel,
  TextareaProps
} from '@chakra-ui/react'

type Props = TextareaProps & {
  label: string;
}

export function Textarea({ gridColumn, isRequired, label, ...rest }: Props) {
  return (
    <FormControl isRequired={isRequired} gridColumn={gridColumn}>
      <FormLabel>{label}</FormLabel>
      <ChakraTextarea
        {...rest}
      />

    </FormControl>
  )
}