import { createContext, useEffect, useState } from 'react';
import { EVENTS, VIEWS } from "./events";
import { Session, User } from "@supabase/gotrue-js/src/lib/types"
import { AuthChangeEvent } from "@supabase/supabase-js";

interface AuthContextType {
  user: User;
  signin: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  onAuthChange: (event: AuthChangeEvent) => void;
  view: string
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ supabase, ...props }: any) => {

  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>();
  const [view, setView] = useState(VIEWS.SIGN_IN);


  useEffect(() => {
    const activeSession = supabase.auth.session();
    setSession(activeSession);
    setUser(activeSession?.user ?? null);

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event: AuthChangeEvent, currentSession: Session | null) => {

        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        switch (event) {
          case EVENTS.PASSWORD_RECOVERY:
            setView(VIEWS.UPDATE_PASSWORD);
            break;
          case EVENTS.SIGNED_OUT:
          case EVENTS.USER_UPDATED:
            return setView(VIEWS.SIGN_IN);
          default:
            break;
        }
      }
    );

    return () => {
      authListener?.unsubscribe();
    };
  }, [supabase.auth]);

  return (
    <AuthContext.Provider
      value={{
        session,
        user,
        view,
        setUser,
        signOut: () => supabase.auth.signOut(),
      }}
      {...props}
    />
  );
};


