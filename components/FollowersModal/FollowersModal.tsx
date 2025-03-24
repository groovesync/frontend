import { Avatar, chakra, Image, Text } from "@chakra-ui/react"
import Link from "next/link"
import React from "react"
import {Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, VStack, HStack} from "@chakra-ui/react"

interface ModalProps {
    isOpen: boolean,
    onOpen: () => void,
    onClose: () => void,
    modalType: "followers" | "following",
    userFollowers: FollowersResponse,
    userFollowing: FollowingResponse
}

interface FollowersResponse {
    followers: {
        user_id: string,
        user_display_name: string,
        user_image: string
    }[]
  }
  
  interface FollowingResponse {
    following: {
        user_id: string,
        user_display_name: string,
        user_image: string
    }[]
  }

const FollowersModal: React.FC<ModalProps> = ({isOpen, onOpen, onClose, modalType, userFollowers, userFollowing}) => {
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
                {(modalType === "followers" ? (userFollowers?.followers ? userFollowers?.followers : []) : (userFollowing?.following ? userFollowing?.following : [])).map((person, index) => (
                    <HStack key={index} w="100%" justifyContent="space-between" as={Link} href={"/user/"+person.user_id}>
                    <HStack >
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
    )
}

const ArrowRight = () => {
    return <Image src="/assets/ArrowRight.svg" alt="Arrow pointing right" />;
  };
  

export default FollowersModal