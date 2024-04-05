import { useForm } from "react-hook-form";
import styled, { css } from "styled-components";
import { FaOilCan, FaQuestionCircle } from "react-icons/fa";
import { GiBroom } from "react-icons/gi";
import {
  FaCircleMinus,
  FaCirclePlus,
  FaMagnifyingGlass,
} from "react-icons/fa6";

import Button from "../../ui/Button";
import ButtonIcon from "../../ui/ButtonIcon";

import Input from "../../ui/Input";
import Heading from "../../ui/Heading";
import { useState } from "react";
import { useAddMaintenance } from "./useAddMaintance";

const StyledAddNewMaintenance = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  border: 1px solid var(--color-yellow-200);
  padding: 1rem;
  border-radius: var(--border-radius-md);
`;

const Label = styled.label`
  font-weight: bold;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;

  ${(props) =>
    props.$centerd &&
    css`
      justify-content: center;
      gap: 1rem;
    `}
`;

const RadioLabel = styled.label`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.3rem;
  border-radius: var(--border-radius-sm);
  border: 1px solid transparent;

  ${(props) =>
    props.$outline &&
    css`
      border: 1px solid var(--color-brand-500);
    `}
`;

const RadioButton = styled.input`
  display: none;
`;

export default function AddNewMaintenance() {
  const [showMaintenance, setShowMaintenance] = useState(false);
  const { createMaintenanceEntry, isPending } = useAddMaintenance();

  const { register, handleSubmit, watch, reset } = useForm({
    defaultValues: { type: "Schmierung" },
  });

  const currentChecked = watch("type");

  function onSubmit(data) {
    createMaintenanceEntry(data, {
      onSuccess: () => {
        reset();
        setShowMaintenance(false);
      },
    });
  }

  return (
    <StyledAddNewMaintenance>
      <Container>
        <Heading as="h3">Neue Wartung hinzufügen</Heading>
        <ButtonIcon onClick={() => setShowMaintenance((oldVal) => !oldVal)}>
          {!showMaintenance && <FaCirclePlus size={"3rem"} />}
          {showMaintenance && <FaCircleMinus size={"3rem"} />}
        </ButtonIcon>
      </Container>

      {showMaintenance && (
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Container>
            <div>
              <RadioLabel
                htmlFor="lubrication"
                $outline={currentChecked === "Schmierung"}
              >
                <FaOilCan size={"3.5rem"} />
                Schmierung
              </RadioLabel>
              <RadioButton
                type="radio"
                id="lubrication"
                name="type"
                value="Schmierung"
                {...register("type")}
              />
            </div>
            <div>
              <RadioLabel
                htmlFor="cleaning"
                $outline={currentChecked === "Reinigung"}
              >
                <GiBroom size={"3.5rem"} />
                Reinigung
              </RadioLabel>
              <RadioButton
                type="radio"
                id="cleaning"
                name="type"
                value="Reinigung"
                {...register("type")}
              />
            </div>
            <div>
              <RadioLabel
                htmlFor="inspections"
                $outline={currentChecked === "Inspektionen"}
              >
                <FaMagnifyingGlass size={"3.5rem"} />
                Inspektionen
              </RadioLabel>
              <RadioButton
                type="radio"
                id="inspections"
                name="type"
                value="Inspektionen"
                {...register("type")}
              />
            </div>
            <div>
              <RadioLabel
                htmlFor="other"
                $outline={currentChecked === "Andere"}
              >
                <FaQuestionCircle size={"3.5rem"} />
                Andere
              </RadioLabel>
              <RadioButton
                type="radio"
                id="other"
                name="type"
                value="Andere"
                {...register("type")}
              />
            </div>
          </Container>
          <Container $centerd>
            <Label htmlFor="who">Wer</Label>
            <Input
              required
              id="who"
              type="text"
              {...register("who")}
              placeholder="z. B. Thomas Müller"
            />
          </Container>
          <Container $centerd>
            <Button
              type="button"
              $variation="secondary"
              onClick={() => setShowMaintenance((oldVal) => !oldVal)}
            >
              Stornieren
            </Button>
            <Button type="submit" disabled={isPending}>
              Wartung hinzufügen
            </Button>
          </Container>
        </Form>
      )}
    </StyledAddNewMaintenance>
  );
}
