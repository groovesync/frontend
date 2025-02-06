import AlbumReviewed from "../components/AlbumReviewed/AlbumReviewed";
import albums from "../mockData/albums.json";

export async function getStaticProps() {
  const album = albums[0]; 
  return {
    props: {
      album,
    },
  };
}

export default function Page({ album }) {
  return <AlbumReviewed album={album} />;
}
