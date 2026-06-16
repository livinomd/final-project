"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

const Wheel = dynamic(
  () => import("react-custom-roulette").then((mod) => mod.Wheel),
  { ssr: false }
);

export default function Home() {
  const [name, setName] = useState("");
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [luckScore, setLuckScore] = useState(null);
  const [luckyColor, setLuckyColor] = useState("");
  const [luckyNumber, setLuckyNumber] = useState("");
  const [history, setHistory] = useState([]);

  const data = [
    { option: "財運爆棚" },
    { option: "學習之神" },
    { option: "桃花來襲" },
    { option: "休息一天" },
    { option: "超級幸運" },
    { option: "神秘事件" },
    { option: "升職加薪" },
    { option: "旅行運" },
  ];

  const colors = [
    "紅色",
    "藍色",
    "綠色",
    "紫色",
    "金色",
    "銀色",
  ];

  const adviceMap = {
    財運爆棚: "今天適合理財與把握賺錢機會。",
    學習之神: "今天專注力極佳，適合學習新技能。",
    桃花來襲: "今天適合認識新朋友與社交。",
    休息一天: "放鬆也是進步的一部分。",
    超級幸運: "今天做任何事都容易有好結果。",
    神秘事件: "保持好奇心，會有意外驚喜。",
    升職加薪: "工作表現容易被看見。",
    旅行運: "適合規劃旅行與探索新事物。",
  };

  const handleSpinClick = () => {
    if (!name.trim()) {
      alert("請先輸入名字！");
      return;
    }

    const newPrize = Math.floor(Math.random() * data.length);

    setPrizeNumber(newPrize);
    setMustSpin(true);

    const score = Math.floor(Math.random() * 41) + 60;
    const color =
      colors[Math.floor(Math.random() * colors.length)];
    const number = Math.floor(Math.random() * 99) + 1;

    setLuckScore(score);
    setLuckyColor(color);
    setLuckyNumber(number);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">

      <div className="max-w-7xl mx-auto">

        {/* 標題 */}
        <div className="text-center mb-10">
          <h1 className="text-6xl font-extrabold text-white">
            Pulse AI
          </h1>

          <p className="text-purple-300 text-xl mt-3">
            AI 命運分析平台
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">

          {/* 左側 */}
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl border border-white/20 p-8 shadow-2xl">

            <input
              type="text"
              placeholder="請輸入你的名字"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-4 rounded-xl mb-6 text-black"
            />

            <div className="flex justify-center">
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
                outerBorderWidth={4}
                radiusLineColor="#ffffff"
                radiusLineWidth={2}
                onStopSpinning={() => {
                  setMustSpin(false);

                  setHistory((prev) => [
                    {
                      name,
                      result: data[prizeNumber].option,
                    },
                    ...prev,
                  ]);
                }}
              />
            </div>

            <button
              onClick={handleSpinClick}
              className="
              w-full
              mt-8
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
              "
            >
              🚀 開始 AI 命運分析
            </button>
          </div>

          {/* 右側分析 */}
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl border border-white/20 p-8 shadow-2xl text-white">

            <h2 className="text-3xl font-bold mb-6">
              🤖 AI 分析結果
            </h2>

            {luckScore && (
              <>
                <div className="space-y-4">

                  <div className="text-xl">
                    👤 使用者：
                    <span className="font-bold text-yellow-300">
                      {" "}
                      {name}
                    </span>
                  </div>

                  <div className="text-xl">
                    🎯 今日命運：
                    <span className="font-bold text-green-300">
                      {" "}
                      {data[prizeNumber].option}
                    </span>
                  </div>

                  <div className="text-xl">
                    🍀 幸運值：
                    <span className="font-bold text-cyan-300">
                      {" "}
                      {luckScore}%
                    </span>
                  </div>

                  <div className="w-full bg-gray-700 rounded-full h-5">
                    <div
                      className="bg-green-400 h-5 rounded-full"
                      style={{ width: `${luckScore}%` }}
                    />
                  </div>

                  <div className="text-xl">
                    🎨 幸運顏色：
                    <span className="font-bold text-pink-300">
                      {" "}
                      {luckyColor}
                    </span>
                  </div>

                  <div className="text-xl">
                    🔢 幸運數字：
                    <span className="font-bold text-yellow-300">
                      {" "}
                      {luckyNumber}
                    </span>
                  </div>

                  <div className="bg-black/30 rounded-xl p-4 mt-4">
                    <h3 className="font-bold mb-2">
                      📖 AI 今日建議
                    </h3>

                    <p>
                      {
                        adviceMap[
                          data[prizeNumber].option
                        ]
                      }
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>

        </div>

        {/* 歷史紀錄 */}
        <div className="mt-10 bg-white/10 backdrop-blur-lg rounded-3xl border border-white/20 p-8 text-white">

          <h2 className="text-2xl font-bold mb-4">
            📜 歷史紀錄
          </h2>

          {history.length === 0 ? (
            <p>尚未進行分析</p>
          ) : (
            <ul className="space-y-2">
              {history.map((item, index) => (
                <li
                  key={index}
                  className="bg-black/20 p-3 rounded-lg"
                >
                  👤 {item.name} → 🎯 {item.result}
                </li>
              ))}
            </ul>
          )}
        </div>

      </div>
    </div>
  );
}