import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom"; // adjust path as needed
import { useRegisterUser } from "@/hooks/useRegisterUser";

const RegisterPage = () => {
  const navigate = useNavigate();
  const { registerUser, loading, error } = useRegisterUser();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    avatar: null as File | null,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;

    if (name === "avatar" && files) {
      setFormData((prev) => ({ ...prev, avatar: files[0] || null }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await registerUser({
        username: formData.username,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        avatar: formData.avatar || undefined,
      });

      // Success - redirect to login
      navigate("/login", {
        state: { message: "Account created successfully! Please login." },
      });
    } catch (err) {
      // Error is already handled in the hook
      console.error("Registration failed:", err);
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
              Create a Account
            </h1>
            <p className="text-sm">
              Welcome to Clipr! Create an account to get started
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-md bg-red-50 border border-red-200 text-red-700 text-sm">
              {error}
            </div>
          )}

          <div className="space-y-5">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="block text-sm">
                  Firstname
                </Label>
                <Input
                  type="text"
                  required
                  name="firstName"
                  id="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  disabled={loading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName" className="block text-sm">
                  Lastname
                </Label>
                <Input
                  type="text"
                  required
                  name="lastName"
                  id="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  disabled={loading}
                />
              </div>
            </div>

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
              <Label htmlFor="password" className="text-sm">
                Password
              </Label>
              <Input
                type="password"
                required
                name="password"
                id="password"
                value={formData.password}
                onChange={handleInputChange}
                disabled={loading}
                className="input sz-md variant-mixed"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="avatar">Profile Pic</Label>
              <Input
                type="file"
                accept="image/*"
                name="avatar"
                id="avatar"
                onChange={handleInputChange}
                disabled={loading}
                className="input sz-md variant-mixed"
              />
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Creating Account..." : "Continue"}
            </Button>
          </div>
        </div>

        <div className="bg-muted rounded-(--radius) border p-3">
          <p className="text-accent-foreground text-center text-sm">
            Have an account ?
            <Button type="button" asChild variant="link" className="px-2">
              <Link to="/login">Sign In</Link>
            </Button>
          </p>
        </div>
      </form>
    </section>
  );
};

export default RegisterPage;
