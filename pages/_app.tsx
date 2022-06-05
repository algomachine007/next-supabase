import { AuthProvider } from '../lib/auth';
import { supabase } from '../lib/initSupabase';
import '../styles/global.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function MyApp({ Component, pageProps }: any) {
  return (
    <AuthProvider supabase={supabase}>
      <ToastContainer position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover />
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp