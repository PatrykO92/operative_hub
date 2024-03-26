import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCurrentUserPassword } from "../../services/apiAuthentication";
import toast from "react-hot-toast";

export default function useUpdateUser() {
  const queryClient = useQueryClient();

  const { mutate: updateUserPassword, isPending: isUpdating } = useMutation({
    mutationFn: updateCurrentUserPassword,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      toast.success("Benutzer erfolgreich aktualisiert");
    },
    onError: (err) => {
      console.error(err.message);
      toast.error("Problem beim Aktualisieren des Benutzers");
    },
  });

  return { updateUserPassword, isUpdating };
}
