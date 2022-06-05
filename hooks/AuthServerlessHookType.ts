import { Session, User } from "@supabase/gotrue-js/src/lib/types";

type InputProps = {
  email: string;
  password: string;
};

export type ModeType = { mode: "signin" | "signup" };

export type AuthServerlessHookProps = {
  mode: "signin" | "signup";
  input: InputProps;
};

export type AuthServerlessHookReturnType = {
  user: User | null;
  signin: (event: React.FormEvent) => Promise<void>;
  signout: () => Promise<void>;
  error: null;
  session: Session | null;
};
