import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, Route, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './App.jsx';
import store from './store/store.js';
import ProductionLoader from './components/Loading/ProductionLoader.jsx';
import ResetPassword from "./components/ResetPassword.jsx";
import './index.css';
import ProtectedRoute from './components/Router/ProtectRouter.jsx';
import ErrorBoundary from './ErrorBoundary.jsx';

const LoginForm = lazy(() => import('./components/header/LoginForm.jsx'));
const SignUpThree = lazy(() => import('./components/Signup.jsx'));
const ShopPage = lazy(() => import('./Pages/ShopPage.jsx'));
const ProductOverviewPage = lazy(() => import('./Pages/ProductOverviewPage.jsx'));
const ShopCategory = lazy(() => import('./Pages/ShopCatagory.jsx'));
const ShoppingCart = lazy(() => import('./Pages/CartPage.jsx'));
const AdminPage = lazy(() => import('./Pages/AdminPage.jsx'));
const AddProductPage = lazy(() => import('./components/Admin/AdminAddProduct.jsx'));
const AllProductsPage = lazy(() => import('./components/AllProduct/AllProduct.jsx'));
const ProfilePage = lazy(() => import('./Pages/ProfilePage.jsx'));
const EditProfile = lazy(() => import('./components/EditProfile/EditProfile.jsx'));
const ManageAddress = lazy(() => import('./components/ManageAdd/ManageAddress.jsx'));
const Orders = lazy(() => import('./components/Orders/Orders.jsx'));
const RecommendationChat = lazy(()=> import('./components/Chat/RecommendationChat.jsx'))

import menBanner from "./components/Assets/banner_mens.png";
import womenBanner from "./components/Assets/banner_women.png";
import kidsBanner from "./components/Assets/banner_kids.png";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path='/' element={<App />}>
        <Route index element={<ShopPage />} />
        <Route path='/men' element={<ShopCategory Banner={menBanner} category="men" />} />
        <Route path='/women' element={<ShopCategory Banner={womenBanner} category="women" />} />
        <Route path='/kids' element={<ShopCategory Banner={kidsBanner} category="kid" />} />
        <Route path="/style-advisor" element={<RecommendationChat />} />
        <Route path="/product/:slug" element={<ProductOverviewPage />} />
      </Route>
      <Route path='/cart' element={<ShoppingCart />} />
      <Route path='/profile' element={<ProfilePage />} >
        <Route path='Edit-Profile' element={<EditProfile />} />
        <Route path='orders' element={<Orders />} />
        <Route path='Address' element={<ManageAddress />} />
      </Route>
      <Route path='/resetPassword/:token' element={<ResetPassword />} />
      <Route path='/login' element={<LoginForm />} />
      <Route path='/signup' element={<SignUpThree />} />
      <Route path="/admin" element={<ProtectedRoute element={AdminPage} />}>
        <Route path="add-product" element={<ProtectedRoute element={AddProductPage} />} />
        <Route path="all-products" element={<ProtectedRoute element={AllProductsPage} />} />
      </Route>
    </Route >
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <ErrorBoundary>
        <Suspense fallback={<ProductionLoader />}>
          <RouterProvider router={router} />
        </Suspense>
      </ErrorBoundary>
    </Provider>
  </React.StrictMode>
);



