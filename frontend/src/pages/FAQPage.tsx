import React, { useState } from 'react';
import { Collapse, Typography } from '@material-tailwind/react';



const FrequentlyAskedQuestions = () => {
    const [open1, setOpen1] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [open3, setOpen3] = useState(false);
    const handleOpen1 = () => {
        setOpen1(!open1);
    };

    const handleOpen2 = () => {
        setOpen2(!open2);
    };

    const handleOpen3 = () => {
        setOpen3(!open3);
    };

    return (
        <section className='dark:bg-gradient-to-b pt-12 lg:pl-0 py-12 mb-20 dark:from-orange-800/10 dark:to-gray-800'>
            <div className="container mx-auto p-4 mt-10 h-full">
                <div className="max-w-7xl mx-auto p-4 sm:p-6 md:p-8 mb-4">
                    <h1 className="text-3xl font-bold mb-4">Frequently Asked Questions</h1>
                    <div className="flex flex-col space-y-4">
                        <div className="bg-gray-800 border border-orange-300 text-center items-center rounded-lg shadow-md">
                            <button
                                className="flex w-full text-center text-lg font-bold p-2"
                                onClick={handleOpen1}
                            >
                                <div className="flex-grow text-center">
                                    <Typography variant="h4" color="white" className='dark:text-gray-300'>
                                        First FAQ
                                    </Typography>
                                </div>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className={`h-6 w-6 ${open1 ? 'rotate-180' : ''}`}
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                            <Collapse open={open1}>
                                <Typography color="white" className='text-lg p-4 dark:text-gray-300'>
                                    First answer.
                                </Typography>
                            </Collapse>
                        </div>
                        <div className="bg-gray-800 border border-orange-300 text-center items-center rounded-lg shadow-md">
                            <button
                                className="flex justify-between w-full text-left text-lg font-bold p-2"
                                onClick={handleOpen2}
                            >
                                <div className="flex-grow text-center">
                                    <Typography variant="h4" color="white" className='dark:text-gray-300'>
                                        Second FAQ
                                    </Typography>
                                </div>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className={`h-6 w-6 ${open2 ? 'rotate-180' : ''}`}
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                            <Collapse open={open2}>
                                <Typography color="white" className='text-lg p-4 dark:text-gray-300'>
                                    Second answer.
                                </Typography>
                            </Collapse>
                        </div>
                        <div className="bg-gray-800 border border-orange-300 text-center items-center rounded-lg shadow-md">
                            <button
                                className="flex justify-between w-full text-left text-lg font-bold p-2"
                                onClick={handleOpen3}
                            >
                                <div className="flex-grow text-center">
                                    <Typography variant="h4" color="white" className='dark:text-gray-300'>
                                        How long does it take to receive my order?
                                    </Typography>
                                </div>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className={`h-6 w-6 ${open3 ? 'rotate-180' : ''}`}
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                            <Collapse open={open3}>
                                <Typography color="white" className='text-lg p-4 dark:text-gray-300'>
                                    It may take up to 5 business days to receive your order.
                                </Typography>
                            </Collapse>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FrequentlyAskedQuestions;