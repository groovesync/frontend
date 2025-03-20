import React, { useState } from "react";
import {
  Box,
  Text,
  VStack,
  Image,
  HStack,
  Avatar,
  Button,
} from "@chakra-ui/react";
import { Rating } from "../Rating/Rating";
import Navbar from "../Navbar/Navbar";
import Link from "next/link";
import OpenSpotifyButton from "../OpenSpotifyButton/OpenSpotifyButton";
import Head from "next/head";
import WriteReviewActionButton from "../WriteReviewActionButton/WriteReviewActionButton";

interface Album {
  album_info: {
    artists: {
      name: string,
      id: string
    }[],
    name: string,
    id: string,
    image: string,
    overall_rating: number | null,
    release_year: string,
    reviews: {
      username: string,
      profile_picture: string,
      rate: number,
      text: string
    }[],
    url: string,
    your_rating: number | null,
    your_review: string | null,
    is_favorite: boolean,
    favorite_id: string | null
  }
}


interface UserReview {
  albumId?: string,
  userId: string,
  rating?: number | null,
  text?: string | null
}

interface AlbumReviewedProps {
  album: Album;
  userReview: UserReview
}

const AlbumReviewed: React.FC<AlbumReviewedProps> = ({ album, userReview }) => {

  const [isFavorite, setIsFavorite] = useState(album?.album_info ? album?.album_info.is_favorite : false)
  const [favoriteId, setFavoriteId] = useState(album?.album_info?.favorite_id)

  const handleClickFavorite = () => {
    if (isFavorite) {
      setIsFavorite(false)
      fetch(`http://150.165.85.37:5000/favorite/delete/${favoriteId}`, 
        {headers: {"Authorization": "Bearer " + localStorage.getItem("@groovesync-backend-token"),
                  "Spotify-Token": localStorage.getItem("@groovesync-spotify-access-token") || ""
        },
        method: "DELETE"})
      .catch((e) => console.error(e))
    } else {
      setIsFavorite(true)
      fetch(`http://150.165.85.37:5000/favorite/save`,
        {headers: {"Authorization": "Bearer " + localStorage.getItem("@groovesync-backend-token"),
                  "Spotify-Token": localStorage.getItem("@groovesync-spotify-access-token") || "",
                  "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify({"userId": localStorage.getItem("@groovesync-spotify-id") || "", "albumId": album?.album_info.id})})
      .then((res) => res.json())
      .then((data) => {
        setFavoriteId(data["favorite_id"])
      })
      .catch((e) => console.error(e))
    }

  }
  const userProfilePictureURL = localStorage.getItem("@groovesync-profile-picture-url") || ""

  return (
    <Box px={"180px"} 
          py={"40px"} 
          mx="auto">
      <Head>
        <title>{album.album_info.name}</title>
      </Head>
      <Navbar />

      <HStack align="center" spacing={8} mt={8}>
        <Image
          src={album.album_info.image}
          alt={album.album_info.name}
          boxSize="250px"
          borderRadius="md"
        />

        <Box display={"flex"}
            flexDirection={"column"}
            justifyContent={"end"}
            alignItems={"start"}
            h="250px">

          <HStack>
            <OpenSpotifyButton link={album.album_info.url} text="Listen on Spotify"/>
            <Button
              onClick={handleClickFavorite}
              gap={"1rem"}
              borderRadius={"100px"}
              px="1.5rem">
              <Image alt={"Heart icon"} src={"/assets/HeartIcon.png"} />
              {isFavorite ? "Remove from favorites" : "Add to favorites"}
            </Button>
          </HStack>

          <Text fontSize="64px" fontWeight="bold" fontStyle="italic" color={"brand.500"}>
            {album.album_info.name}
          </Text>
          
          <Text fontSize="16px" color="brand.500">
            {album.album_info.artists.map((a, index) => <Link key={index} color="brand.500" href={"/artist/"+a.id}> {a.name} </Link>)}
            •
            {album.album_info.release_year}
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
                  {album.album_info.overall_rating}
                </Text>
                <Text fontSize="16px" color="brand.500" pb={2}>
                {album.album_info.overall_rating ? "out of 5" : "No reviews yet..."}
                </Text>
              </HStack>

              <Text fontWeight="bold" fontStyle={"italic"} fontSize="32px" color={"brand.500"}>
                Your Rating
              </Text>

              {userReview.rating ? <HStack alignItems={"end"}>
                <Text fontSize="32px" color="brand.500" fontWeight="bold" fontStyle={"italic"}>
                  {userReview?.rating && userReview.rating}
                </Text>
                <Text fontSize="16px" color="brand.500" pb={2}>
                  out of 5
                </Text>
              </HStack> : 
              <HStack alignItems={"end"} mt={2}>
                <WriteReviewActionButton albumId={album.album_info.id} customWidth="220px"/>
              </HStack>}

              

        </Box>

      <VStack m="0" p="0" alignItems={"start"}>
      <Box>
        {userReview.rating ?
        <>
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
              <Rating value={userReview?.rating ? userReview.rating : 0} isReadOnly/>
              </HStack>
          
              <Text mt={2}>
                {userReview?.text}
              </Text>
            </VStack>
          </HStack>          
        </Box>
        </>
      : ""}
      </Box>

      {/* Reviews Section */}
      <Box mt={userReview.rating ? 8 : 0}>
        <Text fontSize="32px" fontWeight="bold" fontStyle="italic" mb={4} color={"brand.500"}>
          Reviews
        </Text>
        {album.album_info.reviews.length > 0 ? album.album_info.reviews.map((review, index) => (
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
                <Avatar src={review.profile_picture}/>
              </VStack>

              <VStack alignItems={"flex-start"} justifyContent={"center"} m="0" p="0">
                <HStack justifyContent={"space-between"} m="0" p="0">
                  <Text fontWeight="medium" fontSize="16px">
                    {review.username}
                  </Text>
                  <Rating value={review.rate} isReadOnly />
                </HStack>
                <Text mt={2}>{review?.text}</Text>
              </VStack>
              
              
            </HStack>
            
          </Box>
        )) : "No reviews yet..."}
      </Box>
      </VStack>
      </HStack>
    </Box>
    
  );
};

export default AlbumReviewed;
