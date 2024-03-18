import { useState } from "react";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import styled from "styled-components";

const StyledCreateNewTruck = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 2rem;
`;

export default function CreateNewTruck({ createNewTruck, onCloseModal }) {
  const [newTruck, setNewTruck] = useState("");
  return (
    <StyledCreateNewTruck>
      <Input
        type="number"
        value={newTruck}
        onChange={(e) => setNewTruck(Number(e.target.value))}
      />
      <Button
        onClick={() => {
          createNewTruck(newTruck);
          onCloseModal();
        }}
      >
        Neuen Fahrer erstellen
      </Button>
    </StyledCreateNewTruck>
  );
}
