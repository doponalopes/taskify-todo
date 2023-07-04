import { ReactNode } from 'react';
import { Button, ButtonProps } from '@chakra-ui/react'

type Props = ButtonProps & {
  active: boolean;
  children: ReactNode;
}

export function ButtonGroup({ active, children, ...rest }: Props) {
  const background = active ? 'blue.100' : 'white'
  const color = active ? 'blue.500' : 'gray.600'

  return (
    <Button
      ml={4}
      color={color}
      fontWeight="medium"
      background={background}
      {...rest}
    >
      {children}
    </Button>
  )
}