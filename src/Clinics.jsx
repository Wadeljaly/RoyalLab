import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { UserRound, Clock, Calendar, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import API_URL from './api';

const Clinics = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Attempt to fetch from API, fallback to mock data for demo
    const fetchDoctors = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/doctors`);
        if (response.data && response.data.length > 0) {
          setDoctors(response.data);
        } else {
          throw new Error('Empty database');
        }
      } catch (err) {
        console.log('Using fallback mock data for doctors list');
        setDoctors([
           { _id: '1', name: 'د. سلوى أحمد', specialty: 'اختصاصي نساء وتوليد', hours: 'الأحد - الخميس (8ص - 2م)', phone: '0115566002' },
           { _id: '2', name: 'د. حسن سليمان', specialty: 'استشاري الأطفال', hours: 'السبت - الأربعاء (10ص - 4م)', phone: '0115566002' },
           { _id: '3', name: 'د. الصادق عمر', specialty: 'اختصاصي باطنية', hours: 'طول أيام الأسبوع', phone: '0115566002' },
           { _id: '4', name: 'د. الفاتح عبد الباقي', specialty: 'اختصاصي كبد ومناظير', hours: 'الأحد، الثلاثاء، الخميس (1م - 5م)', phone: '0115566002' }
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchDoctors();
  }, []);

  return (
    <div className="clinics-page">
      <header className="section-padding" style={{ background: '#f8fafc' }}>
        <div className="container">
          <h1 className="text-gradient" style={{ textAlign: 'center' }}>العيادات المتخصصة</h1>
          <p style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto', color: '#64748b' }}>
             نوفر في مختبرات رويال نخبة من أفضل الأطباء والاستشاريين في مجالات متنوعة لراحتكم.
          </p>
        </div>
      </header>

      <section className="section-padding container" style={{ maxWidth: '1000px' }}>
        {loading ? (
          <div className="flex-center">جاري تحميل البيانات...</div>
        ) : (
          <div className="grid-cols-4">
             {doctors.map((doctor, idx) => (
                <DoctorCard key={doctor._id} doctor={doctor} index={idx} />
             ))}
          </div>
        )}
      </section>
    </div>
  );
};

const DoctorCard = ({ doctor, index }) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.9 }} 
    whileInView={{ opacity: 1, scale: 1 }} 
    transition={{ duration: 0.4, delay: index * 0.1 }}
    whileHover={{ y: -5 }}
    className="glass" 
    style={{ borderRadius: '24px', overflow: 'hidden', background: 'white', border: '1px solid #e2e8f0' }}
  >
    <div className="doctor-info" style={{ padding: '20px' }}>
      <div className="specialty" style={{ background: 'rgba(0,136,90,0.1)', color: 'var(--emerald-green)', padding: '4px 12px', borderRadius: '50px', display: 'inline-block', fontSize: '0.8rem', marginBottom: '12px' }}>
         {doctor.specialty}
      </div>
      <h3 style={{ color: 'var(--royal-blue)', fontSize: '1.2rem', marginBottom: '10px' }}>{doctor.name}</h3>
      <div className="working-hours" style={{ display: 'flex', gap: '8px', alignItems: 'start', opacity: 0.7, marginBottom: '20px' }}>
        <Clock size={16} color="var(--royal-blue)" />
        <p style={{ fontSize: '0.85rem' }}>{doctor.hours}</p>
      </div>
      <NavLink to={`/booking?service=Clinic&name=${doctor.name}&drphone=${doctor.phone}`} className="btn-primary" style={{ display: 'block', textAlign: 'center', padding: '10px', fontSize: '0.9rem' }}>حجز موعد</NavLink>
    </div>
  </motion.div>
);

export default Clinics;
