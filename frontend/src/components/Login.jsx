import { Box, Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { useState } from "react";

const Login = () => {
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
          textAlign='center'
        >
          <form
          //onSubmit={handleSubmit}
          >
            <FormControl id="email" isRequired>
              <FormLabel>Email Address</FormLabel>
              <Input
                type="email"
                name="email"
                // value={formData.email}
                // onChange={handleChange}
              ></Input>
            </FormControl>

            <FormControl id="password" isRequired mt="4">
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                name="password"
                // value={formData.password}
                // onChange={handleChange}
              ></Input>
            </FormControl>
            <Button
              colorScheme="teal"
              type="submit"
              mt={4}
              fontSize="20px"
              padding="20px 0"
              width='75%'

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
