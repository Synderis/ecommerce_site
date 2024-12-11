import React from 'react';

const AboutTheArtist = () => {
    return (
        <section className='dark:bg-gradient-to-b pt-12 lg:pl-0 pl-5 py-12 mb-20 dark:from-orange-800/10 dark:to-gray-800'>
            <div className="container mx-auto p-4 mt-10 h-full">
                <div>
                    <h1 className="text-3xl font-bold mb-4">About The Artist</h1>
                    <img
                        src="https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80"
                        alt="first"
                        className="h-60 w-48 mx-2  object-cover float-right"
                    />
                    <p className="text-lg mb-4 text-wrap">
                        Fill this with a short introduction for the artist.
                    </p>
                    <p className="text-lg mb-4 text-wrap">
                        Fill this with background information for the artist. Filler incoming in 3... 2... 1... Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctor, vestibulum magna sed, convallis ex. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctor, vestibulum magna sed, convallis ex. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctor, vestibulum magna sed, convallis ex. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctor, vestibulum magna sed, convallis ex.
                    </p>
                    <p className="text-lg mb-4 text-wrap">
                        Fill this with background information for the artist. Filler incoming in 3... 2... 1... Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctor, vestibulum magna sed, convallis ex. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctor, vestibulum magna sed, convallis ex. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctor, vestibulum magna sed, convallis ex. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctor, vestibulum magna sed, convallis ex. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctor, vestibulum magna sed, convallis ex.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default AboutTheArtist;