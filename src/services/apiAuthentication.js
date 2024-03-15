import supabase, { supabaseUrl } from "./supabase";

export async function signup({ fullName, email, password, appRole }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
        avatar: "",
        app_role: appRole,
      },
    },
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();
  if (error) throw new Error(error.message);

  return data?.user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}

export async function updateCurrentUser({ password, fullName, avatar }) {
  let updateData;
  if (password) updateData = { password };
  if (fullName) updateData = { data: { full_name: fullName } };

  const { data: updatedUser, error: updatedUserError } =
    await supabase.auth.updateUser(updateData);

  if (updatedUserError) throw new Error(updatedUserError.message);

  if (!avatar) return updatedUser;

  // Upload avatar

  const fileName = `avatar-${updatedUser.user.id}-${Math.random()}`;

  const { error: uploadImageError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);

  if (uploadImageError) throw new Error(uploadImageError.message);

  const { data: updatedUser2, error: updatedUserError2 } =
    await supabase.auth.updateUser({
      data: {
        avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
      },
    });

  if (updatedUserError2) throw new Error(updatedUserError2.message);

  return updatedUser2;
}
