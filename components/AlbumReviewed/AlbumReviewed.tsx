import React, { useState } from "react";
import {
  Box,
  Text,
  VStack,
  Image,
  HStack,
  Avatar,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@chakra-ui/react";
import { Rating } from "../Rating/Rating";
import Navbar from "../Navbar/Navbar";
import Link from "next/link";
import OpenSpotifyButton from "../OpenSpotifyButton/OpenSpotifyButton";
import Head from "next/head";
import WriteReviewActionButton from "../WriteReviewActionButton/WriteReviewActionButton";
import { useRouter } from "next/router";

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
      text: string,
      user_id: string
    }[],
    url: string,
    your_rating: number | null,
    your_review: string | null,
    your_review_id: string | null,
    is_favorite: boolean,
    favorite_id: Favorite | null
  }
}

/**
 * @typedef {Object} Favorite
 * @property {string} _id - Favorite entry ID.
 * @property {string} albumId - ID of the favorited album.
 * @property {string} userId - ID of the user who favorited the album.
 */
interface Favorite {
  _id: string,
  albumId: string,
  userId: string
}

/**
 * @typedef {Object} UserReview
 * @property {string} [albumId] - ID of the album.
 * @property {string} userId - ID of the reviewing user.
 * @property {number | null} [rating] - Rating given by the user.
 * @property {string | null} [text] - Review text written by the user.
 */
interface UserReview {
  albumId?: string,
  userId: string,
  rating?: number | null,
  text?: string | null
}

/**
 * Props for the AlbumReviewed component.
 * 
 * @typedef {Object} AlbumReviewedProps
 * @property {Album} album - Album data including details and reviews.
 * @property {UserReview} userReview - Current user's review info (if any).
 */
interface AlbumReviewedProps {
  album: Album;
  userReview: UserReview
}

/**
 * Displays detailed information about a reviewed album,
 * including user's rating and review, favorite toggle, and all reviews.
 *
 * @component
 * @param {AlbumReviewedProps} props - Props for the component.
 * @returns {JSX.Element} The rendered album detail and review component.
 */
const AlbumReviewed: React.FC<AlbumReviewedProps> = ({ album, userReview }) => {

  const [isFavorite, setIsFavorite] = useState(album?.album_info ? album?.album_info.is_favorite : false)
  const [favoriteId, setFavoriteId] = useState(album?.album_info?.favorite_id)
  const [isReviewDeleted, setIsReviewDelete] = useState(false)

  const deleteReview = () => {
    fetch(`http://150.165.85.37:5000/review/delete/${album?.album_info.your_review_id}`, 
      {headers: {"Authorization": "Bearer " + localStorage.getItem("@groovesync-backend-token"),
                "Spotify-Token": localStorage.getItem("@groovesync-spotify-access-token") || ""
      },
      method: "DELETE"})
      .then(() =>
        setIsReviewDelete(true)
      )
      .catch((e) => console.error(e))
  }

  const handleClickFavorite = () => {
    if (isFavorite) {
      setIsFavorite(false)
      fetch(`http://150.165.85.37:5000/favorite/delete/${favoriteId ? favoriteId["_id"] : ""}`, 
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

  const router = useRouter()

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

              {userReview.rating && !isReviewDeleted ? <HStack alignItems={"end"}>
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
        {userReview.rating && !isReviewDeleted ?
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
            <VStack alignItems={"flex-start"} justifyContent={"center"} m="0" p="0" w={"80%"}>
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
            <VStack>
              <HStack>
                <RemoveReview onConfirm={deleteReview} />
                <EditReview reviewId={album?.album_info.your_review_id ? album?.album_info.your_review_id : ""}/>
              </HStack>
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
            onClick={() => router.push(`/profile/${review.user_id}`)}
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

/**
 * A button that opens a modal to confirm the deletion of a review.
 *
 * @component
 * @param {RemoveReviewProps} props - Props for the component.
 * @returns {JSX.Element} The rendered remove review confirmation button and modal.
 */
const RemoveReview = ({ onConfirm }: { onConfirm: () => void }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button onClick={onOpen}>
        <Image src={"/assets/TrashIcon.svg"} w="20px" h="20px" />
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirm Deletion</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Are you sure you want to delete this review? This action cannot be undone.</Text>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>

            <Button 
              colorScheme="red" 
              ml={3} 
              onClick={() => {
                onConfirm();
                onClose();
              }}
            >
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};


/**
 * Props for the EditReview component.
 * 
 * @typedef {Object} EditReviewProps
 * @property {string} reviewId - The ID of the review to be edited.
 */
interface EditReviewProps {
  reviewId: string
}


/**
 * A button that navigates to the review editing page.
 *
 * @component
 * @param {EditReviewProps} props - Props for the component.
 * @returns {JSX.Element} The rendered edit review button.
 */
const EditReview: React.FC<EditReviewProps> = ({ reviewId }) => {
  const router = useRouter() as ReturnType<typeof useRouter>;

  return (
    <Button onClick={() => router.push(`/edit/${reviewId}`)}>
      <Image src="/assets/EditIcon.svg" width={18} height={18} alt="Edit Icon" />
    </Button>
  );
};