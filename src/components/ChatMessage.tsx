import { motion } from "framer-motion";
import { User, Bot, Sparkles as SparklesIcon } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { PhoneCard } from "./PhoneCard";
import type { Phone } from "../types/Phone";
import { Box, Typography, Avatar, alpha, useTheme } from "@mui/material";

interface ChatMessageProps {
  role: "user" | "model";
  text: string;
  phones?: Phone[];
}

export const ChatMessage = ({ role, text, phones }: ChatMessageProps) => {
  const theme = useTheme();
  const isBot = role === "model";

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Box
        sx={{
          width: "100%",
          py: { xs: 4, md: 6 },
          bgcolor: isBot
            ? alpha(theme.palette.common.white, 0.02)
            : "transparent",
        }}
      >
        <Box
          sx={{
            maxWidth: "48rem",
            mx: "auto",
            display: "flex",
            gap: { xs: 2, md: 4 },
            px: { xs: 2, md: 4 },
          }}
        >
          <Avatar
            sx={{
              width: 36,
              height: 36,
              borderRadius: "12px",
              bgcolor: isBot ? theme.palette.primary.main : "zinc.800",
              boxShadow: isBot
                ? `0 4px 12px ${alpha(theme.palette.primary.main, 0.3)}`
                : "none",
              flexShrink: 0,
            }}
          >
            {isBot ? <Bot size={20} /> : <User size={20} />}
          </Avatar>

          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Box
              sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1.5 }}
            >
              <Typography
                sx={{
                  fontSize: "13px",
                  fontWeight: 800,
                  color: "white",
                  letterSpacing: "0.02em",
                }}
              >
                {isBot ? "MobiWise AI" : "You"}
              </Typography>
              {isBot && (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    px: 1,
                    py: 0.25,
                    borderRadius: "6px",
                    bgcolor: alpha(theme.palette.primary.main, 0.1),
                    border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                  }}
                >
                  <SparklesIcon size={10} color={theme.palette.primary.light} />
                  <Typography
                    sx={{
                      fontSize: "9px",
                      fontWeight: 900,
                      color: theme.palette.primary.light,
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                    }}
                  >
                    Pro
                  </Typography>
                </Box>
              )}
            </Box>

            <Box
              sx={{
                "& .prose": {
                  color: alpha(theme.palette.common.white, 0.9),
                  fontSize: "16px",
                  lineHeight: 1.8,
                  "& p": { mb: 2 },
                  "& strong": { color: "white", fontWeight: 700 },
                },
              }}
            >
              <Box className="prose">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {text}
                </ReactMarkdown>
              </Box>
            </Box>

            {phones && phones.length > 0 && (
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "1fr",
                    sm: "repeat(auto-fill, minmax(300px, 1fr))",
                  },
                  gap: 3,
                  mt: 4,
                  width: "100%",
                }}
              >
                {phones.map((phone) => (
                  <PhoneCard key={phone.id} phone={phone} />
                ))}
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </motion.div>
  );
};
