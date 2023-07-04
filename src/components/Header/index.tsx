import { Avatar, Box, HStack, Heading } from "@chakra-ui/react";
import { MdOutlineWbSunny, MdOutlineNotifications } from 'react-icons/md'

import { Container, IconButton } from "..";

export function Header() {
  return (
    <Box bg="white" p={4}>
      <Container display="flex" justifyContent="space-between" alignItems="center">
        <Heading color="gray.600" fontSize={24}>Taskify</Heading>

        <HStack gap={8}>
          <HStack gap={6}>
            <IconButton color="gray" icon={<MdOutlineWbSunny />} aria-label="Modo escuro/claro" />
            <IconButton color="gray" icon={<MdOutlineNotifications />} aria-label="Notificação" />
          </HStack>

          <Avatar bg="blue.500" color="white" name='Christopher Dopona' />
        </HStack>
      </Container>
    </Box>
  )
}