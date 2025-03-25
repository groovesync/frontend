import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { Box, Text, VStack, Image } from "@chakra-ui/react";
import mockData from "../../mockData/popularWithFriends.json";

interface PopularResponse {
  albums: {
    name: string,
    image: string,
    release_year: string,
    id: string
  }[]
}

const PopularWithFriends: React.FC = () => {

  const [isLoading, setIsLoading] = useState(true)
  const [popular, setPopular] = useState<PopularResponse>()


  useEffect(() => {
    setIsLoading(true)
    fetch(`http://150.165.85.37:5000/review/popular-with-friends`,{
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("@groovesync-backend-token"),
        "Spotify-Token": localStorage.getItem("@groovesync-spotify-access-token") || ""
      }})
      .then((res) => res.json())
      .then((data) => {
        setPopular(data)
      })
      .then(() => setIsLoading(false))
  }, [])

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
        Popular with friends
      </Text>
      <Box
        overflow="hidden"
        position="relative"
        borderRadius="lg"
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
          {popular?.albums.map((item, index) => (
            <Box
              key={index}
              bg="white"
              p={4}
              borderRadius="5px"
              textAlign="center"
              mx={2}
            >
             <Image
                src={item.image}
                alt={item.name}
                boxSize="100%"
                style={{ borderRadius: "5px" }}
                objectFit="cover"
                mb={2}
              />

              <Text fontWeight="medium" fontSize="lg">
                {item.name}
              </Text>
              <Text fontSize="sm" color="gray.500">
                {item.release_year}
              </Text>
            </Box>
          ))}
        </Slider>
      </Box>
    </Box>
  );
};

export default PopularWithFriends;