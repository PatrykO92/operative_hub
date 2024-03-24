import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { archiveOrderById } from "../services/apiOrdersList";

export default function useArchiveOrder() {
  const queryClient = useQueryClient();

  const { isPending: isArchivingOrder, mutate: archiveOrder } = useMutation({
    queryKey: ["orders"],
    mutationFn: archiveOrderById,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      toast.success("Bestellung erfolgreich archiviert");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { isArchivingOrder, archiveOrder };
}
