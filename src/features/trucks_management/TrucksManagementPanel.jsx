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

const StyledTrucksManagementPanel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
`;

export default function TrucksManagementPanel() {
  const { orders: fetchedOrders, isLoadingOrders } = useGetOrdersList();

  useEffect(() => {
    if (fetchedOrders) setOrders(fetchedOrders);
  }, [fetchedOrders]);

  const [trucks, setTrucks] = useState([
    { id: 0, label: "Verfügbare Bestellungen" },
  ]);

  const trucksId = useMemo(() => trucks.map((truck) => truck.id), [trucks]);
  const [activeTruck, setActiveTruck] = useState(null);

  const [orders, setOrders] = useState([]);
  const [activeOrder, setActiveOrder] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 10 } })
  );

  function createNewTruck() {
    const id = Math.floor(Math.random() * 10001);
    const label = `${trucks.length + 1}`;
    const truckToAdd = { id, label };

    setTrucks([...trucks, truckToAdd]);
  }

  function deleteTruck(id) {
    const filteredTrucks = trucks.filter((col) => col.id !== id);
    setTrucks(filteredTrucks);
  }

  function updateTruck({ id, label }) {
    const newTrucks = trucks.map((truck) => {
      if (truck.id !== id) return truck;
      return { ...truck, label };
    });

    setTrucks(newTrucks);
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

        orders[activeIndex].truckId = orders[overIndex].truckId;

        return arrayMove(orders, activeIndex, overIndex);
      });
    }
    const isOverATruckContainer = over.data.current?.type === "truck";
    if (isActiveAOrder && isOverATruckContainer) {
      setOrders((orders) => {
        const activeIndex = orders.findIndex((ord) => ord.id === activeId);

        orders[activeIndex].truckId = overId;

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
                updateTruck={updateTruck}
                orders={orders.filter((order) => order?.truckId === truck.id)}
              />
            );
          })}
        </SortableContext>

        <Button onClick={createNewTruck}>LKW hinzufügen</Button>
        {createPortal(
          <DragOverlay>
            {activeTruck && (
              <TruckContainer
                truck={activeTruck}
                deleteTruck={deleteTruck}
                updateTruck={updateTruck}
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
    </DndContext>
  );
}
