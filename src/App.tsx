import React from "react";
import Nav from "./components/Nav";
import { ChakraProvider } from "@chakra-ui/react";
import Router from "./components/Router";

export default function App() {
  return (
    <>
      <ChakraProvider>
        <Nav />
        <Router/>
      </ChakraProvider>
    </>
  );
}
