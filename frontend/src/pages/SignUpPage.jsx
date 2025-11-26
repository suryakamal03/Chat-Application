import React ,{useState}from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { MessageSquare,Eye ,EyeOff, Loader} from "lucide-react";
import toast from 'react-hot-toast';
import { Link } from 'react-router';
function SignUpPage() {
  const [formData,setFormData] = useState({name:'',email:"",password:""})
  const {signup,isSigningup}  = useAuthStore()
  const [showPassword,setShowPassword] = useState(false)
  const handleSubmit = (e)=>{
    e.preventDefault();
    signup(formData)
  }
  return ( 
    <div className="w-full max-w-2xl">
    <div className="bg-[#1a1a1a] rounded-2xl p-10 border border-white/10">
      {/* Logo */}
      <div className="flex justify-center mb-10">
        <div className="bg-gradient-to-br from-emerald-500 to-teal-500 p-3 rounded-xl">
          <MessageSquare className="w-8 h-8 text-black" strokeWidth={2.5} />
        </div>
      </div>

      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-white mb-2">Create Account</h1>
        <p className="text-gray-400">Join us and start connecting</p>
      </div>

      {/* Form */}
      <form className="space-y-5">
        {/* Full Name */}
        <div>
          <label className="block text-gray-300 mb-2">
            Full Name
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            className="w-full bg-[#0f0f0f] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 transition-colors"
            placeholder="Enter your full name" value={formData.name} onChange={(e)=> setFormData({...formData,name:e.target.value})}
          />
        </div>

        {/* Email */}
        <div>
          <label  className="block text-gray-300 mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full bg-[#0f0f0f] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 transition-colors"
            placeholder="Enter your email" value={formData.email} onChange={(e)=> setFormData({...formData,email:e.target.value})}
          />
        </div>

        {/* Password */}
        <div>
          <label  className="block text-gray-300 mb-2">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              
              className="w-full bg-[#0f0f0f] border border-white/10 rounded-lg px-4 py-3 pr-12 text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 transition-colors"
              placeholder="Create a password" value={formData.password} onChange={(e)=> setFormData({...formData,password:e.target.value})}
            />
            <button
              type="button" onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-emerald-400 transition-colors" 
            > 
              {showPassword ? (
          <Eye className="w-5 h-5" />
        ) : (
          <EyeOff className="w-5 h-5" />
        )}
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-black py-3.5 rounded-lg transition-colors mt-8" disabled={isSigningup} onClick={handleSubmit}
        >
          {isSigningup ? (<Loader className="w-5 h-5 mx-auto animate-spin" />) : ("Create Account")}
        </button>
      </form>

      {/* Login Link */}
      <div className="text-center mt-6">
        <Link to="/login" className="text-gray-400">
          Already have an account?{' '}
          <button className="text-emerald-400 hover:text-emerald-300 transition-colors">
            Login
          </button>
        </Link>
      </div>
    </div>
    </div>
  )
}

export default SignUpPage
