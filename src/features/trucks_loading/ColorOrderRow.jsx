import Error from "../../ui/FormRow";
import Select from "../../ui/Select";
import SpinnerMini from "../../ui/SpinnerMini";
import Option from "../../ui/Option";
import { getAllAvailableColorsList } from "../../services/apiColorsList";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import FormRow, { Label } from "../../ui/FormRow";

export default function ColorOrderRow({ register, errors, isEditSession }) {
  const { data: colors, isLoading: colorsLoading } = useQuery({
    queryKey: ["colors"],
    queryFn: getAllAvailableColorsList,
    onError: (err) => toast.error(err.message),
  });

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
            {colors.map((color) => (
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
