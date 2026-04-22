import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../store/AppContext';

const Register = () => {
  const navigate = useNavigate();
  const { dispatch } = useApp();
  const [form, setForm] = useState({
    UserName: '', FirstName: '', LastName: '', EmailId: '',
    MobileNo: '', Gender: '', Password: '', ConfirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState('');

  const set = (k, v) => setForm({ ...form, [k]: v });

  const validate = () => {
    const e = {};
    if (!form.UserName) e.UserName = 'Username Required';
    if (!form.FirstName) e.FirstName = 'First Name Required';
    if (!form.LastName) e.LastName = 'Last Name Required';
    if (!form.EmailId) e.EmailId = 'Email Required';
    if (!form.MobileNo) e.MobileNo = 'Mobile Required';
    if (!form.Gender) e.Gender = 'Gender Required';
    if (!form.Password) e.Password = 'Password Required';
    if (form.Password !== form.ConfirmPassword) e.ConfirmPassword = 'Passwords do not match';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    dispatch({ type: 'ADD', entity: 'users', payload: { ...form, Status: 'Active', RoleName: 'Unassigned' } });
    setSuccess('Registration Successful! Please contact admin for role assignment.');
    setTimeout(() => navigate('/login'), 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0a1628] via-[#0f2035] to-[#0a1628] p-4">
      <div className="w-full max-w-lg">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#0097A7] to-[#00BCD4] flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4 shadow-lg shadow-[#0097A7]/30">V</div>
          <h1 className="text-2xl font-bold text-white">Create Account</h1>
          <p className="text-sm text-white/50 mt-1">Register for Velson ERP</p>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl p-8 animate-scale-in">
          {success && <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-xl text-sm text-green-600">{success}</div>}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { key: 'UserName', label: 'Username', type: 'text', span: 2 },
              { key: 'FirstName', label: 'First Name', type: 'text' },
              { key: 'LastName', label: 'Last Name', type: 'text' },
              { key: 'EmailId', label: 'Email', type: 'email', span: 2 },
              { key: 'MobileNo', label: 'Mobile No', type: 'text' },
              { key: 'Gender', label: 'Gender', type: 'select', options: ['Male', 'Female', 'Other'] },
              { key: 'Password', label: 'Password', type: 'password' },
              { key: 'ConfirmPassword', label: 'Confirm Password', type: 'password' },
            ].map((f) => (
              <div key={f.key} className={`form-field-group ${f.span === 2 ? 'sm:col-span-2' : ''}`}>
                <label className="form-label">{f.label} <span className="required">*</span></label>
                {f.type === 'select' ? (
                  <select className="form-input" value={form[f.key]} onChange={(e) => set(f.key, e.target.value)}>
                    <option value="">Select {f.label}</option>
                    {f.options.map((o) => <option key={o} value={o}>{o}</option>)}
                  </select>
                ) : (
                  <input type={f.type} className={`form-input ${errors[f.key] ? 'error' : ''}`} placeholder={`Enter ${f.label}`} value={form[f.key]} onChange={(e) => set(f.key, e.target.value)} />
                )}
                {errors[f.key] && <span className="text-xs text-red-500">{errors[f.key]}</span>}
              </div>
            ))}
          </div>

          <button onClick={handleSubmit} className="w-full mt-6 py-3 bg-gradient-to-r from-[#0097A7] to-[#00838F] text-white font-bold rounded-xl hover:shadow-lg hover:shadow-[#0097A7]/30 hover:-translate-y-0.5 transition-all duration-200">
            Register
          </button>

          <p className="text-center text-sm text-slate-500 mt-4">
            Already have an account? <button onClick={() => navigate('/login')} className="text-[#0097A7] font-semibold hover:underline">Sign In</button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
