import { ReactNode } from 'react';
import { Badge as ChakraBadge, BadgeProps } from '@chakra-ui/react'

type Props = BadgeProps & {
  color: 'green' | 'orange';
  children: ReactNode;
}

const background = {
  green: 'green.100',
  orange: 'orange.100'
}

const textColor = {
  green: 'green.500',
  orange: 'orange.600'
}

export function Badge({ color, children }: Props) {

  return (
    <ChakraBadge
      fontSize="sm"
      borderRadius={5}
      fontWeight="medium"
      bg={background[color]}
      color={textColor[color]}
      textTransform="capitalize"
    >
      {children}
    </ChakraBadge>
  )
}