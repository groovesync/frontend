import React from "react";
import Slider from "react-slick";
import { Box, Text, Image } from "@chakra-ui/react";
import Link from 'next/link';
import mockData from "../../mockData/discoverNewAlbums.json";

const DiscoverNewAlbums: React.FC = () => {
  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
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
      <Text fontSize="2xl" fontWeight="bold" fontStyle="italic" mb={4}>
        Discover new albums
      </Text>
      <Box
        overflow="hidden"
        position="relative"
        borderRadius="lg"
        boxShadow="sm"
        py={6}
        css={{
          ".slick-dots": {
            bottom: "-1.2em",
          },
          ".slick-dots li button:before": {
            color: "#4A90E2",
          },
          ".slick-dots li.slick-active button:before": {
            color: "#1C4E80",
          },
        }}
      >
        <Slider {...settings}>
          {mockData.map((item, index) => (
            <Box
            as={Link}
            href={item.isReviewed ? `/album-reviewed/${item.id}` : `/album-not-reviewed/${item.id}`}
            key={index}
            bg="white"
            p={4}
            borderRadius="md"
            boxShadow="sm"
            textAlign="center"
            mx={2}
          >
            <Image
              src={item.coverURL}
              alt={item.title}
              boxSize="100px"
              style={{ borderRadius: "12px" }}
              objectFit="cover"
              mb={2}
            />
            <Text fontWeight="medium" fontSize="lg" color="brand.500">
              {truncateText(item.title, 10)}
            </Text>
            <Text fontSize="sm" fontStyle="italic" color="brand.500">
              {truncateText(item.artist, 10)}
            </Text>
          </Box>
          
          ))}
        </Slider>
      </Box>
    </Box>
  );
};

export default DiscoverNewAlbums;
