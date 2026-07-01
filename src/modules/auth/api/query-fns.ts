import type { LoginData, User } from '@/modules/auth/types';

import { supabase } from '@/supabase';

export async function login(data: LoginData): Promise<User> {
  const { data: authData, error } = await supabase.auth.signInWithPassword({
    email: data.email,
    password: data.password,
  });

  if (error || !authData.user || !authData.session) {
    throw new Error(error?.message || 'Invalid username or password');
  }

  const { user, session } = authData;

  return {
    id: user.id,
    email: user.email ?? '',
    // Custom user metadata properties safely fall back if not initialized yet
    username:
      user.user_metadata?.username || user.email?.split('@')[0] || 'user',
    fullName: user.user_metadata?.fullName || 'App User',
    roles: user.user_metadata?.roles || ['user'],
    permissions: user.user_metadata?.permissions || ['Devices.Read'],

    // Provided for compatibility with your User shape, though Supabase manages these automatically
    accessToken: session.access_token,
    refreshToken: session.refresh_token,
  };
}

export async function logout(): Promise<void> {
  // Supabase automatically wipes local tokens and invalidates the session on the server
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw new Error(error.message);
  }
}

export async function verifySession(): Promise<User> {
  // Fetch the current active session from storage / backend verification
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (error || !session || !session.user) {
    throw new Error('Invalid token or session expired');
  }

  const user = session.user;

  // Map the session user back to your custom app User structure
  return {
    id: user.id,
    email: user.email ?? '',
    username:
      user.user_metadata?.username || user.email?.split('@')[0] || 'user',
    fullName: user.user_metadata?.fullName || 'App User',
    roles: user.user_metadata?.roles || ['user'],
    permissions: user.user_metadata?.permissions || ['Devices.Read'],
    accessToken: session.access_token,
    refreshToken: session.refresh_token,
  };
}
