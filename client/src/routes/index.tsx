import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  authenticationRoutePaths,
  protectedRoutePaths,
} from "./common/routes";
import AppLayout from "@/layouts/app-layout";
import BaseLayout from "@/layouts/base-layout";
import AuthRoute from "./authRoute";
import ProtectedRoute from "./protectedRoute";
import useAuthExpiration from "@/hooks/use-auth-expiration";
import LandingPage from "@/pages/landing";
import HelpDocs from "@/pages/resources/HelpDocs";
import Faqs from "@/pages/resources/Faqs";
import WhatsNew from "@/pages/resources/WhatsNew";
import Blogs from "@/pages/resources/Blogs";
import Guides from "@/pages/resources/Guides";
import Forums from "@/pages/resources/Forums";

function AppRoutes() {
  useAuthExpiration();
  return (
    <BrowserRouter>
      <Routes>
        {/* Landing Page - Root */}
        <Route path="/" element={<LandingPage />} />
        
        {/* Resource Pages */}
        <Route path="/resources/help-docs" element={<HelpDocs />} />
        <Route path="/resources/faqs" element={<Faqs />} />
        <Route path="/resources/whats-new" element={<WhatsNew />} />
        <Route path="/resources/blogs" element={<Blogs />} />
        <Route path="/resources/guides" element={<Guides />} />
        <Route path="/resources/forums" element={<Forums />} />
        
        <Route element={<AuthRoute />}>
          <Route element={<BaseLayout />}>
            {authenticationRoutePaths.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={route.element}
              />
            ))}
          </Route>
        </Route>
        {/* Protected Route */}
        <Route element={<ProtectedRoute />}>
          <Route element={<AppLayout />}>
            {protectedRoutePaths.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={route.element}
              >
                {route.children?.map((childRoute) => (
                  <Route
                    key={childRoute.path || 'index'}
                    index={childRoute.index}
                    path={childRoute.path}
                    element={childRoute.element}
                  />
                ))}
              </Route>
            ))}
          </Route>
        </Route>

        {/* Catch-all for undefined routes */}
        <Route path="*" element={<>404</>} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;