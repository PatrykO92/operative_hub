import { useGetOrdersList } from "../../hooks/useGetOrdersList";
import useGetTrucksList from "../trucks_management/useGetTrucksList";
import Spinner from "../../ui/Spinner";
import ErrorComponent from "../../ui/ErrorComponent";
import { useEffect, useState } from "react";
import CraneTableRow from "./CraneTableRow";
import {
  CraneEmpty,
  CraneStyledBody,
  CraneStyledHeader,
  CraneStyledTable,
  CraneStyledTruckContainer,
  CraneStyledTruckContainerLabel,
} from "../../ui/CraneTable";
import { useSearchParams } from "react-router-dom";

export default function CraneTable() {
  const [searchParams] = useSearchParams();
  const [trucks, setTrucks] = useState([]);
  const [orders, setOrders] = useState([]);

  const {
    orders: fetchedOrders,
    isLoadingOrders,
    orderListError,
  } = useGetOrdersList(true);

  const { trucksList, isLoadingTrucksList, loadingTrucksError } =
    useGetTrucksList();

  useEffect(() => {
    if (!isLoadingOrders) setOrders(fetchedOrders);
    if (!isLoadingTrucksList) setTrucks(trucksList);
  }, [fetchedOrders, trucksList, isLoadingOrders, isLoadingTrucksList]);

  if (isLoadingOrders || isLoadingTrucksList) return <Spinner />;

  const filterDate = searchParams.get("trucks_load_date") || "all";
  let filteredTrucks;
  if (filterDate === "all") filteredTrucks = trucks;
  if (filterDate !== "all")
    filteredTrucks = trucks?.filter((truck) => {
      return (
        new Date(truck.load_date).toLocaleDateString() ===
        new Date(filterDate).toLocaleDateString()
      );
    });

  const trucksSortedByPriority = filteredTrucks.sort(
    (a, b) => a.priority_number - b.priority_number
  );

  //change to fetch only not loaded
  const notLoadedOrders = orders.filter((order) => {
    if (order.truck_loaded === false) return order;
  });

  const ordersSortedByIndex = notLoadedOrders.sort(
    (a, b) => a.truck_management_index - b.truck_management_index
  );

  if (orderListError || loadingTrucksError) return <ErrorComponent />;

  return (
    <>
      <CraneStyledTable>
        <CraneStyledHeader>
          <div>Projekt</div>
          <div>Fuhre</div>
          <div>Klient</div>
          <div>Konstruktion</div>
          <div>Datum</div>
          <div>Farbe</div>
          <div></div>
        </CraneStyledHeader>
        <CraneStyledBody>
          {ordersSortedByIndex.length === 0 && (
            <CraneEmpty>Keine Daten zum Anzeigen</CraneEmpty>
          )}
          {trucksSortedByPriority.map((truck) => {
            // Check if there are any orders for the current truck
            const hasOrders = ordersSortedByIndex.some(
              (order) => order.truck_management_id === truck.id
            );

            // Render CraneStyledTruckContainer only if there are orders for the current truck
            if (hasOrders) {
              return (
                <CraneStyledTruckContainer key={truck.id}>
                  {ordersSortedByIndex.map((order) => {
                    if (order.truck_management_id === truck.id)
                      return <CraneTableRow key={order.id} order={order} />;
                  })}
                  <CraneStyledTruckContainerLabel>
                    {truck.label !== "0" && (
                      <>
                        <div>
                          <span>Nr. </span>
                          <span>{truck.priority_number}</span>
                        </div>

                        <div>
                          <span>Fahrer: </span>
                          <span>{truck.label}</span>
                        </div>

                        <div>
                          <span>Ladetermin: </span>
                          <span>{truck.load_date}</span>
                        </div>

                        <div>
                          <span>Die Info: </span>
                          <span>{truck.info}</span>
                        </div>
                      </>
                    )}
                    {truck.label === "0" && (
                      <>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div>Bestellungen ohne vereinbarten Transport</div>
                      </>
                    )}
                  </CraneStyledTruckContainerLabel>
                </CraneStyledTruckContainer>
              );
            }
            // If no orders found for the current truck, don't render CraneStyledTruckContainer
            return null;
          })}
        </CraneStyledBody>
      </CraneStyledTable>
    </>
  );
}
