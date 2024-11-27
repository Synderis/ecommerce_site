import SingleProductPage from '../pages/ProductPage';
import ProductPage from '../pages/ProductGridPage';
import SignUpForm from "../pages/SignUpPage";
import SignInForm from "../pages/SignInPage";
import MyAccount from "../pages/MyAccountPage";
import HomePage from "../pages/Home";
import CartPage from "../pages/CartPage";
import AboutTheDev from '../pages/AboutDev';
import AdminDashboard from '../pages/AdminPage';
import CompletePage from '../pages/CheckoutComplete';


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
        path: '/?success=true/*',
        element: <CompletePage />,
    },
    {
        path: '/products/:productId',
        element: <SingleProductPage />,
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