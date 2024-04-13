import { useForm } from "react-hook-form";
import { styled } from "styled-components";
import toast from "react-hot-toast";

import { useProblem } from "./useProblem";
import Heading from "../../ui/Heading";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import TextArea from "../../ui/TextArea";

const StyledAddProblemForm = styled.div`
  padding: 1rem;
`;

export default function AddProblemForm({ onCloseModal }) {
  const { addProblem, isCreating } = useProblem();
  const { register, handleSubmit, reset } = useForm();

  function onSubmit(data) {
    addProblem(data, {
      onSuccess: () => {
        toast.success("added");
        reset();
        onCloseModal();
      },
    });
  }

  return (
    <StyledAddProblemForm>
      <Form type="modal" onSubmit={handleSubmit(onSubmit)}>
        <Heading as="h3">Melden Sie ein neues Problem</Heading>
        <br />
        <FormRow label="Titel">
          <Input
            required
            disabled={isCreating}
            type="text"
            {...register("title")}
            placeholder="z.B. kein Karton"
          />
        </FormRow>
        <FormRow label="Beschreibung">
          <TextArea
            disabled={isCreating}
            type="text"
            placeholder="z.B. wir brauchen einen Karton"
            {...register("description")}
          />
        </FormRow>
        <br />
        <FormRow>
          <Button
            $variation="secondary"
            disabled={isCreating}
            onClick={onCloseModal}
          >
            Stornieren
          </Button>
          <Button disabled={isCreating} type="submit">
            Problem einreichen
          </Button>
        </FormRow>
      </Form>
    </StyledAddProblemForm>
  );
}
