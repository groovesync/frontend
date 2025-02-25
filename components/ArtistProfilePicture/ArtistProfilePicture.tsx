import { Avatar, Box, Image, Text } from "@chakra-ui/react";
import Link from "next/link";
import userProfileData from "../../mockData/userProfileDatav2.json"

const ArtistProfilePicture: React.FC<{name: string, pictureURL: string, pageURL: string}> = ({name, pictureURL, pageURL}) => {
    return (
        <Box
        width="160px"
        cursor={"pointer"}
        as={Link}
        href={pageURL}
        display="flex"
        flexDirection={"column"}
        alignItems="center">
            <Avatar src={pictureURL} w="160px" h="160px" 
            _hover={{ boxShadow: "md", transform: "scale(1.05)" }} 
            transition="all 0.2s ease-in-out" mr={4} />

            <Box p={2} w="100%" textAlign="left">
                <Text fontSize="16px" fontWeight="medium" color="brand.500" isTruncated>
                {name}
                </Text>
            </Box>
        </Box>
    );
};

export default ArtistProfilePicture;
