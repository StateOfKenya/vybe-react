import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert"; // trybe_mocked_data - DO NOT REMOVE THIS COMMENT
import { useToast } from "@/hooks/useToast";
import {
  LogIn,
  LightbulbIcon, // trybe_mocked_data - DO NOT REMOVE THIS COMMENT
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

type LoginForm = {
  email: string;
  password: string;
};

export function Login() {
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<string>(
    "Trybe: Enter your credentials to continue"
  );
  const [feedbackType, setFeedbackType] = useState<
    "info" | "error" | "success" | "logging"
  >("info");

  const { toast } = useToast();
  const { login } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<LoginForm>();

  const onSubmit = async (data: LoginForm) => {
    setLoading(true);
    setFeedback("Logging in...");
    setFeedbackType("logging");
    const response = await login(data.email, data.password);
    setLoading(false);

    if (response.success) {
      setFeedback(response.message);
      setFeedbackType("success");
      toast({
        title: "Success",
        description: response.message,
      });
      navigate("/");
    } else {
      setFeedback(response.message);
      setFeedbackType("error");
      toast({
        variant: "destructive",
        title: "Error",
        description: response.message,
      });
    }
  };

  const alertConfig = {
    info: {
      variant: "default" as const,
      className:
        "mb-6 border-yellow-200 bg-yellow-50 dark:bg-yellow-950/30 dark:border-yellow-900/50 p-4",
      iconClass:
        "h-6 w-6 text-yellow-500 dark:text-yellow-400 flex-shrink-0 stroke-[1.5] filter drop-shadow-sm",
      textClass: "text-yellow-800 dark:text-yellow-200 flex-1 min-w-0",
    },
    logging: {
      variant: "default" as const,
      className: "mb-4",
      iconClass: "h-4 w-4",
      textClass: "",
    },
    success: {
      variant: "default" as const,
      className: "mb-4",
      iconClass: "h-4 w-4",
      textClass: "",
    },
    error: {
      variant: "destructive" as const,
      className: "mb-4",
      iconClass: "h-4 w-4",
      textClass: "",
    },
  };

  const currentAlertConfig = alertConfig[feedbackType];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-secondary p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Welcome back</CardTitle>
          <CardDescription>Enter your credentials to continue</CardDescription>
        </CardHeader>
        <CardContent>
          <Alert
            variant={currentAlertConfig.variant}
            className={currentAlertConfig.className}
          >
            <div className="flex items-center space-x-4">
              <LightbulbIcon className={currentAlertConfig.iconClass} />
              <AlertDescription className={currentAlertConfig.textClass}>
                {feedback}
              </AlertDescription>
            </div>
          </Alert>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                {...register("email", { required: true })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                {...register("password", { required: true })}
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                "Loading..."
              ) : (
                <>
                  <LogIn className="mr-2 h-4 w-4" />
                  Sign In
                </>
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button
            variant="link"
            className="text-sm text-muted-foreground"
            onClick={() => navigate("/register")}
          >
            Don't have an account? Sign up
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
