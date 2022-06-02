import { AuthProvider } from '../lib/auth';
import { supabase } from '../lib/initSupabase';
import '../styles/global.css'

function MyApp({ Component, pageProps }: any) {
  return (
    <AuthProvider supabase={supabase}>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp