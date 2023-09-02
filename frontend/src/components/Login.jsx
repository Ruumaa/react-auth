import { Box, Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
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
        password
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
          <form onSubmit={handleAuth}>
            <FormControl id="email" isRequired>
              <FormLabel>Email Address</FormLabel>
              <Input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Input>
            </FormControl>

            <FormControl id="password" isRequired mt="4">
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></Input>
            </FormControl>
            <Button
              colorScheme="teal"
              type="submit"
              mt={4}
              fontSize="20px"
              padding="20px 0"
              width="75%"

              //   onClick={handleSubmit}
            >
              Log in
            </Button>
          </form>
        </Box>
      </Box>
    </>
  );
};

export default Login;
