import React from "react";
import { Box, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#C4C4C4",
        padding: "20px",
        textAlign: "center",
        borderTop: "2px solid black",
        position: "relative",
        bottom: 0,
        width: "100%",
      }}
    >
      <Typography variant="body1" sx={{ fontSize: "14px", fontWeight: "500", color: "#000" }}>
        COPYRIGHT 2025 Glowin - Todos los derechos reservados
      </Typography>
    </Box>
  );
};

export default Footer;
