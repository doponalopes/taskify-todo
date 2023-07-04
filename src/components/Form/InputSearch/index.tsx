import {
  InputGroup,
  Input as ChakraInput,
  InputProps,
  InputRightElement
} from "@chakra-ui/react";
import { MdOutlineSearch } from "react-icons/md";

type Props = InputProps & {
}

export function InputSearch({ ...rest }: Props) {
  return (
    <InputGroup size='lg'>
      <ChakraInput
        bg="white"
        border="none"
        color="gray.600"
        fontSize="md"
        focusBorderColor="blue.500"
        placeholder='Pesquisar'
        {...rest}
      />

      <InputRightElement fontSize={24}>
        <MdOutlineSearch />
      </InputRightElement>
    </InputGroup>
  )
}