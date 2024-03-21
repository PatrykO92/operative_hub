import { useMutation } from "@tanstack/react-query";
import { addNewTruck } from "../../services/apiTruckManagement";
import toast from "react-hot-toast";

export default function useCreateNewTruck() {
  const { mutate: createNewTruck, isPending: isCreatingNewTruck } = useMutation(
    {
      mutationFn: (truck) => addNewTruck(truck),
      onSuccess: () => toast.success("Truck added"),
      onError: (error) => {
        toast.error(error.message);
      },
    }
  );

  return { createNewTruck, isCreatingNewTruck };
}
