import React from "react";
import { Box, HStack, Image, VStack, Text, Heading } from "@chakra-ui/react";

type CurrentlyPlayingProps = {
  albumCoverURL: string;
  songTitle: string;
  artistName: string;
};

const CurrentlyPlaying: React.FC<CurrentlyPlayingProps> = ({
  albumCoverURL,
  songTitle,
  artistName,
}) => {

  const truncateText = (text: string, maxLength: number) => {
    if (text.length > maxLength) {
        return text.slice(0, maxLength) + "...";
    }
    return text;
  };

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
            src={albumCoverURL}
            alt={`${songTitle} album art`}
            boxSize="50px"
            borderRadius="md"
            objectFit={"cover"}
            />

            <VStack align="start" spacing={0}>
            <Text fontSize="16px" fontWeight="semibold" color="brand.500">
                {truncateText(songTitle, 35)}
            </Text>
            <Text fontSize="16px" fontStyle="italic" color="brand.500">
                {truncateText(artistName, 35)}
            </Text>
            </VStack>
        </HStack>
        </Box>
    </Box>
  );
};

export default CurrentlyPlaying;
