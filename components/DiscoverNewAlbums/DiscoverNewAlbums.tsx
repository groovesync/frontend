'use client'

import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { Box, Text, Image, Spinner } from "@chakra-ui/react";
import Link from "next/link";

interface Artist {
  name: string
}

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

  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  const getArtists = (artists: Artist[]) => {
    if (!artists) {
      return ""
    }
    let result = ""
    for (let i = 0; i < artists.length; i++) {
      if (i == artists.length - 1) {
        result += artists[i].name
      } else {
        result += artists[i].name + ", "
      }
    }
    return result
  }

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
