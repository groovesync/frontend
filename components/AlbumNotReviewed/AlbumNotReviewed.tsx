// components/AlbumNotReviewed.tsx
import React from "react";
import { Box, Text, VStack, Image, Button, HStack } from "@chakra-ui/react";
import albums from "../../mockData/albums.json";

const AlbumNotReviewed = () => {
  const album = albums[0]; // Assume fetching the first album for now

  return (
    <Box px={8} py={4}>
      <HStack spacing={6} align="start">
        <Image
          src={album.coverURL}
          alt={album.title}
          boxSize="150px"
          borderRadius="md"
          objectFit="cover"
        />
        <VStack align="start" spacing={1}>
          <Text fontSize="2xl" fontWeight="bold" fontStyle="italic">
            {album.title}
          </Text>
          <Text fontSize="lg" color="gray.500">
            {album.artist} • {album.year}
          </Text>
          <Button colorScheme="blue" size="sm">Listen on Spotify</Button>
        </VStack>
      </HStack>

      <Box mt={4}>
        <Text fontSize="lg" fontWeight="bold">Overall rating</Text>
        <Text fontSize="2xl" color="blue.500">{album.overallRating} out of 5</Text>
      </Box>

      <Box mt={4} textAlign="center">
        <Button colorScheme="blue" size="lg">Write a review now!</Button>
      </Box>
    </Box>
  );
};

export default AlbumNotReviewed;