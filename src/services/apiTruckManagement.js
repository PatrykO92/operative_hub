import supabase from "./supabase";

export async function getTrucksManagementList() {
  const { data: trucks_management_list, error } = await supabase
    .from("trucks_management")
    .select("*");

  if (error) {
    console.error(error);
    throw new Error("Die Bestellliste konnte nicht geladen werden");
  }
  return trucks_management_list;
}

export async function addNewTruck(formData) {
  const { data: newTruck, error } = await supabase
    .from("trucks_management")
    .insert([formData]);

  if (error) {
    console.error("Error adding row:", error.message);
    throw new Error("LKW konnte nicht hinzugefügt werden");
  }

  return newTruck;
}

export async function removeTruckById(id) {
  const { data, error } = await supabase
    .from("trucks_management")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Error removing record:", error.message);
    throw new Error("LKW konnte nicht entfernt werden");
  }

  return data;
}

export async function updateMultipleTrucksManagement(trucks) {
  const { data, error } = await supabase
    .from("trucks_management")
    .upsert(trucks);

  if (error) {
    console.error("Error updating records:", error.message);
    throw new Error("Problem beim Speichern von Daten");
  }

  return data;
}
