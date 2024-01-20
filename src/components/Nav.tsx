import React from "react";
import { Link } from "react-router-dom";
import { Box, Button } from "@chakra-ui/react";

export default function Nav() {
  return (
    <>
      <Box
        as="nav"
        display={"flex"}
        justifyContent={"space-around"}
        alignItems={"center"}
        bg="#3887BE" // Ganti dengan warna yang diinginkan
        color="white"
        paddingY="1rem"
        fontWeight={"bold"}
      >
        <Link to="/">
          <Button bg="#3887BE" colorScheme="teal" size="sm">
            Home
          </Button>
        </Link>
        <Link to="/Mahasiswa">
          <Button bg="#3887BE" colorScheme="teal" size="sm">
            Mahasiswa
          </Button>
        </Link>
      </Box>
    </>
  );
}
