import { useMutation, useQueryClient } from "@tanstack/react-query";

import toast from "react-hot-toast";
import { updateUserRoleById } from "../../services/apiAuthentication";

export default function useUpdateUserRole() {
  const queryClient = useQueryClient();

  const { mutate: updateUserRole, isPending: isUpdating } = useMutation({
    mutationFn: updateUserRoleById,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("Benutzer erfolgreich aktualisiert");
    },
    onError: (err) => {
      console.error(err.message);
      toast.error("Problem beim Aktualisieren des Benutzers");
    },
  });

  return { updateUserRole, isUpdating };
}
