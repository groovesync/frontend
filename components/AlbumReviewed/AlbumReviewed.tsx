import React, { useState } from "react";
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
import { Rating } from "../Rating/Rating";

interface Album {
  title: string;
  artist: string;
  coverURL: string;
  year?: number;
  overallRating?: number;
  id?: string;
}

interface AlbumReviewedProps {
  album: Album;
}

const AlbumReviewed: React.FC<AlbumReviewedProps> = ({ album }) => {
  const [selectedRating, setSelectedRating] = useState(4); // Mock da avaliação do usuário

  const reviews = [
    { name: "Lucas de Medeiros", rating: 5, comment: "An amazing album." },
    { name: "Sabrina Barbosa", rating: 4, comment: "Loved the sound!" },
    { name: "Melissa Marques", rating: 3, comment: "Good but not groundbreaking." },
  ];

  const overallRating =
    reviews.length > 0
      ? (reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length).toFixed(1)
      : "Not Rated Yet";

  const handleRatingChange = (value: number) => {
    setSelectedRating(value);
  };

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

        <VStack align="flex-start" spacing={0}>
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
          <Text fontSize="4xl" fontWeight="bold" fontStyle="italic">
            {album.title}
          </Text>
          <Text fontSize="lg" color="gray.500" fontStyle="italic">
            {album.artist}
          </Text>

          <Box mt={4}>
            <Text fontWeight="bold" fontSize="xl">
              Overall Rating
            </Text>
            <Text fontSize="2xl" color="blue.500" fontWeight="bold">
              {overallRating} out of 5
            </Text>

            <Box mt={0}>
              <Text fontWeight="bold" fontSize="xl">
                Your Rating
              </Text>
              <HStack align="center" spacing={2}>
                <Rating value={selectedRating} onChange={handleRatingChange} />
                <Text fontSize="lg" fontWeight="bold" color="gray.600">
                  {selectedRating} out of 5
                </Text>
              </HStack>
            </Box>
          </Box>
        </VStack>
      </HStack>

      {/* Your Review Section */}
      <Box mt={8} px={8}>
        <Text fontSize="3xl" fontWeight="bold" fontStyle="italic" mb={4}>
          Your Review
        </Text>
        <Box
          p={4}
          bg="brand.400"
          borderRadius="md"
          boxShadow="sm"
          mb={4}
          _hover={{ boxShadow: "lg" }}
        >
          <HStack justify="space-between">
            <Text fontWeight="bold" fontSize="lg">
              You
            </Text>
            <Rating value={selectedRating} onChange={handleRatingChange} />
          </HStack>
          <Text mt={2}>
            This album is absolutely amazing. The sound production is outstanding, and I love every track!
          </Text>
        </Box>
      </Box>

      {/* Reviews Section */}
      <Box mt={8} px={8}>
        <Text fontSize="3xl" fontWeight="bold" fontStyle="italic" mb={4}>
          Reviews
        </Text>
        {reviews.map((review, index) => (
          <Box
            key={index}
            p={4}
            bg="brand.400"
            borderRadius="md"
            boxShadow="sm"
            mb={4}
            _hover={{ boxShadow: "lg" }}
          >
            <HStack justify="space-between">
              <Text fontWeight="bold" fontSize="lg">
                {review.name}
              </Text>
              <Rating value={review.rating} isReadOnly />
            </HStack>
            <Text mt={2}>{review.comment}</Text>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default AlbumReviewed;
