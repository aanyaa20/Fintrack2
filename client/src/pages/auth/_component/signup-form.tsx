import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Loader } from "lucide-react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { AUTH_ROUTES, PROTECTED_ROUTES } from "@/routes/common/routePath";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRegisterMutation } from "@/features/auth/authAPI";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider, microsoftProvider } from "@/config/firebase.config";
import { useState } from "react";
import { useAppDispatch } from "@/app/hook";
import { setCredentials } from "@/features/auth/authSlice";

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  location: z.string().optional(),
  mobileNumber: z.string().max(20, "Mobile number too long").optional(),
});

type FormValues = z.infer<typeof schema>;

// Country code mapping
const countryCodeMap: Record<string, string> = {
  "United States": "+1",
  "United Kingdom": "+44",
  "Canada": "+1",
  "Australia": "+61",
  "Germany": "+49",
  "France": "+33",
  "India": "+91",
  "Japan": "+81",
  "China": "+86",
  "Brazil": "+55",
  "Mexico": "+52",
  "Spain": "+34",
  "Italy": "+39",
  "Netherlands": "+31",
  "Singapore": "+65",
};

const SignUpForm = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [register, { isLoading }] = useRegisterMutation();
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isMicrosoftLoading, setIsMicrosoftLoading] = useState(false);
  const [countryCode, setCountryCode] = useState("+1");

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (values: FormValues) => {
    // Combine country code with mobile number if mobile number is provided
    const submitData = {
      ...values,
      mobileNumber: values.mobileNumber ? `${countryCode} ${values.mobileNumber}` : undefined,
    };
    
    register(submitData)
      .unwrap()
      .then(() => {
        form.reset();
        toast.success("Sign up successful");
        navigate(AUTH_ROUTES.SIGN_IN);
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.data?.message || "Failed to sign up");
      });
  };

  const handleGoogleSignUp = async () => {
    try {
      setIsGoogleLoading(true);
      const result = await signInWithPopup(auth, googleProvider);
      const idToken = await result.user.getIdToken();

      // Send Firebase token to backend
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/google`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ firebaseToken: idToken }),
      });

      if (!response.ok) {
        throw new Error("Failed to authenticate with Google");
      }

      const data = await response.json();

      dispatch(setCredentials({
        user: data.user,
        accessToken: data.accessToken,
        expiresAt: data.expiresAt,
        reportSetting: data.reportSetting,
      }));

      toast.success("Successfully signed up with Google!");
      navigate(PROTECTED_ROUTES.OVERVIEW);
    } catch (error) {
      console.error("Google sign-up error:", error);
      toast.error("Failed to sign up with Google. Please try again.");
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const handleMicrosoftSignUp = async () => {
    try {
      setIsMicrosoftLoading(true);
      const result = await signInWithPopup(auth, microsoftProvider);
      const idToken = await result.user.getIdToken();

      // Send Firebase token to backend
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/microsoft`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ firebaseToken: idToken }),
      });

      if (!response.ok) {
        throw new Error("Failed to authenticate with Microsoft");
      }

      const data = await response.json();

      dispatch(setCredentials({
        user: data.user,
        accessToken: data.accessToken,
        expiresAt: data.expiresAt,
        reportSetting: data.reportSetting,
      }));

      toast.success("Successfully signed up with Microsoft!");
      navigate(PROTECTED_ROUTES.OVERVIEW);
    } catch (error) {
      console.error("Microsoft sign-up error:", error);
      toast.error("Failed to sign up with Microsoft. Please try again.");
    } finally {
      setIsMicrosoftLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6"
      >
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Create your account</h1>
          <p className="text-balance text-sm text-muted-foreground">
            Fill your information below to sign up
          </p>
        </div>
        <div className="grid gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Your Full Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="m@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location (Optional)</FormLabel>
                <Select 
                  onValueChange={(value) => {
                    field.onChange(value);
                    const code = countryCodeMap[value] || "+1";
                    setCountryCode(code);
                  }} 
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your country" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="United States">United States</SelectItem>
                    <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                    <SelectItem value="Canada">Canada</SelectItem>
                    <SelectItem value="Australia">Australia</SelectItem>
                    <SelectItem value="Germany">Germany</SelectItem>
                    <SelectItem value="France">France</SelectItem>
                    <SelectItem value="India">India</SelectItem>
                    <SelectItem value="Japan">Japan</SelectItem>
                    <SelectItem value="China">China</SelectItem>
                    <SelectItem value="Brazil">Brazil</SelectItem>
                    <SelectItem value="Mexico">Mexico</SelectItem>
                    <SelectItem value="Spain">Spain</SelectItem>
                    <SelectItem value="Italy">Italy</SelectItem>
                    <SelectItem value="Netherlands">Netherlands</SelectItem>
                    <SelectItem value="Singapore">Singapore</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="mobileNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mobile Number (Optional)</FormLabel>
                <FormControl>
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-2 border rounded-md bg-muted text-sm min-w-[60px] text-center">
                      {countryCode}
                    </span>
                    <Input 
                      placeholder="234 567 8900" 
                      {...field} 
                      onChange={(e) => {
                        // Only allow numbers
                        const value = e.target.value.replace(/[^0-9]/g, '');
                        field.onChange(value);
                      }}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={isLoading} type="submit" className="w-full">
            {isLoading && <Loader className="h-4 w-4 animate-spin" />}
            Sign up
          </Button>
          <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
            <span className="relative z-10 bg-[var(--bg-color)] dark:bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
          <Button 
            type="button" 
            variant="outline" 
            className="w-full"
            disabled={isGoogleLoading}
            onClick={handleGoogleSignUp}
          >
            {isGoogleLoading && <Loader className="h-4 w-4 animate-spin" />}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="h-5 w-5">
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
              <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
              <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
              <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
              <path fill="none" d="M0 0h48v48H0z"/>
            </svg>
            Sign up with Google
          </Button>
          <Button 
            type="button" 
            variant="outline" 
            className="w-full"
            disabled={isMicrosoftLoading}
            onClick={handleMicrosoftSignUp}
          >
            {isMicrosoftLoading && <Loader className="h-4 w-4 animate-spin" />}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 23 23" className="h-5 w-5">
              <path fill="#f3f3f3" d="M0 0h23v23H0z"/>
              <path fill="#f35325" d="M1 1h10v10H1z"/>
              <path fill="#81bc06" d="M12 1h10v10H12z"/>
              <path fill="#05a6f0" d="M1 12h10v10H1z"/>
              <path fill="#ffba08" d="M12 12h10v10H12z"/>
            </svg>
            Sign up with Microsoft
          </Button>
          <Button 
            type="button" 
            variant="outline" 
            className="w-full"
            onClick={() => {
              window.location.href = "http://localhost:8000/api/auth/github";
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path
                d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
                fill="currentColor"
              />
            </svg>
            Sign up with GitHub
          </Button>
        </div>
        <div className="text-center text-sm">
          Already have an account?{" "}
          <Link
            to={AUTH_ROUTES.SIGN_IN}
            className="underline underline-offset-4"
          >
            Sign in
          </Link>
        </div>
      </form>
    </Form>
  );
};

export default SignUpForm;