import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar/sidebar";
import { Outlet } from "react-router-dom";
import EditTransactionDrawer from "@/components/transaction/edit-transaction-drawer";

const AppLayout = () => {
  return (
    <>
    <div className="min-h-screen pb-10 flex">
      <Sidebar />
      <div className="flex-1 min-w-0">
        <Navbar />
        <main className="w-full max-w-full">
          <Outlet />
        </main>
      </div>
    </div>
    <EditTransactionDrawer />
    </>
  );
};

export default AppLayout;