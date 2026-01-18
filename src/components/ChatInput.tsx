import { Box, IconButton, Typography } from "@mui/material";
import { Plus, Send } from "lucide-react";
import React from "react";

interface ChatInputProps {
  input: string;
  setInput: (value: string) => void;
  onSend: (e?: React.FormEvent) => void;
  loading: boolean;
}

export const ChatInput = ({
  input,
  setInput,
  onSend,
  loading,
}: ChatInputProps) => {
  return (
    <Box
      sx={{
        position: "absolute",
        bottom: 0,
        left: 0,
        width: "100%",
        p: { xs: 2, md: 3 },
        background: "linear-gradient(to top, #0d0d0d 60%, rgba(13,13,13,0))",
        zIndex: 40,
      }}
    >
      <Box sx={{ maxWidth: "48rem", mx: "auto" }}>
        <Box
          component="form"
          onSubmit={onSend}
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
                onSend();
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
              fontFamily: "inherit",
              "&::placeholder": { color: "rgba(255,255,255,0.4)" },
            }}
          />

          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <IconButton
              type="submit"
              disabled={loading || !input.trim()}
              sx={{
                bgcolor:
                  loading || !input.trim() ? "rgba(255,255,255,0.05)" : "white",
                color:
                  loading || !input.trim() ? "rgba(255,255,255,0.1)" : "black",
                "&:hover": { bgcolor: "rgba(255,255,255,0.9)" },
                width: 36,
                height: 36,
                transition: "0.2s",
                transform: "scale(1)",
                "&:active": { transform: "scale(0.9)" },
                "&.Mui-disabled": {
                  bgcolor: "rgba(255,255,255,0.05)",
                  color: "rgba(255,255,255,0.1)",
                },
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
              textAlign: "center",
            }}
          >
            MobiWise can make mistakes. Check important info.{" "}
            <span style={{ textDecoration: "underline", cursor: "pointer" }}>
              Cookie Preferences
            </span>
            .
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
