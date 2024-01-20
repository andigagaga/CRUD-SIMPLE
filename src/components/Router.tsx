import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Mahasiswa from "../pages/Mahasiswa";

export default function Router() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Mahasiswa" element={<Mahasiswa />} />
      </Routes>
    </>
  );
}
