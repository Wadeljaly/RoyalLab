import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Database, Plus, Trash, Settings, LogOut, Users, Activity, Calendar, CheckCircle, Clock, Edit2, X, Save, ClipboardCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import API_URL from './api';

const Dashboard = () => {
  const [isAdmin, setIsAdmin] = useState(true);
  const [doctors, setDoctors] = useState([]);
  const [tests, setTests] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [results, setResults] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [activeTab, setActiveTab] = useState('bookings');
  const [editingDoctor, setEditingDoctor] = useState(null);
  const [editingTest, setEditingTest] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showExpenseModal, setShowExpenseModal] = useState(false);
  const [selectedDoctorForExpense, setSelectedDoctorForExpense] = useState(null);
  const [newItem, setNewItem] = useState({});
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userRole');
    navigate('/login');
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const drResponse = await axios.get(`${API_URL}/api/doctors`);
      const tsResponse = await axios.get(`${API_URL}/api/tests`);
      const bkResponse = await axios.get(`${API_URL}/api/bookings`);
      const rsResponse = await axios.get(`${API_URL}/api/results`);
      const exResponse = await axios.get(`${API_URL}/api/expenses`);
      setDoctors(drResponse.data);
      setTests(tsResponse.data);
      setBookings(bkResponse.data);
      setResults(rsResponse.data || []);
      setExpenses(exResponse.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  const updateBookingStatus = async (id, status) => {
    try {
      await axios.patch(`${API_URL}/api/bookings/${id}`, { status });
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteBooking = async (id) => {
    if (window.confirm('هل أنت متأكد من حذف هذا الحجز؟')) {
      try {
        await axios.delete(`${API_URL}/api/bookings/${id}`);
        fetchData();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const deleteDoctor = async (id) => {
    if (window.confirm('هل أنت متأكد من حذف هذا الطبيب؟')) {
      try {
        await axios.delete(`${API_URL}/api/doctors/${id}`);
        fetchData();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const deleteTest = async (id) => {
    if (window.confirm('هل أنت متأكد من حذف هذا التحليل؟')) {
      try {
        await axios.delete(`${API_URL}/api/tests/${id}`);
        fetchData();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const deleteResult = async (id) => {
    if (window.confirm('هل أنت متأكد من حذف هذه النتيجة؟')) {
      try {
        await axios.delete(`${API_URL}/api/results/${id}`);
        fetchData();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const deleteExpense = async (id) => {
    if (window.confirm('هل أنت متأكد من حذف هذا المنصرف؟')) {
      try {
        await axios.delete(`${API_URL}/api/expenses/${id}`);
        fetchData();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleUpdateDoctor = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${API_URL}/api/doctors/${editingDoctor._id}`, editingDoctor);
      setEditingDoctor(null);
      fetchData();
      alert('تم تحديث بيانات الطبيب بنجاح');
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateTest = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${API_URL}/api/tests/${editingTest._id}`, editingTest);
      setEditingTest(null);
      fetchData();
      alert('تم تحديث بيانات التحليل بنجاح');
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddItem = async (e) => {
    e.preventDefault();
    try {
      let endpoint = '';
      if (activeTab === 'doctors') endpoint = '/api/doctors';
      else if (activeTab === 'tests') endpoint = '/api/tests';
      else if (activeTab === 'results') endpoint = '/api/results';
      else if (activeTab === 'expenses') endpoint = '/api/expenses';
      
      await axios.post(`${API_URL}${endpoint}`, newItem);
      setShowAddModal(false);
      setNewItem({});
      fetchData();
      alert('تمت الإضافة بنجاح');
    } catch (err) {
      console.error(err);
    }
  };

  const openAddModal = () => {
    if (activeTab === 'doctors') {
      setNewItem({ name: '', specialty: '', hours: '', phone: '' });
    } else if (activeTab === 'tests') {
      setNewItem({ name: '', category: '', price: '' });
    } else if (activeTab === 'results') {
      setNewItem({ patientId: '', phone: '', testName: '', pdfUrl: '' });
    } else if (activeTab === 'expenses') {
      setNewItem({ description: '', amount: '', category: 'salaries' });
    }
    setShowAddModal(true);
  };

  const openExpenseModal = (dr) => {
    setSelectedDoctorForExpense(dr);
    setNewItem({ description: `راتب ${dr.name}`, amount: '', category: 'salaries', doctorId: dr._id });
    setShowExpenseModal(true);
  };

  const toggleTab = (tab) => {
    setActiveTab(tab);
    setShowMobileMenu(false);
  };

  return (
    <div className="dashboard-page" style={{ background: '#f1f5f9', minHeight: '100vh', direction: 'rtl', display: 'flex', padding: '20px', gap: '20px' }}>
      
      <AnimatePresence>
        {showMobileMenu && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setShowMobileMenu(false)}
            className="mobile-overlay"
          />
        )}
      </AnimatePresence>

      <aside className={`sidebar glass ${showMobileMenu ? 'active' : ''}`} style={{ display: 'flex' }}>
         <div className="sidebar-header flex-center" style={{ justifyContent: 'space-between', width: '100%' }}>
            <div className="flex-center" style={{ gap: '10px' }}>
               <div style={{ width: '35px', height: '35px', background: 'var(--royal-blue)', color: 'white', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Database size={18} />
               </div>
               <h3 style={{ color: 'var(--royal-blue)', fontSize: '0.9rem', margin: 0 }}>رويال داشبورد</h3>
            </div>
            <button className="mobile-only close-btn" onClick={() => setShowMobileMenu(false)} style={{ background: 'none', border: 'none' }}><X size={20} /></button>
         </div>

         <nav style={{ marginTop: '30px', display: 'grid', gap: '5px' }}>
             <SidebarBtn icon={Calendar} label="الحجوزات" active={activeTab === 'bookings'} onClick={() => toggleTab('bookings')} />
             <SidebarBtn icon={Users} label="الأطباء" active={activeTab === 'doctors'} onClick={() => toggleTab('doctors')} />
             <SidebarBtn icon={Activity} label="التحاليل" active={activeTab === 'tests'} onClick={() => toggleTab('tests')} />
             <SidebarBtn icon={ClipboardCheck} label="نتائج المرضى" active={activeTab === 'results'} onClick={() => toggleTab('results')} />
             <SidebarBtn icon={Plus} label="المنصروفات" active={activeTab === 'expenses'} onClick={() => toggleTab('expenses')} />
             <SidebarBtn icon={Settings} label="الإعدادات" active={activeTab === 'settings'} onClick={() => toggleTab('settings')} />
            <hr style={{ opacity: 0.1, margin: '15px 0' }} />
            <SidebarBtn icon={LogOut} label="خروج" onClick={handleLogout} />
         </nav>
      </aside>

      <main className="dashboard-main">
         <header className="flex-center" style={{ justifyContent: 'space-between', marginBottom: '25px', marginTop: '5px', flexWrap: 'wrap', gap: '15px' }}>
            <div className="flex-center" style={{ gap: '15px' }}>
               <button className="mobile-only menu-toggle" onClick={() => setShowMobileMenu(true)}>
                  <Activity size={20} />
               </button>
               <div style={{ textAlign: 'right' }}>
                  <h2 style={{ margin: 0, color: 'var(--royal-blue)', fontSize: '1.3rem' }}>
                    {activeTab === 'bookings' ? 'إدارة الحجوزات' : activeTab === 'doctors' ? 'إدارة الأطباء' : activeTab === 'tests' ? 'إدارة التحاليل' : activeTab === 'results' ? 'إدارة النتائج' : 'إدارة المنصروفات'}
                  </h2>
               </div>
            </div>
            {activeTab !== 'bookings' && activeTab !== 'settings' && (
              <button onClick={openAddModal} className="btn-primary" style={{ padding: '8px 15px', borderRadius: '10px', fontSize: '0.85rem' }}>
                 <Plus size={16} /> إضافة جديد
              </button>
            )}
         </header>

         <div className="grid-cols-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '30px' }}>
            <StatCard icon={Calendar} title="إجمالي الحجوزات" value={bookings.length} color="linear-gradient(135deg, #0284c7 0%, #0369a1 100%)" />
            <StatCard icon={Users} title="الأطباء" value={doctors.length} color="linear-gradient(135deg, #059669 0%, #047857 100%)" />
            <StatCard icon={Plus} title="المنصروفات" value={expenses.reduce((acc, curr) => acc + (curr.amount || 0), 0).toLocaleString() + ' ج.س'} color="linear-gradient(135deg, #f43f5e 0%, #e11d48 100%)" />
            <StatCard icon={Clock} title="بانتظار التأكيد" value={bookings.filter(b => b.status === 'Pending').length} color="linear-gradient(135deg, #f59e0b 0%, #d97706 100%)" />
         </div>

         <div className="table-container shadow-sm" style={{ overflowX: 'auto', background: 'white', borderRadius: '25px', border: '1px solid #e2e8f0' }}>
            {activeTab === 'bookings' && (
              <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '800px' }}>
                <thead>
                  <tr style={{ background: '#f8fafc', textAlign: 'right', borderBottom: '1px solid #e2e8f0' }}>
                    <th style={{ padding: '15px 20px', fontSize: '0.85rem', color: '#64748b' }}>المريض</th>
                    <th style={{ padding: '15px 20px', fontSize: '0.85rem', color: '#64748b' }}>الهاتف</th>
                    <th style={{ padding: '15px 20px', fontSize: '0.85rem', color: '#64748b' }}>الخدمة</th>
                    <th style={{ padding: '15px 20px', fontSize: '0.85rem', color: '#64748b' }}>التفاصيل</th>
                    <th style={{ padding: '15px 20px', fontSize: '0.85rem', color: '#64748b' }}>الحالة</th>
                    <th style={{ padding: '15px 20px', fontSize: '0.85rem', color: '#64748b' }}>الإجراءات</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map(bk => (
                    <motion.tr initial={{ opacity: 0 }} animate={{ opacity: 1 }} key={bk._id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ padding: '15px 20px', fontWeight: 700, color: 'var(--royal-blue)' }}>{bk.name}</td>
                      <td style={{ padding: '15px 20px', color: '#475569' }}>{bk.phone}</td>
                      <td style={{ padding: '15px 20px' }}>
                        <span style={{ padding: '5px 10px', borderRadius: '8px', fontSize: '0.7rem', fontWeight: 600, background: bk.serviceType === 'Clinic' ? '#e0f2fe' : '#f0fdf4', color: bk.serviceType === 'Clinic' ? '#0369a1' : '#15803d' }}>
                          {bk.serviceType === 'Clinic' ? 'عيادة' : 'مختبر'}
                        </span>
                      </td>
                      <td style={{ padding: '15px 20px', color: '#475569' }}>{bk.serviceName}</td>
                      <td style={{ padding: '15px 20px' }}>
                        <select value={bk.status} onChange={(e) => updateBookingStatus(bk._id, e.target.value)} style={{ padding: '5px 10px', borderRadius: '8px', border: '1px solid #e2e8f0', background: 'white', fontSize: '0.8rem' }}>
                          <option value="Pending">قيد الانتظار</option>
                          <option value="Confirmed">تم التأكيد</option>
                          <option value="Cancelled">ملغي</option>
                        </select>
                      </td>
                      <td style={{ padding: '15px 20px' }}>
                         <button onClick={() => deleteBooking(bk._id)} style={{ color: '#f87171', background: '#fef2f2', border: 'none', padding: '6px', borderRadius: '8px', cursor: 'pointer' }}><Trash size={14} /></button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            )}

            {activeTab === 'doctors' && (
              <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '800px' }}>
                <thead>
                  <tr style={{ background: '#f8fafc', textAlign: 'right', borderBottom: '1px solid #e2e8f0' }}>
                    <th style={{ padding: '15px 20px', fontSize: '0.85rem', color: '#64748b' }}>الطبيب</th>
                    <th style={{ padding: '15px 20px', fontSize: '0.85rem', color: '#64748b' }}>التخصص</th>
                    <th style={{ padding: '15px 20px', fontSize: '0.85rem', color: '#64748b' }}>ساعات العمل</th>
                    <th style={{ padding: '15px 20px', fontSize: '0.85rem', color: '#64748b' }}>المنصروفات</th>
                    <th style={{ padding: '15px 20px', fontSize: '0.85rem', color: '#64748b' }}>الإجراءات</th>
                  </tr>
                </thead>
                <tbody>
                  {doctors.map(dr => (
                    <tr key={dr._id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ padding: '15px 20px', fontWeight: 700, color: 'var(--royal-blue)' }}>{dr.name}</td>
                      <td style={{ padding: '15px 20px', color: '#475569' }}>{dr.specialty}</td>
                      <td style={{ padding: '15px 20px', fontSize: '0.8rem' }}>{dr.hours}</td>
                      <td style={{ padding: '15px 20px' }}>
                        <button onClick={() => openExpenseModal(dr)} style={{ background: '#fef2f2', color: '#e11d48', border: 'none', padding: '5px 12px', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer' }}>
                           {expenses.filter(e => e.doctorId === dr._id).reduce((acc, curr) => acc + curr.amount, 0).toLocaleString()} ج.س
                        </button>
                      </td>
                      <td style={{ padding: '15px 20px', display: 'flex', gap: '8px' }}>
                         <button onClick={() => setEditingDoctor(dr)} title="تعديل" style={{ color: 'var(--emerald-green)', background: 'rgba(5,150,105,0.1)', border: 'none', padding: '6px', borderRadius: '8px', cursor: 'pointer' }}><Edit2 size={14} /></button>
                         <button onClick={() => deleteDoctor(dr._id)} title="حذف" style={{ color: '#f87171', background: '#fef2f2', border: 'none', padding: '6px', borderRadius: '8px', cursor: 'pointer' }}><Trash size={14} /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {activeTab === 'tests' && (
              <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '800px' }}>
                <thead>
                  <tr style={{ background: '#f8fafc', textAlign: 'right', borderBottom: '1px solid #e2e8f0' }}>
                    <th style={{ padding: '15px 20px', fontSize: '0.85rem', color: '#64748b' }}>اسم الفحص</th>
                    <th style={{ padding: '15px 20px', fontSize: '0.85rem', color: '#64748b' }}>التصنيف</th>
                    <th style={{ padding: '15px 20px', fontSize: '0.85rem', color: '#64748b' }}>السعر</th>
                    <th style={{ padding: '15px 20px', fontSize: '0.85rem', color: '#64748b' }}>الإجراءات</th>
                  </tr>
                </thead>
                <tbody>
                  {tests.map(test => (
                    <tr key={test._id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ padding: '15px 20px', fontWeight: 700, color: 'var(--royal-blue)' }}>{test.name}</td>
                      <td style={{ padding: '15px 20px', color: '#475569' }}>{test.category}</td>
                      <td style={{ padding: '15px 20px' }}>{test.price.toLocaleString()} ج.س</td>
                      <td style={{ padding: '15px 20px', display: 'flex', gap: '8px' }}>
                         <button onClick={() => setEditingTest(test)} style={{ color: 'var(--emerald-green)', background: 'rgba(5,150,105,0.1)', border: 'none', padding: '6px', borderRadius: '8px', cursor: 'pointer' }}><Edit2 size={14} /></button>
                         <button onClick={() => deleteTest(test._id)} style={{ color: '#f87171', background: '#fef2f2', border: 'none', padding: '6px', borderRadius: '8px', cursor: 'pointer' }}><Trash size={14} /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {activeTab === 'results' && (
               <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '800px' }}>
                 <thead>
                   <tr style={{ background: '#f8fafc', textAlign: 'right', borderBottom: '1px solid #e2e8f0' }}>
                     <th style={{ padding: '15px 20px', fontSize: '0.85rem', color: '#64748b' }}>كود المريض</th>
                     <th style={{ padding: '15px 20px', fontSize: '0.85rem', color: '#64748b' }}>الهاتف</th>
                     <th style={{ padding: '15px 20px', fontSize: '0.85rem', color: '#64748b' }}>الفحص</th>
                     <th style={{ padding: '15px 20px', fontSize: '0.85rem', color: '#64748b' }}>التاريخ</th>
                     <th style={{ padding: '15px 20px', fontSize: '0.85rem', color: '#64748b' }}>الإجراءات</th>
                   </tr>
                 </thead>
                 <tbody>
                   {results.map(res => (
                     <tr key={res._id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                       <td style={{ padding: '15px 20px' }}>{res.patientId}</td>
                       <td style={{ padding: '15px 20px' }}>{res.phone}</td>
                       <td style={{ padding: '15px 20px', fontWeight: 600 }}>{res.testName}</td>
                       <td style={{ padding: '15px 20px', fontSize: '0.8rem' }}>{new Date(res.uploadDate).toLocaleDateString()}</td>
                       <td style={{ padding: '15px 20px' }}>
                          <button onClick={() => deleteResult(res._id)} style={{ color: '#f87171', background: '#fef2f2', border: 'none', padding: '6px', borderRadius: '8px', cursor: 'pointer' }}><Trash size={14} /></button>
                       </td>
                     </tr>
                   ))}
                 </tbody>
               </table>
            )}

            {activeTab === 'expenses' && (
               <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '800px' }}>
                 <thead>
                   <tr style={{ background: '#f8fafc', textAlign: 'right', borderBottom: '1px solid #e2e8f0' }}>
                     <th style={{ padding: '15px 20px', fontSize: '0.85rem', color: '#64748b' }}>الوصف</th>
                     <th style={{ padding: '15px 20px', fontSize: '0.85rem', color: '#64748b' }}>المبلغ</th>
                     <th style={{ padding: '15px 20px', fontSize: '0.85rem', color: '#64748b' }}>التصنيف</th>
                     <th style={{ padding: '15px 20px', fontSize: '0.85rem', color: '#64748b' }}>الارتباط</th>
                     <th style={{ padding: '15px 20px', fontSize: '0.85rem', color: '#64748b' }}>التاريخ</th>
                     <th style={{ padding: '15px 20px', fontSize: '0.85rem', color: '#64748b' }}>الإجراءات</th>
                   </tr>
                 </thead>
                 <tbody>
                   {expenses.map(exp => (
                     <tr key={exp._id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                       <td style={{ padding: '15px 20px' }}>{exp.description}</td>
                       <td style={{ padding: '15px 20px', fontWeight: 700, color: '#e11d48' }}>{exp.amount.toLocaleString()} ج.س</td>
                       <td style={{ padding: '15px 20px' }}>
                          <span style={{ padding: '4px 8px', borderRadius: '6px', fontSize: '0.7rem', background: '#fef2f2', color: '#e11d48' }}>{exp.category}</span>
                       </td>
                       <td style={{ padding: '15px 20px', fontSize: '0.85rem' }}>{doctors.find(d => d._id === exp.doctorId)?.name || 'عام'}</td>
                       <td style={{ padding: '15px 20px', fontSize: '0.75rem' }}>{new Date(exp.date).toLocaleDateString()}</td>
                       <td style={{ padding: '15px 20px' }}>
                          <button onClick={() => deleteExpense(exp._id)} style={{ color: '#f87171', background: '#fef2f2', border: 'none', padding: '6px', borderRadius: '8px', cursor: 'pointer' }}><Trash size={14} /></button>
                       </td>
                     </tr>
                   ))}
                 </tbody>
               </table>
            )}
         </div>
      </main>

      <AnimatePresence>
        {editingDoctor && (
          <Modal title="تعديل بيانات الطبيب" onClose={() => setEditingDoctor(null)}>
              <form onSubmit={handleUpdateDoctor} style={{ display: 'grid', gap: '15px' }}>
                 <Input label="اسم الطبيب" value={editingDoctor.name} onChange={(val) => setEditingDoctor({...editingDoctor, name: val})} />
                 <Input label="التخصص" value={editingDoctor.specialty} onChange={(val) => setEditingDoctor({...editingDoctor, specialty: val})} />
                 <Input label="ساعات العمل" value={editingDoctor.hours} onChange={(val) => setEditingDoctor({...editingDoctor, hours: val})} />
                 <Input label="رقم الهاتف" value={editingDoctor.phone || ''} onChange={(val) => setEditingDoctor({...editingDoctor, phone: val})} />
                 <button type="submit" className="btn-primary" style={{ width: '100%' }}>حفظ التعديلات</button>
              </form>
          </Modal>
        )}
        {editingTest && (
          <Modal title="تعديل بيانات الفحص" onClose={() => setEditingTest(null)}>
              <form onSubmit={handleUpdateTest} style={{ display: 'grid', gap: '15px' }}>
                 <Input label="اسم الفحص" value={editingTest.name} onChange={(val) => setEditingTest({...editingTest, name: val})} />
                 <Input label="التصنيف" value={editingTest.category} onChange={(val) => setEditingTest({...editingTest, category: val})} />
                 <Input label="السعر" value={editingTest.price} onChange={(val) => setEditingTest({...editingTest, price: val})} />
                 <button type="submit" className="btn-primary" style={{ width: '100%' }}>حفظ التعديلات</button>
              </form>
          </Modal>
        )}
        {showAddModal && (
          <Modal title={activeTab === 'doctors' ? 'إضافة طبيب' : activeTab === 'tests' ? 'إضافة فحص' : activeTab === 'results' ? 'ربط نتيجة' : 'إضافة منصرف'} onClose={() => setShowAddModal(false)}>
              <form onSubmit={handleAddItem} style={{ display: 'grid', gap: '15px' }}>
                 {activeTab === 'doctors' ? (
                   <>
                     <Input label="الاسم" value={newItem.name} onChange={(val) => setNewItem({...newItem, name: val})} />
                     <Input label="التخصص" value={newItem.specialty} onChange={(val) => setNewItem({...newItem, specialty: val})} />
                     <Input label="الساعات" value={newItem.hours} onChange={(val) => setNewItem({...newItem, hours: val})} />
                     <Input label="الهاتف" value={newItem.phone} onChange={(val) => setNewItem({...newItem, phone: val})} />
                   </>
                 ) : activeTab === 'tests' ? (
                   <>
                     <Input label="الفحص" value={newItem.name} onChange={(val) => setNewItem({...newItem, name: val})} />
                     <Input label="القسم" value={newItem.category} onChange={(val) => setNewItem({...newItem, category: val})} />
                     <Input label="السعر" value={newItem.price} onChange={(val) => setNewItem({...newItem, price: val})} />
                   </>
                 ) : activeTab === 'results' ? (
                     <>
                       <Input label="رقم المريض" value={newItem.patientId} onChange={(val) => setNewItem({...newItem, patientId: val})} />
                       <Input label="الهاتف" value={newItem.phone} onChange={(val) => setNewItem({...newItem, phone: val})} />
                       <Input label="الفحص" value={newItem.testName} onChange={(val) => setNewItem({...newItem, testName: val})} />
                       <Input label="الرابط" value={newItem.pdfUrl} onChange={(val) => setNewItem({...newItem, pdfUrl: val})} />
                     </>
                 ) : (
                    <>
                      <Input label="الوصف" value={newItem.description} onChange={(val) => setNewItem({...newItem, description: val})} />
                      <Input label="المبلغ" value={newItem.amount} onChange={(val) => setNewItem({...newItem, amount: val})} />
                      <select className="input-field" value={newItem.category || 'other'} style={{ width: '100%' }} onChange={(e) => setNewItem({...newItem, category: e.target.value})}>
                         <option value="salaries">رواتب</option>
                         <option value="rent">إيجارات</option>
                         <option value="utilities">ماء وكهرباء</option>
                         <option value="supplies">مستلزمات</option>
                         <option value="other">أخرى</option>
                      </select>
                    </>
                 )}
                 <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '10px' }}>حفظ البيانات</button>
              </form>
          </Modal>
        )}

        {showExpenseModal && selectedDoctorForExpense && (
          <Modal title={`إضافة منصرف لـ: ${selectedDoctorForExpense.name}`} onClose={() => setShowExpenseModal(false)}>
              <form onSubmit={async (e) => {
                e.preventDefault();
                try {
                  await axios.post(`${API_URL}/api/expenses`, newItem);
                  setShowExpenseModal(false);
                  fetchData();
                  alert('تمت إضافة المنصرف بنجاح');
                } catch(err) { console.error(err); }
              }} style={{ display: 'grid', gap: '15px' }}>
                 <Input label="الوصف" value={newItem.description} onChange={(val) => setNewItem({...newItem, description: val})} />
                 <Input label="المبلغ" value={newItem.amount} onChange={(val) => setNewItem({...newItem, amount: val})} />
                 <select className="input-field" value={newItem.category} style={{ width: '100%' }} onChange={(e) => setNewItem({...newItem, category: e.target.value})}>
                    <option value="salaries">راتب</option>
                    <option value="bonus">مكافأة</option>
                    <option value="supplies">مستلزمات عيادة</option>
                 </select>
                 <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '10px' }}>إضافة المنصرف</button>
              </form>
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
};

const StatCard = ({ icon: Icon, title, value, color }) => (
  <motion.div 
    whileHover={{ scale: 1.03 }} 
    className="stat-card"
    style={{ 
      background: color, borderRadius: '18px', color: 'white', 
      display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden',
      boxShadow: '0 8px 16px -4px rgba(0,0,0,0.1)'
    }}
  >
     <div style={{ background: 'rgba(255,255,255,0.15)', padding: '10px', borderRadius: '12px', display: 'flex' }}>
        <Icon size={22} />
     </div>
     <div style={{ marginRight: '12px' }}>
        <p style={{ margin: 0, fontSize: '0.75rem', opacity: 0.85, fontWeight: 500 }}>{title}</p>
        <h3 style={{ margin: '2px 0 0', fontSize: '1.4rem', fontWeight: 700 }}>{value}</h3>
     </div>
     <div style={{ position: 'absolute', right: '-10px', top: '-10px', width: '50px', height: '50px', background: 'rgba(255,255,255,0.05)', borderRadius: '50%' }}></div>
  </motion.div>
);

const Modal = ({ title, children, onClose }) => (
  <div className="modal-overlay flex-center" style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 3000, padding: '20px', backdropFilter: 'blur(5px)' }}>
    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="glass" style={{ width: '100%', maxWidth: '420px', padding: '30px', borderRadius: '25px', background: 'white' }}>
      <div className="flex-center" style={{ justifyContent: 'space-between', marginBottom: '20px' }}>
         <h3 style={{ margin: 0 }}>{title}</h3>
         <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X /></button>
      </div>
      {children}
    </motion.div>
  </div>
);

const Input = ({ label, value, onChange }) => (
  <div className="input-group">
    <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.9rem', fontWeight: 600 }}>{label}</label>
    <input type="text" className="input-field" value={value || ''} onChange={(e) => onChange(e.target.value)} required />
  </div>
);

const SidebarBtn = ({ icon: Icon, label, active, onClick }) => (
  <button onClick={onClick} style={{ display: 'flex', gap: '12px', alignItems: 'center', padding: '12px 15px', borderRadius: '12px', background: active ? 'rgba(0,136,90,0.1)' : 'transparent', color: active ? 'var(--emerald-green)' : '#64748b', border: 'none', cursor: 'pointer', textAlign: 'right' }}>
     <Icon size={18} />
     <span style={{ fontWeight: active ? 700 : 500 }}>{label}</span>
  </button>
);

export default Dashboard;
