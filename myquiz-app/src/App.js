import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  const [triviaData, setTriviaData] = useState([]); // State untuk menyimpan data trivia
  const fetchData = async () => {
    // Fungsi untuk mengambil data trivia dari API
    const resp = await fetch("https://opentdb.com/api.php?amount=10&category=27");
    const data = await resp.json(); // Mengubah respons API menjadi objek JavaScript
    return setTriviaData(() => data.results); // Menyimpan data trivia ke dalam state
  };
  useEffect(() => {
    // Efek samping yang dipanggil setiap kali komponen di-mount
    fetchData(); // Memanggil fungsi fetchData untuk mengambil data trivia saat komponen di-mount
  }, []); // Array kosong menandakan bahwa efek ini hanya perlu dijalankan sekali saat komponen di-mount

  return (
    <div className="wrapper">
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/" element={<Home data={triviaData} />} /> {/* Menampilkan komponen Home dengan menyediakan data trivia */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
