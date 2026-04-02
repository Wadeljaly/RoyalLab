import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, User, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Simple mock authentication for "Reception Manager"
    if (username === 'admin' && password === 'admin123') {
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userRole', 'ReceptionManager');
      navigate('/dashboard');
    } else {
      setError('خطأ في اسم المستخدم أو كلمة المرور!');
    }
  };

  return (
    <div className="login-page flex-center" style={{ height: '90vh', background: '#f1f5f9', direction: 'rtl' }}>
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }} 
        animate={{ opacity: 1, scale: 1 }}
        className="glass"
        style={{ width: '400px', padding: '40px', borderRadius: '30px', background: 'white', textAlign: 'center' }}
      >
        <div className="flex-center" style={{ width: '70px', height: '70px', background: 'var(--royal-blue)', color: 'white', borderRadius: '50%', margin: '0 auto 25px' }}>
           <Lock size={30} />
        </div>
        <h2 style={{ color: 'var(--royal-blue)', marginBottom: '10px' }}>دخول المدير</h2>
        <p style={{ opacity: 0.6, marginBottom: '35px' }}>مرحباً بعودتك، مدير الاستقبال</p>

        <form onSubmit={handleLogin} style={{ display: 'grid', gap: '20px' }}>
          <div style={{ position: 'relative' }}>
             <User size={18} style={{ position: 'absolute', right: '15px', top: '50%', transform: 'translateY(-50%)', opacity: 0.4 }} />
             <input 
               type="text" 
               placeholder="اسم المستخدم" 
               value={username}
               onChange={(e) => setUsername(e.target.value)}
               required
               style={{ width: '100%', padding: '15px 45px 15px 15px', borderRadius: '12px', border: '1px solid #e2e8f0', background: '#f8fafc' }}
             />
          </div>
          <div style={{ position: 'relative' }}>
             <Lock size={18} style={{ position: 'absolute', right: '15px', top: '50%', transform: 'translateY(-50%)', opacity: 0.4 }} />
             <input 
               type="password" 
               placeholder="كلمة المرور" 
               value={password}
               onChange={(e) => setPassword(e.target.value)}
               required
               style={{ width: '100%', padding: '15px 45px 15px 15px', borderRadius: '12px', border: '1px solid #e2e8f0', background: '#f8fafc' }}
             />
          </div>
          
          {error && <p style={{ color: '#ef4444', fontSize: '0.9rem', margin: 0 }}>{error}</p>}

          <button 
            type="submit" 
            className="btn-primary" 
            style={{ width: '100%', padding: '15px', fontSize: '1.1rem', marginTop: '10px' }}
          >
            دخول للنظام
          </button>
        </form>
        
        <div style={{ marginTop: '30px', paddingTop: '20px', borderTop: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', gap: '10px', justifyContent: 'center', opacity: 0.5 }}>
           <ShieldCheck size={18} />
           <span style={{ fontSize: '0.85rem' }}>نظام آمن للمديرين فقط</span>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
