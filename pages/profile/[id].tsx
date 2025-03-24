// pages/profile/[username].tsx
import { Box, Flex, Text } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import AlbumCoverReview from "../../components/AlbumCoverReview/AlbumCoverReview";
import Navbar from "../../components/Navbar/Navbar";
import ProfileHeading, { UserResponse } from "../../components/ProfileHeading/ProfileHeading";
import LoadContentButton from "../../components/LoadContentButton/LoadContentButton";
import favoritesJson from "../../mockData/favorites.json";
import reviewsJson from "../../mockData/reviews.json";
import useAuth from "../../hooks/useAuth";

export default function Profile() {
  const isAuthenticated = useAuth();
  const router = useRouter();
  const { id } = router.query;
  const [user, setUser] = useState<UserResponse | null>(null);
  const [isLoadingUser, setIsLoadingUser] = useState<boolean>(true);

  // Hooks para a tela antiga (reviews e favorites)
  const ALBUMS_COUNTS = 6;
  const [visibleReviews, setVisibleReviews] = useState(ALBUMS_COUNTS);
  const [visibleFavorites, setVisibleFavorites] = useState(ALBUMS_COUNTS);
  const [seeMoreReviewsUsed, setSeeMoreReviewsUsed] = useState(false);
  const [seeMoreFavoritesUsed, setSeeMoreFavoritesUsed] = useState(false);

  useEffect(() => {
    if (!id) return;

    // Garante que estamos trabalhando com uma string
    const userId = Array.isArray(id) ? id[0] : id;

    setIsLoadingUser(true);

    fetch(`http://150.165.85.37:5000/spotify/users/${userId}`, {
      headers: {
        "Authorization": "Bearer " + (localStorage.getItem("@groovesync-backend-token") || ""),
        "Spotify-Token": localStorage.getItem("@groovesync-spotify-access-token") || "",
        "Content-Type": "application/json"
      }
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data) {
          // Caso data.data seja um array, procuramos o usuário cujo id bate com userId;
          // Caso contrário, pode ser que o endpoint já retorne um objeto único.
          const foundUser = Array.isArray(data.data)
            ? data.data.find((u: UserResponse) => u.id === userId)
            : data.data;
          setUser(foundUser || null);
        } else {
          setUser(null);
        }
      })
      .catch((error) => {
        console.error("Erro ao buscar usuário:", error);
        setUser(null);
      })
      .finally(() => {
        setIsLoadingUser(false);
      });
  }, [id]);

  const showMoreReviews = () => {
    setSeeMoreReviewsUsed(true);
    setVisibleReviews((prev) => prev + ALBUMS_COUNTS);
  };

  const showLessReviews = () => {
    setVisibleReviews(ALBUMS_COUNTS);
    if (visibleReviews <= ALBUMS_COUNTS) {
      setSeeMoreReviewsUsed(false);
    }
  };

  const showMoreFavorites = () => {
    setSeeMoreFavoritesUsed(true);
    setVisibleFavorites((prev) => prev + ALBUMS_COUNTS);
  };

  const showLessFavorites = () => {
    setVisibleFavorites(ALBUMS_COUNTS);
    if (visibleFavorites <= ALBUMS_COUNTS) {
      setSeeMoreFavoritesUsed(false);
    }
  };

  return (
    <Box px="180px" py="40px" mx="auto">
      <Head>
        <title>Profile</title>
      </Head>
      <Navbar />

      {!isAuthenticated ? (
        <Text>Você precisa estar autenticado</Text>
      ) : (
        <>
          {isLoadingUser ? (
            <Text>Carregando...</Text>
          ) : !user ? (
            <Text>Usuário não encontrado</Text>
          ) : (
            <ProfileHeading isMyProfile={user.id == localStorage.getItem("@groovesync-spotify-id")} user={user} />
          )}

          <Text
            fontSize="32px"
            fontWeight="bold"
            fontStyle="italic"
            color="brand.500"
            pb="20px"
            pt="70px"
          >
            My reviews
          </Text>

          <Flex gap="40px" flexFlow="wrap">
            {reviewsJson.slice(0, visibleReviews).map((review) => (
              <AlbumCoverReview
                key={review.id}
                coverURL={review.coverURL}
                pageURL={`/album/${review.id}`}
                rating={review.rating}
                title={review.title}
                year={review.year}
              />
            ))}
          </Flex>

          {visibleReviews < reviewsJson.length && (
            <LoadContentButton loadMore={true} callback={showMoreReviews} />
          )}

          {visibleReviews >= reviewsJson.length && seeMoreReviewsUsed && (
            <LoadContentButton loadMore={false} callback={showLessReviews} />
          )}

          <Text
            fontSize="32px"
            fontWeight="bold"
            fontStyle="italic"
            color="brand.500"
            pb="20px"
            pt="40px"
          >
            Favorite Albums
          </Text>

          <Flex gap="40px" flexFlow="wrap">
            {favoritesJson.slice(0, visibleFavorites).map((favorite) => (
              <AlbumCoverReview
                key={favorite.id}
                coverURL={favorite.coverURL}
                pageURL={`/album/${favorite.id}`}
                rating={favorite.rating}
                title={favorite.title}
                year={favorite.year}
              />
            ))}
          </Flex>

          {visibleFavorites < favoritesJson.length && (
            <LoadContentButton loadMore={true} callback={showMoreFavorites} />
          )}

          {visibleFavorites >= favoritesJson.length && seeMoreFavoritesUsed && (
            <LoadContentButton loadMore={false} callback={showLessFavorites} />
          )}
        </>
      )}
    </Box>
  );
}
