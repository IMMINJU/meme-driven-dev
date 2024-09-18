import { Button, ButtonProps } from "~/components/ui/button"
import { Dialog } from "~/components/ui/dialog"
import { useMemo, useState } from "react"

interface Props extends ButtonProps, React.RefAttributes<HTMLButtonElement> {
  modalContent: (closeModal: () => void) => React.ReactNode
}

const ModalButton: React.FC<Props> = ({ modalContent, children, ...rest }) => {
  const [open, setModalVisible] = useState(false)

  const showModal = () => setModalVisible(true)
  const closeModal = () => setModalVisible(false)
  const memorizedModal = useMemo(() => modalContent(closeModal), [modalContent])

  return (
    <>
      <Button type="button" onClick={showModal} {...rest}>
        {children}
      </Button>

      <Dialog open={open} onOpenChange={closeModal}>
        {memorizedModal}
      </Dialog>
    </>
  )
}

export default ModalButton
