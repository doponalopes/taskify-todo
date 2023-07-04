import {
  Select as ChakraSelect,
  FormControl,
  FormLabel,
  SelectProps
} from '@chakra-ui/react'

type DataProps = {
  value: string;
  label: string;
}

type Props = SelectProps & {
  data: DataProps[];
  label: string;
}

export function SelectInput({ isRequired = false, label, data, ...rest }: Props) {
  return (
    <FormControl isRequired={isRequired}>
      <FormLabel htmlFor='owner'>{label}</FormLabel>
      <ChakraSelect {...rest}>
        <option value="">Selecione...</option>
        {data?.map(({ value, label }) => (
          <option key={value} value={value}>{label}</option>
        ))}
      </ChakraSelect>
    </FormControl>
  )
}