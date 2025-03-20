import { Box, Spinner } from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import AlbumReviewed from "../../components/AlbumReviewed/AlbumReviewed";

interface SpotifyAlbumResponse {
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
    reviews: [],
    url: string,
    your_rating: number | null,
    your_review: string | null,
    is_favorite: boolean,
    favorite_id: string | null
  }
}


const AlbumPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const [album, setAlbum] = useState<SpotifyAlbumResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!id) return;

    setIsLoading(true);

    fetch(`http://150.165.85.37:5000/spotify/albums/${id}?user_id=${localStorage.getItem("@groovesync-spotify-id") || ""}`, {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("@groovesync-backend-token"),
        "Spotify-Token": localStorage.getItem("@groovesync-spotify-access-token") || "",
        "Content-Type": "application/json"
      },
    })
    .then((res) => res.json())
    .then((data) => {
      setAlbum(data)
    })
    .catch(() => {
      router.reload()
    })

    setIsLoading(false);
  }, [id, router]);

  if (isLoading || !album) {
    return (
      <Box
        w="100vw"
        h="100vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Spinner size="xl" />
      </Box>
    );
  }

  return (
    <>
      <Head>
        <title>{album?.album_info?.name}</title>
      </Head>
      <AlbumReviewed
        album={album}
        userReview={{albumId: album?.album_info?.id, userId: localStorage.getItem("@groovesync-spotify-id") || "", rating: album?.album_info?.your_rating, text: album?.album_info?.your_review}}
      />
    </>
  );
};

export default AlbumPage;
