import { useState } from "react";
import { motion } from "framer-motion";
import type { Phone } from "../types/Phone";
import {
  Battery,
  Camera,
  Zap,
  Smartphone,
  ExternalLink,
  X,
  Layers,
} from "lucide-react";
import {
  Box,
  Card,
  Typography,
  Chip,
  Button,
  Stack,
  alpha,
  useTheme,
  Dialog,
  IconButton,
  Divider,
} from "@mui/material";

interface PhoneCardProps {
  phone: Phone;
}

const MotionCard = motion(Card);

export const PhoneCard = ({ phone }: PhoneCardProps) => {
  const theme = useTheme();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenGSMArena = () => {
    const query = `${phone.brand} ${phone.model} gsmarena`;
    window.open(
      `https://www.google.com/search?q=${encodeURIComponent(query)}&btnI=1`,
      "_blank",
    );
  };

  return (
    <>
      <MotionCard
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ y: -8, transition: { duration: 0.2 } }}
        sx={{
          background: alpha(theme.palette.background.paper, 0.4),
          backdropFilter: "blur(12px)",
          borderRadius: "24px",
          p: 3,
          border: "1px solid rgba(255, 255, 255, 0.05)",
          position: "relative",
          overflow: "hidden",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          gap: 2,
          transition: "all 0.3s ease",
          "&:hover": {
            background: alpha(theme.palette.background.paper, 0.6),
            borderColor: alpha(theme.palette.primary.main, 0.3),
            boxShadow: `0 20px 40px ${alpha(theme.palette.common.black, 0.4)}`,
          },
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            right: 0,
            width: 128,
            height: 128,
            background: alpha(theme.palette.primary.main, 0.1),
            filter: "blur(60px)",
            borderRadius: "50%",
            zIndex: 0,
          }}
        />

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            position: "relative",
            zIndex: 1,
          }}
        >
          <Box>
            <Typography
              sx={{
                fontSize: "10px",
                fontWeight: 900,
                textTransform: "uppercase",
                letterSpacing: "0.2em",
                color: theme.palette.primary.main,
                mb: 0.5,
              }}
            >
              {phone.brand}
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 800, color: "white" }}>
              {phone.model}
            </Typography>
          </Box>
          <Box sx={{ textAlign: "right" }}>
            <Typography
              sx={{
                fontSize: "10px",
                fontWeight: 700,
                textTransform: "uppercase",
                color: "text.secondary",
              }}
            >
              Price
            </Typography>
            <Typography
              sx={{ fontSize: "1.1rem", fontWeight: 900, color: "white" }}
            >
              ₹{phone.price.toLocaleString()}
            </Typography>
          </Box>
        </Box>

        <Stack spacing={2} sx={{ position: "relative", zIndex: 1, flex: 1 }}>
          <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
            <SpecItem
              icon={<Smartphone size={14} />}
              label="Display"
              value={phone.display}
            />
            <SpecItem
              icon={<Camera size={14} />}
              label="Camera"
              value={`${phone.camera.main} ${phone.camera.ois ? "OIS" : ""}`}
            />
            <SpecItem
              icon={<Battery size={14} />}
              label="Power"
              value={phone.battery}
            />
            <SpecItem
              icon={<Zap size={14} />}
              label="Speed"
              value={phone.charging}
            />
          </Box>

          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
            {phone.tags.slice(0, 4).map((tag) => (
              <Chip
                key={tag}
                label={tag.replace("_", " ")}
                size="small"
                sx={{
                  height: "20px",
                  fontSize: "9px",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  bgcolor: alpha(theme.palette.common.white, 0.05),
                  border: "1px solid rgba(255, 255, 255, 0.05)",
                  color: "text.secondary",
                  "& .MuiChip-label": { px: 1 },
                }}
              />
            ))}
          </Box>
        </Stack>

        <Box
          sx={{
            pt: 2,
            borderTop: "1px solid rgba(255, 255, 255, 0.05)",
            position: "relative",
            zIndex: 1,
          }}
        >
          <Button
            fullWidth
            variant="contained"
            onClick={() => setIsModalOpen(true)}
            endIcon={<ExternalLink size={14} />}
            sx={{
              bgcolor: alpha(theme.palette.common.white, 0.05),
              color: "text.primary",
              "&:hover": {
                bgcolor: theme.palette.common.white,
                color: theme.palette.common.black,
              },
              py: 1.5,
              borderRadius: "12px",
              fontSize: "0.75rem",
              fontWeight: 800,
              letterSpacing: "0.1em",
            }}
          >
            Full Specs
          </Button>
        </Box>
      </MotionCard>

      <Dialog
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            bgcolor: "#121212",
            backgroundImage: "none",
            borderRadius: "28px",
            border: "1px solid rgba(255,255,255,0.1)",
            boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)",
          },
        }}
      >
        <Box sx={{ p: 4, position: "relative" }}>
          <IconButton
            onClick={() => setIsModalOpen(false)}
            sx={{
              position: "absolute",
              top: 16,
              right: 16,
              color: "text.secondary",
              "&:hover": { color: "white", bgcolor: "rgba(255,255,255,0.05)" },
            }}
          >
            <X size={20} />
          </IconButton>

          <Box sx={{ mb: 4 }}>
            <Typography
              variant="overline"
              sx={{
                color: theme.palette.primary.main,
                fontWeight: 900,
                letterSpacing: "0.2em",
              }}
            >
              Technical Specifications
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 800, color: "white" }}>
              {phone.brand} {phone.model}
            </Typography>
          </Box>

          <Stack spacing={3}>
            <SpecRow
              icon={<Smartphone size={20} />}
              label="Display & Build"
              value={phone.display}
              subValue={`${phone.size.charAt(0).toUpperCase() + phone.size.slice(1)} form factor`}
            />
            <Divider sx={{ borderColor: "rgba(255,255,255,0.05)" }} />
            <SpecRow
              icon={<Camera size={20} />}
              label="Camera System"
              value={phone.camera.main}
              subValue={
                phone.camera.ois
                  ? "Optical Image Stabilization (OIS) supported"
                  : "Standard stabilization"
              }
            />
            <Divider sx={{ borderColor: "rgba(255,255,255,0.05)" }} />
            <SpecRow
              icon={<Layers size={20} />}
              label="Operating System"
              value={phone.os}
            />
            <Divider sx={{ borderColor: "rgba(255,255,255,0.05)" }} />
            <SpecRow
              icon={<Zap size={20} />}
              label="Battery & Charging"
              value={phone.battery}
              subValue={`${phone.charging} Fast Charging`}
            />
          </Stack>

          <Box sx={{ mt: 5, display: "flex", gap: 2 }}>
            <Button
              fullWidth
              variant="contained"
              onClick={handleOpenGSMArena}
              startIcon={<ExternalLink size={18} />}
              sx={{
                bgcolor: "white",
                color: "black",
                borderRadius: "14px",
                py: 1.5,
                fontWeight: 800,
                "&:hover": { bgcolor: "rgba(255,255,255,0.9)" },
              }}
            >
              View on GSMArena
            </Button>
            <Button
              fullWidth
              variant="outlined"
              onClick={() => setIsModalOpen(false)}
              sx={{
                borderColor: "rgba(255,255,255,0.1)",
                color: "white",
                borderRadius: "14px",
                py: 1.5,
                fontWeight: 700,
                "&:hover": {
                  borderColor: "white",
                  bgcolor: "rgba(255,255,255,0.05)",
                },
              }}
            >
              Close
            </Button>
          </Box>
        </Box>
      </Dialog>
    </>
  );
};

