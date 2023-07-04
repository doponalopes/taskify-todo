import { Checkbox as ChakraCheckbox, CheckboxProps } from "@chakra-ui/react"

type Props = CheckboxProps & {
  label: string;
}

export function Checkbox({ label, ...rest }: Props) {
  return (
    <ChakraCheckbox colorScheme='gray' {...rest}>
      {label}
    </ChakraCheckbox>
  )
}