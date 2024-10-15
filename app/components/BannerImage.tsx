"use client"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import bannerImage from "@assets/banner.png"

export const BannerImage = () => {
    const pathname = usePathname()
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    if (!isMounted) return null

    if (pathname !== "/") {
        return null
    }

    return (
        <div className="relative w-full h-[500px] flex flex-col justify-center items-center">
            <svg width="100%" height="300" viewBox="0 0 500 200" className="absolute top-0" aria-hidden="true">
                <defs>
                    <path id="curve" d="M 0 100 Q 250 0, 500 100" />
                </defs>
                <text fill="green" fontSize="40" fontWeight="bold" fontFamily="Get Schwifty">
                    <textPath href="#curve" startOffset="50%" textAnchor="middle">
                        Get Schwifty!
                    </textPath>
                </text>
            </svg>
            <Image
                src={bannerImage}
                alt="Rick and Morty Banner"
                width={400}
                className="filter drop-shadow-lg absolute top-[115px] md:top-[70px] lg:top-[70px] w-[300px] md:w-[400px] lg:w-[400px]"
                priority
            />
        </div>
    )
}