// app/admin/login/page.jsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock } from 'lucide-react';

export default function AdminLoginPage() {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await fetch('/api/admin/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password }),
            });

            const data = await res.json();

            if (res.ok && data.success) {
                router.push('/admin');
                router.refresh();
            } else {
                setError(data.error || 'Invalid credentials');
            }
        } catch (err) {
            setError('An unexpected error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#090A0D] text-[#F4F1EA] flex items-center justify-center p-4 font-sans">
            <div className="bg-[#12141C] border border-[#C5A880]/30 rounded-2xl max-w-sm w-full p-8 space-y-6 shadow-2xl">
                <div className="text-center space-y-2">
                    <div className="w-12 h-12 rounded-full border border-[#C5A880]/60 flex items-center justify-center bg-[#0B0D12] mx-auto mb-4">
                        <Lock size={20} className="text-[#C5A880]" />
                    </div>
                    <h1 className="font-serif text-2xl font-light tracking-tight text-white">Admin Access</h1>
                    <p className="text-xs text-white/40">Enter credentials to manage Valois Estates</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-4 text-xs">
                    {error && (
                        <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-center text-xs">
                            {error}
                        </div>
                    )}

                    <div>
                        <label className="block text-[10px] uppercase tracking-wider text-white/50 mb-1.5">
                            Admin Password
                        </label>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••••••"
                            className="w-full bg-[#0B0D12] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#C5A880] text-sm"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 bg-[#C5A880] text-[#0B0D12] font-semibold rounded-xl uppercase text-xs hover:bg-[#F4F1EA] transition-colors disabled:opacity-50"
                    >
                        {loading ? 'Authenticating...' : 'Unlock Portal'}
                    </button>
                </form>
            </div>
        </div>
    );
}