import { ChangeEvent, useContext, useEffect, useState } from "react";
import { Box, Grid, HStack, Skeleton, useDisclosure, useToast } from "@chakra-ui/react";
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
} from "components";

import { TaskContext } from "store/contexts/TaskContext";
import { AuthContext } from "store/contexts/AuthContext";
import { ErrorContext } from "store/contexts/ErrorContext";

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
  const [visualizationValue, setVisualizationValue] = useState('all')
  const [searchValue, setSearchValue] = useState('')

  const toast = useToast();

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
    applyFilterHandler,
    deliveryDate,
    createdAt,
    ownerUid,
    visualization,
    researchField
  } = useContext(TaskContext)

  const { error, changeError } = useContext(ErrorContext)

  const { userInformation } = useContext(AuthContext)

  function changeActiveButtonGroup(value: string) {
    setVisualizationValue(value)

    applyFilterHandler({
      deliveryDate,
      createdAt,
      ownerUid,
      visualization: value,
      researchField: searchValue
    })
  }

  function changeSearchTaskHandler(value: string) {
    setSearchValue(value)

    applyFilterHandler({
      deliveryDate,
      createdAt,
      ownerUid,
      visualization: visualizationValue,
      researchField: value
    })
  }

  useEffect(() => {
    setSearchValue(researchField)
    setVisualizationValue(visualization)
  }, [researchField, visualization])

  useEffect(() => {
    if (error) {
      toast({
        title: 'Erro',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right'
      });

      setTimeout(() => {
        changeError('')
      }, 5000);
    }
  }, [toast, error])

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
        />
      )}

      <HStack
        wrap="wrap"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        flexDirection={{ base: "column", md: "row" }}
      >
        <Box flex={1} width="100%" mb={{ base: 8, md: 0 }}>
          <InputSearch
            value={searchValue}
            onChange={(e: ChangeEvent<HTMLInputElement>) => changeSearchTaskHandler(e.target.value)} />
        </Box>

        <HStack
          gap={6}
          flex={1}
          wrap="wrap"
          justifyContent={{ base: "center", md: "flex-end" }}
        >
          <OnlineOfflineUsers />

          <HStack>
            <IconButton
              color="white"
              aria-label="Filtrar"
              onClick={onOpenFilter}
              icon={<MdFilterList />}
              mr={4}
            />

            <Button
              color='blue'
              fontWeight="medium"
              onClick={onOpenRegisterUpdate}
              isDisabled={!userInformation.isLoggedIn}
            >
              Nova tarefa
            </Button>

          </HStack>
        </HStack>
      </HStack>

      <HStack
        mt={8}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Text
          fontWeight="medium"
          display={{ base: "none", md: "block" }}
        >
          Listagem de tarefas
        </Text>

        <Box overflowX="auto" whiteSpace="nowrap" css={{
          '::-webkit-scrollbar': {
            display: 'none',
          },
          '-ms-overflow-style': 'none',
          scrollbarWidth: 'none',
        }}>
          {buttonGroup.map((btn) => (
            <ButtonGroup
              key={btn.value}
              onClick={() => changeActiveButtonGroup(btn.value)}
              active={visualizationValue === btn.value}
            >
              {btn.label}
            </ButtonGroup>
          ))}
        </Box>
      </HStack>

      {isLoadingFetch ? (
        <Grid
          gap={6}
          mt={10}
          mb={10}
          templateColumns={{
            base: "1fr",
            md: "1fr 1fr",
            lg: "1fr 1fr 1fr"
          }}
        >
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
        <Grid
          gap={6}
          mt={10}
          mb={10}
          templateColumns={{
            base: "1fr",
            md: "1fr 1fr",
            lg: "1fr 1fr 1fr"
          }}
        >
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
