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
    { option: "AirPods" },
    { option: "電影票" },
    { option: "100元禮券" },
    { option: "星巴克咖啡" },
    { option: "再抽一次" },
    { option: "神秘禮物" },
    { option: "200元禮券" },
    { option: "小熊玩偶" },
    { option: "行動電源" },
    { option: "藍芽耳機" },
    { option: "筆記本" },
    { option: "銘謝惠顧" },
  ];

  const handleSpinClick = () => {
    if (mustSpin) return;

    const newPrize = Math.floor(Math.random() * data.length);

    setPrizeNumber(newPrize);
    setMustSpin(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col items-center justify-center p-6">
      
      {/* 標題 */}
      <div className="text-center mb-8">
        <h1 className="text-6xl font-extrabold text-white">
          Pulse AI
        </h1>

        <p className="text-purple-300 text-xl mt-3">
          智慧幸運抽獎系統
        </p>
      </div>

      {/* 毛玻璃卡片 */}
      <div
        className="
        bg-white/10
        backdrop-blur-lg
        border border-white/20
        rounded-3xl
        shadow-2xl
        p-10
        flex
        flex-col
        items-center
        "
      >
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
          outerBorderColor="#ffffff"
          outerBorderWidth={5}
          radiusLineColor="#ffffff"
          radiusLineWidth={2}
          onStopSpinning={() => {
            setMustSpin(false);
          }}
        />

        <button
          onClick={handleSpinClick}
          className="
          mt-8
          px-8
          py-4
          rounded-xl
          text-white
          font-bold
          text-lg
          bg-gradient-to-r
          from-purple-500
          to-pink-500
          hover:scale-105
          transition
          duration-300
          shadow-lg
          "
        >
          🎲 開始抽獎
        </button>

        <div
          className="
          mt-8
          bg-yellow-400
          text-black
          px-8
          py-4
          rounded-2xl
          shadow-xl
          text-2xl
          font-bold
          "
        >
          🏆 恭喜抽中：{data[prizeNumber].option}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 text-gray-400 text-sm">
        Developed by Ben © 2026
      </div>
    </div>
  );
}