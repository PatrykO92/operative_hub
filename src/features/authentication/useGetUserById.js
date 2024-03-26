import { useQuery } from "@tanstack/react-query";
import { getUserByID } from "../../services/apiAuthentication";

export default function useGetUserById(id) {
  const {
    data: user,
    isLoading: isUserLoading,
    error: userError,
  } = useQuery({
    queryKey: ["users"],
    queryFn: () => getUserByID(id),
  });

  return { user, isUserLoading, userError };
}
