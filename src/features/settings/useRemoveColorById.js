import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { removeColorById } from "../../services/apiColorsList";

export function useRemoveColorById() {
  const queryClient = useQueryClient();
  const { mutate: removeColor, isPending: isDeleting } = useMutation({
    mutationFn: removeColorById,
    onSuccess: () => {
      toast.success("Farbe erfolgreich entfernt");
      queryClient.invalidateQueries({ queryKey: ["colors"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { removeColor, isDeleting };
}
