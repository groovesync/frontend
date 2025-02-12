import React, { useEffect, useState } from "react";
import { Box, Grid, Heading, Image } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";


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

const YourObssessions = () => {
  const [images, setImages] = useState<SpotifyObssessionsResponse>()

  const router = useRouter()

  useEffect(() => {
    fetch("http://localhost:5000/spotify/obsessions", {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("@groovesync-backend-token"),
        "Spotify-Token": localStorage.getItem("@groovesync-spotify-access-token") || ""
      }
    })
    .then((res) => res.json())
    .then((data) => setImages(data))
    .catch((e) => console.error(e))
  }, [])


  return (
    <Box
     w="fit-content">

        <Heading color={"brand.500"} fontSize="32px" fontWeight="bold" fontStyle="italic" mb="15px">
            Your obsessions
        </Heading>

        <Grid
        templateColumns="300px 150px"
        alignItems="center"
        w="max-content"
        >
        <Box>
            <Image
            src={images?.data.items[0].images[0].url}
            onClick={() => router.push("/artist/"+images?.data.items[0].id)}
            alt="Main Image"
            objectFit="cover"
            w="300px"
            h="300px"
            cursor={"pointer"}
            />
        </Box>

        <Grid templateRows="repeat(2, 150px)" templateColumns="repeat(2, 150px)" gap={0}>
            {images?.data.items.slice(1, images?.data.items.length).map((artist, index) => (
            <Image
                key={index}
                onClick={() => router.push("/artist/"+artist.id)}
                src={artist.images[0].url}
                alt={`Secondary Image ${index + 1}`}
                objectFit="cover"
                w="150px"
                h="150px"
                cursor={"pointer"}
            />
            ))}
        </Grid>
        </Grid>
    </Box>
  );
};

export default YourObssessions;
