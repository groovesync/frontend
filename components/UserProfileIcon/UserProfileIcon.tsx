'use client'

import { Image } from "@chakra-ui/react"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

const UserProfileIcon = () => {
    const router = useRouter()
    const [userProfilePictureURL, setUserProfilePictureURL] = useState("")

    useEffect(() => {
        if (typeof window !== "undefined") {
            // Agora é seguro acessar o localStorage
            setUserProfilePictureURL(localStorage.getItem("profilePictureURL") || "")
        }
    }, [])

    return (
        <Image
            src={userProfilePictureURL}
            alt="Profile Photo"
            boxSize="40px"
            borderRadius="full"
            onClick={() => router.push("/profile")}
            _hover={{ cursor: "pointer" }}
        />
    )
}

export default UserProfileIcon