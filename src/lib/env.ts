function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

export const env = {
  get NEXT_PUBLIC_SUPABASE_URL() {
    return requireEnv("NEXT_PUBLIC_SUPABASE_URL");
  },
  get NEXT_PUBLIC_SUPABASE_ANON_KEY() {
    return requireEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY");
  },
  get SUPABASE_SERVICE_ROLE_KEY() {
    return requireEnv("SUPABASE_SERVICE_ROLE_KEY");
  },
  get RAZORPAY_KEY_ID() {
    return requireEnv("RAZORPAY_KEY_ID");
  },
  get RAZORPAY_KEY_SECRET() {
    return requireEnv("RAZORPAY_KEY_SECRET");
  },
};
