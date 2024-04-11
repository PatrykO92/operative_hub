import { useForm } from "react-hook-form";
import styled from "styled-components";

import { useEffect, useState } from "react";

import SquareColor from "../../ui/SquareColor";
import ColorInput from "../../ui/ColorInput";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useAddNewColor } from "./useAddNewColor";

const StyledColorPicker = styled.div`
  padding: 1rem;
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-md);
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const ColorPicker = () => {
  const [showColorPicker, setShowColorPicker] = useState(false);
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
      },
    });
  };

  return (
    <StyledColorPicker>
      <Button
        $size="small"
        onClick={() => setShowColorPicker((oldVal) => !oldVal)}
      >
        Neue Farbe {showColorPicker ? "-" : "+"}
      </Button>

      {showColorPicker && (
        <>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <SquareColor
              $main={mainColor}
              $secondary={secondaryColor}
              $labelColor={labelColor}
              $label={label}
            />

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

            <Button type="submit">Neue Farbe hinzufügen</Button>
          </Form>
        </>
      )}
    </StyledColorPicker>
  );
};

export default ColorPicker;
