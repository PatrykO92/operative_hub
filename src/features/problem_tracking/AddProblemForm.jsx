import { useForm } from "react-hook-form";
import { styled } from "styled-components";
import toast from "react-hot-toast";

import { useProblem } from "./useProblem";

import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Button from "../../ui/Button";

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
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormRow label="title">
          <Input disabled={isCreating} type="text" {...register("title")} />
        </FormRow>
        <FormRow label="description">
          <Input
            disabled={isCreating}
            type="text"
            {...register("description")}
          />
        </FormRow>
        <Button disabled={isCreating} onClick={onCloseModal}>
          Cancel
        </Button>
        <Button disabled={isCreating} type="submit">
          Submit
        </Button>
      </Form>
    </StyledAddProblemForm>
  );
}
