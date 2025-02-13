// pages/album/[id].tsx

import { Box, Spinner } from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import AlbumReviewed from "../../components/AlbumReviewed/AlbumReviewed";

// Interface simplificada para a resposta do álbum vindo do Spotify
interface SpotifyAlbum1Response {
  data: {
    artists: {
      external_urls: {
        spotify: string;
      };
      href: string;
      id: string;
      name: string;
      type: string;
      uri: string;
    }[];
    external_urls: {
      spotify: string;
    };
    images: {
      url: string;
    }[];
    name: string;
    release_date: string;
  };
  id: string;
}

// Exemplo de userReview mockado (substitua pelo review real do usuário, se tiver)
const mockUserReview = {
  albumId: "someAlbumId",
  userId: "someUserId",
  rating: 4,
  text: "I really enjoyed this album!",
};

const AlbumPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const [album, setAlbum] = useState<SpotifyAlbum1Response | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!id) return;

    const fetchAlbum = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`http://localhost:5000/spotify/album/${id}`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("@groovesync-backend-token"),
            "Spotify-Token": localStorage.getItem("@groovesync-spotify-access-token") || "",
          },
        });
        const data: SpotifyAlbum1Response = await res.json();
        setAlbum(data);
      } catch (error) {
        console.error("Erro ao carregar o álbum:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAlbum();
  }, [id]);

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

  // Converte os dados do Spotify para o formato do AlbumReviewed
  const albumDataForReview = {
    title: album.data.name,
    artist: album.data.artists.map((art) => ({
      name: art.name,
      id: art.id,
    })),
    coverURL: album.data.images?.[0]?.url || "",
    // se release_date = "2023-01-01", pegamos só o ano "2023"
    year: parseInt(album.data.release_date.split("-")[0], 10) || 0,
    overallRating: null, // ou busque de algum backend que calcule a média
    id: album.id,        // se preferir, use "album.data.id"
  };

  return (
    <>
      <Head>
        <title>{album.data.name}</title>
      </Head>
      <AlbumReviewed
        album={albumDataForReview}
        userReview={mockUserReview}
      />
    </>
  );
};

export default AlbumPage;
