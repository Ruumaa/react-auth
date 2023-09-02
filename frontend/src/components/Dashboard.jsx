import React from "react";
import Navbar from "./Navbar";
import {
  Box,
  Button,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [name, setName] = useState("");
  const [token, setToken] = useState("");
  const [expire, setExpire] = useState("");
  const [users, setUsers] = useState([]);

  let navigate = useNavigate();

  useEffect(() => {
    refreshToken();
    getUsers();
  }, []);

  const refreshToken = async () => {
    try {
      const response = await axios.get("http://localhost:5000/token");
      setToken(response.data.accessToken); //data user
      const decoded = jwt_decode(response.data.accessToken); //decode token
      setName(decoded.name);
      setExpire(decoded.exp);
    } catch (error) {
      if (error.response) {
        navigate("/");
      }
    }
  };
  // instance axios, untuk setiap req yg membutuhkan token
  const axiosJWT = axios.create();
  //👇interceptor untuk berinteraksi dengan req dan res http
  axiosJWT.interceptors.request.use(
    //👆menambahkan interceptor ke axiosJWT, yg dijalankan sebelum semua req Http
    async (config) => {
      //👆fungsi dijalakan ketika interceptor aktif, sebelum aktif melakukan manipulasi objek config
      const currentDate = new Date();
      //👇mengecek token, kalau expire menjalankan blok if
      if (expire * 1000 < currentDate.getTime()) {
        // mengambil token baru👇
        const response = await axios.get("http://localhost:5000/token");
        //👇mengatur header dengan token baru
        config.headers.Authorization = `Bearer ${response.data.accessToken}`;
        setToken(response.data.accessToken); //mengatur ulang token
        const decoded = jwt_decode(response.data.accessToken); //decode token
        setName(decoded.name); //mengambil nama user
        setExpire(decoded.exp); //token expire
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const getUsers = async () => {
    const response = await axiosJWT.get("http://localhost:5000/users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setUsers(response.data);
  };

  return (
    <>
      <Navbar />
      <Box mt={5} mx={10}>
        <h1>Welcome Back {name}!</h1>
        <Button onClick={getUsers}>Get Users</Button>
        <TableContainer>
          <Table>
            <Thead>
              <Tr>
                <Th>No</Th>
                <Th>Name</Th>
                <Th>Email</Th>
              </Tr>
            </Thead>
            <Tbody>
              {users.map((user, index) => (
                <Tr key={user.id}>
                  <Td>{index + 1}</Td>
                  <Td>{user.name}</Td>
                  <Td>{user.email}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
}

export default Dashboard;
