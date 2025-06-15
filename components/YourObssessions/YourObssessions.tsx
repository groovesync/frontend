import React, { useEffect, useState } from "react";
import { Box, Grid, Heading, Image, Spinner } from "@chakra-ui/react";
import { useRouter } from "next/router";

/**
 * Interface representing the structure of the Spotify API response
 * for the user's top artists (obsessions).
 */
interface SpotifyObssessionsResponse {
  data: {
    items: {
      id: string,
      images: { 
        url: string
      }[]
    }[]
  }
}


/**
 * **YourObssessions Component**
 *
 * Displays a visual grid of the user's current top Spotify artists (their "obsessions").
 *
 * Layout:
 * - **Main artist** (largest image on the left)
 * - **Four secondary artists** (smaller grid on the right)
 *
 * Behavior:
 * - Fetches artist data from the GrooveSync backend API.
 * - Handles loading state with a spinner.
 * - Clicking on an artist navigates the user to the artist's detail page (`/artist/[id]`).
 *
 * **API Endpoint Used:**
 * - `GET http://150.165.85.37:5000/spotify/obsessions`
 *
 * **Expected Local Storage Keys for Authorization:**
 * - `@groovesync-backend-token`
 * - `@groovesync-spotify-access-token`
 *
 * @component
 * @example
 * ```tsx
 * <YourObssessions />
 * ```
 */
const YourObssessions = () => {
  const [images, setImages] = useState<SpotifyObssessionsResponse>()
  const [isLoading, setIsLoading] = useState(true)

  const router = useRouter()

  useEffect(() => {
    fetch("http://150.165.85.37:5000/spotify/obsessions", {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("@groovesync-backend-token"),
        "Spotify-Token": localStorage.getItem("@groovesync-spotify-access-token") || ""
      }
    })
    .then((res) => res.json())
    .then((data) => setImages(data))
    .then(() => setIsLoading(false))
    .catch((e) => console.error(e))
  }, [])


  return (
    <Box
     w="fit-content">

        <Heading color={"brand.500"} fontSize="32px" fontWeight="bold" fontStyle="italic" mb="15px">
            Your obsessions
        </Heading>

        {isLoading ? 
          <Box
            w="600px"
            h="300px"
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}>
            
            <Spinner />
          </Box> : 
        <Grid
        templateColumns="300px 150px"
        alignItems="center"
        w="max-content"
        >
        <Box>
            <Image
            src={images?.data ? images?.data.items[0].images[0].url : ""}
            onClick={() => router.push("/artist/"+images?.data.items[0].id)}
            alt="Main Image"
            objectFit="cover"
            w="300px"
            h="300px"
            cursor={"pointer"}
            />
        </Box>

        <Grid templateRows="repeat(2, 150px)" templateColumns="repeat(2, 150px)" gap={0}>
            {images?.data ? images.data.items.slice(1, images?.data.items.length).map((artist, index) => (
            <Image
                key={index}
                onClick={() => router.push("/artist/"+artist.id)}
                src={artist.images ? artist.images[0].url : ""}
                alt={`Secondary Image ${index + 1}`}
                objectFit="cover"
                w="150px"
                h="150px"
                cursor={"pointer"}
            />
            )) : ""}
        </Grid>
        </Grid>}
    </Box>
  );
};

export default YourObssessions;
