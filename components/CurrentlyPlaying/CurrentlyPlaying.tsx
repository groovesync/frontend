import React, { useEffect, useState } from "react";
import { Box, HStack, Image, VStack, Text, Heading } from "@chakra-ui/react";

/**
 * Interface representing the structure of the Spotify API response
 * for the currently playing track.
 */
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

/**
 * **CurrentlyPlaying Component**
 *
 * Displays the user's currently playing Spotify track, showing:
 * - Album artwork
 * - Track name
 * - Artists
 *
 * If the user is not currently playing anything, a placeholder image and message are shown.
 *
 * **API Endpoint Used:**
 * - `GET http://150.165.85.37:5000/spotify/current-track`
 *
 * **Expected Local Storage Keys for Authorization:**
 * - `@groovesync-backend-token`
 * - `@groovesync-spotify-access-token`
 *
 * **Features:**
 * - Fetches current playing track from the backend on component mount.
 * - Handles error states silently (logs to console).
 * - Limits the displayed text length for both track and artist names.
 *
 * @component
 * @example
 * ```tsx
 * <CurrentlyPlaying />
 * ```
 */
const CurrentlyPlaying: React.FC = ({}) => {

  const [currentTrack, setCurrentTrack] = useState<SpotifyCurrentlyPlayingResponse>()

  /**
   * Formats an array of artist objects into a comma-separated string of artist names.
   *
   * @param artistsNames - Array of artist objects.
   * @returns A string of artist names separated by commas.
   */
  const formatArtistsName = (artistsNames: { name: string }[]) => {
    return artistsNames.map(artist => artist.name).join(", ");
  };
  

  /**
   * Truncates a given text to a specified maximum length, appending an ellipsis if it exceeds the limit.
   *
   * @param text - The text to truncate.
   * @param maxLength - Maximum allowed length of the text.
   * @returns The truncated text with ellipsis if necessary.
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
            src={currentTrack?.data ? currentTrack?.data.item?.album.images[0]["url"] : "/assets/Spotify.svg"}
            alt={`${currentTrack?.data ? currentTrack?.data.item.album.name : ""} album art`}
            boxSize="50px"
            borderRadius="md"
            objectFit={"cover"}
            />

            <VStack align="start" spacing={0}>
            <Text fontSize="16px" fontWeight="semibold" color="brand.500">
                {currentTrack?.data ? truncateText(currentTrack?.data.item.name, 35) : "Nothing to display"}
            </Text>
            <Text fontSize="16px" fontStyle="italic" color="brand.500">
                {truncateText(formatArtistsName(currentTrack?.data ? currentTrack?.data.item.artists : []), 35)}
            </Text>
            </VStack>
        </HStack>
        </Box>
    </Box>
  );
};

export default CurrentlyPlaying;
