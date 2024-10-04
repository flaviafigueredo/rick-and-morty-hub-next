import Image from "next/image"
import footerImg from "@assets/footer-img.png"

export const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="flex flex-col sm:flex-row justify-center items-center gap-2 py-4 space-x-2 border-t border-gray-300">
            <div className="text-center">
                <p className="text-sm">© {currentYear} All rights reserved.</p>

                <p className="text-sm">
                    Developed with 🩶 by <a href="https://flaviafigueredo.github.io/portfolio/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline">
                        Flávia Figueredo
                    </a>
                </p>
            </div>

            <Image
                src={footerImg}
                alt="Rick and Morty's dog"
                width={100}
                className="filter drop-shadow-lg"
            />
        </footer>
    )
}