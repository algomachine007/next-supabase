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
    setSession(activeSession);
    console.log('ACTIVE SESSION', activeSession);
    // active session has a user prop
    setUser(activeSession?.user ?? null);
    //Ensuring the events are updated
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event: string, currentSession: any) => {

        setSession(currentSession);
        setUser(currentSession?.user ?? null);

        console.log('Events', event);

        switch (event) {
          case EVENTS.PASSWORD_RECOVERY:
            setView(VIEWS.UPDATE_PASSWORD);
            break;
          case EVENTS.SIGNED_OUT:
          case EVENTS.USER_UPDATED:
            setView(VIEWS.SIGN_IN);

          default:
        }
      }
    );
    //clean up
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


//useAuth hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};