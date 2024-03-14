import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import useSignUp from "./useSignUp";
import { StyledSelect } from "../../ui/Select";
import SpinnerMini from "../../ui/SpinnerMini";

function SignupForm() {
  const { signup, isPending } = useSignUp();
  const { register, formState, getValues, handleSubmit, reset } = useForm();
  const { errors } = formState;

  function onSubmit({ fullName, email, password, appRole }) {
    signup(
      { fullName, email, password, appRole },
      {
        onSettled: () => {
          reset();
        },
      }
    );
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Rolle">
        <StyledSelect id="appRole" {...register("appRole")}>
          <option value="operator">Maschinenbediener</option>
          <option value="supervisor">Supervisor</option>
          <option value="foreman">Vorarbeiter</option>
          <option value="crane">Kranfahrer</option>
          <option value="mechanic">Mechaniker</option>
          <option value="admin">Admin</option>
        </StyledSelect>
      </FormRow>

      <FormRow label="Vollständiger Name" error={errors?.fullName?.message}>
        <Input
          type="text"
          id="fullName"
          {...register("fullName", {
            required: "Dieses Feld ist erforderlich",
          })}
        />
      </FormRow>

      <FormRow label="E-Mail Adresse" error={errors?.email?.message}>
        <Input
          type="email"
          id="email"
          {...register("email", {
            required: "Dieses Feld ist erforderlich",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Bitte gültige E-Mail Adresse angeben",
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Passwort (mindestens 8 Zeichen)"
        error={errors?.password?.message}
      >
        <Input
          type="password"
          id="password"
          {...register("password", {
            required: "Dieses Feld ist erforderlich",
            minLength: {
              value: 8,
              message: "Passwörter müssen aus mindestens 8 Zeichen bestehen",
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Passwort wiederholen"
        error={errors?.passwordConfirm?.message}
      >
        <Input
          type="password"
          id="passwordConfirm"
          {...register("passwordConfirm", {
            required: "Dieses Feld ist erforderlich",
            validate: (value) =>
              value === getValues("password") ||
              "Passwörter müssen übereinstimmen",
          })}
        />
      </FormRow>

      <FormRow>
        <Button $variation="secondary" type="reset" disabled={isPending}>
          Stornieren
        </Button>
        <Button type="submit" disabled={isPending}>
          {" "}
          {!isPending ? "Neuen Benutzer anlegen" : <SpinnerMini />}
        </Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
