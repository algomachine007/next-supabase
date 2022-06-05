import { createContext, useEffect, useState } from 'react';
import { EVENTS, VIEWS } from "./events";

export const AuthContext = createContext<any | null>({});

export const AuthProvider = ({ supabase, ...props }: any) => {

  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);
  const [view, setView] = useState(VIEWS.SIGN_IN);


  useEffect(() => {
    const activeSession = supabase.auth.session();
    setSession(activeSession);

    setUser(activeSession?.user ?? null);

    //Ensuring the view is updated by the events
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event: string, currentSession: any) => {

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
  }, []);

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


