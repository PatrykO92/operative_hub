import Error from "../../ui/FormRow";
import Select from "../../ui/Select";
import SpinnerMini from "../../ui/SpinnerMini";
import Option from "../../ui/Option";
import FormRow, { Label } from "../../ui/FormRow";
import useGetAvailableColorsList from "../../hooks/useGetAvailableColorsList";

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
