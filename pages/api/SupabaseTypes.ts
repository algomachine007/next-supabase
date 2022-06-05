import { Session, User, ApiError } from "@supabase/gotrue-js/src/lib/types";

export type SupaBaseApiProps = {
  user: User | null;
  activeSession: Session | null;
  error: ApiError | null;
};
