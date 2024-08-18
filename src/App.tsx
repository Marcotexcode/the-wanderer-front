import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/login/Login';
import RegisterPage from './components/register/Register';
import ProtectedRoute from './components/protectedRoute/ProtectedRoute';
import Character from './components/character/Character';
import PrivateRoute from './components/private-route/PrivateRoute';
import Map from './components/map/Map';

function App() {
  return (
    <Router>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<RegisterPage />} />
      {/* TODO una volta registrato se e protetta va direttamente nella mappa invece di andare qua controllare il componente character */}
      <Route path="/character" element={
        <ProtectedRoute>
          <Character />
        </ProtectedRoute>
      } />
      <Route path="/map" element={<PrivateRoute><Map /></PrivateRoute>} />
      <Route path="/" element={<Navigate to="/login" replace />} />
    </Routes>
  </Router>
  );
}

export default App;
