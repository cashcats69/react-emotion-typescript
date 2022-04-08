import { GeneralPage } from "./Components/Pages/GeneralPage";
import styled from "@emotion/styled";

const AppComponent = styled("div")`
  text-align: center;
  background-color: #9389be;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
  -moz-user-select: none;
  -khtml-user-select: none;
  user-select: none;
`;

function App() {
  return (
    <AppComponent>
      <GeneralPage />
    </AppComponent>
  );
}

export default App;
