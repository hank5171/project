// App.jsx
import Header from "./Header";
import Signin from "./signin";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<h1>首頁</h1>} />
        <Route path="/menu" element={<h1>菜單</h1>} />
        <Route path="/menuHistory" element={<h1>訂單紀錄</h1>} />
        <Route path="/signin" element={<Signin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

