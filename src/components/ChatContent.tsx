import { Box, Avatar, useTheme } from "@mui/material";
import { Sparkles } from "lucide-react";
import { ChatMessage } from "./ChatMessage";
import { AnimatePresence } from "framer-motion";
import type { Phone } from "../types/Phone";

interface Message {
  role: "user" | "model";
  content: string;
  phones?: Phone[];
  type?: string;
  comparison_summary?: string;
}

interface ChatContentProps {
  messages: Message[];
  isLoading: boolean;
  scrollRef: React.RefObject<HTMLDivElement>;
}

export const ChatContent = ({
  messages,
  isLoading,
  scrollRef,
}: ChatContentProps) => {
  const theme = useTheme();

  return (
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
          pt: 1,
        }}
      >
        <Box sx={{ pb: 24 }}>
          <AnimatePresence initial={false}>
            {messages.map((msg, idx) => (
              <ChatMessage
                key={idx}
                role={msg.role}
                text={msg.content}
                phones={msg.phones}
                type={msg.type}
                comparison_summary={msg.comparison_summary}
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
      </Box>
    </Box>
  );
};
