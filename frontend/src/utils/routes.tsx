import SingleProductPage from '../pages/ProductPage';
import ProductPage from '../pages/ProductGridPage';
import SignUpForm from "../pages/SignUpPage";
import SignInForm from "../pages/SignInPage";
import ShippingDetailsForm from '../components/ShippingDetails';
import MyAccount from "../pages/MyAccountPage";
import HomePage from "../pages/Home";
import CartPage from "../pages/CartPage";
import Checkout from "../pages/CheckoutPage";
import AboutTheDev from '../pages/AboutDev';
import AdminDashboard from '../pages/AdminPage';

export const routes = [
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
    },
    {
        path: '/about-the-dev',
        element: <AboutTheDev />,
    },
    {
        path: '/admin',
        element: <AdminDashboard />,
    },
];