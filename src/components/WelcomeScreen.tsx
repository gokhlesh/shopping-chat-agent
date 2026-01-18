import { Box, Avatar, Typography, Button } from "@mui/material";
import { Smartphone } from "lucide-react";

interface WelcomeScreenProps {
  onSuggest: (text: string) => void;
}

export const WelcomeScreen = ({ onSuggest }: WelcomeScreenProps) => {
  const categories = [
    { label: "Best camera phones under 40k", icon: "📸" },
    { label: "Compare iPhone 15 vs S24", icon: "⚖️" },
    { label: "Top gaming phones for BGMI", icon: "🎮" },
    { label: "Compact flagship recommendations", icon: "📱" },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "60vh",
        gap: 3,
        px: 2,
        textAlign: "center",
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
        sx={{
          fontWeight: 800,
          letterSpacing: "-0.02em",
          fontSize: { xs: "1.75rem", md: "2.125rem" },
        }}
      >
        How can I help you today?
      </Typography>
      <Box
        sx={{
          display: "flex",
          gap: 2,
          flexWrap: "wrap",
          justifyContent: "center",
          maxWidth: "700px",
        }}
      >
        {categories.map((cat) => (
          <Button
            key={cat.label}
            variant="outlined"
            onClick={() => onSuggest(cat.label)}
            startIcon={<span>{cat.icon}</span>}
            sx={{
              borderRadius: "16px",
              borderColor: "rgba(255,255,255,0.1)",
              color: "text.secondary",
              px: { xs: 2, md: 3 },
              py: 1.5,
              textTransform: "none",
              fontSize: { xs: "0.85rem", md: "0.9rem" },
              fontWeight: 600,
              transition: "0.3s",
              "&:hover": {
                borderColor: "white",
                color: "white",
                bgcolor: "rgba(255,255,255,0.05)",
                transform: "translateY(-2px)",
              },
            }}
          >
            {cat.label}
          </Button>
        ))}
      </Box>
    </Box>
  );
};
