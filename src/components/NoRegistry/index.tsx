import { VStack } from "@chakra-ui/react";

import Logo from "../../assets/task.file.svg";

export function NoRegistry() {
  return (
    <VStack>
      <img src={Logo} alt="Your SVG" />
      <Logo />
    </VStack>
  )
}