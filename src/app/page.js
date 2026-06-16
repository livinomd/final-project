"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

const Wheel = dynamic(
  () => import("react-custom-roulette").then((mod) => mod.Wheel),
  { ssr: false }
);
export default function Home() {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);

  const data = [
    { option: "1" },
    { option: "2" },
    { option: "3" },
    { option: "4" },
    { option: "5" },
    { option: "6" },
    { option: "7" },
    { option: "8" },
    { option: "9" },
    { option: "10" },
    { option: "11" },
    { option: "12" },
  ];

  const handleSpinClick = () => {
    const newPrize = Math.floor(Math.random() * data.length);

    setPrizeNumber(newPrize);
    setMustSpin(true);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold mb-6 text-black">
        🎡 幸運轉盤
      </h1>

      <Wheel
        mustStartSpinning={mustSpin}
        prizeNumber={prizeNumber}
        data={data}
        backgroundColors={[
          "#FF6B6B",
          "#4D96FF",
          "#6BCB77",
          "#FFD93D",
        ]}
        textColors={["#ffffff"]}
        onStopSpinning={() => {
          setMustSpin(false);
        }}
      />

      <button
        onClick={handleSpinClick}
        className="mt-6 bg-blue-500 text-white px-6 py-3 rounded"
      >
        開始旋轉
      </button>

      <p className="mt-4 text-3xl text-red-600 font-bold">
  🎉 抽到：{data[prizeNumber].option}
      </p>
    </div>
  );
}