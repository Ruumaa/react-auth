import React from "react";
import Navbar from "./Navbar";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { getBooks, deleteBook } from "../fetch/books.js";
import {
  Table,
  TableContainer,
  Thead,
  Tr,
  Tbody,
  Td,
  Th,
  Button,
  Spinner,
  Text,
  Box,
} from "@chakra-ui/react";

export const Books = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await getBooks();
      setBooks(response);
      setLoading(false);
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

  const handleLink = (e, fileUrl) => {
    e.preventDefault();
    Swal.fire({
      imageUrl: fileUrl,
      background: "gray",
      imageAlt: "Book",
    });
  };
  const handleDelete = async (e, id) => {
    e.preventDefault();
    try {
      const response = await deleteBook(id);
      const {msg} = response
      Swal.fire({
        icon: "success",
        title: "Delete Success",
        text: msg,
        showConfirmButton: false,
        timer: 1500,
      });
      fetchBooks();
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response.data.msg,
      });
    }
  };
  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <Spinner color="blue.500" size="xl" />
      </div>
    );
  }

  return (
    <>
      <Navbar />

      <Box my={5} mx={10}>
        <Text fontSize='3xl' fontWeight='bold' mb={10}>List Books</Text>

      <TableContainer>
        <Table>
          <Thead>
            <Tr>
              <Th>No</Th>
              <Th>Name</Th>
              <Th>Year</Th>
              <Th>Author</Th>
              <Th>Genre</Th>
              <Th>Book's Picture</Th>
              <Th>ACTION</Th>
            </Tr>
          </Thead>
          <Tbody>
            {books.map((book, index) => (
              <Tr key={book.id}>
                <Td>{index + 1}</Td>
                <Td>{book.name}</Td>
                <Td>{book.year}</Td>
                <Td>{book.author}</Td>
                <Td>{book.genre}</Td>
                <Td>
                  <Button onClick={(e) => handleLink(e, book.file)}>
                    Show Picture
                  </Button>
                </Td>
                <Td>
                  <Button
                    colorScheme="red"
                    onClick={(e) => handleDelete(e, book.id)}
                  >
                    DELETE
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      </Box>
    </>
  );
};
