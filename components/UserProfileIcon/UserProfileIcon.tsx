'use client'

import { Image } from "@chakra-ui/react"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

const UserProfileIcon = () => {
    const router = useRouter()
    const [userProfilePictureURL, setUserProfilePictureURL] = useState("")
    const [userId, setUserId] = useState("")

    useEffect(() => {
        if (typeof window !== "undefined") {
            setUserProfilePictureURL(localStorage.getItem("@groovesync-profile-picture-url") || "")
            setUserId(localStorage.getItem("@groovesync-spotify-id") || "")
        }
    }, [])

    return (
        <Image
            src={userProfilePictureURL}
            alt="Profile Photo"
            boxSize="40px"
            borderRadius="full"
            onClick={() => router.push("/profile/" + userId)}
            _hover={{ cursor: "pointer" }}
        />
    )
}

export default UserProfileIcon