import { useQuery } from "@tanstack/react-query";
import { getOrdersList } from "../services/apiOrdersList";

export function useGetOrdersList() {
  const {
    isLoading: isLoadingOrders,
    data: orders,
    error: orderListError,
  } = useQuery({
    queryKey: ["orders"],
    queryFn: getOrdersList,
    refetchInterval: 5000,
  });

  return { isLoadingOrders, orders, orderListError };
}
