import { Box, HStack } from "@chakra-ui/react";
import { MdFilterList } from "react-icons/md";
import { Text } from '@chakra-ui/react'

import {
  Container,
  IconButton,
  InputSearch,
  Button,
  ButtonGroup,
  OnlineOfflineUsers,
  NoRegistry
} from "../../components";
import { useState } from "react";

const buttonGroup = [
  'Todas',
  'Em andamento',
  'Concluìdas',
  'Bloqueadas'
]

export function Home() {
  const [activeButtonGroup, setActiveButtonGroup] = useState('Todas')


  function changeActiveButtonGroup(value: string) {
    setActiveButtonGroup(value)
  }

  return (
    <Container mt={8}>
      <HStack display="flex" alignItems="center" justifyContent="space-between">
        <Box flex={1}>
          <InputSearch />
        </Box>

        <HStack flex={1} gap={6} justifyContent="flex-end" >
          <OnlineOfflineUsers />

          <IconButton color="white" icon={<MdFilterList />} aria-label="Filtrar" />

          <Button color='blue' fontWeight="medium">Nova tarefa</Button>
        </HStack>
      </HStack>

      <HStack mt={8} display="flex" alignItems="center" justifyContent="space-between">
        <Text fontWeight="medium">Listagem de tarefas</Text>

        <HStack>
          {buttonGroup.map((btn) => (
            <ButtonGroup
              key={btn}
              onClick={() => changeActiveButtonGroup(btn)}
              active={activeButtonGroup === btn}
            >
              {btn}
            </ButtonGroup>
          ))}
        </HStack>
      </HStack>

      <NoRegistry />
    </Container>
  )
}