import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { addColorToList } from "../../services/apiColorsList";

export function useAddNewColor() {
  const queryClient = useQueryClient();
  const { mutate: addNewColor, isPending: isCreating } = useMutation({
    mutationFn: addColorToList,
    onSuccess: () => {
      toast.success("Neue Farbe hinzugefügt");
      queryClient.invalidateQueries({ queryKey: ["colors"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { addNewColor, isCreating };
}
