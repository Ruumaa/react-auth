import React from "react";
import { Box, Flex, Spacer, Button, Image, Link as ChakraLink } from "@chakra-ui/react";
const Navbar = () => {
  return (
    <Box p={4} bg="blue.500" color="white">
      <Flex alignItems="center" mx={5}>
        <Image src="" alt="Logo" boxSize="40px" mr={7} />
        <ChakraLink to='/' fontSize='xl'> 
            Home
        </ChakraLink>
        <Spacer />
        <Button
          colorScheme="red"
          // onClick={onLogout}
        >
          Log out
        </Button>
      </Flex>
    </Box>
  );
};

export default Navbar;
