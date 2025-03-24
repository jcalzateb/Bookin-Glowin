import { createTheme } from "@mui/material/styles";

const tema = createTheme({
  palette: {
    primario: { main: "#f6ebf9" },
    secundario: { main: "#2D0363" },
    detalle: { main: "#9747FF" },
    botones: {
      activo: "#9747FF",
      hovered: "#530EAE",
      presionado: "#2D0363",
      inactivo: "#B093D5",
    },
  },
  borderRadius: {
    botones: "16px",
  },
  typography: {
    fontFamily: "'Poppins', 'Lora', sans-serif",
    button: {
      fontFamily: "'Poppins', sans-serif",
      fontWeight: 600,
      fontSize: "16px",
    },
    h1: {
      fontFamily: "'Lora', serif",
      fontWeight: "bold",
      fontStyle: "italic",
      fontSize: "30px",
    },
    h2: {
      fontFamily: "'Lora', serif",
      fontWeight: "bold",
      fontStyle: "regular",
      fontSize: "26px",
    },
    h3: {
      fontFamily: "'Lora', serif",
      fontWeight: 500,
      fontSize: "22px",
    },
    h4: {
      fontFamily: "'Lora', serif",
      fontWeight: 500,
      fontSize: "18px",
    },
    h5: {
      fontFamily: "'Lora', serif",
      fontWeight: 400,
      fontSize: "16px",
    },
    h6: {
      fontFamily: "'Lora', serif",
      fontWeight: 400,
      fontSize: "14px",
    },
    parrafos: {
      h1: {
        fontFamily: "Poppins, sans-serif",
        fontWeight: "bold",
        fontSize: "30px",
      },
      h2: {
        fontFamily: "Poppins, sans-serif",
        fontWeight: 500,
        fontStyle: "italic",
        fontSize: "26px",
      },
      h3: {
        fontFamily: "Poppins, sans-serif",
        fontWeight: 500,
        fontStyle: "italic",
        fontSize: "22px",
      },
      h4: {
        fontFamily: "Poppins, sans-serif",
        fontStyle: "italic",
        fontSize: "18px",
      },
      h5: {
        fontFamily: "Poppins, sans-serif",
        fontWeight: "bold",
        fontStyle: "regular",
        fontSize: "16px",
      },
      h6: {
        fontFamily: "Poppins, sans-serif",
        fontWeight: "bold",
        fontStyle: "italic",
        fontSize: "14px",
      },
    },
  },
});

export default tema;
