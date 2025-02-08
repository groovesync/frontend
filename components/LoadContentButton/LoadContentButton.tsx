import { Button, Image } from "@chakra-ui/react"
import React from "react"

const LoadContentButton: React.FC<{loadMore: boolean, 
                                    callback: () => void}> = ({loadMore = true, callback}) => {
    return (
        <Button
            mt="20px"
            color={"brand.500"}
            bg={"brand.400"}
            h="35px"
            borderRadius={"full"}
            gap="4"
            fontWeight={"medium"}
            _hover={{ boxShadow: "sm" }}
            _active={{ boxShadow: "sm" }}
            transition="box-shadow 0.2s ease-in-out"
            onClick={callback}>
                {loadMore ? <ArrowDown /> : <ArrowUp />}
                {loadMore ? "See more" : "See less"}
        </Button>
    )
}

export default LoadContentButton

const ArrowUp = () => {
    return <Image src="/assets/ArrowUp.svg" alt="Arrow pointing up" />;
  };
  
  const ArrowDown = () => {
    return <Image src="/assets/ArrowDown.svg" alt="Arrow pointing down" />;
  };
  