import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { setColorStatus } from "../services/apiColorsList";

export function useChangeColorStatus() {
  const queryClient = useQueryClient();

  const { mutate: changeColor } = useMutation({
    mutationFn: (color_id, status) => setColorStatus(color_id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["colors"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { changeColor };
}
