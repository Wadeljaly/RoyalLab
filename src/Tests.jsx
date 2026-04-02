import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Microscope, Search, ShoppingBag, Info, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import API_URL from './api';

const Tests = () => {
  const [tests, setTests] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTests = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/tests`);
        setTests(response.data);
      } catch (err) {
        console.log('Using fallback mock data for tests list');
        setTests([
          { _id: '1', name: 'فحص دم شامل (CBC)', price: 2500, category: 'Hematology', description: 'Complete Blood Count' },
          { _id: '2', name: 'وظائف كبد (LFT)', price: 4000, category: 'Biochemistry', description: 'Liver Function Tests' },
          { _id: '3', name: 'وظائف كلى (KFT)', price: 3500, category: 'Biochemistry', description: 'Kidney Function Tests' },
          { _id: '4', name: 'فحص سكري تراكمي (HbA1c)', price: 1800, category: 'Endocrinology', description: 'Average blood sugar over 3 months' },
          { _id: '5', name: 'فحص فيروس B', price: 3000, category: 'Serology', description: 'Hepatitis B Surface Antigen' },
          { _id: '6', name: 'فحص الملاريا', price: 1000, category: 'Parasitology', description: 'Malaria Parasite test' }
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchTests();
  }, []);

  const filteredTests = tests.filter(test => 
    test.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    test.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="tests-page">
      <header className="section-padding" style={{ background: '#f8fafc' }}>
        <div className="container">
          <h1 className="text-gradient" style={{ textAlign: 'center' }}>التحاليل الطبية والأسعار</h1>
           <div className="search-bar container flex-center" style={{ marginTop: '40px', maxWidth: '700px' }}>
             <div className="input-group" style={{ width: '100%', position: 'relative' }}>
                <Search size={22} style={{ position: 'absolute', right: '15px', top: '15px', color: '#94a3b8' }} />
                <input 
                  type="text" 
                  className="input-field" 
                  placeholder="ابحث عن الفحص..." 
                  style={{ paddingRight: '50px' }}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
             </div>
           </div>
        </div>
      </header>

      <section className="section-padding container">
        <div className="tests-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
           {loading ? (
             <div className="flex-center">جاري التحميل...</div>
           ) : filteredTests.length > 0 ? (
             filteredTests.map((test, index) => (
                <motion.div 
                  key={test._id} 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="test-card glass" 
                  style={{ padding: '25px', borderRadius: '18px', background: 'white' }}
                >
                   <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '15px' }}>
                      <span style={{ fontSize: '0.8rem', background: 'rgba(0,136,90,0.1)', color: 'var(--emerald-green)', padding: '4px 12px', borderRadius: '50px' }}>{test.category}</span>
                      <Microscope size={24} color="var(--royal-blue)" opacity={0.5} />
                   </div>
                   <h4 style={{ color: 'var(--royal-blue)', fontSize: '1.2rem', marginBottom: '10px' }}>{test.name}</h4>
                   <p style={{ fontSize: '0.9rem', opacity: 0.6, marginBottom: '20px' }}>{test.description}</p>
                   <div className="flex-center" style={{ justifyContent: 'space-between', borderTop: '1px solid #f1f5f9', paddingTop: '20px' }}>
                      <div className="price" style={{ color: 'var(--emerald-green)', fontWeight: 800, fontSize: '1.3rem' }}>
                         {test.price} <span style={{ fontSize: '0.8rem' }}>ج.س</span>
                      </div>
                      <NavLink to={`/booking?service=Lab&name=${test.name}`} className="btn-primary" style={{ padding: '8px 20px', borderRadius: '10px', fontSize: '0.9rem' }}>حجز الفحص</NavLink>
                   </div>
                </motion.div>
             ))
           ) : (
             <div style={{ textAlign: 'center', gridColumn: '1/ -1', padding: '50px' }}>
               <h3>عذراً.. لا توجد فحوصات مطابقة لنتائج البحث.</h3>
             </div>
           )}
        </div>
      </section>
    </div>
  );
};

export default Tests;
