import { useContext } from "react";
import {
  Avatar,
  Box,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Portal,
  Text
} from "@chakra-ui/react";
import {
  MdOutlineMoreVert,
  MdLockOutline,
  MdOutlineLockOpen
} from "react-icons/md"

import { TaskTypes } from "types/taskTypes";

import { TaskContext } from "@store/contexts/TaskContext";
import { AuthContext } from "@store/contexts/AuthContext";

import { IconButton, Badge } from "..";

export function Task({
  id,
  title,
  text,
  ownerName,
  ownerUid,
  blocked,
  completed,
  onOpenRegisterUpdate
}: TaskTypes) {
  const { selectTaskToEditHandler, changeTaskStatusHandler, removeTaskHandler } = useContext(TaskContext)
  const { userInformation } = useContext(AuthContext)

  const variantBadge = completed ? 'green' : 'orange'
  const statusText = completed ? 'Concluída' : 'Em andamento'
  const statusButton = completed ? 'Voltar para em andamento' : 'Concluir tarefa'
  const canChange = blocked && ownerUid !== userInformation.uid ? false : true
  const isBlocked = blocked ? <MdLockOutline size={24} /> : <MdOutlineLockOpen size={24} />

  function editTaskHandler() {
    onOpenRegisterUpdate()

    selectTaskToEditHandler(id)
  }

  async function changeStatusHandler() {
    await changeTaskStatusHandler(id, !completed)
  }

  async function removeHandler() {
    removeTaskHandler(id)
  }

  return (
    <Box bg="white" p={4} borderRadius={5}>
      <HStack display="flex" alignItems="center" justifyContent="space-between">
        <Text fontWeight="medium" noOfLines={1} title={title}>
          {title}
        </Text>

        <Menu>
          <MenuButton><IconButton
            color="transparent"
            icon={<MdOutlineMoreVert />}
            aria-label="Botão de ações da tarefa."
            size="sm"
          /></MenuButton>
          <Portal>
            <MenuList>
              <MenuItem isDisabled={!canChange} onClick={editTaskHandler}>Editar</MenuItem>
              <MenuItem isDisabled={!canChange} onClick={changeStatusHandler}>{statusButton}</MenuItem>
              <MenuItem isDisabled={!canChange} onClick={removeHandler}>Excluir</MenuItem>
            </MenuList>
          </Portal>
        </Menu>

      </HStack>
      <Text
        mt={2}
        mb={3}
        title={text}
        noOfLines={2}
        color="gray.400"
        fontFamily="mono"
        fontWeight="regular"
        height="5.5ch"
      >
        {text}
      </Text>

      <HStack
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Avatar
          size="sm"
          bg="blue.500"
          color="white"
          name={ownerName}
          title={ownerName}
        />

        <HStack alignItems="center">
          <Badge color={variantBadge}>{statusText}</Badge>

          <Box ml={2} mr={1.5}>{isBlocked}</Box>
        </HStack>
      </HStack>
    </Box>
  )
}