const SpecRow = ({
  icon,
  label,
  value,
  subValue,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  subValue?: string;
}) => (
  <Box sx={{ display: "flex", gap: 2.5 }}>
    <Box
      sx={{
        width: 44,
        height: 44,
        borderRadius: "12px",
        bgcolor: "rgba(255,255,255,0.03)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "primary.main",
        flexShrink: 0,
      }}
    >
      {icon}
    </Box>
    <Box>
      <Typography
        sx={{
          fontSize: "11px",
          fontWeight: 700,
          color: "text.secondary",
          textTransform: "uppercase",
          letterSpacing: "0.05em",
          mb: 0.5,
        }}
      >
        {label}
      </Typography>
      <Typography sx={{ fontWeight: 600, color: "white" }}>{value}</Typography>
      {subValue && (
        <Typography sx={{ fontSize: "12px", color: "text.secondary", mt: 0.5 }}>
          {subValue}
        </Typography>
      )}
    </Box>
  </Box>
);

const SpecItem = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) => (
  <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,
        color: "text.secondary",
      }}
    >
      {icon}
      <Typography
        sx={{
          fontSize: "9px",
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "0.05em",
        }}
      >
        {label}
      </Typography>
    </Box>
    <Typography
      sx={{
        fontSize: "11px",
        fontWeight: 600,
        color: "text.primary",
        lineHeight: 1.2,
      }}
    >
      {value}
    </Typography>
  </Box>
);
