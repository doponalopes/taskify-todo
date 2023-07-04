import { Box, HStack, useDisclosure } from "@chakra-ui/react";
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
import { RegisterAndUpdate } from "./RegisterAndUpdate";

const buttonGroup = [
  'Todas',
  'Em andamento',
  'Concluìdas',
  'Bloqueadas'
]

export function Home() {
  const [activeButtonGroup, setActiveButtonGroup] = useState('Todas')
  const { isOpen, onOpen, onClose } = useDisclosure()

  function changeActiveButtonGroup(value: string) {
    setActiveButtonGroup(value)
  }

  function applyFilerHandler() { }

  return (
    <Container mt={8}>
      {isOpen && (
        <RegisterAndUpdate isOpen={isOpen} onClose={onClose} onClick={applyFilerHandler} />
      )}

      <HStack display="flex" alignItems="center" justifyContent="space-between">
        <Box flex={1}>
          <InputSearch />
        </Box>

        <HStack flex={1} gap={6} justifyContent="flex-end" >
          <OnlineOfflineUsers />

          <IconButton color="white" icon={<MdFilterList />} aria-label="Filtrar" />

          <Button
            color='blue'
            fontWeight="medium"
            onClick={onOpen}
          >
            Nova tarefa
          </Button>
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