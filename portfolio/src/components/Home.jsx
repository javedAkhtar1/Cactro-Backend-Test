import React from "react";
import Navbar from "./Navbar";

function Home() {
  return (
    <>
      <Navbar />
      <div className="flex flex-col gap-4 items-center justify-center h-[450px]">
        <p className="text-3xl w-[500px] text-center text-blue-200 font-serif">
          Full-stack developer | MERN stack enthusiast | Building projects &
          seeking opportunities 🚀 | Email: jved004@gmail.com
        </p>
        <a className="text-white underline text-3xl" target="_blank" href={"http://localhost:3000/github"}>Github</a>
        <a className="text-white underline text-3xl" target="_blank" href={"http://localhost:3000/github/repos"}>Github Repos</a>
      </div>
    </>
  );
}

export default Home;
