import { Button, Image } from "@chakra-ui/react"
import { useRouter } from "next/router"
import React from "react"

interface WriteReviewProps {
    albumId?: string,
    customWidth?: string
}

const WriteReviewActionButton: React.FC<WriteReviewProps> = ({albumId, customWidth}) => {
    const router = useRouter()

    return (
        <Button
            bg="brand.500"
            h="45px"
            w={customWidth ? customWidth : "fit-content"}
            fontFamily={"IBM Plex Sans"}
            fontWeight="regular"
            color="white"
            borderRadius="full"
            px={"50px"}
            gap={4}
            _hover={{ boxShadow: "lg" }}
            _active={{ boxShadow: "md" }}
            transition="box-shadow 0.2s ease-in-out"
            onClick={() => albumId ? router.push(`/review/${albumId}`) : router.push(`/review/`)}
        >
            <MusicIcon />  Write a review now!
        </Button>
    )
}

const MusicIcon = () => {
    return (
        <Image alt="Music icon" src={"/assets/Music.svg"}/>
    )
}

export default WriteReviewActionButton