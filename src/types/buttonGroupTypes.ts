import { ReactNode } from 'react';
import { ButtonProps } from '@chakra-ui/react'

export type ButtonGroupTypes = ButtonProps & {
  active: boolean;
  children: ReactNode;
}