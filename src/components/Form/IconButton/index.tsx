import { IconButton as ChakraIconButton, IconButtonProps } from '@chakra-ui/react'

type Props = IconButtonProps & {
  color: 'gray' | 'white'
}

const hover = {
  background: 'blue.100'
}

const background = {
  gray: 'gray.100',
  white: 'white'
}

export function IconButton({ icon, color, ...rest }: Props) {
  return (
    <ChakraIconButton
      bg={background[color]}
      _hover={hover}
      icon={icon}
      fontSize={24}
      {...rest}
    />
  )
}