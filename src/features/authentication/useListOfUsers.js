import { useQuery } from "@tanstack/react-query";
import { getListOfAllUsers } from "../../services/apiAuthentication";

export function useListOfUsers() {
  const { data: users, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: getListOfAllUsers,
  });

  return { users, isLoading };
}
