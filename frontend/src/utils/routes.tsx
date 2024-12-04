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
import ContactSection from '../pages/Support';
import ForgotPassword from '../pages/ForgotPasswordPage';
import ResetPassword from '../pages/ResetPasswordPage';


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
        path: '/my-account',
        element: <MyAccount />,
    },
    {
        path: '/my-cart',
        element: <CartPage />,
    },
    {
        path: '/success=true/:orderId',
        element: <CompletePage />,
    },
    {
        path: '/products/:productId',
        element: <SingleProductPage />,
    },
    {
        path: '/support',
        element: <ContactSection />,
    },
    {
        path: '/forgot-password',
        element: <ForgotPassword />,
    },
    {
        path: '/reset-password/:reset_token',
        element: <ResetPassword />,
    },
    {
        path: '/about-the-dev',
        element: <AboutTheDev />,
    },
    {
        path: '/admin/',
        element: <AdminDashboard />,
    },
];