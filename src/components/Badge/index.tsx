import { Badge as ChakraBadge } from '@chakra-ui/react'

import { badgeTypes } from 'types/badgeTypes';

export function Badge({ color, children }: badgeTypes) {
  const background = color === 'green' ? 'green.100' : 'orange.100'
  const textColor = color === 'green' ? 'green.500' : 'orange.600'

  return (
    <ChakraBadge
      fontSize="sm"
      borderRadius={5}
      fontWeight="medium"
      bg={background}
      color={textColor}
      textTransform="capitalize"
    >
      {children}
    </ChakraBadge>
  )
}