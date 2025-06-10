import { Box, Image, Text } from "@chakra-ui/react"
import Link from "next/link"

/**
 * AlbumCover component renders a clickable album cover with title and year.
 * Navigates to a specific album page when clicked.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {string} props.title - Title of the album.
 * @param {number} props.year - Release year of the album.
 * @param {string} props.coverURL - URL of the album cover image.
 * @param {string} props.pageURL - URL to navigate to when the album is clicked.
 * @returns {JSX.Element} The rendered album cover.
 */
const AlbumCover: React.FC<{title: string, year: number, coverURL: string, pageURL: string}> = ({title, year, coverURL, pageURL}) => {

    /**
     * Truncates a given text if it exceeds the specified maximum length.
     *
     * @param {string | undefined} text - The text to truncate.
     * @param {number} maxLength - Maximum number of characters allowed before truncation.
     * @returns {string} Truncated text with ellipsis or original text if within limit.
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

                <Text mr={2}>{year}</Text>
            </Box>
        </Box>
    )
}

export default AlbumCover