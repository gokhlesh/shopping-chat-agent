import { useState, useRef, useEffect } from "react";
import {
  Send,
  Smartphone,
  Sparkles,
  Plus,
  Menu,
  Trash2,
} from "lucide-react";

import {
  Box,
  Button,
  IconButton,
  Typography,
  useTheme,
  Avatar,
  Divider,
} from "@mui/material";

import { sendMessage } from "./services/chatService";
import { ChatMessage } from "./components/ChatMessage";
import { motion, AnimatePresence } from "framer-motion";

import type { Phone } from "./types/Phone";

interface Message {
  role: "user" | "model";
  content: string;
  phones?: Phone[];
  type?: string;
}

const MotionBox = motion(Box);

// Helper Components
const SidebarBtn = ({
  icon,
  label,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
}) => (
  <Button
    fullWidth
    onClick={onClick}
    sx={{
      justifyContent: "flex-start",
      gap: 1.5,
      color: "rgba(255,255,255,0.7)",
      py: 1.5,
      px: 2,
      borderRadius: "12px",
      textTransform: "none",
      "&:hover": { bgcolor: "rgba(255,255,255,0.05)", color: "white" },
      "& .MuiButton-startIcon": { margin: 0 },
    }}
    startIcon={icon}
  >
    <Typography sx={{ fontSize: "0.875rem", fontWeight: 600 }}>
      {label}
    </Typography>
  </Button>
);

const SidebarItem = ({
  label,
  icon,
  active,
  onClick,
}: {
  label: string;
  icon: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
}) => (
  <Box
    onClick={onClick}
    sx={{
      display: "flex",
      alignItems: "center",
      gap: 1.5,
      p: 1.25,
      px: 2,
      borderRadius: "10px",
      cursor: "pointer",
      transition: "0.2s",
      bgcolor: active ? "rgba(255,255,255,0.08)" : "transparent",
      "&:hover": { bgcolor: "rgba(255,255,255,0.05)" },
    }}
  >
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: 20,
        opacity: active ? 1 : 0.7,
      }}
    >
      {icon}
    </Box>
    <Typography
      sx={{
        fontSize: "0.875rem",
        color: active ? "white" : "text.secondary",
        fontWeight: active ? 600 : 500,
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
      }}
    >
      {label}
    </Typography>
  </Box>
);

const SectionTitle = ({ title }: { title: string }) => (
  <Typography
    sx={{
      fontSize: "10px",
      fontWeight: 900,
      color: "rgba(255,255,255,0.3)",
      textTransform: "uppercase",
      letterSpacing: "0.15em",
      px: 2,
      mb: 1,
    }}
  >
    {title}
  </Typography>
);

const HeaderActionBtn = ({
  icon,
  label,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
}) => (
  <Button
    size="small"
    onClick={onClick}
    sx={{
      color: "text.secondary",
      gap: 1,
      px: 1.5,
      minWidth: "auto",
      "&:hover": { bgcolor: "rgba(255,255,255,0.05)", color: "white" },
      textTransform: "none",
      fontWeight: 600,
    }}
    startIcon={icon}
  >
    <Box
      component="span"
      sx={{ display: { xs: "none", sm: "inline" }, fontSize: "0.75rem" }}
    >
      {label}
    </Box>
  </Button>
);

