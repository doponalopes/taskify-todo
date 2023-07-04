import { IconButton as ChakraIconButton, IconButtonProps } from '@chakra-ui/react'

type Props = IconButtonProps & {
  color: 'gray' | 'white'
}

const hover = {
  gray: {
    background: 'blue.100'
  },

  white: {
    background: 'white'
  },
}

const background = {
  gray: 'gray.100',
  white: 'white'
}

export function IconButton({ icon, color, ...rest }: Props) {
  return (
    <ChakraIconButton
      bg={background[color]}
      _hover={hover[color]}
      icon={icon}
      fontSize={24}
      {...rest}
    />
  )
}