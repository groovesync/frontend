import { GetStaticProps } from "next";
import React from "react";
import AlbumReviewed from "../components/AlbumReviewed/AlbumReviewed";
import albums from "../mockData/albums.json";

export const getStaticProps: GetStaticProps = async () => {
  const album = albums[0];
  return {
    props: {
      album,
    },
  };
};

interface Album {
  title: string;
  artist: string;
  coverURL: string;
  year?: number;
  overallRating?: number;
  id?: string;
}

const AlbumReviewedPage: React.FC<{ album: Album }> = ({ album }) => {
  return <AlbumReviewed album={album} />;
};

export default AlbumReviewedPage;
