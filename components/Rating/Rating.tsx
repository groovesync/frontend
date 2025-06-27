import { Box, HStack, Icon } from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import React, { useState } from "react";

/**
 * Props for Rating component.
 *
 * @typedef {Object} RatingProps
 * @property {number} [value] - Initial rating value (0-5).
 * @property {boolean} [isReadOnly] - If true, disables hover and click interactions.
 * @property {(value: number) => void} [onChange] - Callback invoked with new value on click.
 */
interface RatingProps {
  value?: number;
  isReadOnly?: boolean;
  onChange?: (value: number) => void;
}

/**
 * Rating component renders a 5-star rating UI.
 * Users can hover and click stars to set a rating,
 * unless read-only mode is enabled.
 *
 * @component
 * @param {RatingProps} props - Component props.
 * @returns {JSX.Element} The star rating interface.
 */
export const Rating: React.FC<RatingProps> = ({
  value = 0,
  isReadOnly = false,
  onChange,
}) => {
  const [hoverValue, setHoverValue] = useState<number | null>(null);
  const [currentValue, setCurrentValue] = useState(value);

  /**
   * Sets hover state to highlight stars on mouse enter.
   * @param {number} newValue - Star value being hovered.
   */
  const handleMouseEnter = (newValue: number) => {
    if (!isReadOnly) setHoverValue(newValue);
  };

  /**
   * Resets hover state on mouse leave.
   */
  const handleMouseLeave = () => {
    if (!isReadOnly) setHoverValue(null);
  };

  /**
   * Updates rating on click and calls onChange callback.
   * @param {number} newValue - Star value clicked.
   */
  const handleClick = (newValue: number) => {
    if (!isReadOnly) {
      setCurrentValue(newValue);
      if (onChange) onChange(newValue);
    }
  };

  return (
    <HStack>
      {Array.from({ length: 5 }, (_, i) => i + 1).map((starValue) => (
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
              (hoverValue || currentValue) >= starValue
                ? "brand.500"
                : "brand.400"
            }
          />
        </Box>
      ))}
    </HStack>
  );
};
