import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FormRow from "../../ui/FormRow";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addOrderToList } from "../../services/apiOrdersList";
import toast from "react-hot-toast";
import { setColorStatus } from "../../services/apiColorsList";
import ColorOrderRow from "./ColorOrderRow";

function CreateOrderForm() {
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset, formState, getValues } = useForm();
  const { errors } = formState;

  const { mutate, isLoading: isCreating } = useMutation({
    mutationFn: addOrderToList,
    onSuccess: () => {
      toast.success("Neue Bestellung erfolgreich hinzugefügt");
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      const colorId = getValues("color");
      mutateColor(colorId);
      reset();
    },
    onError: (err) => toast.error(err.message),
  });

  const { mutate: mutateColor } = useMutation({
    mutationFn: (id) => setColorStatus(id, false),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["colors"] });
    },
    onError: (err) => toast.error(err.message),
  });

  function onSubmit(data) {
    mutate(data);
  }

  function onError() {
    // console.log(errors);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow label={"Projekt"} error={errors?.project_number?.message}>
        <Input
          type="number"
          id="project_number"
          {...register("project_number", {
            required: "Dieses Feld ist erforderlich",
          })}
        />
      </FormRow>

      <FormRow label={"Fuhre"} error={errors?.truck_side_nr?.message}>
        <Input
          type="number"
          id="truck_side_nr"
          {...register("truck_side_nr", {
            required: "Dieses Feld ist erforderlich",
          })}
        />
      </FormRow>

      <FormRow label={"Klient"} error={errors?.client_name?.message}>
        <Input
          type="text"
          id="client_name"
          {...register("client_name", {
            required: "Dieses Feld ist erforderlich",
          })}
        />
      </FormRow>

      <FormRow
        label={"Konstruktion"}
        error={errors?.construction_site?.message}
      >
        <Input
          type="text"
          id="construction_site"
          {...register("construction_site", {
            required: "Dieses Feld ist erforderlich",
          })}
        />
      </FormRow>

      <FormRow label={"Datum"} error={errors?.project_date?.message}>
        <Input
          type="date"
          id="project_date"
          {...register("project_date", {
            required: "Dieses Feld ist erforderlich",
          })}
        />
      </FormRow>

      <FormRow label={"Extra"}>
        <Input
          type="checkbox"
          id="packed_extra"
          {...register("packed_extra")}
        />
      </FormRow>

      <ColorOrderRow register={register} errors={errors} />

      <FormRow label={"Geladen"}>
        <Input
          type="checkbox"
          id="truck_loaded"
          {...register("truck_loaded")}
        />
      </FormRow>

      <FormRow>
        <Button $variation="secondary" type="reset">
          Stornieren
        </Button>
        <Button type="submit" disabled={isCreating}>
          Bestellung abschicken
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateOrderForm;
