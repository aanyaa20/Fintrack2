import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAppDispatch } from "@/app/hook";
import { setCredentials } from "@/features/auth/authSlice";
import { toast } from "sonner";
import { PROTECTED_ROUTES, AUTH_ROUTES } from "@/routes/common/routePath";
import { Loader } from "lucide-react";

const GitHubCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = searchParams.get("token");
    const expiresAt = searchParams.get("expiresAt");
    const error = searchParams.get("error");

    if (error) {
      toast.error("GitHub authentication failed. Please try again.");
      navigate(AUTH_ROUTES.SIGN_IN);
      return;
    }

    if (token && expiresAt) {
      // Fetch user data with the token
      fetch("http://localhost:8000/api/user/current-user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("Failed to fetch user data");
          }
          return res.json();
        })
        .then((data) => {
          dispatch(
            setCredentials({
              user: data.user,
              accessToken: token,
              expiresAt: Number(expiresAt),
              reportSetting: null,
            })
          );
          toast.success("Successfully logged in with GitHub!");
          navigate(PROTECTED_ROUTES.OVERVIEW);
        })
        .catch((error) => {
          console.error("GitHub auth error:", error);
          toast.error("Failed to fetch user data. Please try again.");
          navigate(AUTH_ROUTES.SIGN_IN);
        });
    } else {
      toast.error("Invalid authentication response.");
      navigate(AUTH_ROUTES.SIGN_IN);
    }
  }, [searchParams, navigate, dispatch]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <Loader className="h-8 w-8 animate-spin text-primary" />
        <p className="text-sm text-muted-foreground">
          Completing GitHub authentication...
        </p>
      </div>
    </div>
  );
};

export default GitHubCallback;
