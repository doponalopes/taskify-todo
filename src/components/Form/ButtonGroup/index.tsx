import { Button } from '@chakra-ui/react'

import { ButtonGroupTypes } from 'types/buttonGroupTypes'

export function ButtonGroup({ active, children, ...rest }: ButtonGroupTypes) {
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