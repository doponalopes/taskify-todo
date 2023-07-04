import { Box, Button, HStack } from "@chakra-ui/react";
import { MdFilterList } from "react-icons/md";

import {
  Container,
  IconButton,
  InputSearch,
  OnlineOfflineUsers
} from "../../components";

export function Home() {
  return (
    <Container mt={8}>
      <HStack display="flex" alignItems="center" justifyContent="space-between">
        <Box flex={1}>
          <InputSearch />
        </Box>

        <HStack flex={1} gap={6} justifyContent="flex-end" >
          <OnlineOfflineUsers />

          <IconButton color="white" icon={<MdFilterList />} aria-label="Filtrar" />

          <Button colorScheme='blue' fontWeight="medium">Nova tarefa</Button>
        </HStack>
      </HStack>
    </Container>
  )
}