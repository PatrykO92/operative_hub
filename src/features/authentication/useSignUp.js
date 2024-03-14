import { useMutation } from "@tanstack/react-query";
import { signup as signupApi } from "../../services/apiAuthentication";
import toast from "react-hot-toast";

export default function useSignUp() {
  const { mutate: signup, isPending } = useMutation({
    mutationFn: signupApi,
    onSuccess: () => {
      toast.success("Benutzer erfolgreich angelegt");
    },
  });

  return { signup, isPending };
}
