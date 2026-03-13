import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import ReportLost from "./pages/ReportLost";
import ReportFound from "./pages/ReportFound";
import BrowseItems from "./pages/BrowseItems";
import ItemDetails from "./pages/ItemDetails";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/report-lost" element={<ReportLost />} />

        <Route path="/report-found" element={<ReportFound />} />

        <Route path="/browse" element={<BrowseItems />} />

        <Route path="/item/:id" element={<ItemDetails />} />

      </Routes>

    </BrowserRouter>
  );
}

export default App;
