import { Avatar, Box, HStack, Menu, MenuButton, MenuItem, MenuList, Portal, Text } from "@chakra-ui/react";
import { MdOutlineMoreVert, MdLockOutline, MdOutlineLockOpen } from "react-icons/md"

import { TaskProps } from "@store/reducers/TaskReducer";

import { IconButton, Badge } from "..";
import { useContext } from "react";
import { TaskContext } from "@store/contexts/TaskContext";
import { AuthContext } from "@store/contexts/AuthContext";

type Props = TaskProps & {
  onOpenRegisterUpdate: () => void;
}

export function Task({
  id,
  title,
  text,
  onwerName,
  ownerUid,
  blocked,
  completed,
  onOpenRegisterUpdate
}: Props) {
  const { selectTaskToEdit, changeTaskStatusHandler, removeTaskHandler } = useContext(TaskContext)
  const { userInformation } = useContext(AuthContext)

  const variantBadge = completed ? 'green' : 'orange'
  const statusText = completed ? 'Concluída' : 'Em andamento'
  const statusButton = completed ? 'Voltar para em andamento' : 'Concluir tarefa'
  const canChange = blocked && ownerUid !== userInformation.uid ? false : true
  const isBlocked = blocked ? <MdLockOutline size={24} /> : <MdOutlineLockOpen size={24} />

  function editTaskHandler() {
    onOpenRegisterUpdate()

    selectTaskToEdit(id)
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
          name={onwerName}
          title={onwerName}
        />

        <HStack alignItems="center">
          <Badge color={variantBadge}>{statusText}</Badge>

          <Box ml={2} mr={1.5}>{isBlocked}</Box>
        </HStack>
      </HStack>
    </Box>
  )
}