// Importing necessary functions and types from the Supabase SSR package
import { createServerClient, type CookieOptions } from "@supabase/ssr";

// Define a function named 'supabase' that takes a 'CookieOptions' object as input
export const supabase = (cookies: CookieOptions) => {
  // Retrieve cookies from the provided 'CookieOptions' object
  const cookieStore = cookies();

  // Create and return a Supabase client configured with environment variables and cookie handling
  return createServerClient(
    // Retrieve Supabase URL from environment variables
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    // Retrieve Supabase anonymous key from environment variables
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        // Define a custom 'get' function to retrieve cookies by name from the cookie store
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
      },
    }
  );
};
