import {
    Box,
    Divider,
    Flex,
  } from "@chakra-ui/react";
  import Head from "next/head";
  import Navbar from "../components/Navbar/Navbar";
  import CurrentlyPlaying from "../components/CurrentlyPlaying/CurrentlyPlaying";
  import PopularWithFriends from "../components/PopularWithFriends/PopularWithFriends";
  import RecentlyPlayed from "../components/RecentlyPlayed/RecentlyPlayed";
  import YourObssessions from "../components/YourObssessions/YourObssessions";
  import GetInSync from "../components/GetInSync/GetInSync";
  import DiscoverNewAlbums from "../components/DiscoverNewAlbums/DiscoverNewAlbums";
import { useEffect } from "react";
import axios from "axios";
import useAuth from "../hooks/useAuth";
  
  export default function Home() {
    const isAuthenticated = useAuth()

    if (!isAuthenticated) return null
  
    return (
      <Box px={"180px"} py={"40px"} mx="auto" position="relative">
        <Head>
          <title>Home</title>
        </Head>
        <Navbar />
  
        <Flex justifyContent="space-between" alignItems="flex-start" position="relative">
          <Box flex="1" mr={4}>
            <CurrentlyPlaying/>
            <PopularWithFriends />
            <DiscoverNewAlbums />
          </Box>
  
          <Divider
            orientation="vertical"
            borderColor="gray.300"
            height="calc(100% - 20px)"
            position="absolute"
            left="45%" 
            top="0"
            transform="translateX(-50%)"
            zIndex="0"
          />
  
  
          <Box flex="1" ml={4}>
            <RecentlyPlayed />
            <Divider  borderColor="gray.300" width="calc(100% - 10px)" my={5} />
            <YourObssessions/>
          </Box>
        </Flex>
  
        <Box mt={10}>
          <GetInSync />
        </Box>
      </Box>
    );
  }
  