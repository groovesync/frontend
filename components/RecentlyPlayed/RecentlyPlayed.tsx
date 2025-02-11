import React, { useEffect, useState } from "react";
import { Box, HStack, Image, VStack, Text, Heading, Divider } from "@chakra-ui/react";
import mockData from "../../mockData/recentlyPlayed.json";

interface SpotifyRecentTracksResponse {
  data: {
    cursors: {
      after: string;
      before: string;
    };
    href: string;
    items: TrackItem[];
  };
}

interface TrackItem {
  played_at: string;
  track: Track;
  name: string;
}

interface Track {
  album: Album;
  artists: Artist[];
}

interface Album {
  external_urls: {
    spotify: string;
  };
  images: AlbumImage[];
  name: string;
}

interface AlbumImage {
  height: number;
  url: string;
  width: number;
}

interface Artist {
  external_urls: {
    spotify: string;
  };
  name: string;
}


const RecentlyPlayed = () => {
  const [tracks, setTracks] = useState<SpotifyRecentTracksResponse>()
  
  useEffect(() => {
    fetch("http://localhost:5000/spotify/recent-tracks", 
      {headers: {"Authorization": "Bearer " + localStorage.getItem("@groovesync-backend-token"),
                "Spotify-Token": localStorage.getItem("@groovesync-spotify-access-token") || ""
      }})
    .then((res) => res.json())
    .then((data) => setTracks(data))
    .catch((e) => console.error(e))
}, [])

  return (
    <Box>
      <Heading color="brand.500" fontSize="32px" fontWeight="bold" fontStyle="italic" mb="15px">
        Recently played
      </Heading>
      <VStack spacing={4} align="start">
        {tracks?.data.items.map((track, index) => (
          <React.Fragment key={index}>
            <HStack spacing={4}>
              <Image
                
                
                boxSize="40px"
                borderRadius="3px"
                objectFit="cover"
              />
              <VStack align="start" spacing={0}>
                <Text fontWeight="semibold" fontSize="16px" color="brand.500">
                  
                </Text>
                <Text fontSize="16px" fontStyle="italic" color="brand.500">
                  
                </Text>
              </VStack>
            </HStack>
            {index < mockData.length - 1 && <Divider orientation="horizontal" />}
          </React.Fragment>
        ))}
      </VStack>
    </Box>
  );
};

export default RecentlyPlayed;
