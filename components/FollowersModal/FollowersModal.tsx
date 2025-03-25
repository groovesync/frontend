// components/FollowersModal/FollowersModal.tsx
import { Avatar, Image, Text } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, VStack, HStack } from "@chakra-ui/react";

interface Follower {
  user_id: string;
  user_display_name: string;
  user_image: string;
}

interface Following {
  user_id: string;
  user_display_name: string;
  user_image: string;
}

interface FollowersModalProps {
  isOpen: boolean;
  onClose: () => void;
  modalType: "followers" | "following";
  userFollowers: Follower[];
  userFollowing: Following[];
}

const FollowersModal: React.FC<FollowersModalProps> = ({ isOpen, onClose, modalType, userFollowers, userFollowing }) => {
  const list = modalType === "followers" ? userFollowers : userFollowing;

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
            {list.map((person, index) => (
              <HStack key={index} w="100%" justifyContent="space-between" as={Link} href={"/profile/" + person.user_id}>
                <HStack>
                  <Avatar size="sm" src={person.user_image} />
                  <Text>{person.user_display_name}</Text>
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
