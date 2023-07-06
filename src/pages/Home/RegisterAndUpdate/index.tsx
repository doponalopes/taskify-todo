import { ChangeEvent, useContext, useEffect, useState } from "react";
import {
  Grid,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay
} from "@chakra-ui/react";

import {
  Button,
  Checkbox,
  InputLabel,
  Textarea
} from '@components'

import { convertDateToTimestamp, formatDate } from "@utils/dataUtils";

import { TaskContext } from "@store/contexts/TaskContext";
import { AuthContext } from "@store/contexts/AuthContext";

type RegisterAndUpdateProps = {
  isOpen: boolean;
  onClose: () => void;
  onClick: () => void;
}

export function RegisterAndUpdate({ isOpen, onClose }: RegisterAndUpdateProps) {
  const [title, setTitle] = useState('')
  const [deliveryDate, setDeliveryDate] = useState('')
  const [text, setText] = useState('')
  const [blocked, setBlocked] = useState(false)

  const {
    registerNewTask,
    updateTaskHandler,
    removeSelectedTask,
    isLoadingRegisterUpdate,
    selectTask
  } = useContext(TaskContext)

  const { userInformation } = useContext(AuthContext)

  const taskWasSelected = !!selectTask?.id
  const modalTile = taskWasSelected ? 'Editar' : 'Cadastrar'

  console.log('taskWasSelected:', { taskWasSelected, selectTask })

  useEffect(() => {
    if (taskWasSelected) {
      setTitle(selectTask.title)
      setDeliveryDate(selectTask.deliveryDate)
      setText(selectTask.text)
      setBlocked(selectTask.blocked)
    }

    return () => {
      console.log('oi')
      // removeSelectedTask()
    };
  }, [taskWasSelected])

  async function onClickHandler() {
    const params = {
      title,
      text,
      deliveryDate: convertDateToTimestamp(deliveryDate),
      blocked,
      onwerName: userInformation.username,
      ownerUid: userInformation.uid,
    }

    try {
      if (taskWasSelected) {
        await updateTaskHandler(selectTask?.id, params)
      } else {
        await registerNewTask(params)
      }

      onClose()
    } catch (error) {

    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader fontWeight="medium">{modalTile} tarefa</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Grid templateColumns="repeat(2, 1fr)" gap={4}>
            <InputLabel
              isRequired
              label="Título"
              value={title}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
            />

            <InputLabel
              isRequired
              value={deliveryDate}
              label="Data de entrega"
              onChange={(e: ChangeEvent<HTMLInputElement>) => setDeliveryDate(formatDate(e))}
            />

            <Textarea
              isRequired
              label="Detalhes"
              value={text}
              gridColumn="1 / 3"
              onChange={(e: ChangeEvent<HTMLInputElement>) => setText(e.target.value)}
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
          <Button color='gray' mr={3} onClick={onClose}>Cancelar</Button>

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