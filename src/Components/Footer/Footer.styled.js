import styled from "styled-components";
import { Box, Typography } from "@mui/material";

export const ContenedorFooter = styled(Box)`
  background: radial-gradient(circle, #2d0363 30%, rgb(29, 1, 65) 100%);
  color: #ffffff;
  text-align: center;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  border-top: 1px solid rgb(36, 2, 82);
  margin-top: auto;
  position: relative;
  bottom: 0;
  width: 100%;
`;

export const TextoFooter = styled(Typography)`
  font-size: 16px !important;
  color: #f6ebf9 !important;
  font-weight: 400 !important;
`;

export const LogoFooter = styled.img`
  height: 80px;
  margin-right: 20px;
`;

export const IconoCopyright = styled.span`
  font-size: 16px;
  margin-right: 5px;
  color: #f6ebf9;
`;
