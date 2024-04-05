import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";

import useUpdateUserPassword from "./useUpdateUserPassword";

function UpdatePasswordForm() {
  const { register, handleSubmit, formState, getValues, reset } = useForm();
  const { errors } = formState;

  const { updateUserPassword, isUpdating } = useUpdateUserPassword();

  function onSubmit({ password }) {
    updateUserPassword({ password }, { onSuccess: () => reset() });
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow
        label="
        Passwort (mindestens 8 Zeichen)"
        error={errors?.password?.message}
      >
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          disabled={isUpdating}
          {...register("password", {
            required: "Dieses Feld ist erforderlich",
            minLength: {
              value: 8,
              message: "Das Passwort muss mindestens 8 Zeichen lang sein",
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Bestätige das Passwort"
        error={errors?.passwordConfirm?.message}
      >
        <Input
          type="password"
          autoComplete="new-password"
          id="passwordConfirm"
          disabled={isUpdating}
          {...register("passwordConfirm", {
            required: "Dieses Feld ist erforderlich",
            validate: (value) =>
              getValues().password === value ||
              "Passwörter müssen übereinstimmen",
          })}
        />
      </FormRow>
      <FormRow>
        <Button onClick={reset} type="reset" $variation="secondary">
          Stornieren
        </Button>
        <Button disabled={isUpdating} type="submit">
          Kennwort aktualisieren
        </Button>
      </FormRow>
    </Form>
  );
}

export default UpdatePasswordForm;
