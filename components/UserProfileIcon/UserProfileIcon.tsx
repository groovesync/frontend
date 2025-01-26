import { Image } from "@chakra-ui/react"
import { useRouter } from "next/router"

const UserProfileIcon = () => {
    const router = useRouter()
    return (
        <Image
            src="/assets/UserIcon.svg"
            alt="Profile Photo"
            boxSize="40px"
            borderRadius="full"
            onClick={() => router.push("/profile")}
            _hover={{ cursor: "pointer" }}
        />
    )
}

export default UserProfileIcon