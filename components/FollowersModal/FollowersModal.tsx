// components/FollowersModal/FollowersModal.tsx
import { Avatar, chakra, Image, Text } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  VStack,
  HStack,
} from "@chakra-ui/react";

interface ModalProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  modalType: "followers" | "following";
  userFollowers: userFollowerFollowing[];
  userFollowing: userFollowerFollowing[];
}

interface userFollowerFollowing {
  name: string;
  profileURL: string;
  profilePictureURL: string;
}

const FollowersModal: React.FC<ModalProps> = ({
  isOpen,
  onOpen,
  onClose,
  modalType,
  userFollowers,
  userFollowing,
}) => {
  // Se o valor não for um array, utiliza um array vazio.
  const peopleList =
    modalType === "followers"
      ? Array.isArray(userFollowers)
        ? userFollowers
        : []
      : Array.isArray(userFollowing)
      ? userFollowing
      : [];

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      <ModalOverlay />
      <ModalContent borderRadius="20px" p="20px">
        <ModalHeader fontSize="32px" fontWeight="bold" fontStyle="italic">
          {modalType === "followers" ? "Followers" : "Following"}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody maxH="400px" overflowY="auto">
          <VStack spacing={4} align="start">
            {peopleList.map((person, index) => (
              <HStack
                key={index}
                w="100%"
                justifyContent="space-between"
                as={Link}
                href={`/${person.profileURL}`}
              >
                <HStack>
                  <Avatar size="sm" src={person.profilePictureURL} />
                  <Text>{person.name}</Text>
                </HStack>
                <ArrowRight />
              </HStack>
            ))}
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

const ArrowRight = () => {
  return <Image src="/assets/ArrowRight.svg" alt="Arrow pointing right" />;
};

export default FollowersModal;