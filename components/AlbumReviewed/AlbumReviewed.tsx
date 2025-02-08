import React, { useState } from "react";
import {
  Box,
  Text,
  VStack,
  Image,
  HStack,
  Avatar,
} from "@chakra-ui/react";
import { Rating } from "../Rating/Rating";
import Navbar from "../Navbar/Navbar";
import Link from "next/link";
import OpenSpotifyButton from "../OpenSpotifyButton/OpenSpotifyButton";
import Head from "next/head";

interface Album {
  title: string;
  artist: Artist[];
  coverURL: string;
  year: number;
  overallRating: number | null | undefined;
  id: string;
}

interface UserReview {
  albumId: string,
  userId: string,
  rating: number,
  text?: string 
}

interface AlbumReviewedProps {
  album: Album;
  userReview: UserReview | undefined
}

interface Artist {
  name: string,
  id: string
}

const AlbumReviewed: React.FC<AlbumReviewedProps> = ({ album, userReview }) => {

  const reviews = [
    { name: "Lucas de Medeiros", rating: 5, comment: "An amazing album.", userProfilePictureURL: "" },
    { name: "Sabrina Barbosa", rating: 4, comment: "Loved the sound!", userProfilePictureURL: ""},
    { name: "Melissa Marques", rating: 3, userProfilePictureURL: ""},
  ];

  const userProfilePictureURL = localStorage.getItem("profilePictureURL") || ""

  return (
    <Box px={"180px"} 
          py={"40px"} 
          mx="auto">
      <Head>
        <title>{album.title}</title>
      </Head>
      <Navbar />

      <HStack align="center" spacing={8} mt={8}>
        <Image
          src={album.coverURL}
          alt={album.title}
          boxSize="250px"
          borderRadius="md"
        />

        <Box display={"flex"}
            flexDirection={"column"}
            justifyContent={"end"}
            alignItems={"start"}
            h="250px">

          <OpenSpotifyButton link={album.id} text="Listen on Spotify"/>

          <Text fontSize="64px" fontWeight="bold" fontStyle="italic" color={"brand.500"}>
            {album.title}
          </Text>
          
          <Text fontSize="16px" color="brand.500">
            {album.artist.map((a, index) => <Link key={index} color="brand.500" href={"/artist/"+a.id}> {a.name} </Link>)}
            •
            {album.year}
          </Text>


        </Box>
      </HStack>

      <HStack
        alignItems={"flex-start"}
        justifyContent={"flex-start"}
        mt={"45px"}
        >
        <Box mr="80px">
              <Text fontWeight="bold" fontStyle={"italic"} fontSize="32px" color={"brand.500"}>
                Overall Rating
              </Text>

              <HStack alignItems={"end"}>
                <Text fontSize="32px" color="brand.500" fontWeight="bold" fontStyle={"italic"}>
                  {album.overallRating && album.overallRating}
                </Text>
                <Text fontSize="16px" color="brand.500" pb={2}>
                {album.overallRating ? "out of 5" : "No reviews yet"}
                </Text>
              </HStack>

              <Text fontWeight="bold" fontStyle={"italic"} fontSize="32px" color={"brand.500"}>
                Your Rating
              </Text>

              <HStack alignItems={"end"}>
                <Text fontSize="32px" color="brand.500" fontWeight="bold" fontStyle={"italic"}>
                  {userReview?.rating && userReview.rating}
                </Text>
                <Text fontSize="16px" color="brand.500" pb={2}>
                  out of 5
                </Text>
              </HStack>

        </Box>

      <VStack m="0" p="0">
      <Box>
        <Text fontSize="32px" fontWeight="bold" fontStyle="italic" mb={4} color={"brand.500"}>
          Your Review
        </Text>
        <Box
          p={4}
          bg="brand.400"
          borderRadius="md"
          mb={4}
          cursor="pointer"
          w="1000px"
        >
          <HStack>
            <VStack h="100%">
              <Avatar src={userProfilePictureURL}/>
            </VStack>
            <VStack alignItems={"flex-start"} justifyContent={"center"} m="0" p="0">
              <HStack m="0" p="0">
              <Text fontWeight="medium" fontSize="16px">
                Yourself
              </Text>
              <Rating value={userReview?.rating} isReadOnly/>
              </HStack>
          
              <Text mt={2}>
                {userReview?.text}
              </Text>
            </VStack>
          </HStack>          
        </Box>
      </Box>

      {/* Reviews Section */}
      <Box mt={8}>
        <Text fontSize="32px" fontWeight="bold" fontStyle="italic" mb={4} color={"brand.500"}>
          Reviews
        </Text>
        {reviews.map((review, index) => (
          <Box
            key={index}
            p={4}
            bg="brand.400"
            borderRadius="md"
            mb={4}
            cursor="pointer"
            w="1000px"
          >
            <HStack>
              <VStack h="100%">
                <Avatar src={review.userProfilePictureURL}/>
              </VStack>

              <VStack alignItems={"flex-start"} justifyContent={"center"} m="0" p="0">
                <HStack justifyContent={"space-between"} m="0" p="0">
                  <Text fontWeight="medium" fontSize="16px">
                    {review.name}
                  </Text>
                  <Rating value={review.rating} isReadOnly />
                </HStack>
                <Text mt={2}>{review?.comment}</Text>
              </VStack>
              
              
            </HStack>
            
          </Box>
        ))}
      </Box>
      </VStack>
      </HStack>
    </Box>
    
  );
};

export default AlbumReviewed;
