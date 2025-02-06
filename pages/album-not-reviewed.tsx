// pages/album-not-reviewed.tsx
import React from "react";
import AlbumNotReviewed from "../components/AlbumNotReviewed/AlbumNotReviewed";

const mockAlbum = {
  title: "Mock Album Title",
  artist: "Mock Artist",
  coverURL: "https://via.placeholder.com/250",
  year: 2023,
};

const AlbumNotReviewedPage = () => {
  return <AlbumNotReviewed album={mockAlbum} />;
};

export default AlbumNotReviewedPage;
