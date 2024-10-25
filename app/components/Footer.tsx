import Image from 'next/image';
import footerImg from '@assets/footer-img.png';

export const Footer = () => {
    return (
        <footer className="footer bg-neutral text-neutral-content flex flex-col sm:flex-row justify-between items-center p-4">
            <aside className="flex items-center gap-2 mb-2 sm:mb-0">
                <Image
                    src={footerImg}
                    alt="Rick and Morty's dog"
                    width={100}
                    className="filter drop-shadow-lg"
                />
                <p>Copyright © {new Date().getFullYear()} - All rights reserved</p>
            </aside>

            <div className="text-center">
                <p className="text-sm">
                    Developed with 🩶 by <a href="https://flaviafigueredo.github.io/portfolio/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline"
                        aria-label="Visit Flávia Figueredo's portfolio">
                        Flávia Figueredo
                    </a>
                </p>
            </div>
        </footer>
    );
};