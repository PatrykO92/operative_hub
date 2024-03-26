import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { addMaintenance } from "../../services/apiMaintenance";

export function useAddMaintenance() {
  const queryClient = useQueryClient();
  const { mutate: createMaintenanceEntry, isPending } = useMutation({
    mutationFn: addMaintenance,
    onSuccess: () => {
      toast.success("Neuer Wartungseintrag erfolgreich hinzugefügt");
      queryClient.invalidateQueries({ queryKey: ["maintenance"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { createMaintenanceEntry, isPending };
}
