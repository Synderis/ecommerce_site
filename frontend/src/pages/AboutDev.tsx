import React from 'react';

const AboutTheDev = () => {
    return (
        <section className='dark:bg-gradient-to-b pt-12 lg:pl-0 pl-5 py-12 mb-20 dark:from-orange-800/10 dark:to-gray-800'>
            <div className="container mx-auto p-4 mt-10 h-full">
                <h1 className="text-3xl font-bold mb-4">About Me</h1>
                <p className="text-lg mb-4">
                    I'm Dylan Tocci, I go by Synderis online and my background is in Data/Software Engineering primarily in Python and SQL.
                </p>
                <p className="text-md mb-4">
                    The site is open source and you can find it on my <a href="https://github.com/Synderis/ecommerce_site" className='hover:scale-105 text-blue-500 hover:text-blue-600 dark:text-orange-300 dark:hover:text-orange-400' target="_blank" rel="noopener noreferrer">GitHub.</a>.
                </p>
                <h2 className="text-2xl font-bold mb-2">Technologies Used</h2>
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