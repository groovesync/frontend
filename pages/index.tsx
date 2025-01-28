import {
  Box, Divider, Flex
} from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import CurrentlyPlaying from "../components/CurrentlyPlaying/CurrentlyPlaying";
import Navbar from "../components/Navbar/Navbar";
import YourObssessions from "../components/YourObssessions/YourObssessions";

export default function Home() {

  const rosalia = "https://s2-g1.glbimg.com/hkfGoM2o8Pnbocz_-Z4X9SQggeI=/0x0:4200x2800/924x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2023/2/u/HH2bh4RTSFiOjjuAvDgA/rosalia.jpg"
  const charli = "https://musicainstantanea.com.br/wp-content/uploads/2024/02/Charli-XCX-%E2%80%93-Brat-e1709237963434.jpeg"
  const djavan = "https://djavan.com.br/content/uploads/2022/08/bio-1-960x0-c-default.jpg"
  const lorde = "https://i.scdn.co/image/ab6761610000e5ebc4902f080d3620b3e6da80c3"
  const beatles = "https://m.media-amazon.com/images/M/MV5BMjA2ODY1MDA5MV5BMl5BanBnXkFtZTcwNjU1MzIyOA@@._V1_FMjpg_UX1000_.jpg"
  const beatlesAlbum = "https://is1-ssl.mzstatic.com/image/thumb/Music114/v4/6f/79/8d/6f798d84-7475-8525-fc91-f7b51b2b5a9b/00602567725428.rgb.jpg/1200x1200bb.jpg"
  
  return (
    <Box px={"180px"} py={"40px"} mx="auto">
      <Head>
        <title>
          Home
        </title>
        
      </Head>
      <Navbar />

      <Flex justifyContent="space-between" alignItems="flex-start">
        <Box flex="1" mr={4}>
          <CurrentlyPlaying
            albumCoverURL={beatlesAlbum}
            artistName="The Beatles"
            songTitle="Sgt. Pepper's Lonely Hearts Club Band"
          />
        </Box>

        <Box flex="1" ml={4}>
          <YourObssessions
            mainImage={rosalia}
            secondaryImages={[charli, djavan, beatles, lorde]}
          />
        </Box>
      </Flex>
      
    </Box>
  );
}
