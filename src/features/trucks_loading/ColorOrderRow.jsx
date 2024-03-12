import Error from "../../ui/FormRow";
import styled from "styled-components";
import SpinnerMini from "../../ui/SpinnerMini";
import Option from "../../ui/Option";
import FormRow, { Label } from "../../ui/FormRow";
import useGetAvailableColorsList from "../../hooks/useGetAvailableColorsList";

const Select = styled.select`
  font-size: 1.4rem;
  padding: 0.8rem 1.2rem;
  border: 1px solid
    ${(props) =>
      props.type === "white"
        ? "var(--color-grey-100)"
        : "var(--color-grey-300)"};
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-0);
  font-weight: 500;
  box-shadow: var(--shadow-sm);
`;

export default function ColorOrderRow({ register, errors, isEditSession }) {
  const { availableColors, colorsLoading } = useGetAvailableColorsList();

  if (isEditSession)
    return (
      <FormRow>
        <Label htmlFor="color">Farbe</Label>
        <div>Die Farbe kann nicht geändert werden</div>
      </FormRow>
    );

  return (
    <FormRow>
      {colorsLoading ? (
        <SpinnerMini />
      ) : (
        <>
          <Label htmlFor="color">Farbe</Label>
          <Select
            id="color"
            {...register("color", {
              required: isEditSession ? false : "Dieses Feld ist erforderlich",
            })}
          >
            {availableColors.map((color) => (
              <Option key={color.id} value={color.id}>
                Quantität: {color.quantity}
              </Option>
            ))}
          </Select>
        </>
      )}
      {errors?.color?.message && <Error>{errors.color.message}</Error>}
    </FormRow>
  );
}
