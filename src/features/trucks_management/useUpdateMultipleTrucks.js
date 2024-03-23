import { useMutation } from "@tanstack/react-query";
import { updateMultipleTrucksManagement } from "../../services/apiTruckManagement";
import toast from "react-hot-toast";

export default function useUpdateMultipleTrucks() {
  const { mutate: updateMultipleTrucks, isPending: isUpdatingMultipleOrders } =
    useMutation({
      mutationFn: (trucks) => updateMultipleTrucksManagement(trucks),
      onSuccess: () => toast.success("LKWs wurden erfolgreich aktualisiert"),
      onError: (error) => {
        toast.error(error.message);
      },
    });

  return { updateMultipleTrucks, isUpdatingMultipleOrders };
}
