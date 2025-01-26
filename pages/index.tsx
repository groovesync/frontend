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

  return (
    <Box p={8} mx="auto">
      <Heading mb={4} textAlign="center" color="blue.500">
        Testando o Chakra UI
      </Heading>

      <Text mb={6} fontSize="lg" textAlign="center">
        Experimente diferentes componentes com este exemplo.
      </Text>

      <Stack spacing={4}>
        <Input placeholder="Digite algo..." size="lg" />
        <Button colorScheme="blue" size="lg" onClick={handleToast}>
          Clique aqui para um Toast
        </Button>
        <Divider />
        <Text>
          Esta é uma{" "}
          <Text as="span" color="green.500" fontWeight="bold">
            demonstração
          </Text>{" "}
          de componentes do Chakra UI.
        </Text>
      </Stack>

      <YourObssessions mainImage={rosalia} secondaryImages={[rosalia, rosalia, rosalia, rosalia]}/>
    </Box>
  );
}
