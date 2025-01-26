import {
  Box,
  Button,
  Heading,
  Text,
  Input,
  Stack,
  Divider,
  useToast,
} from "@chakra-ui/react";
import CurrentlyPlaying from "../components/CurrentlyPlaying/CurrentlyPlaying";
import YourObssessions from "../components/YourObssessions/YourObssessions";

export default function Home() {
  const toast = useToast();

  const handleToast = () => {
    toast({
      title: "Teste do Chakra UI!",
      description: "Este é um toast simples do Chakra UI.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const rosalia = "https://s2-g1.glbimg.com/hkfGoM2o8Pnbocz_-Z4X9SQggeI=/0x0:4200x2800/924x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2023/2/u/HH2bh4RTSFiOjjuAvDgA/rosalia.jpg"
  const beatles = "https://is1-ssl.mzstatic.com/image/thumb/Music114/v4/6f/79/8d/6f798d84-7475-8525-fc91-f7b51b2b5a9b/00602567725428.rgb.jpg/1200x1200bb.jpg"
  return (
    <Box p={8} mx="auto">
      <YourObssessions mainImage={rosalia} secondaryImages={[rosalia, rosalia, rosalia, rosalia]}/>
      <CurrentlyPlaying albumCoverURL={beatles} artistName="The Beatles" songTitle="Sgt. Pepper's Lonely Hearts Club Band" />
    </Box>
  );
}
