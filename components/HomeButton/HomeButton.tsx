import { HStack, Image } from "@chakra-ui/react"
import { useRouter } from "next/router"

const HomeButton = () => {
    const router = useRouter()
    return (
        <HStack
            as="button"
            onClick={() => {router.push("/")}}
            align="center"
            spacing={2}
            _hover={{ cursor: "pointer" }}
        >
            <Image src="/assets/Logo.svg" alt="GrooveSync Logo" />
        </HStack>
    )
}

export default HomeButton