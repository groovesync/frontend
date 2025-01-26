import { Button, Image } from "@chakra-ui/react"
import { useRouter } from "next/router"

const WriteReviewActionButton = () => {
    const router = useRouter()

    return (
        <Button
            bg="brand.500"
            h="45px"
            w="fit-content"
            fontFamily={"IBM Plex Sans"}
            fontWeight="regular"
            color="white"
            borderRadius="full"
            px={"50px"}
            gap={4}
            _hover={{ boxShadow: "lg" }}
            _active={{ boxShadow: "md" }}
            transition="box-shadow 0.2s ease-in-out"
            onClick={() => router.push("/review")}
        >
            <MusicIcon />  Write a review now!
        </Button>
    )
}

const MusicIcon = () => {
    return (
        <Image src={"/assets/Music.svg"}/>
    )
}

export default WriteReviewActionButton