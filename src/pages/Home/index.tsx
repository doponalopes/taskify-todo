import { useContext, useState } from "react";
import { Box, Grid, HStack, useDisclosure } from "@chakra-ui/react";
import { MdFilterList } from "react-icons/md";
import { Text } from '@chakra-ui/react'

import {
  Container,
  IconButton,
  InputSearch,
  Button,
  ButtonGroup,
  OnlineOfflineUsers,
  NoRegistry,
  Task
} from "../../components";

import { TaskContext } from "../../store/contexts/TaskContext";

import { RegisterAndUpdate } from "./RegisterAndUpdate";
import { Filter } from "./Filter";

const buttonGroup = [
  'Todas',
  'Em andamento',
  'Concluídas',
  'Bloqueadas'
]

const tasks = [
  {
    id: '1',
    title: 'Criar protótipo da tela de cadastro de usuários',
    text: 'Realize testes com usuários para obter feedback sobre o protótipo. Observe como eles interagem com a tela...',
    nameUser: 'Christopher Dopona Lopes',
    blocked: false,
    completed: false
  }
]

export function Home() {
  const [activeButtonGroup, setActiveButtonGroup] = useState('Todas')
  const {
    isOpen: isOpenRegisterUpdate,
    onOpen: onOpenRegisterUpdate,
    onClose: onCloseRegisterUpdate
  } = useDisclosure()
  const {
    isOpen: isOpenFilter,
    onOpen: onOpenFilter,
    onClose: onCloseFilter
  } = useDisclosure()

  const { allTasks } = useContext(TaskContext)

  function changeActiveButtonGroup(value: string) {
    setActiveButtonGroup(value)
  }

  function applyFilerHandler() { }

  return (
    <Container mt={8}>
      {isOpenRegisterUpdate && (
        <RegisterAndUpdate
          onClick={applyFilerHandler}
          isOpen={isOpenRegisterUpdate}
          onClose={onCloseRegisterUpdate}
        />
      )}

      {isOpenFilter && (
        <Filter
          isOpen={isOpenFilter}
          onClose={onCloseFilter}
          onClick={applyFilerHandler}
        />
      )}

      <HStack display="flex" alignItems="center" justifyContent="space-between">
        <Box flex={1}>
          <InputSearch />
        </Box>

        <HStack flex={1} gap={6} justifyContent="flex-end" >
          <OnlineOfflineUsers />

          <IconButton
            color="white"
            aria-label="Filtrar"
            onClick={onOpenFilter}
            icon={<MdFilterList />}
          />

          <Button
            color='blue'
            fontWeight="medium"
            onClick={onOpenRegisterUpdate}
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

      {allTasks.length > 0 ? (
        <Grid templateColumns="repeat(3, 1fr)" gap={6} mt={10}>
          {allTasks.map(({
            id,
            title,
            text,
            onwerName,
            ownerUid,
            blocked,
            completed
          }) => (
            <Task
              key={id}
              id={id}
              text={text}
              title={title}
              blocked={blocked}
              onwerName={onwerName}
              ownerUid={ownerUid}
              completed={completed}
            />
          ))}
        </Grid>
      ) : <NoRegistry />}
    </Container>
  )
}