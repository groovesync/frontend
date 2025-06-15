import React, { useEffect, useState } from "react";
import { Box, HStack, Image, VStack, Text, Heading, Divider, Spinner } from "@chakra-ui/react";


/**
 * Interface representing the structure of the Spotify API response
 * for a user's recently played tracks.
 */
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

/**
 * **RecentlyPlayed Component**
 *
 * Displays the user's recently played Spotify tracks as a vertical list.
 *
 * Features:
 * - Fetches data from GrooveSync backend's `/spotify/recent-tracks` endpoint.
 * - Shows a loading spinner while data is being fetched.
 * - Displays each track with:
 *   - Album cover image
 *   - Track name
 *   - Artists (comma-separated)
 * - Adds dividers between each track item for visual separation.
 *
 * **API Endpoint Used:**
 * - `GET http://150.165.85.37:5000/spotify/recent-tracks`
 *
 * **Expected Local Storage Keys for Authorization:**
 * - `@groovesync-backend-token`
 * - `@groovesync-spotify-access-token`
 *
 * @component
 * @example
 * ```tsx
 * <RecentlyPlayed />
 * ```
 */
const RecentlyPlayed = () => {
  const [tracks, setTracks] = useState<SpotifyRecentTracksResponse>()
  const [isLoading, setIsLoading] = useState(true)

  
  /**
   * Formats an array of artist objects into a comma-separated string of artist names.
   *
   * @param artistsNames - Array of artist objects with `name` property.
   * @returns A single string with artist names separated by commas.
   */
  const formatArtistsName = (artistsNames: { name: string }[]): string => {
    return artistsNames.map((artist) => artist.name).join(", ");
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
