import React, { useEffect, useState } from "react";
import { Box, Text, VStack, Image, Spinner } from "@chakra-ui/react";
import { useRouter } from "next/router";

/**
 * Type definition for the API response containing popular albums among friends.
 */
interface PopularResponse {
  albums: {
    name: string,
    image: string,
    release_year: string,
    id: string
  }[]
}


/**
 * React component to display a horizontal scrollable list of albums
 * that are popular among the user's friends.
 *
 * This component:
 * - Fetches popular albums from a backend API.
 * - Handles loading and empty states.
 * - Displays album covers and release years.
 * - Navigates to the album detail page when an album is clicked.
 *
 * **Expected Environment Variables/Local Storage Keys:**
 * - `@groovesync-spotify-id`
 * - `@groovesync-backend-token`
 * - `@groovesync-spotify-access-token`
 *
 * @component
 * @example
 * ```tsx
 * <PopularWithFriends />
 * ```
 */
const PopularWithFriends: React.FC = () => {

  const [isLoading, setIsLoading] = useState(true)
  const [popular, setPopular] = useState<PopularResponse>()
  const router = useRouter()
  
  /**
 * Utility function to truncate a given text to a specified maximum length,
 * appending an ellipsis if the text exceeds that length.
 *
 * @param text - The input text to truncate.
 * @param maxLength - The maximum allowed length of the text.
 * @returns The truncated text with ellipsis if needed.
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

  useEffect(() => {
    setIsLoading(true)
    fetch(`http://150.165.85.37:5000/review/popular-with-friends?spotifyId=${localStorage.getItem("@groovesync-spotify-id") || ""}`,{
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("@groovesync-backend-token"),
        "Spotify-Token": localStorage.getItem("@groovesync-spotify-access-token") || ""
      }})
      .then((res) => res.json())
      .then((data) => {
        setPopular(data)
      })
      .then(() => setIsLoading(false))
  }, [])

  return (
    <Box mt={8} width="70%" maxW="40em" textAlign="left">
      <Text fontSize="32px" fontWeight="bold" fontStyle="italic" mb={4}>
        Popular with friends
      </Text>
      <Box
        overflowX={"scroll"}
        display={"flex"}
        flexDirection={"row"}
        gap={3}>
          {isLoading ? 
            <Box w="100%" h="250px" display={"flex"} alignItems={"center"} justifyContent={"center"}>
              <Spinner />
            </Box> : (popular?.albums.length || 0) == 0 ?  <Box
              w={"100%"}
              h={"200px"}
              backgroundColor={"#e6e8fa"}
              borderRadius={"10px"}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              color={"brand.500"}>
              Follow people to discover what&apos;s popular!  
            </Box> : popular?.albums.slice(0, 5).map((item, index) => (
            <Box
              key={index}
              bg="white"
              borderRadius="5px"
              textAlign="center"
              w="150px"
              onClick={() => router.push(`/album/${item.id}`)}
              cursor={"pointer"}
            >
             <Image
                src={item.image}
                alt={item.name}
                style={{ borderRadius: "5px" }}
                minW={"150px"}
                h={"150px"}
                objectFit="cover"
                mb={2}
              />

              <Text fontWeight="medium" fontSize="lg" textAlign={"left"}>
                {truncateText(item.name, 15)}
              </Text>
              <Text fontSize="sm" color="gray.500" textAlign={"left"}>
                {item.release_year}
              </Text>
            </Box>
          ))}
      </Box>
    </Box>
  );
};

export default PopularWithFriends;