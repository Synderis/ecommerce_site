import React from 'react';
import { Link } from 'react-router-dom';

const AboutTheDev = () => {
    return (
        <section className='dark:bg-gradient-to-b pt-12 lg:pl-0 pl-5 py-12 mb-20 dark:from-orange-800/10 dark:to-gray-800'>
            <div className="container mx-auto p-4 mt-10 h-full">
                <h1 className="text-3xl font-bold mb-4">About The Developer</h1>
                <p className="text-lg mb-4">
                    I'm Dylan Tocci, I go by Synderis online and my background is in Data/Software Engineering primarily in Python and SQL.
                </p>
                <div className='flex gap-4'>
                    <Link to="https://github.com/Synderis/ecommerce_site" className="block transition-opacity text-inherit hover:opacity-80">
                        <svg className="w-5 h-5 hover:scale-110" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path fill-rule="evenodd"
                                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                                clip-rule="evenodd"></path>
                        </svg>
                    </Link>
                    <Link to="https://www.linkedin.com/in/dylan-tocci-69198929a/" className="block transition-opacity text-inherit hover:opacity-80">
                        <svg className="w-5 h-5 hover:scale-110" fill="currentColor" viewBox="0 0 48 48" aria-hidden="true">
                            <path fill-rule="evenodd"
                                d="M41,4H9C6.24,4,4,6.24,4,9v32c0,2.76,2.24,5,5,5h32c2.76,0,5-2.24,5-5V9C46,6.24,43.76,4,41,4z M17,20v19h-6V20H17z M11,14.47c0-1.4,1.2-2.47,3-2.47s2.93,1.07,3,2.47c0,1.4-1.12,2.53-3,2.53C12.2,17,11,15.87,11,14.47z M39,39h-6c0,0,0-9.26,0-10 c0-2-1-4-3.5-4.04h-0.08C27,24.96,26,27.02,26,29c0,0.91,0,10,0,10h-6V20h6v2.56c0,0,1.93-2.56,5.81-2.56 c3.97,0,7.19,2.73,7.19,8.26V39z"
                                clip-rule="evenodd"></path>
                        </svg>
                    </Link>
                </div>
                <h2 className="text-2xl font-bold mb-2 mt-4">Technologies Used</h2>
                <ul className="list-disc pl-4 mb-4">
                    <li>
                        <span className="font-bold">Frontend:</span> Built with <a
                            href="https://reactjs.org/"
                            className='hover:scale-105 text-blue-500 hover:text-blue-600 dark:text-orange-300 dark:hover:text-orange-400'
                            target="_blank" rel="noopener noreferrer">React</a> and <a
                                href="https://www.typescriptlang.org/"
                                className='hover:scale-105 text-blue-500 hover:text-blue-600 dark:text-orange-300 dark:hover:text-orange-400'
                                target="_blank"
                                rel="noopener noreferrer">TypeScript</a>, providing a seamless and efficient user experience.
                    </li>
                    <li>
                        <span className="font-bold">Styling:</span> Designed with <a
                            href="https://tailwindcss.com/"
                            className='hover:scale-105 text-blue-500 hover:text-blue-600 dark:text-orange-300 dark:hover:text-orange-400'
                            target="_blank"
                            rel="noopener noreferrer">Tailwind CSS</a>, a utility-first approach to styling that makes it easy to create custom and consistent designs.
                    </li>
                    <li>
                        <span className="font-bold">Backend:</span> Powered by <a
                            href="https://fastapi.tiangolo.com/"
                            className='hover:scale-105 text-blue-500 hover:text-blue-600 dark:text-orange-300 dark:hover:text-orange-400'
                            target="_blank"
                            rel="noopener noreferrer"> FastAPI</a>, a modern and fast Python framework for building robust APIs.
                    </li>
                    <li>
                        <span className="font-bold">Database:</span> Managed with <a
                            href="https://www.postgresql.org/"
                            className='hover:scale-105 text-blue-500 hover:text-blue-600 dark:text-orange-300 dark:hover:text-orange-400'
                            target="_blank"
                            rel="noopener noreferrer">PostgreSQL</a>, a powerful and reliable database management system.
                    </li>
                    <li>
                        <span className="font-bold">Hosting:</span> Deployed on <a
                            href="https://aws.amazon.com/ecs/"
                            className='hover:scale-105 text-blue-500 hover:text-blue-600 dark:text-orange-300 dark:hover:text-orange-400'
                            target="_blank"
                            rel="noopener noreferrer">AWS ECS</a>, a cloud platform that is the primary choice for many companies to scale and deploy applications.
                    </li>
                    <li>
                        <span className="font-bold">DB Hosting:</span> The database is currently hosted on <a
                            href="https://aws.amazon.com/rds/"
                            className='hover:scale-105 text-blue-500 hover:text-blue-600 dark:text-orange-300 dark:hover:text-orange-400'
                            target="_blank"
                            rel="noopener noreferrer">AWS RDS</a>, a fully managed database service.
                    </li>
                    <li>
                        <span className="font-bold">Payment Processing:</span> Managed with <a
                            href="https://stripe.com/"
                            className='hover:scale-105 text-blue-500 hover:text-blue-600 dark:text-orange-300 dark:hover:text-orange-400'
                            target="_blank"
                            rel="noopener noreferrer">Stripe</a>, a payment gateway that allows for secure and efficient payment processing.
                    </li>
                </ul>
                <p className="text-lg mb-4">
                    This site I built for my Mom to help her sell her art online. Please check out some of her work.
                </p>
            </div>
        </section>
    );
};

export default AboutTheDev;