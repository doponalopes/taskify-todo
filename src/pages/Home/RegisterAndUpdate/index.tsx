import { useContext, useState } from "react";
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
} from '../../../components'

import { formatDate } from "../../../utils/dataUtils";

import { TaskContext } from "../../../store/contexts/TaskContext";
import { AuthContext } from "../../../store/contexts/AuthContext";

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

  const { registerNewTask, isLoading } = useContext(TaskContext)
  const { userInformation } = useContext(AuthContext)

  async function registerNewTaskHandler() {
    const params = {
      title,
      text,
      deliveryDate,
      blocked,
      onwerName: userInformation.username,
      ownerUid: userInformation.uid,
    }

    try {
      await registerNewTask(params)
      onClose()
    } catch (error) {

    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader fontWeight="medium">Cadastro de tarefa</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Grid templateColumns="repeat(2, 1fr)" gap={4}>
            <InputLabel
              isRequired
              label="Título"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />

            <InputLabel
              isRequired
              value={deliveryDate}
              label="Data de entrega"
              onChange={e => setDeliveryDate(formatDate(e))}
            />

            <Textarea
              isRequired
              label="Detalhes"
              value={text}
              gridColumn="1 / 3"
              onChange={e => setText(e.target.value)}
            />

            <Checkbox
              value={blocked.toString()}
              gridColumn="1 / 3"
              label="Bloquear tarefa para nenhum outro usuário modificar?"
              onChange={e => setBlocked(e.target.checked)}
            />
          </Grid>
        </ModalBody>

        <ModalFooter>
          <Button color='gray' mr={3} onClick={onClose}>Cancelar</Button>

          <Button color='blue' isLoading={isLoading} onClick={registerNewTaskHandler}>
            Cadastrar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}