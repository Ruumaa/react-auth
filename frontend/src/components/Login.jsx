import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let navigate = useNavigate();

  const handleAuth = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/login", {
        email,
        password,
      });
      Swal.fire({
        icon: "success",
        title: "Login Success",
        text: "Login Sucsessfully!",
        showConfirmButton: false,
        timer: 1500
      });
      navigate("/dashboard");
    } catch (error) {
      if (error.response) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response.data.msg, // Menggunakan pesan kesalahan dari respons server
        });
      }
    }
  };
  const goToRegister =() => {
    navigate('/register')
  }
  return (
    <>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        bgColor=""
      >
        <Box
          maxW="lg"
          borderRadius="lg"
          borderWidth={1}
          p={10}
          boxShadow="lg"
          bg="white"
          textAlign="center"
        >
          <Text
            fontSize="4xl"
            fontWeight="bold"
            mb={8}
            mt={-5}
            textAlign="start"
          >
            Login
          </Text>
          <form onSubmit={handleAuth}>
            <FormControl id="email" isRequired>
              <FormLabel>Email Address</FormLabel>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Input>
            </FormControl>

            <FormControl id="password" isRequired mt="4">
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></Input>
            </FormControl>
            <Button
              colorScheme="teal"
              type="submit"
              mt={5}
              fontSize="15px"
              padding="20px 0"
              width="50%"
            >
              Let's go!
            </Button>
          </form>
              <ChakraLink
                to="/register"
                fontSize="2xs"
                textDecoration="underline"
                color="blue.500"
                onClick={goToRegister}
              >
                Sign Up
              </ChakraLink>
        </Box>
      </Box>
    </>
  );
};

export default Login;
