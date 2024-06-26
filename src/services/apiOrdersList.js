import supabase from "./supabase";

export async function getOrdersList() {
  const { data: orders_list, error } = await supabase
    .from("orders_list")
    .select("*")
    .eq("archived", false);

  if (error) {
    console.error(error);
    throw new Error("Die Bestellliste konnte nicht geladen werden");
  }

  return orders_list;
}

export async function getOrderByProjectNumber(project_number) {
  const { data: order, error } = await supabase
    .from("orders_list")
    .select("*")
    .eq("project_number", project_number)
    .limit(1)
    .maybeSingle();

  if (error) {
    if (error.code === "PGRST116") return;

    console.error(error);
    throw new Error(
      `Bestellnummer ${project_number} kann nicht geladen werden`
    );
  }

  return order;
}

export async function addOrderToList({ formData }) {
  const { data: newOrder, error } = await supabase
    .from("orders_list")
    .insert([formData]);

  if (error) {
    console.error("Error adding row:", error.message);
    throw new Error("Bestellung konnte nicht hinzugefügt werden");
  }

  return newOrder;
}

export async function editOrderApi({ formData, editId }) {
  const { data: editedOrder, error } = await supabase
    .from("orders_list")
    .update({ ...formData })
    .eq("id", editId);

  if (error) {
    console.error("Error editing row:", error.message);
    throw new Error("Problem beim Bearbeiten der Bestellung");
  }

  return editedOrder;
}

export async function archiveOrderById(id) {
  const { data, error } = await supabase
    .from("orders_list")
    .update({ archived: true })
    .eq("id", id);

  if (error) {
    console.error("Error removing record:", error.message);
    throw new Error("Die Bestellung kann nicht archiviert werden");
  }

  return data;
}

export async function removeOrderById(id) {
  const { data, error } = await supabase
    .from("orders_list")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Error removing record:", error.message);
    throw new Error("Bestellung konnte nicht entfernt werden");
  }

  return data;
}

export async function updateMultipleOrders(orders) {
  const { data, error } = await supabase.from("orders_list").upsert(orders);

  if (error) {
    console.error("Error updating records:", error.message);
    throw new Error("Problem beim Speichern von Daten");
  }

  return data;
}
