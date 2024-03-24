import { useMutation } from "@tanstack/react-query";
import { getOrderByProjectNumber } from "../services/apiOrdersList";

export default function useGetOrderByProjectNumber() {
  const { isPending: isLoadingOrder, mutate: getOrder } = useMutation({
    mutationFn: (project_number) => getOrderByProjectNumber(project_number),
  });

  return { isLoadingOrder, getOrder };
}
