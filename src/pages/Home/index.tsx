import { Button, HStack } from "@chakra-ui/react";
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
        <InputSearch />

        <HStack flex={1} gap={6}>
          <OnlineOfflineUsers />

          <IconButton color="white" icon={<MdFilterList />} aria-label="Filtrar" />

          <Button colorScheme='blue'>Nova tarefa</Button>
        </HStack>
      </HStack>
    </Container>
  )
}