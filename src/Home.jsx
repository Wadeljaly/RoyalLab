import React from 'react';
import { NavLink } from 'react-router-dom';
import { Microscope, ClipboardCheck, Phone, Info, Stethoscope, Clock, ShieldCheck, Activity } from 'lucide-react';
import { motion } from 'framer-motion';

const Home = () => {
  return (
    <div className="home-page">

      {/* === HERO SECTION === */}
      <section style={{ position: 'relative', minHeight: '92vh', overflow: 'hidden', display: 'flex', alignItems: 'center' }}>
        {/* Real lab background image */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'url(/assets/royal_lab.png)',
          backgroundSize: 'cover', backgroundPosition: 'center',
          filter: 'brightness(0.3)'
        }} />
        {/* Gradient overlay */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(0,74,153,0.75) 0%, rgba(0,136,90,0.65) 100%)' }} />

        <div className="container" style={{ position: 'relative', zIndex: 2, display: 'flex', alignItems: 'center', gap: '40px', flexWrap: 'wrap', paddingTop: '80px', paddingBottom: '80px' }}>
          {/* Left: Text Content */}
          <div className="hero-content" style={{ flex: '1', minWidth: '320px', color: 'white' }}>
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              style={{ display: 'inline-block', background: 'rgba(0,234,211,0.15)', border: '1px solid rgba(0,234,211,0.3)', padding: '6px 18px', borderRadius: '50px', fontSize: '0.85rem', color: '#00ead3', marginBottom: '20px', fontWeight: 600 }}
            >
              ✨ مختبرات رويال الطبية — عطبرة، السودان
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              style={{ fontSize: '3.2rem', fontWeight: 900, lineHeight: 1.2, marginBottom: '25px' }}
            >
              صحتك أمانة..
              <br />
              <span style={{ color: '#00ead3' }}>بوابتك للتحاليل</span>
              <br />
              <span style={{ fontSize: '2rem' }}>والخدمات الطبية الحديثة.</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              style={{ fontSize: '1.1rem', opacity: 0.9, marginBottom: '40px', lineHeight: 1.9 }}
            >
              في مختبرات رويال الطبية، نقدم لك أدق النتائج وأفضل الخدمات الطبية بلمسة تكنولوجية حديثة. فريقنا من الخبراء جاهز دائماً لتقديم الرعاية الاستثنائية.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}
            >
              <NavLink to="/booking" className="btn-primary" style={{ padding: '15px 40px', fontSize: '1.05rem' }}>حجز فحص الآن</NavLink>
              <NavLink to="/results" style={{ padding: '15px 40px', fontSize: '1.05rem', color: 'white', border: '2px solid rgba(255,255,255,0.6)', borderRadius: '50px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', fontWeight: 600, backdropFilter: 'blur(10px)' }}>عرض النتائج</NavLink>
            </motion.div>
            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
              style={{ display: 'flex', gap: '35px', marginTop: '50px', flexWrap: 'wrap' }}
            >
              {[{ num: '+10', label: 'سنوات خبرة' }, { num: '22K', label: 'متابع على فيسبوك' }, { num: '+50', label: 'نوع تحليل' }].map((s, i) => (
                <div key={i} style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '2rem', fontWeight: 900, color: '#00ead3' }}>{s.num}</div>
                  <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>{s.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: Floating image cards */}
          <div className="hide-mobile" style={{ flex: '1', minWidth: '350px', position: 'relative', height: '500px' }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}
              style={{ position: 'absolute', top: 0, right: 0, width: '290px', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 25px 50px rgba(0,0,0,0.4)' }}
            >
              <img src="/assets/royal_team.png" alt="فريق رويال الطبي" style={{ width: '100%', height: '220px', objectFit: 'cover' }} />
              <div style={{ background: 'white', padding: '15px' }}>
                <p style={{ margin: 0, fontWeight: 700, color: '#004a99', fontSize: '0.9rem' }}>فريق متخصص ومتكامل</p>
                <p style={{ margin: '5px 0 0', fontSize: '0.75rem', color: '#64748b' }}>نخبة من كبار الأطباء والاستشاريين</p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }}
              style={{ position: 'absolute', bottom: 30, left: 0, width: '260px', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 25px 50px rgba(0,0,0,0.4)' }}
            >
              <img src="/assets/FB_IMG_1774945576730.jpg" alt="خدمة 24 ساعة" style={{ width: '100%', height: '210px', objectFit: 'cover', objectPosition: 'top' }} />
              <div style={{ background: 'var(--emerald-green)', padding: '12px 15px' }}>
                <p style={{ margin: 0, fontWeight: 700, color: 'white', fontSize: '0.9rem' }}>⏰ خدمة متوفرة 24 ساعة</p>
              </div>
            </motion.div>
            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1, type: 'spring' }}
              style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: 'white', borderRadius: '50%', width: '80px', height: '80px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', boxShadow: '0 10px 30px rgba(0,0,0,0.3)' }}
            >
              <img src="/assets/FB_IMG_1774867714268.jpg" alt="رويال" style={{ width: '72px', height: '72px', borderRadius: '50%', objectFit: 'cover' }} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* === SERVICES SECTION === */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="section-header" style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 className="text-gradient">خدماتنا المتميزة</h2>
            <p style={{ maxWidth: '700px', margin: '0 auto', color: '#64748b' }}>نقدم مجموعة متكاملة من الخدمات الطبية التي تلبي احتياجاتك في مكان واحد.</p>
          </div>
          <div className="grid-cols-3">
             {[
               { icon: Microscope, title: 'تحاليل مخبرية دقيقة', desc: 'أحدث الأجهزة لضمان الدقة في جميع أنواع الفحوصات الطبية والمخبرية.', path: '/tests' },
               { icon: Stethoscope, title: 'العيادات المتخصصة', desc: 'نخبة من الأطباء في مختلف التخصصات لتقديم الرعاية والمتابعة الدورية.', path: '/clinics' },
               { icon: Clock, title: 'مواعيد العمل', desc: 'يومياً: 7:00 صباحاً - 9:00 مساءً', path: '/' },
               { icon: ShieldCheck, title: 'خصوصية وأمان', desc: 'نظام رقمي آمن تماماً لحفظ وعرض نتائج الفحوصات والحفاظ على سرية البيانات.', path: '/results' },
               { icon: Activity, title: 'متابعة دورية', desc: 'برامج للفحص الدوري الشامل لضمان الاطمئنان الدائم على صحتك.', path: '/booking' },
               { icon: Info, title: 'استشارات طبية', desc: 'خدمة استشارية قبل وبعد التحاليل لفهم النتائج والخطوات القادمة.', path: '/contact' }
             ].map((service, idx) => (
                <ServiceBox key={idx} {...service} index={idx} />
             ))}
          </div>
        </div>
      </section>

      {/* === WHY CHOOSE US - with real lab image === */}
      <section className="section-padding" style={{ background: '#f1f5f9' }}>
        <div className="container">
          <div className="section-header" style={{ textAlign: 'center', marginBottom: '50px' }}>
            <h2 className="text-gradient">لماذا تختار مختبرات رويال؟</h2>
            <p style={{ maxWidth: '600px', margin: '10px auto 0', color: '#64748b' }}>جودة عالية، خبرة واسعة، وتعاقدات رسمية مع كبرى المؤسسات</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', alignItems: 'center' }}>
            <div style={{ display: 'grid', gap: '20px' }}>
              {[
                { title: 'دقة لا تضاهى', desc: 'نستخدم معايير الجودة العالمية في كل فحص نجريه.', icon: '🧪' },
                { title: 'سرعة في تسليم النتائج', desc: 'نتائجك عبر الموقع والواتساب بأسرع وقت ممكن.', icon: '⚡' },
                { title: 'خدمات متعاقدة', desc: 'متعاقدون مع ICRC، سوداتل، البركة للتأمين وغيرها.', icon: '🤝' },
              ].map((item, i) => (
                <motion.div key={i} whileHover={{ x: -5 }} style={{ display: 'flex', gap: '20px', alignItems: 'flex-start', background: 'white', padding: '25px', borderRadius: '18px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0' }}>
                  <span style={{ fontSize: '2rem' }}>{item.icon}</span>
                  <div>
                    <h4 style={{ color: 'var(--royal-blue)', marginBottom: '8px' }}>{item.title}</h4>
                    <p style={{ opacity: 0.7, fontSize: '0.9rem', margin: 0 }}>{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            <div style={{ position: 'relative' }}>
              <img src="/assets/royal_lab.png" alt="مختبر رويال الطبي" style={{ width: '100%', borderRadius: '25px', boxShadow: '0 20px 40px rgba(0,0,0,0.15)' }} />
              <div style={{ position: 'absolute', bottom: '20px', right: '20px', background: 'white', borderRadius: '15px', padding: '15px 20px', boxShadow: '0 8px 20px rgba(0,0,0,0.15)', textAlign: 'right' }}>
                <p style={{ margin: 0, fontWeight: 800, fontSize: '1.4rem', color: 'var(--royal-blue)' }}>+50</p>
                <p style={{ margin: 0, fontSize: '0.8rem', color: '#64748b' }}>نوع تحليل مخبري</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* === DOCTORS BOARD - from real clinic sign === */}
      <section className="section-padding" style={{ background: 'white' }}>
        <div className="container">
          <div className="section-header" style={{ textAlign: 'center', marginBottom: '30px' }}>
            <h2 className="text-gradient">كوكبة الأطباء</h2>
            <p style={{ color: '#64748b' }}>نخبة من الأطباء والاستشاريين المتخصصين في مجموعة رويال</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px', alignItems: 'center' }}>
            <motion.div
              whileHover={{ scale: 1.02 }}
              style={{ borderRadius: '25px', overflow: 'hidden', boxShadow: '0 15px 35px rgba(0,0,0,0.1)', border: '1px solid #e2e8f0' }}
            >
              <img src="/assets/IMG-20260330-WA0010.jpg" alt="لوحة الأطباء" style={{ width: '100%', height: '450px', objectFit: 'cover', objectPosition: 'top' }} />
            </motion.div>
            <div style={{ display: 'grid', gap: '12px' }}>
              {[
                { name: 'د. سلوى أحمد', spec: 'اختصاصي نساء وتوليد' },
                { name: 'د. حسن سليمان', spec: 'استشاري الأطفال' },
                { name: 'د. الصادق عمر', spec: 'اختصاصي باطنية' },
                { name: 'د. اسمهان مجذوب', spec: 'اختصاصية الباطنية والمخ والأعصاب' },
                { name: 'د. سلمى بشير', spec: 'استشاري الباطنية والقلب' },
                { name: 'د. الفاتح عبد الباقي', spec: 'اختصاصي كبد ومناظير' },
                { name: 'د. سهير الفاضل', spec: 'استشاري الأمراض الجلدية' },
                { name: 'د. مظفر علي دبورة', spec: 'اختصاصي جراحة المسالك البولية' },
              ].map((dr, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '14px 18px', background: i % 2 === 0 ? '#f8fafc' : 'white', borderRadius: '12px', border: '1px solid #e2e8f0' }}
                >
                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--royal-blue), var(--emerald-green))', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: '0.9rem', flexShrink: 0 }}>
                    {dr.name.charAt(3)}
                  </div>
                  <div>
                    <p style={{ margin: 0, fontWeight: 700, color: 'var(--royal-blue)', fontSize: '0.95rem' }}>{dr.name}</p>
                    <p style={{ margin: 0, fontSize: '0.78rem', color: '#64748b' }}>{dr.spec}</p>
                  </div>
                </motion.div>
              ))}
              <NavLink to="/clinics" className="btn-primary" style={{ textAlign: 'center', padding: '12px', marginTop: '8px' }}>حجز موعد مع الأطباء →</NavLink>
            </div>
          </div>
        </div>
      </section>

      {/* === AL-MOTAMEN HOSPITAL SECTION === */}
      <section className="section-padding" style={{ background: '#f1f5f9' }}>
        <div className="container">
          <div className="flex-center" style={{ gap: '60px', flexWrap: 'wrap-reverse' }}>
            <div className="side-content" style={{ flex: '1', minWidth: '350px' }}>
              <img src="/assets/almoataman_logo.png" alt="Al-Moataman Logo" style={{ height: '80px', marginBottom: '20px', borderRadius: '12px' }} />
              <h2 style={{ marginBottom: '20px' }}>مستشفى <span className="text-gradient">المؤتمن التخصصي</span></h2>
              <p style={{ fontSize: '1.1rem', lineHeight: 1.8, color: '#475569', marginBottom: '30px' }}>
                نفخر بشراكتنا مع مستشفى المؤتمن التخصصي، حيث تتوفر أعلى مستويات الرعاية الطبية والجراحية. المستشفى مجهز بأحدث وحدات العناية المكثفة وغرف العمليات المتطورة.
              </p>
              <div style={{ display: 'grid', gap: '12px', marginBottom: '35px' }}>
                {['رعاية طوارئ 24/7', 'نخبة من كبار الأطباء والاستشاريين', 'غرف وتجهيزات طبية فندقية', 'قسم الموجات الصوتية والأشعة'].map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--royal-blue)', fontWeight: 600 }}>
                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'var(--emerald-green)', flexShrink: 0 }}></div>
                    {item}
                  </div>
                ))}
              </div>
              <NavLink to="/al-moataman" className="btn-primary" style={{ padding: '15px 40px' }}>اكتشف خدمات المستشفى</NavLink>
            </div>
            <div className="side-image" style={{ flex: '1', minWidth: '350px' }}>
               <motion.div
                 whileHover={{ scale: 1.02 }}
                 transition={{ duration: 0.3 }}
                 style={{ position: 'relative', borderRadius: '30px', overflow: 'hidden', boxShadow: '0 20px 50px rgba(0,0,0,0.2)' }}
               >
                 <img src="/assets/royal_hospital.png" alt="مستشفى المؤتمن" style={{ width: '100%', height: '400px', objectFit: 'cover', display: 'block' }} />
                 <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,74,153,0.5), transparent)' }}></div>
                 <div style={{ position: 'absolute', bottom: '20px', right: '20px', left: '20px', background: 'rgba(255,255,255,0.95)', borderRadius: '15px', padding: '15px', backdropFilter: 'blur(10px)' }}>
                   <p style={{ margin: 0, fontWeight: 700, color: 'var(--royal-blue)', fontSize: '0.95rem' }}>🏥 مستشفى المؤتمن التخصصي</p>
                   <p style={{ margin: '4px 0 0', fontSize: '0.8rem', color: '#64748b' }}>عطبرة • شارع الدكاترة، جنوب المسجد الكبير</p>
                 </div>
               </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* === PARTNERS SECTION === */}
      <section className="section-padding" style={{ background: 'white' }}>
        <div className="container">
           <h2 style={{ textAlign: 'center', marginBottom: '12px' }}>شركاء <span className="text-gradient">النجاح والتعاقدات</span></h2>
           <p style={{ textAlign: 'center', color: '#64748b', marginBottom: '40px' }}>نفخر بتعاقداتنا مع كبرى المؤسسات وشركات التأمين</p>
           <motion.div
             whileHover={{ scale: 1.01 }}
             style={{ borderRadius: '25px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
           >
             <img src="/assets/FB_IMG_1774944827780.jpg" alt="تعاقدات مجموعة رويال الطبية" style={{ width: '100%', height: 'auto', display: 'block' }} />
           </motion.div>
        </div>
      </section>

      {/* === GROUP BANNER === */}
      <section className="section-padding" style={{ background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)' }}>
        <div className="container">
          <motion.div
            whileHover={{ scale: 1.01 }}
            style={{ borderRadius: '25px', overflow: 'hidden', boxShadow: '0 20px 50px rgba(0,0,0,0.4)' }}
          >
            <img src="/assets/FB_IMG_1774945590902.jpg" alt="مجموعة رويال الطبية" style={{ width: '100%', height: 'auto', display: 'block' }} />
          </motion.div>
        </div>
      </section>

    </div>
  );
};

const ServiceBox = ({ icon: Icon, title, desc, path, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    whileHover={{ y: -10 }}
    className="glass"
    style={{ padding: '40px', borderRadius: '24px', border: '1px solid #e2e8f0', background: 'white' }}
  >
    <div className="flex-center" style={{ width: '60px', height: '60px', background: 'rgba(0,136,90,0.1)', color: 'var(--emerald-green)', borderRadius: '18px', marginBottom: '25px', justifyContent: 'center' }}>
      <Icon size={32} strokeWidth={2} />
    </div>
    <h3 style={{ fontSize: '1.4rem', color: 'var(--royal-blue)', marginBottom: '15px' }}>{title}</h3>
    <p style={{ opacity: 0.7, lineHeight: '1.6', marginBottom: '25px' }}>{desc}</p>
    <NavLink to={path} className="flex-center" style={{ justifyContent: 'start', gap: '10px', color: 'var(--emerald-green)', fontWeight: 700 }}>
       استكشاف المزيد
       <span style={{ fontSize: '1.4rem' }}>←</span>
    </NavLink>
  </motion.div>
);

export default Home;
