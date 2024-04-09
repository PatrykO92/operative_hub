import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { addProblem as addProblemApi } from "../../services/apiProblemTracking";

export function useProblem() {
  const queryClient = useQueryClient();
  const { mutate: addProblem, isPending: isCreating } = useMutation({
    mutationFn: addProblemApi,
    onSuccess: () => {
      toast.success("Neue Problem hinzugefügt");
      queryClient.invalidateQueries({ queryKey: ["problem_list"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { addProblem, isCreating };
}
