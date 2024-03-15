import { useState } from "react";
import { useForm } from "react-hook-form";
import SquareColor from "../../ui/SquareColor";
import ColorInput from "../../ui/ColorInput";
import Button from "../../ui/Button";
import styled from "styled-components";
import Heading from "../../ui/Heading";
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
    },
  });
  const { addNewColor, isCreating } = useAddNewColor();

  const mainColor = watch("main_color");
  const secondaryColor = watch("secondary_color");

  const handleMainColorChange = (e) => {
    const color = e.target.value;
    setValue("main_color", color);
    setValue("secondary_color", color);
  };

  const onSubmit = (data) => {
    addNewColor(data, {
      onSuccess: () => {
        reset();
        setShowColorPicker(false);
      },
    });
  };

  return (
    <StyledColorPicker>
      <Heading as="h3" onClick={() => setShowColorPicker((oldVal) => !oldVal)}>
        Neue Farbe {showColorPicker ? "-" : "+"}
      </Heading>

      {showColorPicker && (
        <>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <SquareColor $main={mainColor} $secondary={secondaryColor} />

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

            <Button type="submit">Neue Farbe hinzufügen</Button>
          </Form>
        </>
      )}
    </StyledColorPicker>
  );
};

export default ColorPicker;
