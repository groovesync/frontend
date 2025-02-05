import React from "react";
import {
  Box,
  Text,
  VStack,
  Image,
  Button,
  HStack,
} from "@chakra-ui/react";
import HomeButton from "../HomeButton/HomeButton";
import UserProfileIcon from "../UserProfileIcon/UserProfileIcon";

const AlbumNotReviewed = ({ album }) => {
  const reviews = [
    { name: "Lucas de Medeiros", rating: 5, comment: "An amazing album." },
    { name: "Sabrina Barbosa", rating: 4, comment: "Loved the sound!" },
  ];

  const overallRating =
    reviews.length > 0
      ? (reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length).toFixed(1)
      : "Not Rated Yet";

  return (
    <Box>
      {/* Header Section */}
      <HStack justify="space-between" px={8} py={4} borderBottom="1px solid #E2E8F0">
        <HomeButton />
        <UserProfileIcon />
      </HStack>

      {/* Album Details */}
      <HStack align="center" spacing={8} mt={8} px={8}>
        <Image
          src={album.coverURL}
          alt={album.title}
          boxSize="250px"
          borderRadius="md"
        />

        <VStack align="flex-start" spacing={4}>
          <Text fontSize="4xl" fontWeight="bold" fontStyle="italic">
            {album.title}
          </Text>
          <Text fontSize="lg" color="gray.500" fontStyle="italic">
            {album.artist}
          </Text>

          <Button
            as="a"
            href="https://open.spotify.com"
            colorScheme="teal"
            variant="outline"
            borderRadius="full"
            size="md"
          >
            Listen on Spotify
          </Button>

          <Box mt={4}>
            <Text fontWeight="bold" fontSize="xl">
              Overall Rating
            </Text>
            <Text fontSize="2xl" color="blue.500" fontWeight="bold">
              {overallRating} out of 5
            </Text>
          </Box>
        </VStack>
      </HStack>

      {/* Write Review Section */}
      <Box mt={4} textAlign="center" px={8}>
        <Button
          bg="#2D3748"
          color="white"
          _hover={{ bg: "#1A202C" }}
          borderRadius="full"
          size="lg"
          px={6}
        >
          Write a review now!
        </Button>
      </Box>

      {/* Reviews Section */}
      <Box mt={8} px={8}>
        <Text fontSize="2xl" fontWeight="bold" mb={4}>
          Reviews
        </Text>
        {reviews.length > 0 ? (
          reviews.map((review, index) => (
            <Box
              key={index}
              p={4}
              bg="#F7FAFC"
              borderRadius="md"
              boxShadow="sm"
              mb={4}
            >
              <HStack justify="space-between">
                <Text fontWeight="bold" fontSize="lg">
                  {review.name}
                </Text>
                <Text>{review.rating} / 5</Text>
              </HStack>
              <Text mt={2}>{review.comment}</Text>
            </Box>
          ))
        ) : (
          <Text>No reviews available for this album yet.</Text>
        )}
      </Box>
    </Box>
  );
};

export default AlbumNotReviewed;
