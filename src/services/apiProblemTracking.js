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

export async function updateProblem({ id, value }) {
  const { data, error } = await supabase
    .from("problem_tracking")
    .update(value)
    .eq("id", id)
    .select();

  if (error) {
    console.error("Error updating row:", error.message);
    throw new Error("Probleme bei der Bearbeitung des Antrags");
  }

  return data;
}
