import { useContext } from 'react';
import { Avatar, Box, HStack, Heading } from '@chakra-ui/react';

import { AuthContext } from 'store/contexts/AuthContext';

import { Button, Container } from "..";

export function Header() {
  const { login, logout, userInformation, isLoading } = useContext(AuthContext)

  function googleSignInHandler() {
    login()
  }

  return (
    <Box bg="white" p={4}>
      <Container display="flex" justifyContent="space-between" alignItems="center">
        <Heading color="gray.600" fontSize={24}>Taskify</Heading>

        <HStack gap={8}>
          {userInformation.isLoggedIn ? (
            <>
              <Avatar
                bg="blue.500"
                color="white"
                name={userInformation.username}
              />
              <Button color="gray" onClick={logout}>Sair</Button>
            </>
          ) : (
            <Button
              color="gray"
              onClick={googleSignInHandler}
              isLoading={isLoading}
            >
              Entrar
            </Button>
          )}
        </HStack>
      </Container>
    </Box>
  )
}