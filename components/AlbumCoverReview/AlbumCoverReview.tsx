import { Box, Flex, HStack, Image, Text, Icon } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { Rating } from "../Rating/Rating";

/**
 * Truncates the provided text if it exceeds the specified maximum length.
 *
 * @param {string | undefined} text - The text to truncate.
 * @param {number} maxLength - The maximum allowed length before truncating.
 * @returns {string} The truncated text with ellipsis or the original text.
 */
const truncateText = (text: string | undefined, maxLength: number) => {
    if (!text) {
      return ""
    }

    if (text.length > maxLength) {
        return text.slice(0, maxLength) + "...";
    }
    return text;
  };


  
/**
 * AlbumCoverReview component displays an album cover with title, release year,
 * and an optional rating. It links to a detailed page when clicked.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {string} props.title - The title of the album.
 * @param {number} props.year - The release year of the album.
 * @param {number} [props.rating] - The optional rating of the album.
 * @param {string} props.coverURL - The URL of the album cover image.
 * @param {string} props.pageURL - The URL to navigate to when the component is clicked.
 * @returns {JSX.Element} A styled box containing album information and a link.
 */
const AlbumCoverReview: React.FC<{title: string, year: number, rating?: number, coverURL: string, pageURL: string}> = ({title, year, rating, coverURL, pageURL}) => {
    return (
        <Box
        width="200px"
        cursor={"pointer"}
        as={Link}
        href={pageURL}
        display="flex"
        flexDirection={"column"}>
            <Image 
            src={coverURL} 
            alt={title} 
            objectFit="cover" 
            width="200px" 
            borderRadius="5px"
            _hover={{ boxShadow: "md", transform: "scale(1.05)" }}
            transition="all 0.2s ease-in-out"/>

            <Box p={2} w="fit-content">
                <Text fontSize="16px" fontWeight="medium" color="brand.500" isTruncated>
                {truncateText(title, 20)}
                </Text>

                <Flex fontSize="16px" color="brand.500" mt={1}>
                <Text mr={2}>{year}</Text>

                {rating && ( 
                    <>
                    <Text mr={2}>•</Text> 
                    <Rating value={rating} isReadOnly /> 
                    </>)}
                
                </Flex>
            </Box>
        </Box>
    )
}

export default AlbumCoverReview