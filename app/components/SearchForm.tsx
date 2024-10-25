import React, { useState } from 'react';

interface SearchFormProps {
    onSearch: (value: string) => void
}

export const SearchForm: React.FC<SearchFormProps> = ({ onSearch }) => {
    const [inputValue, setInputValue] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (inputValue.trim()) {
            onSearch(inputValue);
            setInputValue('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="input input-bordered flex items-center gap-2">
            <input
                type="text"
                className="grow w-full md:w-1/2 placeholder:text-sm"
                placeholder="Search by name"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                aria-label="Character name"
            />
            <button type="submit" aria-label="Search">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="h-4 w-4 opacity-70">
                    <path
                        fillRule="evenodd"
                        d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                        clipRule="evenodd" />
                </svg>
            </button>
        </form>
    );
};