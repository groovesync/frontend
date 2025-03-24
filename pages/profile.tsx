import { Box, Button, Flex, Image, Spinner, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Head from "next/head";
import AlbumCoverReview from "../components/AlbumCoverReview/AlbumCoverReview";
import Navbar from "../components/Navbar/Navbar";
import ProfileHeading from "../components/ProfileHeading/ProfileHeading";
import LoadContentButton from "../components/LoadContentButton/LoadContentButton";
import favoritesJson from "../mockData/favorites.json"
import reviewsJson from "../mockData/reviews.json"
import useAuth from "../hooks/useAuth";
import { headers } from "next/headers";

interface UserReviews {
    reviews: {
        album_id: string,
        album_image: string,
        album_name: string,
        rating: number,
        release_year: string
    }[]
}



interface Favorite {
    favorites: {
        album_id: string,
        album_image: string,
        album_name: string,
        release_year: string
    }[]
}

export default function Profile() {

    const ALBUMS_COUNTS = 6
    const [reviews, setReviews] = useState<UserReviews>()
    const [isLoadingReviews, setIsLoadingReviews] = useState(true)
    const [favorites, setFavorites] = useState<Favorite>()
    const [isLoadingFavorites, setIsLoadingFavorites] = useState(true)
    const [visibleReviews, setVisibleReviews] = useState(ALBUMS_COUNTS)
    const [visibleFavorites, setVisibleFavorites] = useState(ALBUMS_COUNTS)
    const [seeMoreReviewsUsed, setSeeMoreReviewsUsed] = useState(false)
    const [seeMoreFavoritesUsed, setSeeMoreFavoritesUsed] = useState(false)

    useEffect(() => {
        setIsLoadingReviews(true)
        setIsLoadingFavorites(true)
        fetch(`http://150.165.85.37:5000/review/get/${localStorage.getItem("@groovesync-spotify-id") || ""}`,{
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("@groovesync-backend-token"),
                "Spotify-Token": localStorage.getItem("@groovesync-spotify-access-token") || ""
            }})
        .then((res) => res.json())
        .then((data) => setReviews(data))
        .then(() => setIsLoadingReviews(false))

        fetch(`http://150.165.85.37:5000/favorite/get/${localStorage.getItem("@groovesync-spotify-id") || ""}`,{
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("@groovesync-backend-token"),
                "Spotify-Token": localStorage.getItem("@groovesync-spotify-access-token") || ""
            }})
        .then((res) => res.json())
        .then((data) => setFavorites(data))
        .then(() => setIsLoadingFavorites(false))
        .catch((e) => console.error(e))
    }, [])



    const showMoreReviews = () => {
        setSeeMoreReviewsUsed(true)
        setVisibleReviews((prev) => prev + ALBUMS_COUNTS)
    }

    const showLessReviews = () => {
        setVisibleReviews(ALBUMS_COUNTS)

        if (visibleReviews <= ALBUMS_COUNTS) {
            setSeeMoreReviewsUsed(false)
        }
    }

    const showMoreFavorites = () => {
        setSeeMoreFavoritesUsed(true)
        setVisibleFavorites((prev) => prev + ALBUMS_COUNTS)
    }

    const showLessFavorites = () => {
        setVisibleFavorites(ALBUMS_COUNTS)

        if (visibleFavorites <= ALBUMS_COUNTS) {
            setSeeMoreFavoritesUsed(false)
        }
    }

    const isAuthenticated = useAuth()

    if (!isAuthenticated) return null

    return (
      <Box px={"180px"} py={"40px"} mx="auto">
        <Head>
          <title>
            Profile
          </title>
          
        </Head>
        <Navbar />

        <ProfileHeading />

        <Text fontSize={"32px"} fontWeight={"bold"} fontStyle={"italic"} color={"brand.500"} pb={"20px"} pt={"70px"}>
            My reviews
        </Text>

        {isLoadingReviews ? 
            <Box 
            w="100%" 
            h="200px" 
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}>
                <Spinner color={"brand.500"}/>
            </Box> : ""}

        <Flex gap="40px" flexFlow={"wrap"}>
            {reviews?.reviews?.slice(0, visibleReviews).map((review) => 
                <AlbumCoverReview key={review.album_id} coverURL={review.album_image} pageURL={"/album/"+review.album_id} rating={review.rating} title={review.album_name} year={parseInt(review.release_year,10)}/>
            )}
        </Flex>

        {visibleReviews < (reviews?.reviews ? reviews?.reviews.length : 0) && (
            <LoadContentButton loadMore={true} callback={showMoreReviews}/>
        )}

        {visibleReviews >= (reviews?.reviews ? reviews?.reviews.length : 0) && seeMoreReviewsUsed && (
            <LoadContentButton loadMore={false} callback={showLessReviews}/>
        )}

        <Text fontSize={"32px"} fontWeight={"bold"} fontStyle={"italic"} color={"brand.500"} pb={"20px"} pt={"40px"}>
            Favorite Albums
        </Text>

        {isLoadingFavorites ? 
            <Box 
            w="100%" 
            h="200px" 
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}>
                <Spinner color={"brand.500"}/>
            </Box> : ""}

        <Flex gap="40px" flexFlow={"wrap"}>
            {favorites?.favorites?.slice(0, visibleFavorites).map((favorite) => 
                <AlbumCoverReview key={favorite.album_id} coverURL={favorite.album_image} pageURL={"/album/"+favorite.album_id} title={favorite.album_name} year={parseInt(favorite.release_year, 10)}/>
            )}
        </Flex>

        
        {visibleFavorites < (favorites?.favorites ? favorites?.favorites.length : 0) && (
            <LoadContentButton loadMore={true} callback={showMoreFavorites}/>
        )}

        {visibleFavorites >= (favorites?.favorites ? favorites?.favorites.length : 0) && seeMoreFavoritesUsed && (
            <LoadContentButton loadMore={false} callback={showLessFavorites}/>
        )}

      </Box>
    );
  }
  

