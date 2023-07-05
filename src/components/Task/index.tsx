import { Avatar, Box, HStack, Text } from "@chakra-ui/react";
import { MdOutlineMoreVert, MdLockOutline, MdOutlineLockOpen } from "react-icons/md"

import { IconButton, Badge } from "..";

type Props = {
  id: string;
  title: string;
  text: string;
  nameUser: string;
  blocked: boolean;
  completed: boolean;
}

export function Task({ id, title, text, nameUser, blocked, completed }: Props) {
  const variantBadge = completed ? 'green' : 'orange'
  const statusText = completed ? 'Concluída' : 'Em andamento'
  const isBlocked = blocked ? <MdLockOutline size={24} /> : <MdOutlineLockOpen size={24} />

  return (
    <Box bg="white" p={4} borderRadius={5}>
      <HStack display="flex" alignItems="center" justifyContent="space-between">
        <Text fontWeight="medium" noOfLines={1} title={title}>
          {title}
        </Text>

        <IconButton
          color="transparent"
          icon={<MdOutlineMoreVert />}
          aria-label="Botão de ações da tarefa."
          size="sm"
        />

      </HStack>
      <Text
        mt={2}
        mb={3}
        title={text}
        noOfLines={2}
        color="gray.400"
        fontFamily="mono"
        fontWeight="regular"
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
          name={nameUser}
          title={nameUser}
        />

        <HStack alignItems="center">
          <Badge color={variantBadge}>{statusText}</Badge>

          <Box ml={2} mr={1.5}>{isBlocked}</Box>
        </HStack>
      </HStack>
    </Box>
  )
}