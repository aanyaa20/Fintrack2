import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAppDispatch } from "@/app/hook";
import { setCredentials } from "@/features/auth/authSlice";
import { toast } from "sonner";
import { PROTECTED_ROUTES, AUTH_ROUTES } from "@/routes/common/routePath";
import { Loader2 } from "lucide-react";

const GoogleCallback = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const handleGoogleCallback = async () => {
      try {
        // Get the token and other data from URL params
        const token = searchParams.get("token");
        const expiresAt = searchParams.get("expiresAt");
        const error = searchParams.get("error");

        if (error) {
          toast.error("Google authentication failed. Please try again.");
          navigate(AUTH_ROUTES.SIGN_IN);
          return;
        }

        if (!token || !expiresAt) {
          toast.error("Invalid authentication response from Google.");
          navigate(AUTH_ROUTES.SIGN_IN);
          return;
        }

        // Fetch user data with the token
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/user/current-user`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const { user, reportSetting } = await response.json();

        // Dispatch to Redux store
        dispatch(
          setCredentials({
            user,
            accessToken: token,
            expiresAt: Number(expiresAt),
            reportSetting,
          })
        );

        toast.success("Successfully logged in with Google!");

        // Navigate to dashboard
        navigate(PROTECTED_ROUTES.OVERVIEW);
      } catch (error) {
        console.error("Google callback error:", error);
        toast.error("Failed to fetch user data. Please try again.");
        navigate(AUTH_ROUTES.SIGN_IN);
      }
    };

    handleGoogleCallback();
  }, [searchParams, navigate, dispatch]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-sm text-muted-foreground">
          Completing Google authentication...
        </p>
      </div>
    </div>
  );
};

export default GoogleCallback;
