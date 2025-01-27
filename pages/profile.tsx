import { Box, Button, Flex, Image, Text } from "@chakra-ui/react";
import { useState } from "react";
import Head from "next/head";
import AlbumCoverReview from "../components/AlbumCoverReview/AlbumCoverReview";
import Navbar from "../components/Navbar/Navbar";
import ProfileHeading from "../components/ProfileHeading/ProfileHeading";
import LoadContentButton from "../components/LoadContentButton/LoadContentButton";
import favoritesJson from "../mockData/favorites.json"
import reviewsJson from "../mockData/reviews.json"

export default function Profile() {

    const ALBUMS_COUNTS = 6
    const [visibleReviews, setVisibleReviews] = useState(ALBUMS_COUNTS)
    const [visibleFavorites, setVisibleFavorites] = useState(ALBUMS_COUNTS)
    const [seeMoreReviewsUsed, setSeeMoreReviewsUsed] = useState(false)
    const [seeMoreFavoritesUsed, setSeeMoreFavoritesUsed] = useState(false)

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

    const reviews = reviewsJson
    const favorites = favoritesJson


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
            Reviews on your own
        </Text>

        <Flex gap="40px" flexFlow={"wrap"}>
            {reviews.slice(0, visibleReviews).map((review) => 
                <AlbumCoverReview key={review.id} coverURL={review.coverURL} pageURL={"/album/"+review.id} rating={review.rating} title={review.title} year={review.year}/>
            )}
        </Flex>

        {visibleReviews < reviews.length && (
            <LoadContentButton loadMore={true} callback={showMoreReviews}/>
        )}

        {visibleReviews >= reviews.length && seeMoreReviewsUsed && (
            <LoadContentButton loadMore={false} callback={showLessReviews}/>
        )}

        <Text fontSize={"32px"} fontWeight={"bold"} fontStyle={"italic"} color={"brand.500"} pb={"20px"} pt={"40px"}>
            Favorite Albums
        </Text>

        <Flex gap="40px" flexFlow={"wrap"}>
            {favorites.slice(0, visibleFavorites).map((favorite) => 
                <AlbumCoverReview key={favorite.id} coverURL={favorite.coverURL} pageURL={"/album/"+favorite.id} rating={favorite.rating} title={favorite.title} year={favorite.year}/>
            )}
        </Flex>

        
        {visibleFavorites < favorites.length && (
            <LoadContentButton loadMore={true} callback={showMoreFavorites}/>
        )}

        {visibleFavorites >= favorites.length && seeMoreFavoritesUsed && (
            <LoadContentButton loadMore={false} callback={showLessFavorites}/>
        )}

      </Box>
    );
  }
  

