import { useContext } from "react";
import { Avatar, Divider, HStack } from "@chakra-ui/react";

import { AuthContext } from "store/contexts/AuthContext";
import { UsersStatusType } from "types/authTypes";

const maxVisibleUsers = 3;

export function OnlineOfflineUsers() {
  const { onlineUsers, offlineUsers } = useContext(AuthContext)

  const offlineUsernames = offlineUsers.map(({ username }: UsersStatusType) => username)
  const visibleUsers = onlineUsers.slice(0, maxVisibleUsers);
  const remainingUsers = onlineUsers
    .slice(maxVisibleUsers)
    .map(({ username }: UsersStatusType) => username);

  return (
    <HStack mr={1}>
      {offlineUsers.length > 0 && (
        <>
          <Avatar
            name="O f"
            bg="gray.400"
            borderWidth={3}
            borderColor="white"
            title={offlineUsernames.join(', ')}
          />

          {onlineUsers.length > 0 && (
            <Divider
              ml={3}
              mr={3}
              bg="white"
              height="3rem"
              width="0.125rem"
              borderColor="white"
              orientation='vertical'
            />
          )}
        </>
      )}

      <HStack gap={0}>
        {remainingUsers.length > 0 && (
          <Avatar
            mr={-2}
            borderWidth={3}
            borderColor="white"
            title={remainingUsers.join(', ')}
            name={`+ ${remainingUsers.length}`}
          />
        )}

        {visibleUsers.map(({ id, username }: UsersStatusType) => (
          <Avatar
            key={id}
            name={username}
            title={username}
            borderWidth={3}
            borderColor="white"
            mr={-2}
          />
        )
        )}
      </HStack>
    </HStack>
  )
}