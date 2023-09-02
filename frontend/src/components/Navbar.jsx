import React from "react";
import { Box, Flex, Spacer, Button, Image, Link as ChakraLink } from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 

const Navbar = () => {
  let navigate = useNavigate()
  const handleLogout = async() => {
    try {
      await axios.delete('http://localhost:5000/logout')
      navigate('/')
    } catch (error) {
      console.error(error)
    } 
  }
  const goToHome = () => {
    navigate('/dashboard')
  }
  const goToBooks = () => {
    navigate('/dashboard/books')
  }

  const goToEditBook = () => {
    navigate('/dashboard/books/edit')
  }
  const goToUpdateBook = () => {
    navigate('/dashboard/books/update')
  }
  
  return (
    <Box p={3} bg="blue.500" color="white" mb={10}>
      <Flex alignItems="center" mx={5}>
        <Image src="" alt="Logo" boxSize="40px" mr={7} />
        <div style={{}}>
        <ChakraLink onClick={goToHome} fontSize='l' ml={10}> 
            Home
        </ChakraLink>
        <ChakraLink onClick={goToBooks} fontSize='l' ml={10}> 
            Books
        </ChakraLink>
        <ChakraLink onClick={goToEditBook} fontSize='l' ml={10}> 
            Add Book
        </ChakraLink>
        <ChakraLink onClick={goToUpdateBook} fontSize='l' ml={10}> 
            Update Book
        </ChakraLink>
        </div>
        <Spacer />
        <Button
          colorScheme="red"
          onClick={handleLogout}
        >
          Log out
        </Button>
      </Flex>
    </Box>
  );
};

export default Navbar;
