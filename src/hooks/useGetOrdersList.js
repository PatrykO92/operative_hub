import { useQuery } from "@tanstack/react-query";
import { getOrdersList } from "../services/apiOrdersList";

export function useGetOrdersList(refetch = false) {
  const {
    isLoading: isLoadingOrders,
    data: orders,
    error: orderListError,
  } = useQuery({
    queryKey: ["orders"],
    queryFn: getOrdersList,
    refetchInterval: refetch ? 5000 : false,
  });

  return { isLoadingOrders, orders, orderListError };
}
