import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Typography,
} from "@mui/material";

const RegistroModal = ({
  open,
  onClose,
  onReenviarCorreo,
  email,
  mensajeModal,
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle variant="h3">REGISTRO DE USUARIO FUE CORRECTO</DialogTitle>
      <DialogContent>
        <Typography variant="body1">
          Hemos enviado un correo electrónico de confirmación a tu bandeja de
          entrada para asegurarnos de que tu registro fue exitoso.
        </Typography>
        <Typography variant="body2" sx={{ marginTop: 2 }}>
          Si no encuentras el correo en tu bandeja de entrada, revisa tu carpeta
          de correo no deseado o spam. Si aún no lo has recibido, puedes
          solicitar que te lo enviemos nuevamente.
        </Typography>
        <Typography variant="body3" sx={{ marginTop: 2 }}>
          {mensajeModal}
        </Typography>
        <Typography variant="body3" sx={{ marginTop: 2, fontWeight: "bold" }}>
          {email}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secundario">
          Iniciar Sesion
        </Button>
        <Button onClick={onReenviarCorreo} color="secundario">
          Reenviar Correo
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RegistroModal;
