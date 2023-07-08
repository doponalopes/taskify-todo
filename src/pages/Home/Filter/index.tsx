import { ChangeEvent, useContext, useEffect, useState } from "react";
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

import { TaskContext } from "@store/contexts/TaskContext";

import { FilterTaskTypes } from "types/taskTypes";

const data = [
  {
    label: 'Christopher Dopona Lopes',
    value: 'JvybrK5ZpkOhmPoTyI4QMkO1ArC2',
  },

  {
    label: 'Maria Silva',
    value: 'JvybrK5ZpkOhmPoTyI4QMkO1ArC3',
  }
]

export function Filter({ isOpen, onClose }: FilterTaskTypes) {
  const [deliveryDateValue, setDeliveryDateValue] = useState('')
  const [createdAtValue, setCreatedAtValue] = useState('')
  const [ownerUidValue, setOwnerUidValue] = useState('')

  const toast = useToast()

  const {
    applyFilterHandler,
    deliveryDate,
    createdAt,
    ownerUid,
    visualization,
    researchField
  } = useContext(TaskContext)

  function validateForm() {
    let description = ''

    if (deliveryDate && !validateDate(deliveryDate)) {
      description = 'Preencha uma Data de entrega válida!'
    }

    if (createdAt && !validateDate(createdAt)) {
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

  function addFilterHandler() {
    if (validateForm()) {
      applyFilterHandler({
        deliveryDate: deliveryDateValue,
        createdAt: createdAtValue,
        ownerUid: ownerUidValue,
        visualization,
        researchField
      })

      onClose()
    }
  }

  useEffect(() => {
    setDeliveryDateValue(deliveryDate)
    setCreatedAtValue(createdAt)
    setOwnerUidValue(ownerUid)
  }, [deliveryDate, createdAt, ownerUid])

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
              value={createdAtValue}
              label="Data de criação"
              onChange={(e: ChangeEvent<HTMLInputElement>) => setCreatedAtValue(formatDate(e))}
            />
            <InputLabel
              value={deliveryDateValue}
              label="Data de entrega"
              onChange={(e: ChangeEvent<HTMLInputElement>) => setDeliveryDateValue(formatDate(e))}
            />
            <SelectInput
              data={data}
              value={ownerUidValue}
              label="Usuários"
              onChange={(e: ChangeEvent<HTMLInputElement>) => setOwnerUidValue(e.target.value)}
            />
          </Grid>
        </DrawerBody>

        <DrawerFooter>
          <Button color='gray' mr={3} onClick={onClose}>Cancelar</Button>

          <Button color='blue' onClick={addFilterHandler}>
            Aplicar filtro
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}