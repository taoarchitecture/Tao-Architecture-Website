"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Link from 'next/link';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        email,
        password,
      });
      localStorage.setItem('token', response.data.token);
      router.push('/admin/projects');
    } catch (error) {
      alert('Invalid credentials');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="max-w-md w-full px-6 py-12">
        <div className="text-center mb-12">
          <Link href="/" className="inline-block text-4xl font-bold tracking-widest text-neutral-dark-grey hover:opacity-80 transition-opacity mb-4">
            TAO<span className="text-primary-red">ARC</span>
          </Link>
          <h2 className="text-sm uppercase tracking-[0.2em] text-neutral-light-grey">Admin Dashboard</h2>
        </div>

        <form className="space-y-6" onSubmit={handleLogin}>
          <div className="space-y-4">
            <div>
              <label className="sr-only">Email address</label>
              <input
                type="email"
                required
                className="appearance-none block w-full px-4 py-3 border border-neutral-border-grey placeholder-neutral-light-grey text-neutral-dark-grey focus:outline-none focus:border-primary-red transition-colors font-agenda text-sm tracking-wide"
                placeholder="EMAIL ADDRESS"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="sr-only">Password</label>
              <input
                type="password"
                required
                className="appearance-none block w-full px-4 py-3 border border-neutral-border-grey placeholder-neutral-light-grey text-neutral-dark-grey focus:outline-none focus:border-primary-red transition-colors font-agenda text-sm tracking-wide"
                placeholder="PASSWORD"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-xs font-bold uppercase tracking-[0.2em] text-white bg-neutral-black hover:bg-primary-red transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? 'SIGNING IN...' : 'SIGN IN'}
            </button>
          </div>
          
          <div className="text-center">
             <Link href="/" className="text-xs uppercase tracking-widest text-neutral-light-grey hover:text-primary-red transition-colors">
                Back to Website
             </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
