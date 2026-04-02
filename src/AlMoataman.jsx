import React from 'react';
import { motion } from 'framer-motion';
import { Building2, MapPin, Phone, Clock, ShieldCheck, Activity, Users, Award } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const AlMoataman = () => {
  return (
    <div className="hospital-page">
      {/* Hero Section */}
      <section className="hospital-hero section-padding" style={{ 
        background: 'linear-gradient(rgba(0, 74, 153, 0.85), rgba(0, 136, 90, 0.85)), url("/assets/FB_IMG_1774944827780.jpg")', 
        backgroundSize: 'cover', 
        backgroundPosition: 'center',
        color: 'white', 
        position: 'relative', 
        minHeight: '60vh',
        display: 'flex',
        alignItems: 'center'
      }}>
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8 }}
            style={{ maxWidth: '800px', textAlign: 'center', margin: '0 auto' }}
          >
            <div className="flex-center" style={{ marginBottom: '20px', justifyContent: 'center' }}>
               <img src="/assets/almoataman_logo.png" alt="Al-Moataman Logo" style={{ height: '120px', borderRadius: '20px', background: 'white', padding: '10px' }} />
            </div>
            <h1 style={{ fontSize: '3.5rem', fontWeight: 900, marginBottom: '20px' }}>مستشفى المؤتمن التخصصي</h1>
            <p style={{ fontSize: '1.4rem', opacity: 0.9, lineHeight: 1.8, marginBottom: '30px' }}>
              صرح طبي متكامل يقدم أرقى الخدمات الصحية بأحدث التقنيات العالمية وبإشراف نخبة من كبار الاستشاريين.
            </p>
            <div className="flex-center" style={{ gap: '20px', justifyContent: 'center' }}>
               <a href="https://wa.me/249117716776?text=مرحباً مستشفى المؤتمن، أود حجز موعد عبر موقعكم الإلكتروني" target="_blank" className="btn-primary" style={{ padding: '15px 40px' }}>حجز عبر واتساب</a>
               <a href="tel:0117716776" className="btn-outline" style={{ padding: '15px 40px', color: 'white', borderColor: 'white' }}>اتصل الآن للحجز</a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section-padding bg-white">
        <div className="container">
          <div className="grid-cols-2" style={{ alignItems: 'center', gap: '60px' }}>
            <motion.div 
               initial={{ opacity: 0, x: 50 }} 
               whileInView={{ opacity: 1, x: 0 }} 
               transition={{ duration: 0.6 }}
            >
              <h2 className="text-gradient" style={{ marginBottom: '25px' }}>رؤيتنا ورسالتنا</h2>
              <p style={{ fontSize: '1.1rem', lineHeight: 2, color: '#475569', marginBottom: '30px' }}>
                تأسست مستشفى المؤتمن التخصصي لتكون منارة للطب المتميز في المنطقة، حيث نجمع بين الخبرة البشرية العريقة والتقنيات الطبية المتطورة. نحن نؤمن بأن المريض هو محور اهتمامنا، ونسعى جاهدين لتقديم تجربة علاجية تتسم بالدقة، الأمان، والراحة النفسية.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                 <div className="stat-card" style={{ padding: '20px', background: '#f8fafc', borderRadius: '15px', textAlign: 'center' }}>
                    <Users size={32} color="var(--royal-blue)" style={{ marginBottom: '10px' }} />
                    <h3 style={{ fontSize: '1.5rem', color: 'var(--royal-blue)' }}>50+</h3>
                    <p style={{ fontSize: '0.9rem', color: '#64748b' }}>طبيب استشاري</p>
                 </div>
                 <div className="stat-card" style={{ padding: '20px', background: '#f8fafc', borderRadius: '15px', textAlign: 'center' }}>
                    <Award size={32} color="var(--emerald-green)" style={{ marginBottom: '10px' }} />
                    <h3 style={{ fontSize: '1.5rem', color: 'var(--emerald-green)' }}>24/7</h3>
                    <p style={{ fontSize: '0.9rem', color: '#64748b' }}>خدمة طوارئ</p>
                 </div>
              </div>
            </motion.div>
            <motion.div 
               initial={{ opacity: 0, scale: 0.9 }} 
               whileInView={{ opacity: 1, scale: 1 }} 
               transition={{ duration: 0.6 }}
               style={{ position: 'relative' }}
            >
              <img src="/assets/FB_IMG_1774944827780.jpg" alt="Mustafa Al-Moataman Hospital" style={{ width: '100%', borderRadius: '30px', boxShadow: 'var(--shadow-xl)' }} />
              <div style={{ position: 'absolute', bottom: '-20px', right: '-20px', background: 'var(--emerald-green)', color: 'white', padding: '20px', borderRadius: '20px', boxShadow: 'var(--shadow-lg)' }}>
                 <h4 style={{ margin: 0 }}>متميزون في الرعاية</h4>
                 <p style={{ margin: 0, fontSize: '0.8rem', opacity: 0.9 }}>بأعلى معايير الجودة</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section-padding" style={{ background: '#f1f5f9' }}>
        <div className="container">
          <div className="section-header" style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 className="text-gradient">أقسامنا الطبية</h2>
            <p style={{ maxWidth: '700px', margin: '0 auto', color: '#64748b' }}>نضم نخبة من التخصصات الطبية المجهزة بأحدث المعدات التشخيصية والعلاجية.</p>
          </div>

          <div className="grid-cols-3">
            {[
              { icon: Activity, title: 'طوارئ وإسعاف', desc: 'نظام طوارئ متكامل مجهز لاستقبال كافة الحالات الحرجة على مدار الساعة.' },
              { icon: ShieldCheck, title: 'قسم العمليات', desc: 'غرف عمليات كبرى ومناظير مجهزة بأعلى مستويات التعقيم والتجهيز الطبي.' },
              { icon: MapPin, title: 'العيادات الخارجية', desc: 'تضم أكثر من 20 تخصصاً طبياً لاستقبال المرضى وتقديم الاستشارات.' },
              { icon: Clock, title: 'وحدة العناية المكثفة', desc: 'أحدث أجهزة المراقبة والتنفس الصناعي تحت إشراف طاقم تخصصي.' },
              { icon: Building2, title: 'قسم التنويم الداخلي', desc: 'غرف وأجنحة فندقية مريحة توفر بيئة مثالية للتعافي السريع.' },
              { icon: Phone, title: 'الخدمات المنزلية', desc: 'فريق طبي متكامل لزيارة المرضى في منازلهم وتقديم الرعاية اللازمة.' }
            ].map((service, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="glass-card" 
                style={{ padding: '30px', background: 'white', borderRadius: '20px', border: '1px solid #e2e8f0' }}
              >
                <div className="flex-center" style={{ width: '50px', height: '50px', background: 'rgba(0,74,153,0.1)', color: 'var(--royal-blue)', borderRadius: '12px', marginBottom: '20px', justifyContent: 'center' }}>
                  <service.icon size={28} />
                </div>
                <h3 style={{ marginBottom: '15px', color: 'var(--royal-blue)' }}>{service.title}</h3>
                <p style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: '1.6' }}>{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Location/Contact Info Area */}
      <section className="section-padding bg-white">
        <div className="container">
           <div style={{ background: 'var(--royal-blue)', borderRadius: '30px', padding: '50px', color: 'white', display: 'flex', flexWrap: 'wrap', gap: '40px', alignItems: 'center' }}>
              <div style={{ flex: 1, minWidth: '300px' }}>
                 <h2 style={{ color: 'white', marginBottom: '20px' }}>تواصل مباشر مع المستشفى</h2>
                 <p style={{ opacity: 0.9, marginBottom: '30px' }}>نحن هنا لخدمتك والإجابة على تمامی استفساراتك الطبية.</p>
                 
                 <div style={{ display: 'grid', gap: '20px' }}>
                    <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                       <div style={{ padding: '10px', background: 'rgba(255,255,255,0.1)', borderRadius: '10px' }}><Phone size={20} /></div>
                       <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                          <a href="tel:0117716776" style={{ color: 'white', textDecoration: 'none', fontWeight: 700 }}>0117716776</a>
                          <a href="tel:0933096630" style={{ color: 'white', textDecoration: 'none', fontWeight: 700 }}>0933096630</a>
                       </div>
                    </div>
                    <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                       <div style={{ padding: '10px', background: 'rgba(255,255,255,0.1)', borderRadius: '10px' }}><MapPin size={20} /></div>
                       <span>السوق - شارع الدكاتره - جوار مجمع الريان الطبي</span>
                    </div>
                 </div>
              </div>
              <div style={{ flex: 1, minWidth: '300px', textAlign: 'center' }}>
                 <a href="tel:0117716776" className="btn-primary" style={{ background: 'white', color: 'var(--royal-blue)', padding: '20px 60px', fontSize: '1.2rem', fontWeight: 800 }}>حجز موعد الآن</a>
              </div>
           </div>
        </div>
      </section>

      <style>{`
        .hospital-hero h1 { text-shadow: 0 4px 10px rgba(0,0,0,0.3); }
        .stat-card { transition: all 0.3s ease; }
        .stat-card:hover { transform: translateY(-5px); box-shadow: var(--shadow-md); }
        .glass-card { transition: all 0.3s ease; }
        .glass-card:hover { border-color: var(--emerald-green); transform: translateY(-5px); }
      `}</style>
    </div>
  );
};

export default AlMoataman;
