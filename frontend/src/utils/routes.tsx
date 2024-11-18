// import { Route } from 'react-router-dom';
// import ProductTile from '../pages/ProductGridPage';
import SingleProductPage from '../pages/ProductPage';
import ProductPage from '../pages/ProductGridPage';
import SignUpForm from "../pages/SignUpPage";
import SignInForm from "../pages/SignInPage";
import ShippingDetailsForm from '../components/ShippingDetails';
import MyAccount from "../pages/MyAccountPage";
import HomePage from "../pages/Home";
import CartPage from "../pages/CartPage";
import Checkout from "../pages/CheckoutPage";

export const routes = [
    // <Route path="/products" element={<ProductPage />} />
    //             <Route path="/sign-up" element={<SignUpForm />} />
    //             <Route path="/sign-in" element={<SignInForm />} />
    //             <Route path="/account" element={<MyAccount />} />
    //             <Route path="/my-cart" element={<CartPage />} />
    //             <Route path="/" element={<HomePage />} />
    {
        path: '/',
        element: <HomePage />,
    },
    {
        path: '/products',
        element: <ProductPage />,
    },
    {
        path: '/sign-up',
        element: <SignUpForm />,
    },
    {
        path: '/sign-in',
        element: <SignInForm />,
    },
    {
        path: '/account',
        element: <MyAccount />,
    },
    {
        path: '/my-cart',
        element: <CartPage />,
    },
    {
        path: '/products/:productId',
        element: <SingleProductPage />,
    },
    {
        path: 'checkout',
        element: <Checkout />,
    },
    {
        path: '/shipping-details',
        element: <ShippingDetailsForm />,
    }
];