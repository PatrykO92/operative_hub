import toast from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";
import styled from "styled-components";

import { useState } from "react";

import Input from "../../ui/Input";
import Button from "../../ui/Button";
import Row from "../../ui/Row";
import SpinnerMini from "../../ui/SpinnerMini";

const StyledCreateNewTruck = styled.form`
  min-width: 35rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Label = styled.label`
  font-weight: 600;
`;

export default function CreateNewTruck({
  createNewTruck,
  isCreatingNewTruck,
  onCloseModal,
}) {
  const [newTruckLabel, setNewTruckLabel] = useState("");
  const [newTruckPriority, setNewTruckPriority] = useState("");
  const [loadDate, setLoadDate] = useState("");
  const [info, setInfo] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();

    if (newTruckLabel === "0" || newTruckLabel === 0) {
      toast.error("Sie können Fahrer nicht mit der Bezeichnung 0 hinzufügen");
      return;
    }

    const newTruck = {
      id: uuidv4(),
      label: newTruckLabel,
      priority_number: newTruckPriority,
      load_date: loadDate,
      info: info,
    };

    createNewTruck(newTruck);

    onCloseModal();
  };

  return (
    <StyledCreateNewTruck onSubmit={onSubmit}>
      <Label htmlFor="new_truck_id">Fuhrer</Label>
      <Input
        id="new_truck_id"
        type="text"
        value={newTruckLabel}
        onChange={(e) => setNewTruckLabel(e.target.value)}
        disabled={isCreatingNewTruck}
        required
      />
      <Label htmlFor="new_truck_priority">Priorität</Label>
      <Input
        id="new_truck_priority"
        type="number"
        value={newTruckPriority}
        onChange={(e) => setNewTruckPriority(Number(e.target.value))}
        disabled={isCreatingNewTruck}
        required
      />
      <Label htmlFor="new_truck_info">Info</Label>
      <Input
        id="new_truck_info"
        type="text"
        value={info}
        onChange={(e) => setInfo(e.target.value)}
        disabled={isCreatingNewTruck}
      />
      <Label htmlFor="new_truck_date">Ladetag</Label>
      <Input
        id="new_truck_date"
        type="date"
        value={loadDate}
        onChange={(e) => setLoadDate(e.target.value)}
        disabled={isCreatingNewTruck}
        required
      />

      <Row type="horizontal">
        <Button
          $variation="secondary"
          disabled={isCreatingNewTruck}
          onClick={onCloseModal}
        >
          Stornieren
        </Button>
        <Button type="submit" disabled={isCreatingNewTruck}>
          {!isCreatingNewTruck ? "Neuen Fahrer erstellen" : <SpinnerMini />}
        </Button>
      </Row>
    </StyledCreateNewTruck>
  );
}
