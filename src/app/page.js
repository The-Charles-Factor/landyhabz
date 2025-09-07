"use client";
import { useState, useEffect } from "react";

const quizData = [
  { q: "What does JSX stand for?", a: ["JavaScript XML", "JSON Syntax Extension", "Java Syntax eXtra"], correct: 0 },
  { q: "React is mainly used for?", a: ["Database management", "Building UI", "Networking"], correct: 1 },
  { q: "Which hook is used for state?", a: ["useState", "useFetch", "useClass"], correct: 0 },
  { q: "Which company created React?", a: ["Google", "Facebook", "Microsoft"], correct: 1 },
  { q: "What symbol is used for comments in JSX?", a: ["//", "/* */", "{/* */}"], correct: 2 },
  { q: "In JS, '===' means?", a: ["Equal in value", "Equal in value & type", "Assignment"], correct: 1 },
  { q: "Which React hook runs side effects?", a: ["useState", "useEffect", "useMemo"], correct: 1 },
];

export default function Home() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (showResult) {
      const correctAnswers = answers.filter((answer, index) => answer === quizData[index].correct);
      setScore(correctAnswers.length);
    }
  }, [showResult, answers]);

  const handleAnswer = (i) => {
    const newAnswers = [...answers, i];
    setAnswers(newAnswers);
    
    if (step + 1 < quizData.length) {
      setStep(step + 1);
    } else {
      setShowResult(true);
    }
  };

  const restartQuiz = () => {
    setStep(0);
    setAnswers([]);
    setShowResult(false);
    setScore(0);
  };

  const progress = ((step) / quizData.length) * 100;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 p-4">
      {!showResult ? (
        <div className="max-w-md w-full bg-white p-8 rounded-3xl shadow-xl border border-white">
          {/* Header */}
          <div className="flex items-center justify-center mb-6">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-full mr-3">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path>
              </svg>
            </div>
            <h1 className="text-xl font-bold text-purple-700">lady_habz - dev</h1>
          </div>
          
          {/* Progress bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-purple-700">Progress</span>
              <span className="text-sm font-medium text-purple-700">{step + 1}/{quizData.length}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-gradient-to-r from-purple-500 to-pink-500 h-2.5 rounded-full transition-all duration-500" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
          
          {/* Question */}
          <div className="mb-8 text-center">
            <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full flex items-center justify-center">
              <svg className="w-10 h-10 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">{quizData[step].q}</h2>
          </div>
          
          {/* Options */}
          <div className="space-y-4">
            {quizData[step].a.map((option, i) => (
              <button
                key={i}
                onClick={() => handleAnswer(i)}
                className="w-full py-3 px-6 bg-white border border-purple-100 rounded-xl text-gray-800 font-medium 
                         shadow-sm hover:shadow-md transition-all duration-200 hover:border-purple-300 
                         hover:translate-y-[-2px] focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-50
                         flex items-center justify-start"
              >
                <span className="bg-purple-100 text-purple-700 rounded-full w-6 h-6 flex items-center justify-center mr-3 text-sm font-bold">
                  {i + 1}
                </span>
                {option}
              </button>
            ))}
          </div>
          {/* again */}
          {/* Friendship note */}
          <div className="mt-8 pt-4 border-t border-gray-100 text-center">
            <p className="text-sm text-gray-500 flex items-center justify-center">
              <svg className="w-4 h-4 text-pink-500 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              always cheering for you 💫
            </p>
          </div>
        </div>
      ) : (
        <div className="max-w-md w-full bg-white p-8 rounded-3xl shadow-xl text-center border border-white">
          {/* Header */}
          <div className="flex items-center justify-center mb-6">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-full mr-3">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path>
              </svg>
            </div>
            <h1 className="text-xl font-bold text-purple-700">lady_habz - dev</h1>
          </div>
          
          {/* Score display */}
          <div className="mb-8">
            <div className="w-32 h-32 mx-auto mb-6 relative">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <circle
                  className="text-gray-200 stroke-current"
                  strokeWidth="10"
                  cx="50"
                  cy="50"
                  r="40"
                  fill="transparent"
                />
                <circle
                  className="text-purple-500  stroke-current"
                  strokeWidth="10"
                  strokeLinecap="round"
                  cx="50"
                  cy="50"
                  r="40"
                  fill="transparent"
                  strokeDasharray="251.2"
                  strokeDashoffset={251.2 - (251.2 * score) / quizData.length}
                  transform="rotate(-90 50 50)"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-3xl font-bold text-purple-700">
                  {score}/{quizData.length}
                </span>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {score === quizData.length ? "Perfect Score! 🎉" : 
               score >= quizData.length/2 ? "Great Job! 🌟" : "Keep Learning! 💪"}
            </h2>
            <p className="text-gray-600">
              {score === quizData.length ? "You're a React pro!" : 
               "Every attempt makes you better!"}
            </p>
          </div>

          {/* Affirmations */}
          <div className="bg-purple-50 p-6 rounded-2xl mb-8">
            <div className="flex items-start mb-4">
              <div className="bg-purple-100 p-2 rounded-full mr-3">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                </svg>
              </div>
              <p className="text-purple-800 text-left">Your curiosity is your superpower 🌸</p>
            </div>
            
            <div className="flex items-start mb-4">
              <div className="bg-pink-100 p-2 rounded-full mr-3">
                <svg className="w-6 h-6 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                </svg>
              </div>
              <p className="text-pink-800 text-left">Keep creating — the world needs your light ✨</p>
            </div>
            
            <div className="flex items-start">
              <div className="bg-blue-100 p-2 rounded-full mr-3">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
              </div>
              <p className="text-blue-800 text-left">Consistency beats speed in this journey 🚀</p>
            </div>
          </div>

          {/* Personal message */}
          <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-6 rounded-2xl mb-8">
            <p className="text-gray-700 mb-4 italic">
              "Here's to building our dreams together — future successful brands,
              freelance freedom, and all the adventures ahead."
            </p>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4 rounded">
              <div className="flex items-center">
                <span className="text-yellow-500 text-2xl mr-3">🎱</span>
                <p className="text-yellow-700 font-medium">
                  Though fair warning: I'll still beat you at pool when time comes! 😄
                </p>
              </div>
            </div>

            <p className="text-gray-600">
              Cheers to this journey —{" "}
              <strong className="text-purple-700">Charles Njoroge</strong>
            </p>
          </div>

          {/* Restart button */}
          <button
            onClick={restartQuiz}
            className="w-full py-3 px-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium 
                     rounded-xl shadow-md hover:shadow-lg transition-all duration-200 hover:from-purple-600 
                     hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-50
                     flex items-center justify-center"
          >
            <svg className="w-5 h-5 text-white mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
            </svg>
           Best ! 
          </button>
        </div>
      )}
    </div>
  );
}

// cheering