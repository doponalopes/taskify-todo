import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Grid
} from "@chakra-ui/react";

import { Button, InputLabel, SelectInput } from "../../../components";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onClick: () => void;
}

const data = [
  {
    label: 'Christopher Dopona Lopes',
    value: 1,
  },

  {
    label: 'Maria Silva',
    value: 2,
  }
]

export function Filter({ isOpen, onClose, onClick }: Props) {
  return (
    <Drawer
      isOpen={isOpen}
      placement='right'
      onClose={onClose}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader fontWeight="medium">Filtrar listagem</DrawerHeader>

        <DrawerBody>
          <Grid templateColumns="repeat(1fr)" gap={4}>
            <InputLabel label="Data de criação" />
            <InputLabel label="Data de entrega" />
            <SelectInput label="Usuários" data={data} />
          </Grid>
        </DrawerBody>

        <DrawerFooter>
          <Button color='gray' mr={3} onClick={onClose}>Cancelar</Button>

          <Button color='blue' onClick={onClick}>
            Aplicar filtro
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}