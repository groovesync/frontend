'use client'

import { Box, Button, Image, Link, Spinner, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import {motion} from "framer-motion";
import { usePathname } from "next/navigation";

const MotionBox = motion(Box);
const MotionText = motion(Text);
const MotionButton = motion(Button);

interface LoginData {
  backend_token: string,
  spotify_access_token: string,
  success: boolean,
  user_info: UserInfo,
} 

interface UserInfo {
  email: string,
  followers: number,
  images: ImageData[],
  spotify_id: string,
  username: string
}

interface ImageData {
  height: number,
  width: number,
  url: string
}

const LandingPage = () => {
  const router = useRouter();
  
  const { code } = router.query;
  const [isLoading, setIsLoading] = useState(false);
  const origin = process.env.NEXT_PUBLIC_URL

  useEffect(() => {
    if (code) {
        setIsLoading(true);

        fetch("http://150.165.85.37:5000/auth/login/spotify", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({"code": code})
        })
        .then(async (response) => {
            if (!response.ok) {
                throw new Error(`Erro HTTP! Status: ${response.status}`);
            }
            return response.json();
        })
        .then((loginData: LoginData) => {
            localStorage.setItem("@groovesync-backend-token", loginData.backend_token);
            localStorage.setItem("@groovesync-spotify-access-token", loginData.spotify_access_token);
            localStorage.setItem("@groovesync-profile-picture-url", loginData.user_info.images[0].url);
            localStorage.setItem("@groovesync-spotify-id", loginData.user_info.spotify_id);
            localStorage.setItem("@groovesync-username", loginData.user_info.username);

            router.push("/home");
        })
        .catch((error) => {
            console.error("Erro ao autenticar:", error.message);
        });
    }
}, [code, router]);


  const SPOTIFY_CLIENT_ID = "70dc0dae48b444afad783c41008b1e3b";
  const SPOTIFY_REDIRECT_URI = origin;
  const SPOTIFY_URL = `https://accounts.spotify.com/authorize?client_id=${SPOTIFY_CLIENT_ID}&response_type=code&redirect_uri=${SPOTIFY_REDIRECT_URI}&scope=user-read-recently-played%20user-read-currently-playing%20user-top-read%20user-library-read%20user-read-playback-state%20user-modify-playback-state%20user-read-email%20user-read-private`;

  return (
    <Box
      backgroundImage={"/assets/HomePageBG.jpg"}
      backgroundSize={"cover"}
      w="100vw"
      h="100vh"
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <MotionBox
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        <GrooveSyncLilacIcon />
      </MotionBox>

      <MotionText
        fontSize={"80px"}
        fontWeight={"semibold"}
        fontStyle={"italic"}
        color={"brand.400"}
        pb="2rem"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.4 }}
      >
        Amplify your sounds
      </MotionText>

      <MotionButton
        as={Link}
        href={SPOTIFY_URL}
        bg="brand.400"
        color="brand.500"
        fontWeight="regular"
        borderRadius="full"
        h="50px"
        w="300px"
        _hover={{ textDecoration: "none" }}
        display={"flex"}
        alignItems="center"
        justifyContent="flex-start"
        px={6}
        gap={"1rem"}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.6 }}
        isDisabled={isLoading}
      >
        {isLoading ? (
          <Spinner size="sm" color="brand.500" />
        ) : (
          <>
            <SpotifyIcon />
            Connect with Spotify
          </>
        )}
      </MotionButton>
    </Box>
  );
};

export default LandingPage;

const GrooveSyncLilacIcon = () => {
  return <Image alt={"GrooveSync Logo"} src={"/frenchlilac.svg"} />;
};

const SpotifyIcon = () => {
  return <Image w="35px" h="35px" alt="Spotify Icon" src={"/assets/Spotify.svg"}/>;
};
