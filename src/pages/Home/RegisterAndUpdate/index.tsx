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

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onClick: () => void;
}

export function RegisterAndUpdate({ isOpen, onClose, onClick }: Props) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader fontWeight="medium">Cadastro de tarefa</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Grid templateColumns="repeat(2, 1fr)" gap={4}>
            <InputLabel isRequired label="Nome" />
            <InputLabel isRequired label="Data de entrega" />
            <Textarea isRequired gridColumn="1 / 3" label="Detalhes" />
            <Checkbox gridColumn="1 / 3" label="Bloquear tarefa para nenhum outro usuário modificar?" />
          </Grid>
        </ModalBody>

        <ModalFooter>
          <Button color='gray' mr={3} onClick={onClose}>Cancelar</Button>

          <Button color='blue' onClick={onClick}>
            Cadastrar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}