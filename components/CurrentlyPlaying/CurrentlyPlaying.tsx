import React, { useEffect, useState } from "react";
import { Box, HStack, Image, VStack, Text, Heading } from "@chakra-ui/react";

interface SpotifyCurrentlyPlayingResponse {
  data: {
    item: {
        album: {
          name: string,
          images: {
            url: string
          }[]
        },
        name: string,
        artists: {
          name: string
        }[]

      }
  }
};

const CurrentlyPlaying: React.FC = ({}) => {

  const [currentTrack, setCurrentTrack] = useState<SpotifyCurrentlyPlayingResponse>()

  const formatArtistsName = (artistsNames: {name: string}[] | undefined) => {
    console.log()

    if (!artistsNames) {
      return ""
    }

    if (artistsNames && artistsNames.length == 1) {
      return artistsNames[0]["name"]
    }
    let result = ""
    for (let i = 0; i < artistsNames.length; i++) {
      if (i == artistsNames.length - 1) {
        result = result + ", " + artistsNames[i]["name"]
      } else {
        result += artistsNames[i]["name"] + ", "
      }
    }

    return result
  }

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
    fetch("http://150.165.85.37:5000/spotify/current-track", {
      headers: {"Authorization": "Bearer " + localStorage.getItem("@groovesync-backend-token"),
                "Spotify-Token": localStorage.getItem("@groovesync-spotify-access-token") || ""
              }
    })
    .then((res) => res.json())
    .then((data) => setCurrentTrack(data))
    .catch((e) => console.error(e))
  }, [])

  return (
    <Box>
        <Heading color={"brand.500"} fontSize="32px" fontWeight="bold" fontStyle="italic" mb="15px">
            What you&apos;re up to right now
        </Heading>

        <Box
        bg="brand.400"
        p={4}
        borderRadius="md"
        boxShadow="sm"
        maxW="sm"
        >
        <HStack spacing={4} align="center">
            <Image
            src={currentTrack ? currentTrack?.data.item.album.images[0]["url"] : "/assets/Spotify.svg"}
            alt={`${currentTrack?.data.item.album.name} album art`}
            boxSize="50px"
            borderRadius="md"
            objectFit={"cover"}
            />

            <VStack align="start" spacing={0}>
            <Text fontSize="16px" fontWeight="semibold" color="brand.500">
                {currentTrack ? truncateText(currentTrack?.data.item.name, 35) : "Nothing to display"}
            </Text>
            <Text fontSize="16px" fontStyle="italic" color="brand.500">
                {truncateText(formatArtistsName(currentTrack?.data.item.artists), 35)}
            </Text>
            </VStack>
        </HStack>
        </Box>
    </Box>
  );
};

export default CurrentlyPlaying;
