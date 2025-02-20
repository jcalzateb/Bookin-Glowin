import styled from "styled-components";
import { Box, Typography } from "@mui/material";

export const ContenedorFooter = styled(Box)`
  background: linear-gradient(to right, #000, #1c1c1e);
  color: #ffffff;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  border-top: 1px solid #000;
  margin-top: auto;
  position: relative;
  bottom: 0;
`;

export const TextoFooter = styled(Typography)`
  font-size: 14px;
  font-weight: 400;
`;

export const LogoFooter = styled.img`
  height: 50px;
  margin-right: 20px;
`;
