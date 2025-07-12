import Header from './components/header/Header';
import Footer from "./components/footer/Footer";
import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import authService from './MongoDB/auth';
import { addOutOfStockProduct, login, logout } from './store/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useGetCartItemQuery } from './store/cartSlice';
import { io } from 'socket.io-client';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if (!userData.notVerified && userData.status) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .catch((error) => { throw error });
  }, []);

  useEffect(() => {
    const socket = io('http://localhost:5500');

    socket.on('outOfStock', (outOfStockProducts) => {
      if (outOfStockProducts) {
        console.log(outOfStockProducts);

        dispatch(addOutOfStockProduct(outOfStockProducts.map(product => product._id)));
      }
    });

    return () => {
      socket.off('outOfStock');
      socket.disconnect();
    };
  }, [dispatch]);

  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default App
