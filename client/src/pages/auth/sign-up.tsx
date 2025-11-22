import SignUpForm from "./_component/signup-form";
import Logo from "@/components/logo/logo";

const SignUp = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-background flex items-center justify-center p-4">
      {/* Logo at top-left */}
      <div className="absolute top-6 left-6 md:top-10 md:left-10">
        <Logo url="/" />
      </div>

      {/* Single centered card */}
      <div className="w-full max-w-md bg-card backdrop-blur-sm rounded-2xl shadow-2xl border border-border/50 overflow-hidden relative">
        {/* Subtle gradient overlay effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10 pointer-events-none" />
        <div className="absolute top-0 left-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl opacity-20" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl opacity-20" />
        
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
