import { useState, useEffect, useRef } from "react";
import { Send } from "lucide-react";
import { Link } from "react-router-dom";

interface Message {
  role: "user" | "bot";
  content: string;
}

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages: Message[] = [
      ...messages,
      { role: "user", content: input },
    ];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: input }),
      });
      const data = await response.json();

      const botMessage: Message = {
        role: "bot",
        content: data.answer || "No response",
      };
      setMessages([...newMessages, botMessage]);
    } catch (error) {
      console.error("Chatbot error:", error);
    }

    setLoading(false);
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!chatContainerRef.current) return;
      if (e.key === "ArrowUp") chatContainerRef.current.scrollTop -= 50;
      else if (e.key === "ArrowDown") chatContainerRef.current.scrollTop += 50;
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="flex flex-col h-screen w-auto bg-white dark:bg-black overflow-hidden">
      {/* Header */}
      <div className="w-full h-[15vh] bg-gradient-to-b from-[#7CFFB0] to-[#BCE3CC] flex items-center justify-center relative">
        <Link to="/">
          <button className="absolute top-[25px] left-[30px] text-gray-700 bg-transparent text-2xl">
            <img src="/Images/arrow.png" alt="Button" className="w-6 h-6" />
          </button>
        </Link>
        <h2 className="text-4xl font-bold text-black">Welcome User!</h2>
      </div>

      {/* Chat Container */}
      <div ref={chatContainerRef} className="flex-1 overflow-y-auto px-4 py-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex items-center gap-4 my-4 ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            {msg.role === "bot" && (
              <img
                src="/Images/AI.png"
                alt="Bot Icon"
                className="w-10 h-10 rounded-full"
              />
            )}

            <div
              className={`p-4 max-w-[60%] ${
                msg.role === "user"
                  ? "bg-[#3ACB74] bg-opacity text-black rounded-2xl"
                  : "bg-[#E2F5EA] text-black rounded-2xl"
              }`}
            >
              {msg.content}
            </div>

            {msg.role === "user" && (
              <img
                src="/Images/Manp.png"
                alt="User Icon"
                className="w-10 h-10 rounded-full"
              />
            )}
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="flex items-center bg-[#9BDDB6] dark:text-gray-800 rounded-lg p-2">
        <input
          type="text"
          className="flex-1 bg-transparent outline-none p-2"
          placeholder="Ask Something..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !loading) sendMessage();
          }}
        />
        <button className="text-black" onClick={sendMessage} disabled={loading}>
          <Send />
        </button>
      </div>

      {/* Disclaimer */}
      <p className="text-xs text-gray-500 text-center mb-2">
      
         If symptoms persist or worsen,consult a doctor or a pharmacist
      </p>
    </div>
  );
};

export default Chatbot;
