import { SelectProps } from '@chakra-ui/react'

type DataProps = {
  value: string;
  label: string;
}

export type SelectTypes = SelectProps & {
  data: DataProps[];
  label: string;
}