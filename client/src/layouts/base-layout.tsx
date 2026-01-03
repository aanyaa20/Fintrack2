import { Outlet } from "react-router-dom";
import { useEffect } from "react";

const BaseLayout = () => {
  useEffect(() => {
    // Force dark mode for auth pages (BaseLayout is only used for auth routes)
    const root = window.document.documentElement;
    root.classList.remove('light');
    root.classList.add('dark');

    // Cleanup is handled by ThemeProvider when navigating to protected routes
  }, []);

  return (
    <div className="flex flex-col w-full h-auto">
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-full mx-auto h-auto ">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default BaseLayout;