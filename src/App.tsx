import { Routes, Route } from "react-router-dom";

import BoardsList from "./feautures/boards/BoardsList";
import SingleBoardPage from "./feautures/boards/SingleBoardPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<BoardsList />} />
      <Route path="/:boardId" element={<SingleBoardPage />} />
    </Routes>
  );
}

export default App;
