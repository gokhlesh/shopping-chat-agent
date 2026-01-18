import { Box, IconButton, Typography, Button } from "@mui/material";
import { ChevronRight, ChevronDown, Trash2, Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ChatHeaderProps {
  isSidebarOpen: boolean;
  onOpenSidebar: () => void;
  onClearChat: () => void;
  selectedModel: string;
  setSelectedModel: (model: string) => void;
  models: Array<{ id: string; name: string; icon: React.ReactNode }>;
  onNewChat: () => void;
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
}

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

export const ChatHeader = ({
  isSidebarOpen,
  onOpenSidebar,
  onClearChat,
  selectedModel,
  setSelectedModel,
  models,
  onNewChat,
  isMenuOpen,
  setIsMenuOpen,
}: ChatHeaderProps) => {
  const selectedModelName =
    models.find((m) => m.id === selectedModel)?.name || selectedModel;

  return (
    <Box sx={{ position: "relative", zIndex: 100 }}>
      <Box
        component="header"
        sx={{
          height: 56,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: 2,
          borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
          bgcolor: "#0d0d0d",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          {/* Desktop Menu Toggle */}
          <Box sx={{ display: { xs: "none", md: "block" } }}>
            {!isSidebarOpen && (
              <IconButton
                onClick={onOpenSidebar}
                sx={{
                  color: "text.secondary",
                  mr: 1,
                  "&:hover": {
                    color: "white",
                    bgcolor: "rgba(255,255,255,0.05)",
                  },
                }}
              >
                <ChevronRight size={20} />
              </IconButton>
            )}
          </Box>

          {/* Breadcrumbs / Logo */}
          <Box
            onClick={() =>
              window.innerWidth < 900 && setIsMenuOpen(!isMenuOpen)
            }
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              cursor: window.innerWidth < 900 ? "pointer" : "default",
              px: 1.5,
              py: 0.5,
              borderRadius: "12px",
              transition: "0.2s",
              "&:hover": {
                bgcolor:
                  window.innerWidth < 900
                    ? "rgba(255,255,255,0.05)"
                    : "transparent",
              },
            }}
          >
            <Typography
              variant="h6"
              sx={{ fontWeight: 800, color: "white", fontSize: "1rem" }}
            >
              MobiWise
            </Typography>

            {/* Mobile Breadcrumb Particle */}
            <Box
              sx={{
                display: { xs: "flex", md: "none" },
                alignItems: "center",
                gap: 0.5,
              }}
            >
              <Typography
                sx={{ color: "rgba(255,255,255,0.2)", fontWeight: 300 }}
              >
                /
              </Typography>
              <Typography
                sx={{
                  fontSize: "0.9rem",
                  fontWeight: 600,
                  color: isMenuOpen ? "white" : "text.secondary",
                }}
              >
                {selectedModelName}
              </Typography>
              <ChevronDown
                size={14}
                style={{
                  transform: isMenuOpen ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "0.3s",
                  color: "rgba(255,255,255,0.3)",
                }}
              />
            </Box>
          </Box>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <HeaderActionBtn
            onClick={onClearChat}
            icon={<Trash2 size={18} />}
            label="Clear"
          />
        </Box>
      </Box>

      {/* Mobile Collapsible Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            style={{
              overflow: "hidden",
              backgroundColor: "#000",
              borderBottom: "1px solid rgba(255,255,255,0.05)",
            }}
          >
            <Box
              sx={{ p: 2, display: "flex", flexDirection: "column", gap: 1 }}
            >
              <Button
                fullWidth
                onClick={() => {
                  onNewChat();
                  setIsMenuOpen(false);
                }}
                startIcon={<Plus size={18} />}
                sx={{
                  justifyContent: "flex-start",
                  color: "white",
                  bgcolor: "rgba(255,255,255,0.05)",
                  py: 1.5,
                  borderRadius: "12px",
                  mb: 1,
                }}
              >
                New Chat
              </Button>

              <Typography
                sx={{
                  fontSize: "10px",
                  fontWeight: 900,
                  color: "rgba(255,255,255,0.3)",
                  textTransform: "uppercase",
                  letterSpacing: "0.15em",
                  px: 1,
                  mb: 0.5,
                }}
              >
                Change Model
              </Typography>

              {models.map((model) => (
                <Box
                  key={model.id}
                  onClick={() => {
                    setSelectedModel(model.id);
                    setIsMenuOpen(false);
                  }}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                    p: 1.5,
                    borderRadius: "10px",
                    cursor: "pointer",
                    bgcolor:
                      selectedModel === model.id
                        ? "rgba(255,255,255,0.08)"
                        : "transparent",
                    "&:hover": { bgcolor: "rgba(255,255,255,0.05)" },
                  }}
                >
                  {model.icon}
                  <Typography
                    sx={{
                      fontSize: "0.9rem",
                      color:
                        selectedModel === model.id ? "white" : "text.secondary",
                    }}
                  >
                    {model.name}
                  </Typography>
                </Box>
              ))}
            </Box>
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
};
