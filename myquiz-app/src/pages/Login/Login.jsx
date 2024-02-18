import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebase";
import { NavLink, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

function Login() {
  const navigate = useNavigate(); // Mendapatkan fungsi navigate dari React Router
  const [showPass, setShowPass] = useState(false); // State untuk menentukan apakah password sedang ditampilkan
  const [email, setEmail] = useState(""); // State untuk menyimpan email yang dimasukkan pengguna
  const [password, setPassword] = useState(""); // State untuk menyimpan password yang dimasukkan pengguna

  const onLogin = (e) => {
    // Fungsi yang dipanggil ketika formulir login disubmit
    e.preventDefault(); // Mencegah perilaku bawaan formulir (pengiriman data dan reload halaman)
    signInWithEmailAndPassword(auth, email, password) // Menggunakan Firebase Authentication untuk melakukan otentikasi dengan email dan password yang dimasukkan
      .then((userCredential) => {
        // Jika otentikasi berhasil
        userCredential.user.getIdToken().then((token) => {
          // Mendapatkan token Firebase dari user yang berhasil login
          Cookies.set("firebase_token", token, { expires: 7 }); // Membuat cookie dengan nama "firebase_token" yang berlaku selama 7 hari
        });
        navigate("/"); // Mengarahkan pengguna kembali ke halaman utama
        alert("Success Login !!"); // Memberi pemberitahuan bahwa login berhasil
      })
      .catch((error) => {
        // Jika otentikasi gagal
        const errorCode = error.code; // Mendapatkan kode kesalahan
        const errorMessage = error.message; // Mendapatkan pesan kesalahan
        console.log(errorCode, errorMessage); // Menampilkan kode dan pesan kesalahan di konsol
        alert("Login Failed !!"); // Memberi pemberitahuan bahwa login gagal
      });
  };

  return (
    <>
      <div className="w-full flex justify-center h-screen items-center bg-violet-200">
        {" "}
        {/* Memposisikan kotak login di tengah halaman */}
        <section className="flex flex-col space-y-4 w-5/12 bg-white  border-2 text-violet-600 rounded-xl p-6">
          <h1 className="text-center text-xl font-bold">Login</h1>
          <form onSubmit={onLogin} className="flex flex-col space-y-6">
            <div className="flex flex-col space-y-2">
              <label htmlFor="email-address">Email Address</label>
              <input
                className="border-zinc-800 border rounded-xl bg-transparent focus:border-blue-500 caret-blue-500 py-2.5 px-4 outline-0"
                type="email"
                label="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                required
              />
            </div>

            <div className="flex flex-col space-y-2">
              <label htmlFor="password">Password</label>
              <div className="flex flex-row items-center w-full relative">
                <input
                  className="grow bg-transparent border border-zinc-800 focus:border-blue-500 rounded-xl py-2.5 px-4 outline-0"
                  type={showPass ? "text" : "password"}
                  label="Create Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  required
                />
                <button type="button" title={!showPass ? "Show Password" : "Hide password"} className="absolute right-0 top-0 p-3 h-full" onClick={() => setShowPass(!showPass)}>
                  <svg viewBox="0 0 24 24" className={!showPass ? "fill-gray-600 hover:fill-sky-500 w-[24px] h-auto block" : "fill-gray-600 hover:fill-sky-500 w-[24px] h-auto hidden"}>
                    {/* Icon untuk menampilkan password */}
                  </svg>
                  <svg className={showPass ? "fill-gray-600 hover:fill-sky-500 w-[24px] h-auto block" : "fill-gray-600 hover:fill-sky-500 w-[24px] h-auto hidden"}>{/* Icon untuk menyembunyikan password */}</svg>
                </button>
              </div>
            </div>

            <button type="submit" className="py-2 px-4 rounded-xl font-semibold text-white bg-blue-500 hover:bg-blue-600">
              Login
            </button>
          </form>

          <p>
            No account yet?{" "}
            <NavLink to="/register" className="text-blue-500 hover:underline">
              Register
            </NavLink>{" "}
            here
          </p>
        </section>
      </div>
    </>
  );
}

export default Login;
