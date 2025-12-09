import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";

const signupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(50, "Name must be less than 50 characters"),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, "Password must contain uppercase, lowercase, and number"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  gender: z.enum(["MALE", "FEMALE","OTHER"], { required_error: "Please select a gender" }),
});

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      dateOfBirth: "",
      gender: undefined,
    },
  });

  const onSubmit = async (data) => {
    try {
    const response = await api.post("/auth/signup", data, {
      withCredentials: true, // only if you want cookies
    });
    setError(null);
    navigate("/login");
  } catch (error) {
    console.error("Signup failed:", error.response?.data);
    setError(error.response?.data?.error?.message || "Signup failed. Please try again.");
  }
  };

  return (
    <div className="min-h-screen flex text-white bg-black">
      {/* Left side */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
        
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl animate-pulse"></div>
          <div
            className="absolute bottom-20 right-20 w-80 h-80 bg-blue-500/30 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-indigo-500/20 rounded-full blur-2xl animate-pulse"
            style={{ animationDelay: "2s" }}
          ></div>
        </div>

        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 border-2 border-white rotate-45 animate-[spin_20s_linear_infinite]"></div>
          <div className="absolute bottom-1/4 right-1/4 w-24 h-24 border-2 border-white rounded-full animate-[spin_15s_linear_infinite_reverse]"></div>
          <div className="absolute top-1/2 right-1/3 w-40 h-40 border-2 border-white rotate-12 animate-[spin_25s_linear_infinite]"></div>
        </div>

        <div className="relative z-10 flex flex-col justify-center px-16 text-white animate-fade-in">
          <h1 className="text-6xl font-bold mb-6 animate-slide-in-left">Join Us Today</h1>
          <p
            className="text-xl opacity-90 animate-slide-in-left"
            style={{ animationDelay: "0.2s" }}
          >
            Create your account and start your journey with us
          </p>
        </div>
      </div>

      {/* Right side (gradient applied) */}
      <div
        className="w-full lg:w-1/2 flex items-center justify-center p-8 
                   bg-gradient-to-br from-[#0f0f11] to-[#1a1a1d]"
      >
        <div className="w-full max-w-md animate-fade-in bg-neutral-900/60 backdrop-blur-xl p-8 rounded-2xl border border-neutral-700/60 shadow-2xl">
          <div className="mb-8 animate-slide-in-right">
            <h2 className="text-4xl font-bold mb-2">Create Account</h2>
            <p className="text-neutral-400">Fill in your details to get started</p>
          </div>
            {error && <p className="text-red-400 text-sm mt-4">{error}</p>}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            
            {/* Name */}
            <div className="animate-slide-in-right" style={{ animationDelay: "0.1s" }}>
              <label className="block mb-1 font-medium text-neutral-200">Full Name</label>
              <input
                {...register("name")}
                placeholder="John Doe"
                className="w-full px-3 py-2 border border-neutral-700 bg-neutral-800 text-white rounded-lg 
                           transition-all placeholder-neutral-500 focus:border-purple-500 
                           focus:ring-2 focus:ring-purple-600/40"
              />
              {errors.name && <p className="text-red-400 text-sm">{errors.name.message}</p>}
            </div>

            {/* Email */}
            <div className="animate-slide-in-right" style={{ animationDelay: "0.2s" }}>
              <label className="block mb-1 font-medium text-neutral-200">Email</label>
              <input
                {...register("email")}
                type="email"
                placeholder="john@example.com"
                className="w-full px-3 py-2 border border-neutral-700 bg-neutral-800 text-white rounded-lg 
                           transition-all placeholder-neutral-500 focus:border-purple-500 
                           focus:ring-2 focus:ring-purple-600/40"
              />
              {errors.email && <p className="text-red-400 text-sm">{errors.email.message}</p>}
            </div>

            {/* Password */}
            <div className="animate-slide-in-right" style={{ animationDelay: "0.3s" }}>
              <label className="block mb-1 font-medium text-neutral-200">Password</label>
              <div className="relative">
                <input
                  {...register("password")}
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full px-3 py-2 pr-10 border border-neutral-700 bg-neutral-800 text-white rounded-lg 
                             transition-all placeholder-neutral-500 focus:border-purple-500 
                             focus:ring-2 focus:ring-purple-600/40"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && <p className="text-red-400 text-sm">{errors.password.message}</p>}
            </div>

            {/* DOB */}
            <div className="animate-slide-in-right" style={{ animationDelay: "0.4s" }}>
              <label className="block mb-1 font-medium text-neutral-200">Date of Birth</label>
              <input
                {...register("dateOfBirth")}
                type="date"
                className="w-full px-3 py-2 border border-neutral-700 bg-neutral-800 text-white rounded-lg 
                           transition-all focus:border-purple-500 focus:ring-2 focus:ring-purple-600/40"
              />
              {errors.dateOfBirth && <p className="text-red-400 text-sm">{errors.dateOfBirth.message}</p>}
            </div>

            {/* Gender */}
            <div className="animate-slide-in-right" style={{ animationDelay: "0.5s" }}>
              <label className="block mb-2 font-medium text-neutral-200">Gender</label>

              <div className="flex items-center space-x-6">
                <label className="flex items-center space-x-2 cursor-pointer text-neutral-300">
                  <input
                    type="radio"
                    value="MALE"
                    {...register("gender")}
                    onChange={(e) => setValue("gender", e.target.value)}
                    className="accent-purple-600"
                  />
                  <span>Male</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer text-neutral-300">
                  <input
                    type="radio"
                    value="OTHER"
                    {...register("gender")}
                    onChange={(e) => setValue("gender", e.target.value)}
                    className="accent-purple-600"
                  />
                  <span>Other</span>
                </label>

                <label className="flex items-center space-x-2 cursor-pointer text-neutral-300">
                  <input
                    type="radio"
                    value="FEMALE"
                    {...register("gender")}
                    onChange={(e) => setValue("gender", e.target.value)}
                    className="accent-purple-600"
                  />
                  <span>Female</span>
                </label>
              </div>

              {errors.gender && <p className="text-red-400 text-sm">{errors.gender.message}</p>}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 bg-purple-600 text-white rounded-lg transition-all hover:bg-purple-700 
                         hover:scale-[1.02] hover:shadow-xl animate-slide-in-right"
              style={{ animationDelay: "0.6s" }}
            >
              Create Account
            </button>

            {/* Sign In Link */}
            <p
              className="text-center text-sm text-neutral-400 animate-fade-in"
              style={{ animationDelay: "0.7s" }}
            >
              Already have an account?{" "}
              <Link to="/login" className="text-purple-400 hover:underline">
                Sign In
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
