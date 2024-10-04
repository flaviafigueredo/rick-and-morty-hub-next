import Link from "next/link"
import Image from "next/image"
import logo from "@assets/icon.png"
import React, { useState } from "react"
import { SearchForm } from "@components/SearchForm"

interface HeaderProps {
    onSearch: (name: string) => void
}

export const Header: React.FC<HeaderProps> = ({ onSearch }) => {
    const [theme, setTheme] = useState<'cmyk' | 'dracula'>('cmyk')

    const toggleTheme = () => {
        const newTheme = theme === 'cmyk' ? 'dracula' : 'cmyk'
        setTheme(newTheme)
        document.documentElement.setAttribute('data-theme', newTheme)
    }

    return (
        <header className="navbar bg-base-100 shadow-lg flex justify-between items-center p-4 gap-2">
            <Link href="/">
                <div>
                    <Image
                        src={logo}
                        alt="Rick and Morty Logo"
                        width={50}
                        height={50}
                    />
                </div>
            </Link>

            <div className="flex items-center gap-2">
                <SearchForm onSearch={onSearch} />

                <button aria-label="Toggle theme">
                    <label className="grid cursor-pointer place-items-center">
                        <input
                            type="checkbox"
                            value="synthwave"
                            className="toggle theme-controller bg-base-content col-span-2 col-start-1 row-start-1"
                            checked={theme === 'dracula'}
                            onChange={toggleTheme}
                        />
                        <svg
                            className="stroke-base-100 fill-base-100 col-start-1 row-start-1"
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round">
                            <circle cx="12" cy="12" r="5" />
                            <path
                                d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
                        </svg>
                        <svg
                            className="stroke-base-100 fill-base-100 col-start-2 row-start-1"
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round">
                            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                        </svg>
                    </label>
                </button>
            </div>
        </header>
    )
}