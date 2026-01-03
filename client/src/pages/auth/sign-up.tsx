import SignUpForm from "./_component/signup-form";
import Logo from "@/components/logo/logo";
import AuthMeshGradient from "@/components/auth/auth-mesh-gradient";

const SignUp = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-background flex items-center justify-center p-4">
      {/* Logo at top-left */}
      <div className="absolute top-6 left-6 md:top-10 md:left-10">
        <Logo url="/" />
      </div>

      {/* Single centered card */}
      <div className="w-full max-w-md bg-card backdrop-blur-sm rounded-2xl shadow-2xl border border-border/50 overflow-hidden relative">
        {/* Animated blue mesh gradient - INSIDE card only */}
        <AuthMeshGradient />
        
        <div className="relative z-10 p-8 md:p-12">
          <div className="w-full">
            <SignUpForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
