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

  return (
    <Box p={8} maxW="600px" mx="auto">
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
    </Box>
  );
}
