import { useState } from "react";
import {
  Container,
  Text,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
} from "@chakra-ui/react";
import Navbar from "./Navbar";
import { addBook } from "../fetch/books.js";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export const Create = () => {
  const [name, setName] = useState("");
  const [year, setYear] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [photo, setPhoto] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let formData = new FormData();
      formData.append("name", name);
      formData.append("year", year);
      formData.append("author", author);
      formData.append("genre", genre);
      formData.append("photo", photo);

      await addBook(formData);

      Swal.fire({
        icon: "success",
        title: "Create Book Success",
        text: "Book created sucessfully!",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate('/dashboard/books')
    } catch (error) {
      if (error.response) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response.data.msg,
        });
      }
    }
  };

  return (
    <>
      <Navbar />
      <Container>
        <Text fontSize="3xl" textAlign="center" fontWeight="bold" mb={5}>
          Add New Book
        </Text>
        <FormControl isRequired>
          <Stack spacing="15px">
            <FormLabel>NAME/TITLE</FormLabel>
            <Input
              type="text"
              placeholder="Your favourite book/novel.."
              onChange={(e) => setName(e.target.value)}
            ></Input>
            <FormLabel>YEAR</FormLabel>
            <Input
              type="text"
              placeholder="When the book/novel published.."
              onChange={(e) => setYear(e.target.value)}
            ></Input>
            <FormLabel>AUTHOR</FormLabel>
            <Input
              type="text"
              placeholder="The legend who made the book/novel.."
              onChange={(e) => setAuthor(e.target.value)}
            ></Input>
            <FormLabel>GENRE</FormLabel>
            <Input
              type="text"
              placeholder="Theme about the book/novel.."
              onChange={(e) => setGenre(e.target.value)}
            ></Input>
            <FormLabel>IMAGE</FormLabel>
            <Input
              type="file"
              onChange={(e) => setPhoto(e.target.files[0])}
            ></Input>
            <Button colorScheme="teal" onClick={handleSubmit}>
              SUBMIT
            </Button>
          </Stack>
        </FormControl>
      </Container>
    </>
  );
};
