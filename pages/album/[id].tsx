import { useRouter } from "next/router";
import AlbumReviewed from "../../components/AlbumReviewed/AlbumReviewed";
import AlbumNotReviewed from "../../components/AlbumNotReviewed/AlbumNotReviewed";
import getInSync from "../../mockData/getInSync.json";
import discoverNewAlbums from "../../mockData/discoverNewAlbums.json";

const AlbumPage = () => {
  const router = useRouter();
  const { id } = router.query;

  // Combina os dados de ambas as listas
  const albums = [...getInSync, ...discoverNewAlbums];

  // Encontra o álbum correspondente pelo ID
  const album = albums.find((item) => item.id === id);

  if (!album) {
    return <div>Album not found</div>;
  }

  // Redireciona com base no estado `isReviewed`
  return album.isReviewed ? (
    <AlbumReviewed album={album} />
  ) : (
    <AlbumNotReviewed album={album} />
  );
};

export default AlbumPage;
