import { useForm } from "react-hook-form";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FormRow from "../../ui/FormRow";
import ColorOrderRow from "./ColorOrderRow";
import { useChangeColorStatus } from "../../hooks/useChangeColor";
import { useEditOrder } from "../../hooks/useEditOrder";
import { useCreateOrder } from "../../hooks/useCreateOrder";
import useGetOrderByProjectNumber from "../../hooks/useGetOrderByProjectNumber";

function CreateEditOrderForm({ orderToEdit = {}, onCloseModal }) {
  const { id: editId, ...editValues } = orderToEdit;

  const isEditSession = Boolean(editId);

  const { changeColor } = useChangeColorStatus();
  const { createOrder, isCreating } = useCreateOrder();
  const { getOrder, isLoadingOrder } = useGetOrderByProjectNumber();
  const { editOrder, isEditing } = useEditOrder();

  const { register, handleSubmit, reset, formState, getValues, setValue } =
    useForm({
      defaultValues: isEditSession ? editValues : {},
    });

  const { errors } = formState;

  function onSubmit(formData) {
    if (isEditSession) {
      editOrder(
        { formData, editId },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
    }

    if (!isEditSession) {
      const color_id = getValues("color");
      changeColor(
        { color_id, status: false },
        {
          onSuccess: () => {
            createOrder(
              { formData },
              {
                onSuccess: () => {
                  reset();
                  onCloseModal?.();
                },
              }
            );
          },
        }
      );
    }
  }

  function getDataOnBlur() {
    const project_number = getValues("project_number");
    getOrder(project_number, {
      onSuccess: (data) => {
        const { client_name, construction_site } = data;
        if (client_name && construction_site)
          setValue("client_name", client_name);
        setValue("construction_site", construction_site);
      },
    });
  }

  function onError() {}

  const isWorking = isEditing || isCreating;

  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow label={"Projekt"} error={errors?.project_number?.message}>
        <Input
          placeholder="z.B. 2224"
          disabled={isWorking}
          type="number"
          onBlurCapture={getDataOnBlur}
          id="project_number"
          {...register("project_number", {
            required: "Dieses Feld ist erforderlich",
          })}
        />
      </FormRow>

      <FormRow label={"Fuhre"} error={errors?.truck_side_nr?.message}>
        <Input
          placeholder="z.B. 19637"
          disabled={isWorking}
          type="number"
          id="truck_side_nr"
          {...register("truck_side_nr", {
            required: "Dieses Feld ist erforderlich",
          })}
        />
      </FormRow>

      <FormRow label={"Klient"} error={errors?.client_name?.message}>
        <Input
          placeholder="z.B. Pfister GmbH"
          disabled={isWorking || isLoadingOrder}
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
          placeholder="z.B. Wipfeld - Uniper"
          disabled={isWorking || isLoadingOrder}
          type="text"
          id="construction_site"
          {...register("construction_site", {
            required: "Dieses Feld ist erforderlich",
          })}
        />
      </FormRow>

      <FormRow label={"Datum"} error={errors?.project_date?.message}>
        <Input
          placeholder="z.B. 02.11.2023"
          disabled={isWorking}
          type="date"
          id="project_date"
          {...register("project_date", {
            required: "Dieses Feld ist erforderlich",
          })}
        />
      </FormRow>

      <FormRow label={"Extra"}>
        <Input
          disabled={isWorking}
          type="checkbox"
          id="packed_extra"
          {...register("packed_extra")}
        />
      </FormRow>

      <ColorOrderRow
        register={register}
        errors={errors}
        isEditSession={isEditSession}
      />

      <FormRow label={"Geladen"}>
        <Input
          disabled={isWorking}
          type="checkbox"
          id="truck_loaded"
          {...register("truck_loaded")}
        />
      </FormRow>

      <FormRow>
        <Button
          disabled={isWorking}
          $variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
        >
          Stornieren
        </Button>
        <Button disabled={isWorking} type="submit">
          {isEditSession
            ? "eine Bestellung bearbeiten"
            : "Erstellen Sie eine neue Bestellung"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateEditOrderForm;
