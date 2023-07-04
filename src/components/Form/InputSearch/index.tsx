import {
  InputGroup,
  Input as ChakraInput,
  InputProps,
  InputRightElement
} from "@chakra-ui/react";
import { MdOutlineSearch } from "react-icons/md";

export function InputSearch({ ...rest }: InputProps) {
  return (
    <InputGroup size='lg'>
      <ChakraInput
        bg="white"
        border="none"
        fontSize="md"
        color="gray.600"
        placeholder='Pesquisar'
        focusBorderColor="blue.500"
        {...rest}
      />

      <InputRightElement fontSize={24}>
        <MdOutlineSearch />
      </InputRightElement>
    </InputGroup>
  )
}