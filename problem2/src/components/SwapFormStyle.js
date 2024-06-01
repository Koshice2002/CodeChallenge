import styled from 'styled-components';

export const Container = styled.div`
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

export const Title = styled.h1`
  text-align: center;
  margin-bottom: 20px;
`;

export const SwapContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;

export const SwapItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const SwapIcon = styled.img`
  width: 50px;
  height: 50px;
  margin-bottom: 10px;
`;

export const SwapSelect = styled.select`
  padding: 10px;
  margin-bottom: 10px;
  font-size: 16px;
`;

export const SwapInput = styled.input`
  padding: 10px;
  font-size: 16px;
`;

export const SwapArrow = styled.div`
  font-size: 24px;
  margin: 0 10px;
`;

export const SwapButton = styled.button`
  margin-top: 10px;
  background: #007bff;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background: #0056b3;
  }
`;

export const ErrorText = styled.div`
  color: red;
  font-size: 12px;
`;
