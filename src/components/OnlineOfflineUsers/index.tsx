import { Avatar, Divider, HStack } from "@chakra-ui/react";

const userOnline = [
  {
    id: 1,
    name: 'Christopher Dopona Lopes'
  },

  {
    id: 2,
    name: 'Marta da Silva'
  },

  {
    id: 3,
    name: 'Lucas Matheus'
  },

  {
    id: 4,
    name: 'Silvana Martins'
  },

  {
    id: 5,
    name: 'Claudia da Rocha'
  }
]

const userOffline = [
  'Carlos Porto',
  'João Pedro'
]

const maxVisibleUsers = 3;

export function OnlineOfflineUsers() {
  const visibleUsers = userOnline.slice(0, maxVisibleUsers);
  const remainingUsers = userOnline.slice(maxVisibleUsers).map(({ name }) => name);

  return (
    <HStack>
      <Avatar
        name="O f"
        bg="gray.400"
        borderWidth={3}
        borderColor="white"
        title={userOffline.join(', ')}
      />
      <Divider
        ml={3}
        mr={2}
        bg="white"
        height="3rem"
        width="0.125rem"
        borderColor="white"
        orientation='vertical'
      />

      <HStack gap={0}>
        <Avatar
          mr={-2}
          borderWidth={3}
          borderColor="white"
          title={remainingUsers.join(', ')}
          name={`+ ${remainingUsers.length}`}
        />

        {visibleUsers.map(({ id, name }) => (
          <Avatar
            key={id}
            name={name}
            title={name}
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