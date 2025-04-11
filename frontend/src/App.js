import AppRoutes from './routes';
import { AuthProvider } from './auth/AuthContext';
function App() {
    console.log("App.js chargé !");
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;
