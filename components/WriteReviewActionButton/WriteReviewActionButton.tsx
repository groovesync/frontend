import { Button, Image } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";

interface WriteReviewProps {
    customWidth?: string;
    albumId?: string
}

const WriteReviewActionButton: React.FC<WriteReviewProps> = ({ customWidth, albumId }) => {
    const router = useRouter();
    const { id } = router.query;

    const handleOnClick = () => {
        if (albumId) {
            router.push("/review?albumId="+albumId)
        } else if (id) {
            router.push("/review?albumId="+id)
        } else {
            router.push("/review?albumId=")
        }
    }

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
            onClick={handleOnClick} 
        >
            <MusicIcon /> Write a review now!
        </Button>
    );
};

const MusicIcon = () => {
    return <Image alt="Music icon" src={"/assets/Music.svg"} />;
};

export default WriteReviewActionButton;
