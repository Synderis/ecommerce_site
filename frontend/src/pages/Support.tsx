import React from "react";
import { Button, Input, Textarea, Typography } from "@material-tailwind/react";
import { api_url } from "../utils/utils";
import "./supp.css";




export function ContactSection() {

    const handleFormSubmit = async(event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        const formData = new FormData(event.currentTarget);
        const data = Object.fromEntries(formData);
        const payload = {
            first_name: data.first_name,
            last_name: data.last_name,
            email: data.email,
            message: data.message,
        };
        const url = `${api_url}/auth/contact`;
        const response = await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        })
        if (response.ok) {
            alert("Message sent successfully");
        }
    };



    return (
        <section className="grid text-center lg:mt-[-10rem] lg:mb-[-6rem] h-screen items-center p-8 dark:bg-gradient-to-b dark:from-orange-800/10 dark:to-gray-800">
            <div>
                <Typography
                    variant="h1"
                    color="blue-gray"
                    className="mb-4 !text-3xl lg:!text-5xl text-gray-900"
                >
                    Contact Us
                </Typography>
                <Typography className="mb-10 font-normal !text-lg lg:mb-10 mx-auto max-w-3xl text-gray-900">
                    Whether it&apos;s a question about our services, a request for
                    technical assistance, or suggestions for improvement, our team is
                    eager to hear from you.
                </Typography>
                <div className="flex flex-col items-center">
                    <form
                        onSubmit={handleFormSubmit}
                        className="flex flex-col gap-4 lg:max-w-sm"
                    >
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Typography
                                    variant="small"
                                    className="mb-2 text-left font-medium !text-gray-900"
                                >
                                    First Name
                                </Typography>
                                <Input
                                    color="gray"
                                    size="lg"
                                    placeholder="First Name"
                                    name="first_name"
                                    className="w-full placeholder:opacity-100 focus:border-t-primary text-gray-900 border-t-blue-gray-200 dark:focus:border-orange-300"
                                    containerProps={{
                                        className: "min-w-full",
                                    }}
                                    labelProps={{
                                        className: "hidden",
                                    }}
                                />
                            </div>
                            <div>
                                <Typography
                                    variant="small"
                                    className="mb-2 text-left font-medium !text-gray-900"
                                >
                                    Last Name
                                </Typography>
                                <Input
                                    color="gray"
                                    size="lg"
                                    placeholder="Last Name"
                                    name="last_name"
                                    className="w-full placeholder:opacity-100 focus:border-t-primary text-gray-900 border-t-blue-gray-200 dark:focus:border-orange-300"
                                    containerProps={{
                                        className: "min-w-full",
                                    }}
                                    labelProps={{
                                        className: "hidden",
                                    }}
                                />
                            </div>
                        </div>
                        <div>
                            <Typography
                                variant="small"
                                className="mb-2 text-left font-medium !text-gray-900"
                            >
                                Your Email
                            </Typography>
                            <Input
                                color="gray"
                                size="lg"
                                placeholder="name@email.com"
                                name="email"
                                className="w-full placeholder:opacity-100 focus:border-t-primary text-gray-900 border-t-blue-gray-200 dark:focus:border-orange-300"
                                containerProps={{
                                    className: "!min-w-full",
                                }}
                                labelProps={{
                                    className: "hidden",
                                }}
                            />
                        </div>
                        <div>
                            <Typography
                                variant="small"
                                className="mb-2 text-left font-medium !text-gray-900"
                            >
                                Your Message
                            </Typography>
                            <Textarea
                                rows={6}
                                color="gray"
                                placeholder="Message"
                                name="message"
                                className="w-full placeholder:opacity-100 focus:border-t-primary text-gray-900 border-t-blue-gray-200 dark:focus:border-orange-300"
                                containerProps={{
                                    className: "!min-w-full",
                                }}
                                labelProps={{
                                    className: "hidden",
                                }}
                            />
                        </div>
                        <Button type="submit" className="bg-orange-300 dark:bg-orange-800/30 text-blue-gray-900 dark:text-white shadow-1 hover:scale-105 focus:scale-105 active:scale-100" color="gray">
                            Send message
                        </Button>
                    </form>
                </div>
            </div>
        </section>
    );
}

export default ContactSection;