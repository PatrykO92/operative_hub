import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/apiAuthentication";

export function useUser() {
  const { data: user, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });

  const appRole = user?.user_metadata?.app_role;

  return { user, isLoading, isAuth: user?.role === "authenticated", appRole };
}
