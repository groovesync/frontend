import { Box, Button, Image, Link, Spinner, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import {motion} from "framer-motion";

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

  useEffect(() => {
    if (code) {
      setIsLoading(true);

      axios
        .post("http://127.0.0.1:5000/auth/login/spotify", { code })
        .then((response) => {
          let loginData: LoginData = response.data

          localStorage.setItem("backendToken", loginData.backend_token)
          localStorage.setItem("spotifyAccessToken", loginData.spotify_access_token)
          localStorage.setItem("profilePictureURL", loginData.user_info.images[0].url)
          localStorage.setItem("spotifyId", loginData.user_info.spotify_id)
          localStorage.setItem("username", loginData.user_info.username)
          
          router.push("/home")
        })
        .catch((error) => {
          console.error("Erro ao autenticar:", error.response?.data || error.message);
        })
        
    }
  }, [code, router]);

  const SPOTIFY_CLIENT_ID = "b8661362a8284aa79979401497393b3a";
  const SPOTIFY_REDIRECT_URI = "http://localhost:3000";
  const SPOTIFY_URL = `https://accounts.spotify.com/authorize?client_id=${SPOTIFY_CLIENT_ID}&response_type=code&redirect_uri=${SPOTIFY_REDIRECT_URI}&scope=user-read-email%20user-read-private`;

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
  return <Image src={"/frenchlilac.svg"} />;
};

const SpotifyIcon = () => {
  return <Image w="35px" h="35px" alt="Spotify Icon" src={"/assets/Spotify.svg"}/>;
};
