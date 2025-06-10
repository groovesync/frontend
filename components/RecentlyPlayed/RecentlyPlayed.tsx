import React, { useEffect, useState } from "react";
import { Box, HStack, Image, VStack, Text, Heading, Divider, Spinner } from "@chakra-ui/react";

interface SpotifyRecentTracksResponse {
  data: {
    items: {
      track: {
        name: string,
        album: {
          name: string,
          images: {
            url: string
          }[]
        },
        artists: {
          name: string
        }[]
      }
  }[]
  }
}

const RecentlyPlayed = () => {
  const [tracks, setTracks] = useState<SpotifyRecentTracksResponse>()
  const [isLoading, setIsLoading] = useState(true)

  const formatArtistsName = (artistsNames: { name: string }[]) => {
    return artistsNames.map(artist => artist.name).join(", ");
  };
  
  
  useEffect(() => {
    fetch("http://150.165.85.37:5000/spotify/recent-tracks", 
      {headers: {"Authorization": "Bearer " + localStorage.getItem("@groovesync-backend-token"),
                "Spotify-Token": localStorage.getItem("@groovesync-spotify-access-token") || ""
      }})
    .then((res) => res.json())
    .then((data) => setTracks(data))
    .then(() => setIsLoading(false))
    .catch((e) => console.error(e))
}, [])

  

  return (
    <Box>
      <Heading color="brand.500" fontSize="32px" fontWeight="bold" fontStyle="italic" mb="15px">
        Recently played
      </Heading>
      <VStack spacing={4} align="start">
        {isLoading || !tracks?.data ? <Box
            w="600px"
            h="400px"
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}>
            
            <Spinner />
          </Box> : tracks?.data.items.map((track, index) => (
          <React.Fragment key={index}>
            <HStack spacing={4}>
              <Image
                src={track.track.album.images[0]["url"]}
                alt={track.track.album.name}
                boxSize="40px"
                borderRadius="3px"
                objectFit="cover"
              />
              <VStack align="start" spacing={0}>
                <Text fontWeight="semibold" fontSize="16px" color="brand.500">
                  {track.track.name}
                </Text>
                <Text fontSize="16px" fontStyle="italic" color="brand.500">
                  {formatArtistsName(track.track.artists)}
                </Text>
              </VStack>
            </HStack>
            {index < tracks?.data.items.length - 1 && <Divider orientation="horizontal" />}
          </React.Fragment>
        ))}
      </VStack>
    </Box>
  );
};

export default RecentlyPlayed;
