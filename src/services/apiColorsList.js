import supabase from "./supabase";

export async function getColorsList() {
  const { data: colors_list, error } = await supabase
    .from("all_colors")
    .select("*");

  if (error) {
    console.error(error);
    throw new Error("Colors list could not be loaded");
  }

  return colors_list;
}

export async function getColorById(color_id) {
  const { data: color, error } = await supabase
    .from("all_colors")
    .select("*")
    .eq("id", color_id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Color could not be loaded");
  }

  return color;
}

export async function addColorToList(formData) {
  const { data: newColor, error } = await supabase
    .from("all_colors")
    .insert([formData]);

  if (error) {
    console.error("Error adding row:", error.message);
    throw new Error("Color could not be added.");
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
    throw new Error("Color could not be removed.");
  }

  return data;
}
