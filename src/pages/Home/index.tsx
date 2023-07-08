import { ChangeEvent, useContext, useState } from "react";
import { Box, Grid, HStack, Skeleton, useDisclosure } from "@chakra-ui/react";
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
} from "@components";

import { TaskContext } from "@store/contexts/TaskContext";

import { TaskProps } from "types/taskTypes";

import { RegisterAndUpdate } from "./RegisterAndUpdate";
import { Filter } from "./Filter";

const buttonGroup = [
  {
    label: 'Todas',
    value: 'all'
  },

  {
    label: 'Em andamento',
    value: 'inProgress'
  },

  {
    label: 'Concluídas',
    value: 'completed'
  },

  {
    label: 'Bloqueadas',
    value: 'blocked'
  }
]

export function Home() {
  const [activeButtonGroup, setActiveButtonGroup] = useState('all')
  const [search, setSearch] = useState('')

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

  const skeletons = new Array(6).fill(null);

  const {
    tasks,
    isLoadingFetch,
    searchTaskHandler,
    visualizationTaskHandler
  } = useContext(TaskContext)

  function changeActiveButtonGroup(value: string) {
    setActiveButtonGroup(value)
    visualizationTaskHandler(value)
  }

  function applyFilerHandler() { }

  function changeSearchTaskHandler(value: string) {
    setSearch(value)
    searchTaskHandler(value)
  }

  return (
    <Container mt={8}>
      {isOpenRegisterUpdate && (
        <RegisterAndUpdate
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
          <InputSearch
            value={search}
            onChange={(e: ChangeEvent<HTMLInputElement>) => changeSearchTaskHandler(e.target.value)} />
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
              key={btn.value}
              onClick={() => changeActiveButtonGroup(btn.value)}
              active={activeButtonGroup === btn.value}
            >
              {btn.label}
            </ButtonGroup>
          ))}
        </HStack>
      </HStack>

      {isLoadingFetch ? (
        <Grid templateColumns="repeat(3, 1fr)" gap={6} mt={10}>
          {skeletons.map((_, i) => (
            <Skeleton
              key={i}
              height={180}
              width="auto"
              startColor="gray.100"
              endColor="gray.300"
            />
          ))}
        </Grid>
      ) : tasks.length > 0 ? (
        <Grid templateColumns="repeat(3, 1fr)" gap={6} mt={10}>
          {tasks.map(({
            id,
            title,
            text,
            ownerName,
            ownerUid,
            blocked,
            completed
          }: TaskProps) => (
            <Task
              key={id}
              id={id}
              text={text}
              title={title}
              blocked={blocked}
              ownerUid={ownerUid}
              ownerName={ownerName}
              completed={completed}
              onOpenRegisterUpdate={onOpenRegisterUpdate}
            />
          ))}
        </Grid>
      ) : <NoRegistry />}
    </Container>
  )
}