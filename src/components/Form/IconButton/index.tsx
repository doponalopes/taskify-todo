import { IconButton as ChakraIconButton, IconButtonProps } from '@chakra-ui/react'

const hover = {
  background: 'blue.100'
}

export function IconButton({ icon, color, ...rest }: IconButtonProps) {
  return (
    <ChakraIconButton
      bg={color}
      _hover={hover}
      icon={icon}
      fontSize={24}
      {...rest}
    />
  )
}