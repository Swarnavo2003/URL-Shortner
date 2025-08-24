import Analytics from "@/components/dashboard/Analytics";
import Links from "@/components/dashboard/Links";
import Sidebar from "@/components/dashboard/Sidebar";
import { Route, Routes } from "react-router-dom";

const DashboardPage = () => {
  return (
    <div className="h-full px-4 py-2 w-full flex gap-2">
      <Sidebar />
      <Routes>
        <Route path="links" element={<Links />} />
        <Route path="analytics" element={<Analytics />} />
      </Routes>
    </div>
  );
};

export default DashboardPage;
