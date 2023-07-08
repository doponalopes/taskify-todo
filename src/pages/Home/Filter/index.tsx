import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Grid,
  useToast
} from "@chakra-ui/react";

import { Button, InputLabel, SelectInput } from "@components";
import { formatDate, validateDate } from "@utils/dataUtils";
import { ChangeEvent, useState } from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
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

export function Filter({ isOpen, onClose }: Props) {
  const toast = useToast()

  const [deliveryDate, setDeliveryDate] = useState('')
  const [creationDate, setCreationDate] = useState('')

  function validateForm() {
    let description = ''

    if (deliveryDate && !validateDate(deliveryDate)) {
      description = 'Preencha uma Data de entrega válida!'
    }

    if (creationDate && !validateDate(creationDate)) {
      description = 'Preencha uma Data de criação válida!'
    }

    if (description) {
      toast({
        description,
        status: 'warning',
        duration: 3000,
        isClosable: true,
        position: 'top-right'
      })

      return false
    }

    return true
  }

  function applyFilterHandler() {
    if (validateForm()) {

    }
  }

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
            <InputLabel
              value={creationDate}
              label="Data de criação"
              onChange={(e: ChangeEvent<HTMLInputElement>) => setCreationDate(formatDate(e))}
            />
            <InputLabel
              value={deliveryDate}
              label="Data de entrega"
              onChange={(e: ChangeEvent<HTMLInputElement>) => setDeliveryDate(formatDate(e))}
            />
            <SelectInput label="Usuários" data={data} />
          </Grid>
        </DrawerBody>

        <DrawerFooter>
          <Button color='gray' mr={3} onClick={onClose}>Cancelar</Button>

          <Button color='blue' onClick={applyFilterHandler}>
            Aplicar filtro
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}