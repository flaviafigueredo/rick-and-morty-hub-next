import Link from "next/link"
import Image from "next/image"
import logo from "@assets/icon.png"
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline"
import { useState } from "react"

export const Header = () => {
    const [theme, setTheme] = useState<'cmyk' | 'dracula'>('cmyk')

    const toggleTheme = () => {
        const newTheme = theme === 'cmyk' ? 'dracula' : 'cmyk'
        setTheme(newTheme)
        document.documentElement.setAttribute('data-theme', newTheme)
    }

    return (
        <header className="flex justify-between items-center p-4">
            <Link href="/">
                <Image
                    src={logo}
                    alt="Rick and Morty Logo"
                    width={50}
                    height={50}
                />
            </Link>

            <button onClick={toggleTheme} className="flex items-center">
                {theme === 'cmyk' ? (
                    <MoonIcon className="w-6 h-6 text-gray-800 transition-transform duration-200 transform hover:scale-110" aria-label="Switch to Dracula theme" />
                ) : (
                    <SunIcon className="w-6 h-6 text-yellow-500 transition-transform duration-200 transform hover:scale-110" aria-label="Switch to CMYK theme" />
                )}
            </button>
        </header>
    )
}