import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../store/AppContext';
import { Eye, EyeOff, RefreshCw } from 'lucide-react';

function generateCaptcha() {
  const a = Math.floor(Math.random() * 10) + 1;
  const b = Math.floor(Math.random() * 10) + 1;
  return { question: `${a} + ${b} = ?`, answer: a + b };
}

const Login = () => {
  const navigate = useNavigate();
  const { dispatch } = useApp();
  const [form, setForm] = useState({ username: '', password: '' });
  const [showPw, setShowPw] = useState(false);
  const [captcha, setCaptcha] = useState(generateCaptcha());
  const [captchaInput, setCaptchaInput] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    setError('');
    if (!form.username || !form.password) {
      setError('Username and Password are required');
      return;
    }
    if (parseInt(captchaInput) !== captcha.answer) {
      setError('Error: captcha is not valid');
      setCaptcha(generateCaptcha());
      setCaptchaInput('');
      return;
    }
    // Mock login
    dispatch({ type: 'LOGIN', payload: { id: 1, username: form.username, firstName: 'Admin', role: 'SuperAdmin' } });
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0a1628] via-[#0f2035] to-[#0a1628] p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#0097A7] to-[#00BCD4] flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4 shadow-lg shadow-[#0097A7]/30">
            V
          </div>
          <h1 className="text-2xl font-bold text-white">Velson ERP</h1>
          <p className="text-sm text-white/50 mt-1">Sign in to your account</p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 animate-scale-in">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600 animate-fade-in">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div className="form-field-group">
              <label className="form-label">Username <span className="required">*</span></label>
              <input
                type="text"
                className="form-input"
                placeholder="Enter username"
                value={form.username}
                onChange={(e) => setForm({ ...form, username: e.target.value })}
                onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
              />
            </div>

            <div className="form-field-group">
              <label className="form-label">Password <span className="required">*</span></label>
              <div className="relative">
                <input
                  type={showPw ? 'text' : 'password'}
                  className="form-input pr-10"
                  placeholder="Enter password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* CAPTCHA */}
            <div className="form-field-group">
              <label className="form-label">CAPTCHA <span className="required">*</span></label>
              <div className="flex items-center gap-3 w-full">
                <div className="flex items-center justify-between px-4 py-2 bg-slate-100 rounded-lg border border-slate-200 shrink-0">
                  <span className="text-sm font-bold text-slate-700 select-none tracking-wider mr-3">
                    {captcha.question}
                  </span>
                  <button
                    type="button"
                    onClick={() => { setCaptcha(generateCaptcha()); setCaptchaInput(''); }}
                    className="text-slate-400 hover:text-[#0097A7] transition-colors focus:outline-none gap-2"
                    title="Refresh CAPTCHA"
                  >
                    <RefreshCw size={16} />
                  </button>
                </div>
                <input
                  type="text"
                  className="form-input flex-1 min-w-0"
                  placeholder="Enter answer"
                  value={captchaInput}
                  onChange={(e) => setCaptchaInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                />
              </div>
            </div>
          </div>

          <button
            onClick={handleLogin}
            className="w-full mt-6 py-3 bg-gradient-to-r from-[#0097A7] to-[#00838F] text-white font-bold rounded-xl hover:shadow-lg hover:shadow-[#0097A7]/30 hover:-translate-y-0.5 transition-all duration-200"
          >
            Sign In
          </button>

          <p className="text-center text-sm text-slate-500 mt-4">
            Don't have an account?{' '}
            <button onClick={() => navigate('/register')} className="text-[#0097A7] font-semibold hover:underline">
              Register
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
