import styled from "styled-components";
import toast from "react-hot-toast";

import { useEffect, useState } from "react";

import TruckContainer from "./TruckContainer";
import Button from "../../ui/Button";
import Order from "./ManagmentOrder";
import Spinner from "../../ui/Spinner";
import { useGetOrdersList } from "../../hooks/useGetOrdersList";
import useUpdateMultipleOrders from "../../hooks/useUpdateMultipleOrders";
import SpinnerMini from "../../ui/SpinnerMini";
import Modal from "../../ui/Modal";
import CreateNewTruck from "./CreateNewTruck";
import useUpdateMultipleTrucks from "./useUpdateMultipleTrucks";
import useCreateNewTruck from "./useCreateNewTruck";
import useGetTrucksList from "./useGetTrucksList";
import { useDeleteTruck } from "./useDeleteTruck";
import { useSearchParams } from "react-router-dom";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";

const StyledOperations = styled.div`
  padding: 1rem;
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-300);
  position: fixed;
  bottom: 0.2rem;
  display: flex;
  flex-direction: row;
  gap: 1rem;
`;

const StyledTrucksManagementPanel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export default function TrucksManagementPanel() {
  const [searchParams] = useSearchParams();
  const { orders: fetchedOrders, isLoadingOrders } = useGetOrdersList();
  const { updateMultipleOrders, isPending: isUpdatingMultipleOrders } =
    useUpdateMultipleOrders();

  const { trucksList, isLoadingTrucksList } = useGetTrucksList();
  const { createNewTruck: createNewTruckHook, isCreatingNewTruck } =
    useCreateNewTruck();

  const { deleteTruck: deleteTruckHook, isDeletingTruck } = useDeleteTruck();

  const { updateMultipleTrucks } = useUpdateMultipleTrucks();

  const [trucks, setTrucks] = useState([]);

  const [orders, setOrders] = useState([]);

  const [activeOrder, setActiveOrder] = useState(null);

  useEffect(() => {
    if (trucksList && !isLoadingTrucksList)
      setTrucks(
        trucksList.sort((a, b) => a.priority_number - b.priority_number)
      );

    if (fetchedOrders && !isLoadingOrders) {
      setOrders(
        fetchedOrders.sort(
          (a, b) => a.truck_management_index - b.truck_management_index
        )
      );
    }
  }, [fetchedOrders, trucksList, isLoadingOrders, isLoadingTrucksList]);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 10 } })
  );

  function saveCurrentStateToBackend() {
    updateMultipleTrucks(trucks);

    // Update all orders with prevented index
    updateMultipleOrders(
      orders.map((order, index) => {
        return { ...order, truck_management_index: index };
      })
    );
  }

  function createNewTruck(newTruck) {
    createNewTruckHook(newTruck);
    setTrucks((oldTrucks) => [...oldTrucks, newTruck]);
  }

  function deleteTruck(id) {
    const checkIfNoOrdersInsideTruck = orders.some(
      (order) => order.truck_management_id === id
    );

    if (checkIfNoOrdersInsideTruck) {
      toast.error(
        "Bitte entfernen Sie zuerst Bestellungen, bevor Sie den LKW entfernen."
      );
      return;
    }

    deleteTruckHook(id);

    const filteredTrucks = trucks.filter((truck) => truck.id !== id);
    setTrucks(filteredTrucks);
  }

  function onDragStart(event) {
    if (event.active.data.current?.type === "order") {
      setActiveOrder(event.active.data.current.order);
      return;
    }
  }

  function onDragEnd() {
    setActiveOrder(null);
  }

  function onDragOver(event) {
    const { active, over } = event;

    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveAOrder = active.data.current?.type === "order";
    const isOverAOrder = over.data.current?.type === "order";

    if (!isActiveAOrder) return;

    if (isActiveAOrder && isOverAOrder) {
      setOrders((orders) => {
        const activeIndex = orders.findIndex((ord) => ord.id === activeId);
        const overIndex = orders.findIndex((ord) => ord.id === overId);
        if (
          orders[activeIndex].truck_management_id !==
          orders[overIndex].truck_management_id
        ) {
          orders[activeIndex].truck_management_id =
            orders[overIndex].truck_management_id;
          return arrayMove(orders, activeIndex, overIndex - 1);
        }

        return arrayMove(orders, activeIndex, overIndex);
      });
    }

    const isOverATruckContainer = over.data?.current?.type === "truck";

    const overTruckManagmentId = over.data?.current?.truck?.id;
    if (isActiveAOrder && isOverATruckContainer) {
      setOrders((orders) => {
        const activeIndex = orders.findIndex((ord) => ord.id === activeId);

        orders[activeIndex].truck_management_id = overTruckManagmentId;

        return arrayMove(orders, activeIndex, activeIndex);
      });
    }
  }

  if (isLoadingOrders || isLoadingTrucksList) return <Spinner />;

  const filterDate = searchParams.get("trucks_load_date") || "all";
  let filteredTrucks;
  if (filterDate === "all") filteredTrucks = trucks;
  if (filterDate !== "all")
    filteredTrucks = trucks?.filter((truck) => {
      return (
        new Date(truck.load_date).toLocaleDateString() ===
          new Date(filterDate).toLocaleDateString() || truck.label === "0"
      );
    });

  return (
    <DndContext
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDragEnd={onDragEnd}
      sensors={sensors}
    >
      <StyledTrucksManagementPanel>
        {filteredTrucks.map((truck) => (
          <TruckContainer
            key={truck.id}
            truck={truck}
            deleteTruck={deleteTruck}
            isDeletingTruck={isDeletingTruck}
            orders={orders.filter(
              (order) => order.truck_management_id === truck.id
            )}
          />
        ))}

        {createPortal(
          <DragOverlay>
            {activeOrder && <Order order={activeOrder} />}
          </DragOverlay>,
          document.body
        )}
        <StyledOperations>
          <Modal>
            <Modal.Open opens="create-new-truck">
              <Button>LKW hinzufügen</Button>
            </Modal.Open>
            <Modal.Window name="create-new-truck">
              <CreateNewTruck
                createNewTruck={createNewTruck}
                isCreatingNewTruck={isCreatingNewTruck}
              />
            </Modal.Window>
          </Modal>
          <Button
            $variation="green"
            onClick={() => saveCurrentStateToBackend()}
          >
            {!isUpdatingMultipleOrders ? "Speichern" : <SpinnerMini />}
          </Button>
        </StyledOperations>
      </StyledTrucksManagementPanel>
    </DndContext>
  );
}
