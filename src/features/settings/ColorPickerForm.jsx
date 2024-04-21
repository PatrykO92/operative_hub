import { useForm } from "react-hook-form";

import { useEffect } from "react";

import Form from "../../ui/Form";
import Heading from "../../ui/Heading";
import Button from "../../ui/Button";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import SquareColor from "../../ui/SquareColor";
import ColorInput from "../../ui/ColorInput";
import { useAddNewColor } from "./useAddNewColor";

export default function ColorPickerForm({ onCloseModal }) {
  const { register, handleSubmit, reset, watch, setValue } = useForm({
    defaultValues: {
      main_color: "#000000",
      secondary_color: "#000000",
      label_color: "#ffffff",
    },
  });
  const { addNewColor, isCreating } = useAddNewColor();

  const mainColor = watch("main_color");
  const secondaryColor = watch("secondary_color");
  const labelColor = watch("label_color");
  const label = watch("label");

  useEffect(() => {
    // Function to determine contrast
    const getContrastYIQ = (hexcolor) => {
      hexcolor = hexcolor.replace("#", "");
      var r = parseInt(hexcolor.substr(0, 2), 16);
      var g = parseInt(hexcolor.substr(2, 2), 16);
      var b = parseInt(hexcolor.substr(4, 2), 16);
      var yiq = (r * 299 + g * 587 + b * 114) / 1000;
      return yiq >= 128 ? "#000000" : "#ffffff"; // Return black or white depending on contrast
    };

    // Set text color based on contrast
    const textColor = getContrastYIQ(mainColor);
    setValue("label_color", textColor);
  }, [mainColor, setValue]);

  const handleMainColorChange = (e) => {
    const color = e.target.value;
    setValue("main_color", color);
    setValue("secondary_color", color);
  };

  const onSubmit = (data) => {
    addNewColor(data, {
      onSuccess: () => {
        reset({
          main_color: "#000000",
          secondary_color: "#000000",
          label_color: "#ffffff",
          quantity: "",
          label: "",
        });
        onCloseModal();
      },
    });
  };

  return (
    <Form type="modal" onSubmit={handleSubmit(onSubmit)}>
      <Heading as="h2">Neue Farbe hinzufügen</Heading>
      <br />

      <FormRow label="Hauptfarbe">
        <ColorInput
          disabled={isCreating}
          type="color"
          id="main_color"
          {...register("main_color")}
          onChange={handleMainColorChange}
        />
      </FormRow>

      <FormRow label="Sekundäre Farbe">
        <ColorInput
          disabled={isCreating}
          type="color"
          id="secondary_color"
          {...register("secondary_color")}
        />
      </FormRow>

      <FormRow label="Quantität">
        <Input
          disabled={isCreating}
          type="number"
          id="quantity"
          required
          placeholder="z.B. 25"
          {...register("quantity")}
        />
      </FormRow>

      <FormRow label="Etikett">
        <Input
          disabled={isCreating}
          type="number"
          id="label"
          min="1"
          max="999"
          placeholder="z.B. 17"
          {...register("label")}
        />
      </FormRow>
      <FormRow label="Vorschau:">
        <SquareColor
          width="5rem"
          height="5rem"
          $main={mainColor}
          $secondary={secondaryColor}
          $labelColor={labelColor}
          $label={label}
        />
      </FormRow>

      <FormRow>
        <Button $variation="secondary" onClick={onCloseModal}>
          Stornieren
        </Button>
        <Button type="submit">Neue Farbe hinzufügen</Button>
      </FormRow>
    </Form>
  );
}
