import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { Send, Smartphone, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import API_URL from './api';

const Booking = () => {
  const [params] = useSearchParams();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    serviceType: params.get('service') || 'Lab',
    serviceName: params.get('name') || ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [doctors, setDoctors] = useState([]);
  const [tests, setTests] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const drRes = await axios.get(`${API_URL}/api/doctors`);
        const tsRes = await axios.get(`${API_URL}/api/tests`);
        setDoctors(drRes.data);
        setTests(tsRes.data);
      } catch (err) {
        console.error('Error fetching services:', err);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.serviceName) {
      alert('يرجى اختيار الطبيب أو الفحص المطلوب.');
      return;
    }
    setLoading(true);

    try {
      await axios.post(`${API_URL}/api/bookings`, formData);
      setSuccess(true);
      
      const message = `مرحبا، أريد حجز موعد لـ: 
      \nالاسم: ${formData.name}
      \nرقم الهاتف: ${formData.phone}
      \nنوع الخدمة: ${formData.serviceType === 'Lab' ? 'فحص مخبري' : 'عيادة'}
      \nالمطلوب: ${formData.serviceName}`;
      
      const drPhone = params.get('drphone');
      const targetPhone = formData.serviceType === 'Lab' ? "249115566002" : (drPhone || "249115566002");
      const whatsappUrl = `https://wa.me/${targetPhone}?text=${encodeURIComponent(message)}`;
      
      setTimeout(() => {
        window.open(whatsappUrl, '_blank');
      }, 1500);

    } catch (err) {
      console.error(err);
      alert('حدث خطأ أثناء الحجز، يرجى المحاولة مرة أخرى.');
    } finally {
      setLoading(false);
    }
  };

  const handleServiceTypeChange = (val) => {
    setFormData({ ...formData, serviceType: val, serviceName: '' });
  };

  return (
    <div className="booking-page section-padding" style={{ background: '#f8fafc', minHeight: '80vh' }}>
      <div className="container" style={{ maxWidth: '700px' }}>
        <header style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 className="text-gradient">حجز موعد</h1>
           <p style={{ color: '#64748b' }}>اختر الخدمة المطلوبة وسنقوم بتنسيق موعدك فوراً.</p>
        </header>

        {success ? (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="glass" style={{ padding: '50px', borderRadius: '30px', textAlign: 'center', background: 'white' }}>
             <div className="flex-center" style={{ width: '70px', height: '70px', background: 'var(--emerald-green)', color: 'white', borderRadius: '50%', margin: '0 auto 20px', justifyContent: 'center' }}>
                <CheckCircle size={40} />
             </div>
             <h2 style={{ color: 'var(--royal-blue)', marginBottom: '10px' }}>شكراً لك!</h2>
             <p style={{ opacity: 0.7, marginBottom: '30px' }}>تم إرسال طلبك، جاري توجيهك للواتساب...</p>
             <button className="btn-primary" onClick={() => setSuccess(false)}>حجز آخر</button>
          </motion.div>
        ) : (
          <motion.form initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} onSubmit={handleSubmit} className="glass" style={{ padding: '40px', borderRadius: '25px', background: 'white', border: '1px solid #e2e8f0' }}>
            <div className="input-group">
               <label style={{ display: 'block', marginBottom: '8px', color: 'var(--royal-blue)', fontWeight: 600 }}>الاسم الكامل</label>
               <input type="text" required className="input-field" placeholder="الاسم الثلاثي" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
            </div>

            <div className="input-group">
               <label style={{ display: 'block', marginBottom: '8px', color: 'var(--royal-blue)', fontWeight: 600 }}>رقم الهاتف (واتساب)</label>
               <div style={{ position: 'relative' }}>
                 <Smartphone size={16} style={{ position: 'absolute', right: '15px', top: '15px', color: '#94a3b8' }} />
                 <input type="tel" required className="input-field" placeholder="09xxxxxxx" style={{ paddingRight: '40px' }} value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
               </div>
            </div>

            <div className="grid-cols-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
               <div className="input-group">
                 <label style={{ display: 'block', marginBottom: '8px', color: 'var(--royal-blue)', fontWeight: 600 }}>نوع الخدمة</label>
                 <select className="input-field" value={formData.serviceType} onChange={(e) => handleServiceTypeChange(e.target.value)}>
                    <option value="Lab">فحص مخبري</option>
                    <option value="Clinic">عيادة طبيب</option>
                 </select>
               </div>
               <div className="input-group">
                 <label style={{ display: 'block', marginBottom: '8px', color: 'var(--royal-blue)', fontWeight: 600 }}>{formData.serviceType === 'Lab' ? 'اختر الفحص' : 'اختر الطبيب'}</label>
                 <select className="input-field" required value={formData.serviceName} onChange={(e) => setFormData({...formData, serviceName: e.target.value})}>
                    <option value="">-- اختر من القائمة --</option>
                    {formData.serviceType === 'Lab' ? (
                       tests.map(t => <option key={t._id} value={t.name}>{t.name}</option>)
                    ) : (
                       doctors.map(d => <option key={d._id} value={d.name}>{d.name} ({d.specialty})</option>)
                    )}
                 </select>
               </div>
            </div>

            <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '25px', display: 'flex', justifyContent: 'center', gap: '10px' }} disabled={loading}>
                 {loading ? 'جاري الإرسال...' : <><Send size={18} /> إتمام الحجز عبر الواتساب</>}
            </button>
          </motion.form>
        )}
      </div>
    </div>
  );
};

export default Booking;
