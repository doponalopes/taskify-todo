import { ReactNode } from 'react';
import { BadgeProps } from '@chakra-ui/react'

export type badgeTypes = BadgeProps & {
  color: 'green' | 'orange';
  children: ReactNode;
}
