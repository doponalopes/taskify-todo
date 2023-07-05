import { Text, VStack } from "@chakra-ui/react";

import Logo from "@assets/task-file.svg";

export function NoRegistry() {
  return (
    <VStack mt={20}>
      <img src={Logo} alt="Your SVG" />

      <VStack mt={8} color="gray.400">
        <Text fontWeight="bold">
          Você ainda não tem tarefas cadastradas
        </Text>
        <Text fontWeight="regular" mt={-2}>Crie tarefas e organize seus itens a fazer</Text>
      </VStack>
    </VStack>
  )
}