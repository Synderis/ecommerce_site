import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
} from "@material-tailwind/react";

export const AccountPageSkeleton = () => {
    return (
            <section className="dark:bg-gradient-to-b flex flex-grow pt-12 h-full dark:from-orange-800/10 dark:to-gray-800 ">
                <div className="container mx-auto p-4 px-4">
                    <Typography variant="h2" className="mb-4">
                        My Account
                    </Typography>
                    <div className="flex flex-col mb-4">
                        <Typography variant="small" className="animate-pulse mb-2 block font-medium text-gray-900">
                            Loading...
                        </Typography>
                        {/* <Input
                        type="text"
                        value={userData.username}
                        readOnly
                        className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                    /> */}
                    </div>
                    <div className="flex flex-col mb-4">
                        <Typography variant="small" className="animate-pulse mb-2 block font-medium text-gray-900">
                            Loading...
                        </Typography>
                    </div>
                        <div className="relative flex flex-col lg:p-4 dark:bg-gray-800 dark:bg-gradient-to-b dark:from-orange-300/30 dark:to-blue-gray-900 lg:w-1/2 overflow-hidden text-gray-700 bg-white lg:shadow-md rounded-lg bg-clip-border animate-pulse">
                            <table className="w-full lg:w-full pr-12 text-left lg:text-center table-auto lg:min-w-2/3 lg:pl-7 lg:ml-3">
                                <thead>
                                    <tr className="bg-slate-50">
                                        <th className="lg:p-1 pt-2 pl-2 text-sm border-b border-slate-300 font-normal leading-none text-slate-500 dark:opacity-80 dark:text-white">Order ID</th>
                                        <th className="lg:p-1 pt-2 text-sm border-b text-center border-slate-300 font-normal leading-none text-slate-500 dark:opacity-80 dark:text-white">Total</th>
                                        <th className="lg:p-1 pt-2 text-sm border-b text-center border-slate-300 font-normal leading-none text-slate-500 dark:opacity-80 dark:text-white">Date</th>
                                        <th className="lg:p-1 pt-2 text-sm border-b border-slate-300 font-normal leading-none text-slate-500 dark:opacity-80 dark:text-white">Shipped</th>
                                        <th className="text-sm font-normal leading-none text-slate-500"></th>
                                        <th className="text-sm font-normal leading-none text-slate-500"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td colSpan={4} className="p-1 text-sm border-b border-slate-200 text-center">
                                            Loading...
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                </div>
            </section>
        );
};

export const CartPageSkeleton = () => {
    return (
            <section className="dark:bg-gradient-to-b mb-2 overflow-visible flex flex-grow h-full dark:from-orange-800/10 dark:to-gray-800">
                <div className="container mx-auto px-4">
                    <div className="w-full flex justify-between items-center mb-3 pt-8 pl-7">
                        <div>
                            <h3 className="text-lg font-semibold text-slate-800">Shopping Cart</h3>
                            <p className="text-slate-500">Review your selected items.</p>
                        </div>
                        <div className="mx-3">
                            <div className="w-full max-w-sm min-w-[200px] relative">
                                <Button
                                    className="bg-orange-300 dark:bg-orange-800/30 text-blue-gray-900 dark:text-white shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100 animate-pulse"
                                >
                                    Loading...
                                </Button>
                                <div className="text-lg text-slate-500 mt-2 dark:text-orange-300 animate-pulse">Total: Loading...</div>
                            </div>
                        </div>
                    </div>
                    <div className="relative flex flex-col lg:p-2 dark:bg-gray-800 dark:bg-gradient-to-b dark:from-orange-300/30 dark:to-blue-gray-900 w-full overflow-hidden text-gray-700 bg-white lg:shadow-md rounded-lg bg-clip-border animate-pulse">
                        <table className="w-full text-left table-auto min-w-max pl-3">
                            <thead>
                                <tr className="bg-slate-50">
                                    <th className="p-1 pl-3 text-sm border-b border-slate-300 font-normal leading-none text-slate-500 dark:opacity-80 dark:text-white">Product</th>
                                    <th className="p-1 text-sm font-normal border-b border-slate-300 leading-none text-slate-500 dark:opacity-80 dark:text-white">Name</th>
                                    <th className="p-1 text-sm font-normal border-b border-slate-300 text-center leading-none text-slate-500 dark:opacity-80 dark:text-white">Quantity</th>
                                    <th className="p-1 text-sm font-normal border-b border-slate-300 text-center leading-none text-slate-500 dark:opacity-80 dark:text-white">Subtotal</th>
                                    <th className="text-sm font-normal leading-none text-slate-500"></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td colSpan={5} className="p-1 text-sm border-b border-slate-200 text-center">
                                        Loading...
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        );
};

export const ProductGridSkeleton = () => {
    return (
        <section className="py-5 px-6 lg:py-10 dark:bg-gradient-to-b dark:from-orange-800/10 dark:to-gray-800">
            <div className="grid gap-10 grid-cols-1 lg:grid-cols-3 lg:gap-16 max-w-7xl mx-auto">
                {Array.from({ length: 3 }, (_, index) => (
                    <Card key={index} className="w-90 border dark:bg-gray-900 dark:border-orange-300 shadow-lg dark:bg-gradient-to-b dark:from-orange-800/10 dark:to-blue-gray-900">
                        <CardHeader shadow={false} floated={false} className="h-96 dark:bg-gray-900 animate-pulse">
                        <></>
                        </CardHeader>
                        <CardBody>
                            <div className="mb-2 flex items-center justify-between">
                                <Typography color="blue-gray" className="font-medium dark:text-orange-300">
                                Loading...
                                </Typography>
                                <Typography color="blue-gray" className="font-medium dark:text-orange-300">
                                Loading...
                                </Typography>
                            </div>
                            <Typography
                                variant="small"
                                color="gray"
                                className="font-normal opacity-75 dark:text-white"
                            >
                                Loading...
                            </Typography>
                        </CardBody>
                        <CardFooter className="pt-0">
                            <Button
                                ripple={false}
                                fullWidth={true}
                                className="bg-orange-300 dark:bg-orange-800/10 dark:active:bg-orange-800/30  lg:dark:hover:bg-orange-800/30 text-blue-gray-900 dark:text-white shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
                            >
                                Loading...
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </section>
    );
};

export const ProductPageSkeleton = () => {
    return (
            <div className="w-full xl:w-4/12 p-4">
                <Card className="h-full py-8 dark:bg-gray-900 border dark:border-orange-300 dark:bg-gradient-to-b dark:from-orange-300/30 dark:to-blue-gray-900 animate-pulse">
                    <CardHeader color="gray" className="py-1 mt-1 align-left rounded-md bg-gray-800 border border-orange-300 text-sm text-white transition-all shadow-lg focus:bg-slate-700">
                        <Typography variant="h3" color="white" className='ml-2 dark:text-gray-300'>
                            Loading...
                        </Typography>
                    </CardHeader>
                    <CardBody><></>
                    </CardBody>
                    <CardFooter className="pt-0">
                        <></>
                    </CardFooter>
                </Card>
            </div>
    );
};

export const ProductCarouselSkeleton = () => {
    return (
        <div className="dark:bg-gradient-to-b dark:from-orange-800/10 dark:to-gray-800 rounded-md">
            <div className="container mx-auto">
                <div className="flex flex-wrap">
                    <div className="w-full">
                        <div className="h-[45rem] w-full bg-gray-900 animate-pulse rounded-md"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};