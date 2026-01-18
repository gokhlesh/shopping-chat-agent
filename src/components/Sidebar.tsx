import {
  Box,
  Button,
  Typography,
  Avatar,
  Divider,
  useTheme,
  IconButton,
} from "@mui/material";
import { Plus, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  startNewChat: () => void;
  selectedModel: string;
  setSelectedModel: (model: string) => void;
  models: Array<{ id: string; name: string; icon: React.ReactNode }>;
}

const MotionBox = motion(Box);

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

export const Sidebar = ({
  isOpen,
  onClose,
  startNewChat,
  selectedModel,
  setSelectedModel,
  models,
}: SidebarProps) => {
  const theme = useTheme();

  return (
    <>
      {/* Sidebar Overlay (Mobile) */}
      <AnimatePresence>
        {isOpen && (
          <MotionBox
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            sx={{
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
          x: isOpen ? 0 : -260,
          opacity: 1,
          width: 260,
        }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        sx={{
          height: "100%",
          bgcolor: "#000",
          borderRight: "1px solid rgba(255, 255, 255, 0.05)",
          display: { xs: "none", md: "flex" },
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
            height: "100%",
            gap: 1,
          }}
        >
          {/* Sidebar Top */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <Box sx={{ flex: 1 }}>
              <SidebarBtn
                onClick={() => {
                  startNewChat();
                  if (window.innerWidth < 900) onClose();
                }}
                icon={<Plus size={18} />}
                label="New chat"
              />
            </Box>
            <IconButton
              onClick={onClose}
              sx={{
                display: { md: "none" },
                color: "text.secondary",
                "&:hover": {
                  color: "white",
                  bgcolor: "rgba(255,255,255,0.05)",
                },
              }}
            >
              <X size={20} />
            </IconButton>
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
    </>
  );
};
