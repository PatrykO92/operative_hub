import supabase from "./supabase";

export async function getListOfProblems() {
  const { data, error } = await supabase.from("problem_tracking").select("*");

  if (error) {
    console.error(error);
    throw new Error("Die Problemliste konnte nicht geladen werden");
  }

  return data;
}
