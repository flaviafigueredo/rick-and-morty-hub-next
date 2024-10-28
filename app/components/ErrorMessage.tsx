import React from 'react';

interface ErrorMessageProps {
    message: string
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
    return (
        <section className="flex justify-center items-center min-h-[50vh] w-full md:w-3/5 lg:w-2/5 px-4 mx-auto">
            <div role="alert" className="alert alert-error flex justify-center items-center">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 shrink-0 stroke-current"
                    fill="none"
                    viewBox="0 0 24 24">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                    <p>{message}</p>
                    <p className="text-center">Or <a href="/" aria-label="Go to homepage" className="underline"> return to the homepage.</a></p>
                </div>
            </div>
        </section>
    );
};