import { createContext, useContext, useEffect, useState } from 'react';
import { EVENTS, VIEWS } from "./events";

export const AuthContext = createContext({});

export const AuthProvider = ({ supabase, ...props }: any) => {
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);
  const [view, setView] = useState(VIEWS.SIGN_IN);

  useEffect(() => {
    // grab the user session
    const activeSession = supabase.auth.session();

    //update the state with the data
    setSession(activeSession);

    // active session has a user prop
    setUser(activeSession?.user ?? null);

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event: any, currentSession: any) => {
        console.log('EVENT', event)
        console.log('CURRENT SESSION', currentSession)
        setSession(currentSession);
        setUser(currentSession?.user ?? null);

        switch (event) {

          case EVENTS.PASSWORD_RECOVERY:
            setView(VIEWS.UPDATE_PASSWORD);
            break;
          case EVENTS.SIGNED_OUT:
          case EVENTS.USER_UPDATED:
            setView(VIEWS.SIGN_IN);
            break;
          default:
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
        signOut: () => supabase.auth.signOut(),
      }}
      {...props}
    />
  );
};


//useAuth hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};