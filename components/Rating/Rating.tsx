import { Box, HStack, Icon } from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import React, { useState } from "react";

interface RatingProps {
  value?: number;
  isReadOnly?: boolean;
  onChange?: (value: number) => void;
}

export const Rating: React.FC<RatingProps> = ({
  value = 0,
  isReadOnly = false,
  onChange,
}) => {
  const [hoverValue, setHoverValue] = useState<number | null>(null);
  const [currentValue, setCurrentValue] = useState(value);

  const handleMouseEnter = (newValue: number) => {
    if (!isReadOnly) setHoverValue(newValue);
  };

  const handleMouseLeave = () => {
    if (!isReadOnly) setHoverValue(null);
  };

  const handleClick = (newValue: number) => {
    if (!isReadOnly) {
      setCurrentValue(newValue);
      if (onChange) {
        onChange(newValue);
      }
    }
  };

  return (
    <HStack>
      {Array.from({ length: 5 }, (_, index) => index + 1).map((starValue) => (
        <Box
          key={starValue}
          onMouseEnter={() => handleMouseEnter(starValue)}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleClick(starValue)}
          cursor={isReadOnly ? "default" : "pointer"}
          w="fit-content"
          m={0}
          p={0}
          sx={{ marginInlineStart: "0px !important" }}
        >
          <Icon
            as={StarIcon}
            m={0}
            boxSize={3}
            sx={{ marginInlineStart: "3px !important" }}
            color={
              (hoverValue || currentValue) >= starValue ? "brand.500" : "brand.400"
            }
          />
        </Box>
      ))}
    </HStack>
  );
};