function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "model",
      content:
        "Hello! I'm MobiWise, your specialized AI mobile shop assistant. I can help you find the best phone from our catalog or compare different models based on your needs. What can I help you with today?",
      type: "message",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedModel, setSelectedModel] = useState("gemini-flash-latest");
  const scrollRef = useRef<HTMLDivElement>(null);
  const theme = useTheme();

  const models = [
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

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input;
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
    setMessages([]);
  };

  const clearMessages = () => {
    setMessages([]);
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

      {/* Sidebar Overlay (Mobile) */}
      <AnimatePresence>
        {!isSidebarOpen && (
          <MotionBox
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(true)}
            sx={{
              fixed: 0,
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              bgcolor: "rgba(0,0,0,0.6)",
              backdropFilter: "blur(4px)",
              zIndex: 40,
              display: { md: "none" },
            }}
          />
        )}
      </AnimatePresence>

      {/* Sidebar - ChatGPT Style */}
      <MotionBox
        initial={false}
        animate={{
          width: isSidebarOpen ? 260 : 0,
          opacity: isSidebarOpen ? 1 : 0,
          marginLeft: isSidebarOpen ? 0 : -260,
        }}
        sx={{
          height: "100%",
          bgcolor: "#000",
          borderRight: "1px solid rgba(255, 255, 255, 0.05)",
          display: "flex",
          flexDirection: "column",
          flexShrink: 0,
          position: "relative",
          zIndex: 50,
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
            h: "100%",
            height: "100%",
            gap: 1,
          }}
        >
          {/* Sidebar Top */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
            <SidebarBtn
              onClick={startNewChat}
              icon={<Plus size={18} />}
              label="New chat"
            />
          </Box>

          <Box
            sx={{
              flex: 1,
              overflowY: "auto",
              py: 2,
              px: 0.5,
              "&::-webkit-scrollbar": { display: "none" },
            }}
          >
            {/* Model Switcher Section */}
            <SectionTitle title="Models" />
            <Box sx={{ mb: 3 }}>
              {models.map((model) => (
                <SidebarItem
                  key={model.id}
                  label={model.name}
                  icon={model.icon}
                  active={selectedModel === model.id}
                  onClick={() => setSelectedModel(model.id)}
                />
              ))}
            </Box>
          </Box>

          {/* User Section Footer */}
          <Divider sx={{ borderColor: "rgba(255,255,255,0.05)", mb: 1 }} />
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              p: 1.5,
              borderRadius: "12px",
              cursor: "pointer",
              transition: "0.2s",
              "&:hover": { bgcolor: "rgba(255,255,255,0.05)" },
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <Avatar
                sx={{
                  width: 32,
                  height: 32,
                  fontSize: "10px",
                  fontWeight: 700,
                  bgcolor: theme.palette.primary.main,
                  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary?.main || "#a855f7"})`,
                }}
              >
                GK
              </Avatar>
              <Box>
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 600, fontSize: "0.875rem", lineHeight: 1 }}
                >
                  Gokhlesh Kumar
                </Typography>
                <Typography
                  sx={{
                    fontSize: "10px",
                    fontWeight: 700,
                    color: "text.secondary",
                    mt: 0.5,
                    letterSpacing: "0.05em",
                    textTransform: "uppercase",
                  }}
                >
                  Free
                </Typography>
              </Box>
            </Box>
            <Button
              size="small"
              sx={{
                fontSize: "10px",
                fontWeight: 900,
                color: "text.secondary",
                bgcolor: "rgba(255,255,255,0.05)",
                px: 1,
                minWidth: "auto",
                "&:hover": { bgcolor: "rgba(255,255,255,0.1)", color: "white" },
              }}
            >
              Upgrade
            </Button>
          </Box>
        </Box>
      </MotionBox>

      {/* Main Content Area */}
      <Box
        component="main"
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          position: "relative",
          height: "100%",
        }}
      >
        {/* Header */}
        <Box
          component="header"
          sx={{
            height: 56,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            px: 2,
            zIndex: 40,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {!isSidebarOpen && (
              <IconButton
                onClick={() => setIsSidebarOpen(true)}
                sx={{
                  color: "text.secondary",
                  "&:hover": {
                    color: "white",
                    bgcolor: "rgba(255,255,255,0.05)",
                  },
                }}
              >
                <Menu size={20} />
              </IconButton>
            )}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.5,
                cursor: "pointer",
                px: 1.5,
                py: 0.5,
                borderRadius: "12px",
                transition: "0.2s",
                "&:hover": { bgcolor: "rgba(255,255,255,0.05)" },
              }}
            >
              <Typography
                variant="h6"
                sx={{ fontWeight: 800, color: "white", fontSize: "1.1rem" }}
              >
                MobiWise
              </Typography>
              {/* <ChevronDown size={14} color={theme.palette.text.secondary} /> */}
            </Box>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <HeaderActionBtn
              onClick={clearMessages}
              icon={<Trash2 size={18} />}
              label="Clear"
            />
          </Box>
        </Box>

        {/* Chat Content */}
        <Box
          ref={scrollRef}
          sx={{
            flex: 1,
            overflowY: "auto",
            position: "relative",
            width: "100%",
            "::-webkit-scrollbar": { display: "none" },
            scrollbarWidth: "none",
          }}
        >
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              pt: 2,
            }}
          >
            {messages.length === 0 ? (
              <Box
                sx={{
                  display: "flex",
                  flex: 1,
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  minHeight: "60vh",
                  gap: 3,
                }}
              >
                <Avatar
                  sx={{
                    width: 64,
                    height: 64,
                    bgcolor: "white",
                    boxShadow: "0 20px 40px rgba(0,0,0,0.5)",
                    borderRadius: "20px",
                  }}
                >
                  <Smartphone size={32} color="black" />
                </Avatar>
                <Typography
                  variant="h4"
                  sx={{ fontWeight: 800, letterSpacing: "-0.02em" }}
                >
                  How can I help you today?
                </Typography>
                <Box sx={{ display: "flex", gap: 2 }}>
                  {[
                    "Compare flagships",
                    "Budget under 30k",
                    "Best cameras",
                  ].map((q) => (
                    <Button
                      key={q}
                      variant="outlined"
                      onClick={() => setInput(q)}
                      sx={{
                        borderRadius: "16px",
                        borderColor: "rgba(255,255,255,0.1)",
                        color: "text.secondary",
                        px: 2,
                        py: 1,
                        textTransform: "none",
                        "&:hover": {
                          borderColor: "white",
                          color: "white",
                          bgcolor: "rgba(255,255,255,0.05)",
                        },
                      }}
                    >
                      {q}
                    </Button>
                  ))}
                </Box>
              </Box>
            ) : (
              <Box sx={{ pb: 24 }}>
                <AnimatePresence initial={false}>
                  {messages.map((msg, idx) => (
                    <ChatMessage
                      key={idx}
                      role={msg.role}
                      text={msg.content}
                      phones={msg.phones}
                    />
                  ))}
                </AnimatePresence>

                {isLoading && (
                  <Box
                    sx={{
                      width: "100%",
                      py: 5,
                      bgcolor: "rgba(255,255,255,0.02)",
                    }}
                  >
                    <Box
                      sx={{
                        maxWidth: "48rem",
                        mx: "auto",
                        display: "flex",
                        gap: { xs: 2, md: 4 },
                        px: { xs: 2, md: 0 },
                      }}
                    >
                      <Avatar
                        sx={{
                          width: 36,
                          height: 36,
                          borderRadius: "12px",
                          bgcolor: theme.palette.primary.main,
                          p: 1,
                        }}
                      >
                        <Sparkles size={20} className="animate-spin-slow" />
                      </Avatar>
                      <Box sx={{ display: "flex", gap: 1, mt: 1.5 }}>
                        {[0, 1, 2].map((i) => (
                          <Box
                            key={i}
                            sx={{
                              width: 6,
                              height: 6,
                              bgcolor: theme.palette.primary.main,
                              borderRadius: "50%",
                              animation: `bounce 1s infinite ${i * 0.2}s`,
                              "@keyframes bounce": {
                                "0%, 100%": { transform: "translateY(0)" },
                                "50%": { transform: "translateY(-6px)" },
                              },
                            }}
                          />
                        ))}
                      </Box>
                    </Box>
                  </Box>
                )}
              </Box>
            )}
          </Box>
        </Box>

        {/* Input Area */}
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            p: { xs: 2, md: 3 },
            bgcolor:
              "linear-gradient(to top, #0d0d0d, rgba(13,13,13,0.9), transparent)",
            zIndex: 40,
          }}
        >
          <Box sx={{ maxWidth: "48rem", mx: "auto" }}>
            <Box
              component="form"
              onSubmit={handleSend}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                bgcolor: "#1a1a1a",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "24px",
                px: 1.5,
                py: 0.5,
                boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
                transition: "0.2s",
                "&:focus-within": {
                  borderColor: "rgba(255,255,255,0.2)",
                  boxShadow: "0 20px 50px rgba(0,0,0,0.6)",
                },
              }}
            >
              <IconButton
                sx={{ color: "text.secondary", "&:hover": { color: "white" } }}
              >
                <Plus size={20} />
              </IconButton>

              <Box
                component="textarea"
                value={input}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  setInput(e.target.value)
                }
                onKeyDown={(e: React.KeyboardEvent<HTMLTextAreaElement>) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                placeholder="Ask MobiWise anything..."
                sx={{
                  flex: 1,
                  bgcolor: "transparent",
                  border: "none",
                  outline: "none",
                  color: "white",
                  fontSize: "1rem",
                  py: 1.5,
                  px: 1,
                  resize: "none",
                  maxHeight: 200,
                  "&::placeholder": { color: "rgba(255,255,255,0.4)" },
                }}
              />

              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                <IconButton
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  sx={{
                    bgcolor:
                      isLoading || !input.trim()
                        ? "rgba(255,255,255,0.05)"
                        : "white",
                    color:
                      isLoading || !input.trim()
                        ? "rgba(255,255,255,0.1)"
                        : "black",
                    "&:hover": { bgcolor: "rgba(255,255,255,0.9)" },
                    width: 36,
                    height: 36,
                    transition: "0.2s",
                    transform: "scale(1)",
                    "&:active": { transform: "scale(0.9)" },
                  }}
                >
                  <Send size={18} />
                </IconButton>
              </Box>
            </Box>
            <Box sx={{ mt: 1.5, display: "flex", justifyContent: "center" }}>
              <Typography
                sx={{
                  fontSize: "11px",
                  color: "rgba(255,255,255,0.3)",
                  fontWeight: 500,
                }}
              >
                MobiWise can make mistakes. Check important info.{" "}
                <span
                  style={{ textDecoration: "underline", cursor: "pointer" }}
                >
                  Cookie Preferences
                </span>
                .
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default App;
