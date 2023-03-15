import styled from "styled-components";

export const MainContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 10px;
  min-height: 90vh;
  background: ${(props) => props.bg};
`;

export const AdminContainer = styled.div`
  display: grid;
  grid-template-columns: 4fr 1fr;
  border: 1px solid black;
  padding: 30px;
  row-gap: 20px;
  min-height: 90%;
  margin-bottom: 25px;
`;

export const TrackerContainer = styled.div`
  display: grid;
  padding: 10px;
  height: auto;
`;

export const DriverContainer = styled.div`
  display: grid;
  grid-template-columns: 5fr 1fr;
  border: 1px solid black;
  padding: 10px;
  row-gap: 20px;
  height: auto;
`;

export const Button = styled.button`
  height: 50px;
  width: 190px;
  background: ${(props) => props.bg};
  margin: auto;
  font-weight: 500;
  border: 2px solid black;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  font-weight: bold;
  height: 50px;
`;

export const AcitonButton = styled.button`
  height: 20px;
  width: 50px;
  background: ${(props) => props.bg};
  font-size: 10px;
  border: none;
  border-radius: 10px;
  color: white;
`;

export const PackageDetails = styled.div`
  border: 1px solid black;
  height: auto;
  padding: 10px;
  margin-bottom: 8px;
`;
