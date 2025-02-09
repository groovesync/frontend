import { useRouter } from "next/router";
import AlbumReviewed from "../../components/AlbumReviewed/AlbumReviewed";
import AlbumNotReviewed from "../../components/AlbumNotReviewed/AlbumNotReviewed";
import getInSync from "../../mockData/getInSync.json";
import discoverNewAlbums from "../../mockData/discoverNewAlbums.json";
import userReviews from "../../mockData/userReviews.json"
import { Box, Spinner } from "@chakra-ui/react";
import useAuth from "../../hooks/useAuth";

interface UserReview {
  albumId: string,
  userId: string,
  rating: number,
  text?: string 
}

const AlbumPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const albums = [...getInSync, ...discoverNewAlbums];
  const album = albums.find((item) => item.id === id);
  const reviews: UserReview[] = userReviews
  const review = reviews.find((item) => item.albumId === id)

  const isAuthenticated = useAuth()

  if (!isAuthenticated) return null

  if (!album) {
    return  <Box w="100vw" h="100vh" display={"flex"} justifyContent="center" alignItems={"center"}>
              <Spinner color={"brand.500"} size="lg"/>
            </Box>;
  }

  return review ? (
    <AlbumReviewed album={album} userReview={review}/>
  ) : (
    <AlbumNotReviewed album={album} />
  );
};

export default AlbumPage;
