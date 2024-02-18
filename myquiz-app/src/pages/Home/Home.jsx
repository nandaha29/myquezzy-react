import React from "react";
import { useState, useRef, useEffect } from "react"; // Import hooks yang dibutuhkan dari React
import { useNavigate } from "react-router-dom"; // Import hook useNavigate dari React Router untuk navigasi
import Cookies from "js-cookie"; // Import library Cookies untuk bekerja dengan cookies
import Layout from "../../components/Layout/Layout"; // Import komponen Layout dari direktori yang sesuai

function Home(props) {
  const navigate = useNavigate(); // Inisialisasi hook useNavigate untuk navigasi antar halaman
  const triviaData = props.data; // Mendapatkan data trivia dari prop yang diterima
  const [showResult, setShowResult] = useState(false); // State untuk menampilkan hasil quiz
  const [allPossibleAnswers, setAllPossibleAnswers] = useState([]); // State untuk menyimpan semua kemungkinan jawaban
  let [currentQuestion, setCurrentQuestion] = useState(0); // State untuk menyimpan nomor pertanyaan saat ini
  const [answerCorrect, setAnswerCorrect] = useState(false); // State untuk menandai apakah jawaban benar atau salah
  const [result, setResult] = useState({ correctAnswer: 0, wrongAnswer: 0, totalAnswer: 0 }); // State untuk menyimpan hasil quiz
  const [timer, setTimer] = useState("00:00"); // State untuk menampilkan timer
  const Ref = useRef(null); // Ref untuk menyimpan timer interval

  useEffect(() => {
    // Efek samping yang dipanggil setiap kali data trivia berubah
    if (Cookies.get("firebase_token")) {
      // Periksa apakah pengguna sudah login dengan token Firebase
      combineAllAnswers(); // Panggil fungsi untuk menggabungkan semua kemungkinan jawaban
      if (showResult === false) {
        clearTimer(getDateTime()); // Panggil fungsi untuk memulai timer jika belum menampilkan hasil quiz
      }
    } else {
      navigate("/login"); // Arahkan ke halaman login jika pengguna belum login
    }
  }, [props.data]);

  // Fungsi untuk menggabungkan semua kemungkinan jawaban (termasuk jawaban benar)
  function combineAllAnswers() {
    let allAnswers = [];
    let correctAnswer = triviaData[currentQuestion]?.correct_answer; // Mendapatkan jawaban yang benar dari data trivia
    triviaData[currentQuestion]?.incorrect_answers.map((answer) => {
      // Iterasi melalui jawaban yang salah
      allAnswers.push(answer); // Tambahkan jawaban yang salah ke array
    });
    allAnswers.push(correctAnswer); // Tambahkan jawaban yang benar ke array
    allAnswers.sort(() => Math.random() - 0.5); // Acak urutan jawaban
    setAllPossibleAnswers(allAnswers); // Atur state dengan semua kemungkinan jawaban
  }

  // Fungsi untuk menghapus karakter khusus dari pertanyaan trivia
  function removeCharacters(question) {
    if (!question) return; // Jika pertanyaan tidak ada, kembalikan null
    return question
      .replace(/(&quot\;)/g, '"') // Ganti karakter khusus dengan tanda kutip
      .replace(/(&rsquo\;)/g, '"')
      .replace(/(&#039\;)/g, "'")
      .replace(/(&amp\;)/g, '"');
  }

  // Fungsi untuk menangani klik jawaban pengguna
  function clickAnswer(answer) {
    if (currentQuestion !== triviaData.length - 1) {
      // Jika belum mencapai pertanyaan terakhir
      answer === triviaData[currentQuestion].correct_answer ? setAnswerCorrect(true) : setAnswerCorrect(false); // Periksa apakah jawaban benar atau salah
      setResult(({ correctAnswer, wrongAnswer, totalAnswer }) =>
        answerCorrect ? { correctAnswer: correctAnswer + 1, wrongAnswer: wrongAnswer, totalAnswer: totalAnswer + 1 } : { correctAnswer: correctAnswer, wrongAnswer: wrongAnswer + 1, totalAnswer: totalAnswer + 1 }
      ); // Atur hasil berdasarkan jawaban pengguna
      setCurrentQuestion((currentQuestion += 1)); // Pindahkan ke pertanyaan berikutnya
      combineAllAnswers(); // Panggil fungsi untuk menggabungkan semua kemungkinan jawaban
    } else {
      setResult(({ correctAnswer, wrongAnswer, totalAnswer }) =>
        answerCorrect ? { correctAnswer: correctAnswer + 1, wrongAnswer: wrongAnswer, totalAnswer: totalAnswer + 1 } : { correctAnswer: correctAnswer, wrongAnswer: wrongAnswer + 1, totalAnswer: totalAnswer + 1 }
      ); // Atur hasil terakhir berdasarkan jawaban pengguna
      setShowResult(true); // Tampilkan hasil akhir
    }
  }

  // Fungsi untuk menghitung sisa waktu
  const getTimeRemaining = (e) => {
    const total = Date.parse(e) - Date.parse(new Date()); // Hitung selisih waktu antara waktu sekarang dan waktu yang ditentukan
    const seconds = Math.floor((total / 1000) % 60); // Hitung sisa detik
    const minutes = Math.floor((total / 1000 / 60) % 60); // Hitung sisa menit
    return { total, minutes, seconds }; // Kembalikan objek dengan nilai total, menit, dan detik
  };

  // Fungsi untuk memulai timer
  const startTimer = (e) => {
    let { total, minutes, seconds } = getTimeRemaining(e); // Dapatkan waktu yang tersisa
    if (total >= 0) {
      setTimer((minutes > 9 ? minutes : "0" + minutes) + ":" + (seconds > 9 ? seconds : "0" + seconds)); // Format dan atur timer
    } else {
      setShowResult(true); // Tampilkan hasil akhir jika waktu habis
    }
  };

  // Fungsi untuk menghapus timer
  const clearTimer = (e) => {
    setTimer("15:00"); // Set timer kembali ke 15 menit
    if (Ref.current) clearInterval(Ref.current); // Bersihkan timer sebelumnya jika ada
    const id = setInterval(() => {
      startTimer(e); // Panggil fungsi untuk memulai timer
    }, 1000); // Timer akan diupdate setiap detik
    Ref.current = id; // Simpan ID timer ke dalam ref
  };

  // Fungsi untuk mendapatkan waktu berakhir
  const getDateTime = () => {
    let deadline = new Date();
    deadline.setSeconds(deadline.getSeconds() + 900); // Tambahkan 900 detik (15 menit) ke waktu saat ini
    return deadline; // Kembalikan waktu berakhir
  };

  return (
    <>
      <Layout>
        <div className="w-full flex justify-center h-screen items-center">
          {!showResult ? ( // Tampilkan jika belum menampilkan hasil quiz
            <div className="flex flex-col space-y-6 w-5/6">
              <h1 className="py-4 rounded-xl bg-white d-900 border-2 text-violet-600 text-3xl font-black cursor-pointer text-center">Let's Do Quezzy</h1>
              <div className="flex flex-col space-y-3 bg-white rounded-xl p-4 border-2 border-violet-200">
                <div className="flex flex-row justify-between border-b border-zinc-800 py-4 text-xl font-bold">
                  <div>
                    Question {currentQuestion >= 9 ? currentQuestion + 1 : "0" + (currentQuestion + 1)}
                    <span className="text-yellow-600">/</span>
                    <span className="text-blue-400 text-base">{triviaData.length}</span>
                  </div>
                  <div>{timer}</div>
                </div>
                <div className="flex flex-col space-y-6">
                  <h2 className="text-lg">{removeCharacters(triviaData[currentQuestion]?.question)}</h2>
                  <ul className="flex flex-col space-y-3 list-none">
                    {allPossibleAnswers.map((answer, index) => (
                      <li onClick={() => clickAnswer(answer)} className="cursor-pointer py-2 px-3 rounded-xl bg-violet-800 hover:bg-blue-400/20 group hover:text-blue-500 flex flex-row space-x-3" key={index}>
                        <svg viewBox="0 0 24 24" className="w-[16px] h-auto fill-none stroke-violet-400 group-hover:stroke-blue-500" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="10"></circle>
                          <circle cx="12" cy="12" r="3"></circle>
                        </svg>
                        <span>{answer}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            // Tampilkan jika menampilkan hasil quiz
            <div className="flex flex-col w-5/6 rounded-xl bg-white border-2 text-violet-600 p-8 h-fit">
              <h2 className="items-center text-xl font-bold flex flex-row justify-between py-4 border-b border-zinc-800">
                <span>Total Answer</span>
                <span className="text-blue-500">{result.totalAnswer}</span>
              </h2>
              <h2 className="items-center text-xl font-bold flex flex-row justify-between py-4 border-b border-zinc-800">
                <span>Correct Answer</span>
                <span className="text-blue-500">{result.correctAnswer}</span>
              </h2>
              <h2 className="items-center text-xl font-bold flex flex-row justify-between py-4">
                <span>Wrong Answer</span>
                <span className="text-blue-500">{result.wrongAnswer}</span>
              </h2>
            </div>
          )}
        </div>
      </Layout>
    </>
  );
}

export default Home;
