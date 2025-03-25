import { Button } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";

interface FollowButtonProps {
  onFollow: () => void;
  onUnfollow: () => void;
  initialFollowing: boolean;
}

const FollowButton: React.FC<FollowButtonProps> = ({ onFollow, onUnfollow, initialFollowing }) => {
  const [isFollowing, setIsFollowing] = useState(initialFollowing);

  // Se a prop mudar, atualiza o estado
  useEffect(() => {
    setIsFollowing(initialFollowing);
  }, [initialFollowing]);

  const handleClick = () => {
    if (isFollowing) {
      onUnfollow();
    } else {
      onFollow();
    }
    setIsFollowing(!isFollowing);
  };

  return (
    <Button
      mt={4}
      rel="noopener noreferrer"
      bg={isFollowing ? "gray.300" : "brand.400"}
      color="brand.500"
      fontWeight="regular"
      borderRadius="full"
      gap={4}
      h="35px"
      onClick={handleClick}
    >
      {isFollowing ? "Seguindo" : "Seguir"}
    </Button>
  );
};

export default FollowButton;