import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";

import { updateProblem } from "../../services/apiProblemTracking";

export default function useEditProblem() {
  const queryClient = useQueryClient();
  const { isPending: isUpdating, mutate: editProblem } = useMutation({
    mutationFn: updateProblem,
    onSuccess: () => {
      toast.success("Benachrichtigung aktualisiert");
      queryClient.invalidateQueries(["problem_list"]);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { isUpdating, editProblem };
}
