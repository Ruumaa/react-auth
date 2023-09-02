import { useEffect, useState } from "react";
import {
  Container,
  Text,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Select,
} from "@chakra-ui/react";
import Navbar from "./Navbar";
import { updateBook, getBooks } from "../fetch/books.js";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export const Update = () => {
  const [books, setBooks] = useState([]);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [year, setYear] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [photo, setPhoto] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await getBooks();
      setBooks(response);
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

  const handleSubmit = async (e, id) => {
    e.preventDefault();
    try {
      let formData = new FormData();
      formData.append("id", id);
      formData.append("name", name);
      formData.append("year", year);
      formData.append("author", author);
      formData.append("genre", genre);
      formData.append("photo", photo);

      await updateBook(id, formData);

      Swal.fire({
        icon: "success",
        title: "Update Book Success",
        text: "Book updated sucessfully!",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/dashboard/books");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Navbar />
      <Container>
        <Text fontSize="3xl" textAlign="center" fontWeight="bold" mb={5}>
          Update Book
        </Text>
        <FormControl isRequired>
          <Stack spacing="15px">
            <FormLabel>Select Book</FormLabel>
            <Select
              onChange={(e) => setId(e.target.value)}
              placeholder="Select a book"
              value={id} // Menambahkan nilai ID ke Select
            >
              {books.map((book) => (
                <option key={book.id} value={book.id}>
                  {book.name}
                </option>
              ))}
            </Select>
            <FormLabel>NAME/TITLE</FormLabel>
            <Input
              type="text"
              placeholder="Your favourite book/novel.."
              onChange={(e) => setName(e.target.value)}
              value={name}
            ></Input>
            <FormLabel>YEAR</FormLabel>
            <Input
              type="text"
              placeholder="When the book/novel published.."
              onChange={(e) => setYear(e.target.value)}
              value={year}
            ></Input>
            <FormLabel>AUTHOR</FormLabel>
            <Input
              type="text"
              placeholder="The legend who made the book/novel.."
              onChange={(e) => setAuthor(e.target.value)}
              value={author}
            ></Input>
            <FormLabel>GENRE</FormLabel>
            <Input
              type="text"
              placeholder="Theme about the book/novel.."
              onChange={(e) => setGenre(e.target.value)}
              value={genre}
            ></Input>
            <FormLabel>IMAGE</FormLabel>
            <Input
              type="file"
              onChange={(e) => setPhoto(e.target.files[0])}
            ></Input>
            <Button colorScheme="teal" onClick={(e) => handleSubmit(e, id)}>
              SUBMIT
            </Button>
          </Stack>
        </FormControl>
      </Container>
    </>
  );
};
