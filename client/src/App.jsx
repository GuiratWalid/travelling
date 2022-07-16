import './App.css';
import { ToastContainer, toast } from 'react-toastify';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import "react-toastify/dist/ReactToastify.css";
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Header from './components/Header';
import { setUser } from './redux/features/authSlice';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import AddEditTrip from './pages/AddEditTrip';
import SingleTrip from './pages/SingleTrip';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './components/PrivateRoute';


const App = () => {

  const dispatch = useDispatch();

  const user = JSON.parse(localStorage.getItem('profile'));

  useEffect(() => {
    dispatch(setUser(user));
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/addTrip"
            element={
              <PrivateRoute>
                <AddEditTrip />
              </PrivateRoute>
            } />
          <Route
            path="/editTrip/:id"
            element={
              <PrivateRoute>
                <AddEditTrip />
              </PrivateRoute>
            } />
          <Route
            path="/trip/:id"
            element={
              <PrivateRoute>
                <SingleTrip />
              </PrivateRoute>
            } />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            } />
        </Routes>
      </div>
    </BrowserRouter>
  );
};


export default App;
