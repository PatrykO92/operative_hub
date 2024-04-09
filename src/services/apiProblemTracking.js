import supabase from "./supabase";

export async function getListOfProblems() {
  const { data, error } = await supabase.from("problem_tracking").select("*");

  if (error) {
    console.error(error);
    throw new Error("Die Problemliste konnte nicht geladen werden");
  }

  return data;
}

export async function addProblem(formData) {
  const { data: newColor, error } = await supabase
    .from("problem_tracking")
    .insert([formData]);

  if (error) {
    console.error("Error adding row:", error.message);
    throw new Error("Es konnte kein Problem hinzugefügt werden");
  }

  return newColor;
}
