import styled from "styled-components";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";

import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";

import TruckContainer from "./TruckContainer";
import Button from "../../ui/Button";
import Order from "./Order";
import Spinner from "../../ui/Spinner";
import { useGetOrdersList } from "../../hooks/useGetOrdersList";
import useUpdateMultipleOrders from "../../hooks/useUpdateMultipleOrders";
import SpinnerMini from "../../ui/SpinnerMini";
import Modal from "../../ui/Modal";
import CreateNewTruck from "./CreateNewTruck";
import toast from "react-hot-toast";

const StyledTrucksManagementPanel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
`;

export default function TrucksManagementPanel() {
  const { orders: fetchedOrders, isLoadingOrders } = useGetOrdersList();
  const { updateMultipleOrders, isPending } = useUpdateMultipleOrders();

  const [trucks, setTrucks] = useState([
    { id: 0, label: "Verfügbare Bestellungen" },
  ]);

  const trucksId = useMemo(() => trucks.map((truck) => truck.id), [trucks]);

  const [activeTruck, setActiveTruck] = useState(null);

  const [orders, setOrders] = useState([]);
  const [activeOrder, setActiveOrder] = useState(null);

  const addedTruckIds = useMemo(() => [], []);

  useEffect(() => {
    // This effect runs when fetchedOrders or isLoadingOrders change
    if (fetchedOrders && !isLoadingOrders) {
      // If fetchedOrders is available and isLoadingOrders is false
      // Set the orders state to fetchedOrders
      setOrders(fetchedOrders);

      // Array to keep track of added truck IDs

      // Iterate through fetchedOrders
      fetchedOrders.map((order) => {
        // Check if a truck with the same ID as order's truckId exists
        const isTruckExist = trucks.find((truck) => truck.id === order.truckId);

        // If the truck exists, move to the next order
        if (isTruckExist) return;

        // If the truck doesn't exist and its ID is not already in addedTruckIds
        if (!addedTruckIds.includes(order.truckId)) {
          // Create a new truck object
          const truckToAdd = {
            id: order.truckId,
            label: order.truckId, // Placeholder label
          };

          // Add the new truck to the trucks state
          setTrucks((oldVal) => [...oldVal, truckToAdd]);
        }

        // Add the truck ID to addedTruckIds array to avoid duplicates
        addedTruckIds.push(order.truckId);
      });
    }
  }, [fetchedOrders, trucks, addedTruckIds, isLoadingOrders]);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 10 } })
  );

  function createNewTruck(id) {
    console.log(trucks);
    if (trucks.some((item) => item.id === id)) {
      toast.error("Dieser LKW existiert bereits");
      return;
    }

    const label = id;
    const truckToAdd = { id, label };

    setTrucks([...trucks, truckToAdd]);
  }

  function deleteTruck(id) {
    const filteredTrucks = trucks.filter((col) => col.id !== id);
    setTrucks(filteredTrucks);
  }

  function onDragStart(event) {
    if (event.active.data.current?.type === "truck") {
      setActiveTruck(event.active.data.current.truck);
      return;
    }

    if (event.active.data.current?.type === "order") {
      setActiveOrder(event.active.data.current.order);
      return;
    }
  }

  function onDragEnd(event) {
    setActiveTruck(null);
    setActiveOrder(null);

    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    setTrucks((trucks) => {
      const activeTruckIndex = trucks.findIndex(
        (truck) => truck.id === activeId
      );
      const overTruckIndex = trucks.findIndex((truck) => truck.id === overId);

      return arrayMove(trucks, activeTruckIndex, overTruckIndex);
    });
  }

  function onDragOver(event) {
    const { active, over } = event;
    console.log("over:", over?.data?.current?.sortable?.index);
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;
    const overId2 = over?.data?.current?.sortable?.index;

    if (activeId === overId) return;

    const isActiveAOrder = active.data.current?.type === "order";
    const isOverAOrder = over.data.current?.type === "order";

    if (!isActiveAOrder) return;

    if (isActiveAOrder && isOverAOrder) {
      setOrders((orders) => {
        const activeIndex = orders.findIndex((ord) => ord.id === activeId);
        const overIndex = orders.findIndex((ord) => ord.id === overId);

        orders[activeIndex].truckId = orders[overIndex].truckId;
        orders[activeIndex].truckId2 = overId2;

        return arrayMove(orders, activeIndex, overIndex);
      });
    }
    const isOverATruckContainer = over.data.current?.type === "truck";
    if (isActiveAOrder && isOverATruckContainer) {
      setOrders((orders) => {
        const activeIndex = orders.findIndex((ord) => ord.id === activeId);

        orders[activeIndex].truckId = overId;
        orders[activeIndex].truckId2 = overId2;

        return arrayMove(orders, activeIndex, activeIndex);
      });
    }
  }

  if (isLoadingOrders) return <Spinner />;

  return (
    <DndContext
      sensors={sensors}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDragOver={onDragOver}
    >
      <StyledTrucksManagementPanel>
        <SortableContext items={trucksId}>
          {trucks.map((truck) => {
            return (
              <TruckContainer
                key={truck.id}
                truck={truck}
                deleteTruck={deleteTruck}
                orders={orders.filter((order) => order?.truckId === truck.id)}
              />
            );
          })}
        </SortableContext>

        <Modal>
          <Modal.Open opens="create-new-truck">
            <Button>LKW hinzufügen</Button>
          </Modal.Open>
          <Modal.Window name="create-new-truck">
            <CreateNewTruck createNewTruck={createNewTruck} />
          </Modal.Window>
        </Modal>

        {createPortal(
          <DragOverlay>
            {activeTruck && (
              <TruckContainer
                truck={activeTruck}
                deleteTruck={deleteTruck}
                orders={orders.filter(
                  (order) => order.truckId === activeTruck.id
                )}
              />
            )}
            {activeOrder && <Order order={activeOrder} />}
          </DragOverlay>,
          document.body
        )}
      </StyledTrucksManagementPanel>
      <Button
        onClick={() => {
          updateMultipleOrders(orders);
        }}
      >
        {!isPending ? "Speichern" : <SpinnerMini />}
      </Button>
    </DndContext>
  );
}
