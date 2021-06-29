#### Thirdpart component

https://www.npmjs.com/package/react-modal

```tsx
import { useState } from "react";
import { Button } from "../../components/Button/Button";
import modalImg from "../../assets/images/modal-delete.svg";

const [modalIsOpen, setIsOpen] = useState(false);
const modalStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    padding: "64px",
    borderRadius: "8px",
    border: 0,
  },
};

<>
  <Button className="button cancel-button" onClick={() => setIsOpen(true)}>
    Abrir modal
  </Button>

  <Modal
    key={`modal-${question.id}`}
    isOpen={modalIsOpen}
    contentLabel="Encerrar sala"
    style={modalStyles}
  >
    <img src={modalImg} alt="" />
    <h2>Encerrar sala</h2>
    <p>Tem certeza que você deseja encerrar esta sala?</p>
    <form>
      <button className="cancel-button" onClick={() => setIsOpen(false)}>
        Cancelar
      </button>
      <button className="delete-button">Sim, encerrar</button>
    </form>
  </Modal>
</>;
```
