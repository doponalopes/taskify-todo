import { ChangeEvent, useContext, useEffect, useState } from "react";
import {
  Grid,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useToast
} from "@chakra-ui/react";

import {
  Button,
  Checkbox,
  InputLabel,
  Textarea
} from 'components'

import { convertDateToTimestamp, formatDate, validateDate } from "utils/dataUtils";

import { TaskContext } from "store/contexts/TaskContext";
import { AuthContext } from "store/contexts/AuthContext";
import { ErrorContext } from "store/contexts/ErrorContext";

import { RegisterAndUpdateTaskProps } from "types/registerAndUpdateTaskTypes";

export function RegisterAndUpdate({ isOpen, onClose }: RegisterAndUpdateTaskProps) {
  const { userInformation } = useContext(AuthContext)
  const { changeError } = useContext(ErrorContext)
  const toast = useToast()

  const [title, setTitle] = useState('')
  const [deliveryDate, setDeliveryDate] = useState('')
  const [text, setText] = useState('')
  const [blocked, setBlocked] = useState(false)

  const {
    registerNewTaskHandler,
    updateTaskHandler,
    removeSelectedTaskHandler,
    isLoadingRegisterUpdate,
    selectTask
  } = useContext(TaskContext)


  const taskWasSelected = !!selectTask?.id
  const modalTile = taskWasSelected ? 'Editar' : 'Cadastrar'

  function onCloseModalHandler() {
    onClose()
    removeSelectedTaskHandler()
  }

  function validateForm() {
    let description = ''

    if (text.trim() === '') {
      description = 'O campo Detalhes é obrigatório!'
    }

    if (!validateDate(deliveryDate)) {
      description = 'Preencha uma Data de entrega válida!'
    }

    if (deliveryDate.toString().trim() === '') {
      description = 'O campo Data de entrega é obrigatório!'
    }

    if (title.trim() === '') {
      description = 'O campo Título é obrigatório!'
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

  async function onClickHandler() {
    if (validateForm()) {
      const params = {
        title,
        text,
        deliveryDate: convertDateToTimestamp(deliveryDate),
        blocked,
        ownerName: userInformation.username,
        ownerUid: userInformation.userId,
      }

      try {
        if (taskWasSelected) {
          await updateTaskHandler(selectTask?.id, params)
        } else {
          await registerNewTaskHandler(params)
        }

        onCloseModalHandler()
      } catch (error) {
        changeError(error)
      }
    }
  }

  useEffect(() => {
    if (taskWasSelected) {
      setTitle(selectTask.title)
      setDeliveryDate(selectTask.deliveryDate)
      setText(selectTask.text)
      setBlocked(selectTask.blocked)
    }
  }, [taskWasSelected, selectTask])

  return (
    <Modal isOpen={isOpen} onClose={onCloseModalHandler} size="2xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader fontWeight="medium">{modalTile} tarefa</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Grid
            templateColumns={{
              base: "1fr",
              md: "repeat(2, 1fr)",
            }}
            gap={4}
          >
            <InputLabel
              isRequired
              label="Título"
              value={title}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
              gridColumn={{
                base: "1 / 3",
                md: "1 / 2"
              }}
            />

            <InputLabel
              isRequired
              value={deliveryDate}
              label="Data de entrega"
              onChange={(e: ChangeEvent<HTMLInputElement>) => setDeliveryDate(formatDate(e))}
              gridColumn={{
                base: "1 / 3",
                md: "2 / 3"
              }}
            />

            <Textarea
              isRequired
              label="Detalhes"
              value={text}
              gridColumn="1 / 3"
              onChange={(e) => setText(e.target.value)}
            />

            <Checkbox
              isChecked={blocked}
              gridColumn="1 / 3"
              label="Bloquear tarefa para nenhum outro usuário modificar?"
              onChange={(e: ChangeEvent<HTMLInputElement>) => setBlocked(e.target.checked)}
            />
          </Grid>
        </ModalBody>

        <ModalFooter>
          <Button color='gray' mr={3} onClick={onCloseModalHandler}>Cancelar</Button>

          <Button
            color='blue'
            isLoading={isLoadingRegisterUpdate}
            onClick={onClickHandler}
          >
            {modalTile}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}