import AlbumReviewed from "../components/AlbumReviewed/AlbumReviewed";
import albums from "../mockData/albums.json";

export async function getStaticProps() {
  const album = albums[0]; // Certifique-se de que o array não está vazio
  return {
    props: {
      album,
    },
  };
}

export default function Page({ album }) {
  return <AlbumReviewed album={album} />;
}
