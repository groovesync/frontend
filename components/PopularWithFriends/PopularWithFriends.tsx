import React, { useEffect, useState } from "react";
import { Box, Text, VStack, Image } from "@chakra-ui/react";
import { useRouter } from "next/router";

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
  const router = useRouter()


  useEffect(() => {
    setIsLoading(true)
    fetch(`http://150.165.85.37:5000/review/popular-with-friends?spotifyId=${localStorage.getItem("@groovesync-spotify-id") || ""}`,{
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

  return (
    <Box mt={8} width="70%" maxW="40em" textAlign="left">
      <Text fontSize="32px" fontWeight="bold" fontStyle="italic" mb={4}>
        Popular with friends
      </Text>
      <Box
        gap={3}>
          {popular?.albums.map((item, index) => (
            <Box
              key={index}
              bg="white"
              borderRadius="5px"
              textAlign="center"
              w="150px"
              onClick={() => router.push(`/album/${item.id}`)}
              cursor={"pointer"}
            >
             <Image
                src={item.image}
                alt={item.name}
                style={{ borderRadius: "5px" }}
                w={"150px"}
                h={"150px"}
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
      </Box>
    </Box>
  );
};

export default PopularWithFriends;