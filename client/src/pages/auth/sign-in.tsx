import SignInForm from "./_component/signin-form";
import Logo from "@/components/logo/logo";
import { FeatureCarousel } from "@/components/auth/feature-carousel";

const SignIn = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-background p-4">
      {/* Logo at top-left */}
      <div className="absolute top-6 left-6 md:top-10 md:left-10">
        <Logo url="/" />
      </div>

      {/* Single centered card containing both form and carousel */}
      <div className="w-full max-w-6xl bg-card backdrop-blur-sm rounded-2xl shadow-2xl border border-border/50 overflow-hidden relative mx-auto" style={{ marginTop: 'max(5rem, 10vh)' }}>
        {/* Subtle gradient overlay effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10 pointer-events-none" />
        <div className="absolute top-0 left-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl opacity-20" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl opacity-20" />
        
        <div className="flex flex-col lg:flex-row relative z-10">
          {/* Left side - Sign in form */}
          <div className="w-full lg:w-1/2 p-8 md:p-12">
            <div className="w-full max-w-md mx-auto">
              <SignInForm />
            </div>
          </div>

          {/* Vertical divider line */}
          <div className="hidden lg:block w-px bg-gradient-to-b from-transparent via-border to-transparent" />

          {/* Right side - Feature carousel */}
          <div className="hidden lg:flex lg:w-1/2 p-12 items-center justify-center relative overflow-hidden">
            <FeatureCarousel />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
