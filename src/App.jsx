import { useState } from 'react';
import './App.css';
import Home from './Component/Home/Home';
import Register from './Component/Register/Register';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './Component/Login/Login';
import Category from './Component/Category/Category';
import Brands from './Component/Brands/Brands';
import Layout from './Component/Layout/Layout';
import Products from './Component/Products/Products';
import NotFound from './Component/NotFound/NotFound';
import UserContextProvider from './Component/Context/UserContext';
import ProtectedRout from './Component/ProtectedRout/ProtectedRout';
import ProductDetails from './Component/ProductDetails/ProductDetails';
import { QueryClient, QueryClientProvider } from 'react-query';
import RecentProducts from './Component/RecentProducts/RecentProducts';
import Carts from './Component/Carts/Carts';
import CartContextProvider from './Component/Context/CartContext';
import toast, { Toaster } from 'react-hot-toast';
import CheakOut from './Component/CheakOut/CheakOut';
import WishList from './Component/WishList/WishList';
import WishListContextProvider from './Component/Context/WishListContext'; 

function App() {
  const queryClient = new QueryClient();
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        { index: true, element: <ProtectedRout><Home /></ProtectedRout> },
        { path: 'cheakout/:cartId', element: <ProtectedRout><CheakOut /></ProtectedRout> },
        { path: 'cart', element: <ProtectedRout><Carts /></ProtectedRout> },
        { path: 'products', element: <ProtectedRout><RecentProducts /></ProtectedRout> },
        { path: 'category', element: <ProtectedRout><Category /></ProtectedRout> },
        { path: 'brand', element: <ProtectedRout><Brands /></ProtectedRout> },
        { path: 'productDetails/:id', element: <ProtectedRout><ProductDetails /></ProtectedRout> },
        { path: 'wishlist', element: <ProtectedRout><WishList /></ProtectedRout> },
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: '*', element: <NotFound /> }
      ]
    }
  ]);

  return (
    <QueryClientProvider client={queryClient}>
      <UserContextProvider>
        <CartContextProvider>
          <WishListContextProvider> 
            <RouterProvider router={router} />
          </WishListContextProvider>
        </CartContextProvider>
        <Toaster/>
      </UserContextProvider>
    </QueryClientProvider>
  );
}

export default App;
