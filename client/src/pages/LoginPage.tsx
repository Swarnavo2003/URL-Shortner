import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import { useLogin } from "@/hooks/useLoginUser";
import { useState } from "react";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const { loading, error, loginUser } = useLogin();
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await loginUser(formData);
      navigate("/");
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  return (
    <section className="flex min-h-screen bg-zinc-50 px-4 py-16 md:py-32 dark:bg-transparent">
      <form
        onSubmit={handleSubmit}
        className="bg-card m-auto h-fit w-full max-w-sm rounded-[calc(var(--radius)+.125rem)] border p-0.5 shadow-md dark:[--color-muted:var(--color-zinc-900)]"
      >
        <div className="p-8 pb-6">
          <div className="mb-6">
            <h1 className="mb-1 mt-4 text-xl font-semibold">
              Welcome Back To Clipr
            </h1>
            <p className="text-sm">Welcome back! Sign in to continue</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 rounded-md bg-red-100 p-3 text-red-700 text-sm">
              {error}
            </div>
          )}

          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="username" className="block text-sm">
                Username
              </Label>
              <Input
                type="text"
                required
                name="username"
                id="username"
                value={formData.username}
                onChange={handleInputChange}
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="block text-sm">
                Email
              </Label>
              <Input
                type="email"
                required
                name="email"
                id="email"
                value={formData.email}
                onChange={handleInputChange}
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-sm">
                  Password
                </Label>
              </div>
              <Input
                type="password"
                required
                name="password"
                id="password"
                value={formData.password}
                onChange={handleInputChange}
                className="input sz-md variant-mixed"
                disabled={loading}
              />
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Signing In..." : "Sign In"}
            </Button>
          </div>
        </div>

        <div className="bg-muted rounded-(--radius) border p-3">
          <p className="text-accent-foreground text-center text-sm">
            Don't have an account ?
            <Button asChild variant="link" className="px-2">
              <Link to="/register">Create account</Link>
            </Button>
          </p>
        </div>
      </form>
    </section>
  );
};

export default LoginPage;
