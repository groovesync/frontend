'use client'

import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { Box, Text, Image, Spinner } from "@chakra-ui/react";
import Link from "next/link";


/**
 * Interface representing an individual artist.
 */
interface Artist {
  name: string
}


/**
 * Interface representing the structure of the Spotify API response
 * for recommended albums.
 */
interface SpotifyAlbumResponse {
  data: {
    albums: {
      items: {
          id: string,
          images: {
              url: string
          }[],
          name: string,
          release_date: string,
          artists: {
            name: string
          }[]
      }[]
  }
}
}

/**
 * **DiscoverNewAlbums Component**
 *
 * Displays a horizontally scrollable carousel (slider) of Spotify album recommendations
 * for the user, fetched from the GrooveSync backend API.
 *
 * Features:
 * - Responsive carousel with breakpoints for different screen sizes.
 * - Displays album cover image, album name, and artist(s).
 * - Handles loading state with a Chakra UI spinner.
 * - Clicking on an album navigates the user to the album's detail page.
 *
 * **API Endpoint Used:**
 * - `GET http://150.165.85.37:5000/spotify/recommendations`
 *
 * **Expected Local Storage Keys for Authorization:**
 * - `@groovesync-backend-token`
 * - `@groovesync-spotify-access-token`
 *
 * **Responsive Carousel Settings:**
 * - Desktop: 3 albums per view
 * - Tablet: 2 albums
 * - Mobile: 1 album
 *
 * @component
 * @example
 * ```tsx
 * <DiscoverNewAlbums />
 * ```
 */
const DiscoverNewAlbums: React.FC = () => {

  const [recommendations, setRecommendations] = useState<SpotifyAlbumResponse>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true)
    fetch(`http://150.165.85.37:5000/spotify/recommendations`,{
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("@groovesync-backend-token"),
        "Spotify-Token": localStorage.getItem("@groovesync-spotify-access-token") || ""
      }})
      .then((res) => res.json())
      .then((data) => {
        setRecommendations(data)
      })
      .then(() => setIsLoading(false))
  }, [])

  
  /**
   * Truncates a given text to a specified maximum length and appends an ellipsis if needed.
   *
   * @param text - The text to truncate.
   * @param maxLength - The maximum allowed length.
   * @returns The truncated text with "..." if it exceeds the limit.
   */
  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  /**
   * Converts an array of artist objects into a single comma-separated string of artist names.
   *
   * @param artists - Array of artist objects.
   * @returns A comma-separated string of artist names.
   */
  const getArtists = (artists: Artist[]): string => {
    if (!artists) return "";
    return artists.map((artist) => artist.name).join(", ");
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Box mt={8} width="70%" maxW="40em" textAlign="left">
      <Text fontSize="32px" fontWeight="bold" fontStyle="italic" mb={4}>
        Discover new albums
      </Text>
      <Box
        overflow="hidden"
        position="relative"
        borderRadius="lg"
        py={6}
        css={{
          ".slick-dots": {
            bottom: "-1.6em",
          },
          ".slick-dots li button:before": {
            color: "#4A90E2",
          },
          ".slick-dots li.slick-active button:before": {
            color: "#1C4E80",
          },
          ".slick-slide": {
            padding: "0 10px", 
          },
        }}
      >
        {isLoading &&
          <Box w="100%" h="200px" display={"flex"} alignItems="center" justifyContent={"center"}>
            <Spinner />
          </Box>}
      <Slider {...settings}>
          {recommendations?.data?.albums.items.map((album, index) => (
            <Box
              as={Link}
              href={`/album/${album.id}`}
              key={index}
              bg="brand.400"
              p={4}
              borderRadius="5px"
              textAlign="center"
              cursor={"pointer"}
              height="15em"
              display="flex"
              flexDirection="column"
              alignItems={"start"}
              justifyContent={"end"}
            >
              <Image
                src={album.images[0].url}
                alt={album.name}
                borderRadius="5px"
                objectFit="cover"
                
              />
              
                <Text fontWeight="medium" fontSize="lg" color="brand.500" align={"left"} mt={2}>
                  {truncateText(album.name, 10)}
                </Text>
                <Text fontSize="sm" fontStyle="italic" color="brand.500" align={"left"}>
                  {truncateText(getArtists(album.artists), 10)}
                </Text>
              
            </Box>
          ))}
      </Slider>
      </Box>
    </Box>
  );
};

export default DiscoverNewAlbums;
