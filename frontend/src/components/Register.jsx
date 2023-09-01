import { Box, Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [msg, setMsg] = useState("");
  let navigate = useNavigate(); //untuk melakukan redirect

  const handleRegister = async (e) => {
    e.preventDefault(); //agar tidak auto reload
    try {
      await axios.post("http://localhost/5000/users", {
        name,
        email,
        password,
        confPassword,
      });
      navigate("/"); //redirect ke hal. login
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
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
          <form onSubmit={handleRegister}>
            <FormControl id="name" isRequired>
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                name="name"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Input>
            </FormControl>

            <FormControl id="email" isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                name="email"
                placeholder="megachan@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Input>
            </FormControl>

            <FormControl id="password" isRequired mt="4">
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                name="password"
                placeholder="******"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></Input>
            </FormControl>
            <FormControl id="Confpassword" isRequired mt="4">
              <FormLabel>Confirm Password</FormLabel>
              <Input
                type="password"
                name="password"
                placeholder="******"
                value={confPassword}
                onChange={(e) => setConfPassword(e.target.value)}
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
              Register
            </Button>
          </form>
        </Box>
      </Box>
    </>
  );
};

export default Register;
