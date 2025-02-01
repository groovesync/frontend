import React from "react";
import { Box, HStack, Image, VStack, Text, Heading, Divider } from "@chakra-ui/react";
import mockData from "../../mockData/recentlyPlayed.json";

const RecentlyPlayed = () => {
  return (
    <Box>
      <Heading color="brand.500" fontSize="32px" fontWeight="bold" fontStyle="italic" mb="15px">
        Recently played
      </Heading>
      <VStack spacing={4} align="start">
        {mockData.map((track, index) => (
          <React.Fragment key={index}>
            <HStack spacing={4}>
              <Image
                src={track.albumCoverURL}
                alt={track.trackName}
                boxSize="40px"
                borderRadius="3px"
                objectFit="cover"
              />
              <VStack align="start" spacing={0}>
                <Text fontWeight="semibold" fontSize="16px" color="brand.500">
                  {track.trackName}
                </Text>
                <Text fontSize="16px" fontStyle="italic" color="brand.500">
                  {track.artistName}
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
