// pages/profile/[username].tsx
import { Box, Flex, Spinner, Text } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import AlbumCoverReview from "../../components/AlbumCoverReview/AlbumCoverReview";
import Navbar from "../../components/Navbar/Navbar";
import ProfileHeading, { UserResponse } from "../../components/ProfileHeading/ProfileHeading";
import LoadContentButton from "../../components/LoadContentButton/LoadContentButton";
import useAuth from "../../hooks/useAuth";

/**
 * Interface for user's album reviews response from the backend.
 */
interface UserReviews {
  reviews: {
    album_id: string;
    album_image: string;
    album_name: string;
    rating: number;
    release_year: string;
  }[];
}

/**
 * Interface for user's favorite albums response from the backend.
 */
interface Favorite {
  favorites: {
    album_id: string;
    album_image: string;
    album_name: string;
    release_year: string;
  }[];
}

/**
 * **Profile Page Component**
 *
 * Displays a user's Spotify profile along with their album reviews and favorite albums.
 *
 * - Reads the user ID from the dynamic route (`/profile/[username]`).
 * - Fetches user data from backend endpoints:
 *   - `GET /spotify/users/:userId`
 *   - `GET /review/get/:userId`
 *   - `GET /favorite/get/:userId`
 * - Handles both authenticated and unauthenticated states.
 * - Provides "Load More" and "Show Less" functionality for both sections.
 *
 * **Backend endpoints required:**
 * - `/spotify/users/:userId`
 * - `/review/get/:userId`
 * - `/favorite/get/:userId`
 *
 * **Local storage keys required:**
 * - `@groovesync-backend-token`
 * - `@groovesync-spotify-access-token`
 * - `@groovesync-spotify-id`
 *
 * @returns The user's profile page as a React component.
 */
export default function Profile() {
  const isAuthenticated = useAuth();
  const router = useRouter();
  const { id } = router.query;
  const [user, setUser] = useState<UserResponse | null>(null);
  const [isLoadingUser, setIsLoadingUser] = useState<boolean>(true);

  const ALBUMS_COUNTS = 6;
  const [reviews, setReviews] = useState<UserReviews>();
  const [isLoadingReviews, setIsLoadingReviews] = useState(true);
  const [favorites, setFavorites] = useState<Favorite>();
  const [isLoadingFavorites, setIsLoadingFavorites] = useState(true);
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
        "Content-Type": "application/json",
      },
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

    setIsLoadingReviews(true);
    setIsLoadingFavorites(true);

    fetch(`http://150.165.85.37:5000/review/get/${userId}`, {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("@groovesync-backend-token"),
        "Spotify-Token": localStorage.getItem("@groovesync-spotify-access-token") || "",
      },
    })
      .then((res) => res.json())
      .then((data) => setReviews(data))
      .then(() => setIsLoadingReviews(false));

    fetch(`http://150.165.85.37:5000/favorite/get/${userId}`, {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("@groovesync-backend-token"),
        "Spotify-Token": localStorage.getItem("@groovesync-spotify-access-token") || "",
      },
    })
      .then((res) => res.json())
      .then((data) => setFavorites(data))
      .then(() => setIsLoadingFavorites(false))
      .catch((e) => console.error(e));
  }, [id, router]);

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

      {!isAuthenticated ? ( <Text>Você precisa estar autenticado</Text> ) : (
        <>
          {isLoadingUser ? (
            <ProfileHeading
            isMyProfile={false}
            user={{display_name: "Loading...", id: "", external_urls: {spotify: "/assets/UserIcon.svg"}, images: [{url: ""}], reviews: 0}}
            />
          ) : !user ? (
            <Text>Usuário não encontrado</Text>
          ) : (
            <ProfileHeading
              isMyProfile={user.id === localStorage.getItem("@groovesync-spotify-id")}
              user={user}
            />
          )}

          <Text
            fontSize="32px"
            fontWeight="bold"
            fontStyle="italic"
            color="brand.500"
            pb="20px"
            pt="70px"
          >
            {user && user.id === localStorage.getItem("@groovesync-spotify-id") ? "My reviews" : "Their reviews"}
          </Text>

          {isLoadingReviews ? (
            <Box
              w="100%"
              h="200px"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Spinner color="brand.500" />
            </Box>
          ) : reviews?.reviews.length == 0 ? 
            <Box
              w={"100%"}
              h={"200px"}
              backgroundColor={"#e6e8fa"}
              borderRadius={"10px"}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              color={"brand.500"}>
              Looks like there are no reviews yet!
            </Box>
            : 
            (
            <Flex gap="40px" flexFlow={"wrap"}>
            {reviews?.reviews?.slice(0, visibleReviews).map((review) => 
                <AlbumCoverReview key={review.album_id} coverURL={review.album_image} pageURL={"/album/"+review.album_id} rating={review.rating} title={review.album_name} year={parseInt(review.release_year,10)}/>
            )}
            </Flex>
          )}

          {visibleReviews < (reviews?.reviews ? reviews.reviews.length : 0) && (
            <LoadContentButton loadMore={true} callback={showMoreReviews} />
          )}

          {visibleReviews >= (reviews?.reviews ? reviews.reviews.length : 0) &&
            seeMoreReviewsUsed && (
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

          {isLoadingFavorites ? (
            <Box
              w="100%"
              h="200px"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Spinner color="brand.500" />
            </Box>
          ) : (favorites?.favorites ? favorites?.favorites.length : 0)  > 0 ? (
            <Flex gap="40px" flexWrap="wrap">
            {favorites?.favorites?.slice(0, visibleFavorites).map((favorite) => (
              <AlbumCoverReview
                key={favorite.album_id}
                coverURL={favorite.album_image}
                pageURL={`/album/${favorite.album_id}`}
                title={favorite.album_name}
                year={parseInt(favorite.release_year, 10)}
              />
            ))}
          </Flex>
          ) : (
            <Box
              w={"100%"}
              h={"200px"}
              backgroundColor={"#e6e8fa"}
              borderRadius={"10px"}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              color={"brand.500"}>
              Looks like there are no favorites yet!
            </Box>
          )}

          

          {visibleFavorites < (favorites?.favorites ? favorites.favorites.length : 0) && (
            <LoadContentButton loadMore={true} callback={showMoreFavorites} />
          )}

          {visibleFavorites >= (favorites?.favorites ? favorites.favorites.length : 0) &&
            seeMoreFavoritesUsed && (
              <LoadContentButton loadMore={false} callback={showLessFavorites} />
            )}
        </>
      )}
    </Box>
  );
}
