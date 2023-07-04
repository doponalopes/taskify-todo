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
      <FormLabel fontWeight="normal">{label}</FormLabel>

      <ChakraTextarea
        bg="gray.200"
        border="none"
        {...rest}
      />
    </FormControl>
  )
}