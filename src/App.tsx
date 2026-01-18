import { useState, useRef, useEffect } from "react";
import { Box } from "@mui/material";
import { Sparkles } from "lucide-react";

import { sendMessage } from "./services/chatService";
import { Sidebar } from "./components/Sidebar";
import { ChatHeader } from "./components/ChatHeader";
import { ChatContent } from "./components/ChatContent";
import { ChatInput } from "./components/ChatInput";
import { WelcomeScreen } from "./components/WelcomeScreen";

import type { Phone } from "./types/Phone";

interface Message {
  role: "user" | "model";
  content: string;
  phones?: Phone[];
  type?: string;
  comparison_summary?: string;
}

const INITIAL_MESSAGE: Message = {
  role: "model",
  content:
    "Hello! I'm MobiWise, your specialized AI mobile shop assistant. I can help you find the best phone from our catalog or compare different models based on your needs. What can I help you with today?",
  type: "message",
};

const MODELS = [
  {
    id: "gemini-flash-latest",
    name: "Gemini 1.5 Flash",
    icon: <Sparkles size={14} color="#3b82f6" />,
  },
  {
    id: "gemini-pro-latest",
    name: "Gemini 1.5 Pro",
    icon: <Sparkles size={14} color="#10b981" />,
  },
  {
    id: "gemini-flash-lite-latest",
    name: "Gemini 1.5 Flash-Lite",
    icon: <Sparkles size={14} color="#f59e0b" />,
  },
];

function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 900);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedModel, setSelectedModel] = useState("gemini-flash-latest");
  const scrollRef = useRef<HTMLDivElement>(null);

  // Handle window resize for sidebar
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 900) {
        setIsSidebarOpen(true);
      } else {
        setIsSidebarOpen(false);
        setIsMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async (customInput?: string) => {
    const messageToSend = customInput || input;
    if (!messageToSend.trim() || isLoading) return;

    const userMessage = messageToSend;
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      const history = messages.map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const res = await sendMessage(userMessage, history, selectedModel);

      setMessages((prev) => [
        ...prev,
        {
          role: "model",
          content: res.text,
          phones: res.phones,
          type: res.type,
          comparison_summary: res.comparison_summary,
        },
      ]);
    } catch (error: unknown) {
      console.error("Chat Error:", error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : "An unexpected error occurred.";
      setMessages((prev) => [
        ...prev,
        {
          role: "model",
          content: errorMessage,
          type: "refusal",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const startNewChat = () => {
    setMessages([INITIAL_MESSAGE]);
  };

  const clearMessages = () => {
    setMessages([]);
  };

  const handleSuggest = (text: string) => {
    handleSend(text);
  };

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        bgcolor: "#0d0d0d",
        color: "zinc.100",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Mesh Background */}
      <Box className="mesh-bg" sx={{ opacity: 0.3 }} />

      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        startNewChat={startNewChat}
        selectedModel={selectedModel}
        setSelectedModel={setSelectedModel}
        models={MODELS}
      />

      {/* Main Content Area */}
      <Box
        component="main"
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          position: "relative",
          height: "100%",
          width: "100%",
          transition: "margin 0.3s ease-in-out",
        }}
      >
        <ChatHeader
          isSidebarOpen={isSidebarOpen}
          onOpenSidebar={() => setIsSidebarOpen(true)}
          onClearChat={clearMessages}
          selectedModel={selectedModel}
          setSelectedModel={setSelectedModel}
          models={MODELS}
          onNewChat={startNewChat}
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
        />

        {messages.length === 0 ? (
          <WelcomeScreen onSuggest={handleSuggest} />
        ) : (
          <ChatContent
            messages={messages}
            isLoading={isLoading}
            scrollRef={scrollRef}
          />
        )}

        <ChatInput
          input={input}
          setInput={setInput}
          onSend={(e) => {
            e?.preventDefault();
            handleSend();
          }}
          loading={isLoading}
        />
      </Box>
    </Box>
  );
}

export default App;
