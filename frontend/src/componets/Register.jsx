import React from 'react'

const Register = () => {
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-black
      bg-fixed bg-cover bg-no-repeat 
      [background-image:radial-gradient(circle_at_20%_30%,rgba(88,101,242,0.15)_0%,transparent_40%),radial-gradient(circle_at_80%_70%,rgba(168,85,247,0.12)_0%,transparent_40%),radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.08)_0%,transparent_50%)]"
    >
      {/* Form Card */}
      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-white/20">
        {/* Heading */}
        <h2 className="text-4xl font-extrabold text-center mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Create Your Account
        </h2>
        <p className="text-gray-300 text-center mb-6">
          Join the future of secure payments today 🚀
        </p>

        {/* Form */}
        <form className="space-y-5">
          {/* First Name */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              First Name
            </label>
            <input
              type="text"
              placeholder="John"
              className="w-full px-4 py-3 rounded-lg bg-gray-900/70 border border-gray-700 text-gray-200
              placeholder-gray-500 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-500 transition-all"
            />
          </div>

          {/* Last Name */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Last Name
            </label>
            <input
              type="text"
              placeholder="Doe"
              className="w-full px-4 py-3 rounded-lg bg-gray-900/70 border border-gray-700 text-gray-200
              placeholder-gray-500 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-500 transition-all"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="example@email.com"
              className="w-full px-4 py-3 rounded-lg bg-gray-900/70 border border-gray-700 text-gray-200
              placeholder-gray-500 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-500 transition-all"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-lg bg-gray-900/70 border border-gray-700 text-gray-200
              placeholder-gray-500 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-500 transition-all"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 mt-4 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 
            text-white font-semibold text-lg shadow-lg hover:shadow-purple-500/50 hover:scale-[1.02] transition-all duration-300"
          >
            🚀 Sign Up
          </button>
        </form>

        {/* Footer */}
        <p className="text-gray-400 text-center mt-6 text-sm">
          Already have an account?{" "}
          <a href="#" className="text-purple-400 hover:underline">
            Log In
          </a>
        </p>
      </div>
    </div>
  );
}

export default Register