import supabase from "./supabase";

export async function getMaintenanceList() {
  const { data: maintenance_list, error } = await supabase
    .from("maintenance")
    .select("*");

  if (error) {
    console.error(error);
    throw new Error("Wartungsliste kann nicht geladen werden");
  }

  return maintenance_list;
}

export async function addMaintenance(formData) {
  const { data: newEntry, error } = await supabase
    .from("maintenance")
    .insert([formData])
    .single();

  if (error) {
    console.error("Error adding row:", error.message);
    throw new Error("Wartungseintrag kann nicht hinzugefügt werden");
  }

  return newEntry;
}
