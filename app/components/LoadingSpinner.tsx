import Image from "next/image"
import portalGif from "@assets/portal.gif"

export const LoadingSpinner = () => {
    return (
        <div className="flex items-center justify-center h-screen">
            <Image
                src={portalGif}
                alt="Loading Portal"
                width={200}
                priority
            />
        </div>
    )
}