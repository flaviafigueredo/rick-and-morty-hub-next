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
        <div className="relative w-full h-[400px] flex justify-center items-center">
            <div className="absolute top-[-50px]">
                <Image
                    src={bannerImage}
                    alt="Rick and Morty Banner"
                    width={400}
                />
            </div>
        </div>
    )
}