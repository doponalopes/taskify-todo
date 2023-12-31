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

import { Button, InputLabel, SelectInput } from "components";

import { formatDate, validateDate } from "utils/dataUtils";

import { TaskContext } from "store/contexts/TaskContext";
import { AuthContext } from "store/contexts/AuthContext";

import { FilterTaskTypes } from "types/taskTypes";
import { UsersStatusType } from "types/authTypes";

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

  const { allUsers } = useContext(AuthContext)

  const allUsersFormatted = allUsers.map(({ userId, username }: UsersStatusType) => ({
    label: username,
    value: userId
  }))

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
              label="Data de entrega"
              value={deliveryDateValue}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setDeliveryDateValue(formatDate(e))}
            />
            <SelectInput
              label="Usuários"
              value={ownerUidValue}
              data={allUsersFormatted}
              onChange={(e) => setOwnerUidValue(e.target.value)}
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