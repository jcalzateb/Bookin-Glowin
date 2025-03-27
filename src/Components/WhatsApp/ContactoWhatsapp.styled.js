import styled from 'styled-components';

export const WhatsappButtonContainer = styled.div`
  position: fixed;
  right: 20px;
  bottom: 20px;
  z-index: 1000;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }

  @media (max-width: 768px) {
    right: 15px;
    bottom: 15px;
  }
`;

export const WhatsappIcon = styled.div`
  background-color: #25D366;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

  @media (max-width: 480px) {
    width: 50px;
    height: 50px;
  }
`;

export const Notification = styled.div`
  position: fixed;
  right: 20px;
  bottom: 90px;
  background-color: ${props => props.isError ? '#ff4444' : '#25D366'};
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  animation: fadeIn 0.3s ease;

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @media (max-width: 768px) {
    right: 15px;
    bottom: 80px;
    max-width: 80%;
  }
`;