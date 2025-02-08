import React from "react";
import Slider from "react-slick";
import { Box, Text, Image } from "@chakra-ui/react";
import Link from "next/link";
import mockData from "../../mockData/discoverNewAlbums.json";

interface Artist {
  name: string,
  id: string
}

const DiscoverNewAlbums: React.FC = () => {
  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  const getArtists = (artists: Artist[]) => {
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
      <Text fontSize="2xl" fontWeight="bold" fontStyle="italic" mb={4}>
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
        <Slider {...settings}>
          {mockData.map((item, index) => (
            <Box
              as={Link}
              href={`/album/${item.id}`}
              key={index}
              bg="brand.400"
              p={4}
              borderRadius="5px"
              textAlign="center"
              cursor={"pointer"}
              height="13em" 
              display="flex"
              flexDirection="column"
            >
              <Image
                src={item.coverURL}
                alt={item.title}
                boxSize="120px"
                borderRadius="5px"
                objectFit="cover"
                mb={2}
                mx="auto" 
              />
              <Box>
                <Text fontWeight="medium" fontSize="lg" color="brand.500">
                  {truncateText(item.title, 10)}
                </Text>
                <Text fontSize="sm" fontStyle="italic" color="brand.500">
                  {truncateText(getArtists(item.artist), 10)}
                </Text>
              </Box>
            </Box>
          ))}
        </Slider>
      </Box>
    </Box>
  );
};

export default DiscoverNewAlbums;
