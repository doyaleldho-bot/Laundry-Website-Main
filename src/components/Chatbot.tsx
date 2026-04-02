import React, { useEffect, useState } from "react";
import api from "../utils/api";

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
}

const QUESTIONS_PER_PAGE = 5;

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [allQuestions, setAllQuestions] = useState<string[]>([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  

  useEffect(() => {
    const loadQuestions = async () => {
      const res = await api.get("/questions");
      setAllQuestions(res.data.questions);

      setMessages([
        {
          id: 1,
          text: "Hello  Choose a question below:",
          sender: "bot"
        }
      ]);
    };

    loadQuestions();
  }, []);

  const totalPages = Math.ceil(allQuestions.length / QUESTIONS_PER_PAGE);

  const currentQuestions = allQuestions.slice(
    page * QUESTIONS_PER_PAGE,
    page * QUESTIONS_PER_PAGE + QUESTIONS_PER_PAGE
  );

  const askQuestion = async (question: string) => {
  // Prevent duplicate question
  if (messages.some(m => m.sender === "user" && m.text === question)) {
    return;
  }
  // Show user message immediately
  setMessages(prev => [
    ...prev,
    { id: Date.now(), text: question, sender: "user" }
  ]);
  setLoading(true);

  try {
    const res = await api.post("/chatbot", { question });

    //  Artificial delay (2–3 seconds)
    const delay = Math.floor(Math.random() * 1000) + 1000;
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
          id: Date.now() + 1,
          text: res.data.answer,
          sender: "bot"
        }
      ]);
      setLoading(false);
    }, delay);

  } catch {
    setLoading(false);
  }
};
{loading && (
  <div className="flex justify-start">
    <div className="bg-gray-200 px-4 py-2 rounded-lg flex space-x-1">
      <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" />
      <span
        className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
        style={{ animationDelay: "0.15s" }}
      />
      <span
        className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
        style={{ animationDelay: "0.3s" }}
      />
    </div>
  </div>
)}
  return (
    <div className="min-h-screen bg-gray-100 p-2 md:p-6 flex justify-center">
      <div className="w-full h-[110vh] bg-white rounded-lg shadow-lg
                      md:max-w-3xl lg:max-w-5xl xl:max-w-6xl
                      flex flex-col">

        {/* Header */}
        <div className="bg-blue-600 text-white p-4 rounded-t-lg">
          <h2 className="text-xl font-semibold">Slams Wash Support</h2>
          <p className="text-sm opacity-90">
            Click a question to get instant help
          </p>
        </div>

        {/* Chat area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map(msg => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`px-4 py-2 rounded-lg max-w-[80%]
                ${msg.sender === "user"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-800"}`}
              >
                {msg.text}
              </div>
            </div>
          ))}

          {loading && (
            <div className="bg-gray-200 w-24 px-4 py-2 rounded-lg">
              Typing...
            </div>
          )}
        </div>

        {/* Questions panel */}
        <div className="border-t p-4 bg-gray-50">
          <div className="space-y-2">
            {currentQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => askQuestion(q)}
                className="w-full text-left p-3 bg-white rounded border hover:bg-gray-100"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-between mt-4">
            <button
              disabled={page === 0}
              onClick={() => setPage(p => p - 1)}
              className="px-4 py-1 bg-blue-600 text-white rounded disabled:opacity-50"
            >
              Previous
            </button>

            <button
              disabled={page === totalPages - 1}
              onClick={() => setPage(p => p + 1)}
              className="px-4 py-1 bg-blue-600 text-white rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;