import supabase from "./supabase";

export async function getOrdersList() {
  const { data: orders_list, error } = await supabase
    .from("orders_list")
    .select("*");

  if (error) {
    console.error(error);
    throw new Error("Orders list could not be loaded");
  }

  return orders_list;
}

export async function addOrderToList(formData) {
  const { data: newOrder, error } = await supabase
    .from("orders_list")
    .insert([formData]);

  if (error) {
    console.error("Error adding row:", error.message);
    throw new Error("Order could not be added.");
  }

  return newOrder;
}

export async function removeOrderById(id) {
  const { data, error } = await supabase
    .from("orders_list")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Error removing record:", error.message);
  }

  return data;
}
