import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import useSignUp from "./useSignUp";
import SpinnerMini from "../../ui/SpinnerMini";
import { useNavigate } from "react-router-dom";

function SignupForm() {
  const navigate = useNavigate();
  const { signup, isPending } = useSignUp();

  const { register, formState, getValues, handleSubmit, reset } = useForm();

  const { errors } = formState;

  function onSubmit({ full_name, email, password }) {
    signup(
      { full_name, email, password },
      {
        onSettled: () => {
          reset();
        },
        onSuccess: () => {
          navigate("/successfully_registered");
        },
      }
    );
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Vollständiger Name" error={errors?.full_name?.message}>
        <Input
          type="text"
          id="full_name"
          {...register("full_name", {
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
        <Button type="submit" disabled={isPending}>
          {!isPending ? "Neuen Benutzer erstellen" : <SpinnerMini />}
        </Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
