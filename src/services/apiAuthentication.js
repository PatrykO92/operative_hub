import supabase, { supabaseUrl } from "./supabase";

export async function signup({ email, password, full_name }) {
  const { user, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { full_name } },
  });

  if (error) throw new Error(error.message);
  return user;
}

export async function login({ email, password }) {
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;

  const { data: userData, error: userErrorData } =
    await supabase.auth.getUser();

  if (userErrorData) throw new Error(userErrorData.message);

  const { data: user } = await supabase
    .from("profiles")
    .select(`*`)
    .eq("id", userData.user.id)
    .single();

  return { ...user, email };
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();
  const { email } = data.user;
  if (error) throw new Error(error.message);

  const { data: user } = await supabase
    .from("profiles")
    .select(`*`)
    .eq("id", data.user.id)
    .single();

  return { ...user, email };
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}

export async function updateCurrentUserPassword(password) {
  const { data: updatedUser, error: updatedUserError } =
    await supabase.auth.updateUser(password);

  if (updatedUserError) throw new Error(updatedUserError.message);
  return updatedUser;
}

export async function updateCurrentUser({ id, fullName, avatar }) {
  let updateData;

  if (fullName) updateData = { id, full_name: fullName };

  const { error: updatedUserError } = await supabase
    .from("profiles")
    .upsert(updateData);

  if (updatedUserError) throw new Error(updatedUserError.message);

  if (!avatar) return;

  // Upload avatar

  const fileName = `avatar-${id}-${Math.random()}`;

  const { error: uploadImageError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);
  if (uploadImageError) throw new Error(uploadImageError.message);

  const { data: updatedUser2, error: updatedUserError2 } = await supabase
    .from("profiles")
    .upsert({
      id,
      avatar_url: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
    });

  if (updatedUserError2) throw new Error(updatedUserError2.message);

  return updatedUser2;
}

export async function getListOfAllUsers() {
  let { data: users, error } = await supabase.from("profiles").select("*");

  if (error) throw new Error(error.message);

  return users;
}

export async function getUserByID(id) {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", id)
    .single();
  if (error) {
    throw new Error(error.message);
  }
  return data;
}
