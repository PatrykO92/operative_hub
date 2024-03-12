import { useMutation } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuthentication";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useLogin() {
  const navigate = useNavigate();

  const { mutate: login, isPending } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: (user) => {
      console.log(user);
      toast.success("Angemeldet");
      navigate("/dashboard");
    },
    onError: (err) => {
      console.log("Error", err);
      toast.error("Anmeldung fehlgeschlagen. Falsches Passwort oder Login.");
    },
  });
  return { login, isPending };
}
