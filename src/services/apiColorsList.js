import supabase from "./supabase";

export async function getColorsList() {
  const { data: colors_list, error } = await supabase
    .from("all_colors")
    .select("*");

  if (error) {
    console.error(error);
    throw new Error("Die Farbliste konnte nicht geladen werden");
  }

  return colors_list;
}

export async function getAllAvailableColorsList() {
  const { data: colors_list, error } = await supabase
    .from("all_colors")
    .select("*")
    .eq("available", true);

  if (error) {
    console.error(error);
    throw new Error("Die Farbliste konnte nicht geladen werden");
  }

  return colors_list;
}

export async function setColorStatus(id, status) {
  const { data: color, error } = await supabase
    .from("all_colors")
    .update({ available: status })
    .eq("id", id)
    .select();

  if (error) {
    console.error(error);
    throw new Error("Problem mit sich ändernder Farbverfügbarkeit");
  }

  return color;
}

export async function getColorById(color_id) {
  const { data: color, error } = await supabase
    .from("all_colors")
    .select("*")
    .eq("id", color_id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Farbe konnte nicht geladen werden");
  }

  return color;
}

export async function addColorToList(formData) {
  const { data: newColor, error } = await supabase
    .from("all_colors")
    .insert([formData]);

  if (error) {
    console.error("Error adding row:", error.message);
    throw new Error("Farbe konnte nicht hinzugefügt werden");
  }

  return newColor;
}

export async function removeColorById(id) {
  const { data, error } = await supabase
    .from("all_colors")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Error removing record:", error.message);
    throw new Error("Farbe konnte nicht entfernt werden");
  }

  return data;
}
