import { extendTheme } from '@chakra-ui/react'

import { globalStyle } from './global'
import { colors, fonts } from './theme'

export const theme = extendTheme({ ...globalStyle, colors, fonts })