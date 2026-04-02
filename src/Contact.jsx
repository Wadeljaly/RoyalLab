import { MapPin, Phone, Mail, Clock, MessageCircle, Send, Share2, Globe, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

const Contact = () => {
  const fbLink = "https://web.facebook.com/people/%D9%85%D8%AC%D9%85%D9%88%D8%B9%D8%A9-%D8%B1%D9%88%D9%84%D8%A7%D9%8A-%D8%A7%D9%84%D8%B7%D8%A8%D9%8A%D8%A9/100084726336225/?_rdc=1&_rdr#";
  return (
    <div className="contact-page section-padding" style={{ background: '#f8fafc' }}>
      <div className="container">
        <header style={{ textAlign: 'center', marginBottom: '80px' }}>
          <h1 className="text-gradient">اتصل بنا</h1>
          <p style={{ color: '#64748b' }}>نحن هنا للاستماع لأسئلتك واستفساراتك في أي وقت.</p>
        </header>

        <div className="flex-center" style={{ flexWrap: 'wrap', gap: '60px', alignItems: 'start' }}>
           {/* Contact Info Cards */}
           <div className="contact-info" style={{ flex: '1', minWidth: '350px' }}>
              <div style={{ display: 'grid', gap: '30px' }}>
                 {[
                   { icon: MapPin, title: 'العناوين', content: 'رويال: جنوب المسجد الكبير / المؤتمن: السوق - شارع الدكاترة' },
                   { icon: Phone, title: 'رويال للمختبرات', content: '0115566002', isLink: true, link: 'tel:0115566002' },
                   { icon: Phone, title: 'مستشفى المؤتمن', content: '0117716776 - 0933096630', isLink: false },
                   { icon: MessageCircle, title: 'واتساب رويال', content: '0115566002', isLink: true, link: 'https://wa.me/249115566002' },
                   { icon: Clock, title: 'ساعات العمل', content: 'يومياً: 7:00 صباحاً - 9:00 مساءً' }
                 ].map((info, idx) => (
                    <motion.div 
                      key={idx} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.1 }}
                      className="glass" style={{ padding: '25px', borderRadius: '20px', background: 'white', display: 'flex', gap: '20px', alignItems: 'center' }}
                    >
                       <div className="flex-center" style={{ width: '50px', height: '50px', background: 'rgba(0,136,90,0.1)', color: 'var(--emerald-green)', borderRadius: '14px' }}>
                          <info.icon size={24} />
                       </div>
                       <div>
                          <h4 style={{ color: 'var(--royal-blue)', marginBottom: '5px' }}>{info.title}</h4>
                          {info.isLink ? (
                             <a href={info.link} target="_blank" style={{ color: 'var(--emerald-green)', fontWeight: 600 }}>{info.content}</a>
                          ) : (
                             <p style={{ opacity: 0.7 }}>{info.content}</p>
                          )}
                       </div>
                    </motion.div>
                 ))}
              </div>

              <div className="social-connect" style={{ marginTop: '50px' }}>
                 <h3 style={{ marginBottom: '20px', color: 'var(--royal-blue)' }}>تابعنا على مواقع التواصل</h3>
                 <div className="flex-center" style={{ justifyContent: 'start', gap: '15px' }}>
                    <a href={fbLink} target="_blank" className="social-btn"><Share2 size={24} /></a>
                    <a href="#" className="social-btn"><Globe size={24} /></a>
                    <a href="#" className="social-btn"><Shield size={24} /></a>
                 </div>
              </div>
           </div>

           {/* Map Section */}
           <div className="map-container" style={{ flex: '1.2', minWidth: '350px' }}>
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }}
                className="glass" style={{ padding: '20px', borderRadius: '30px', background: 'white', overflow: 'hidden' }}
              >
                  <div style={{ height: '500px', borderRadius: '20px', overflow: 'hidden', position: 'relative' }}>
                    {/* Emulating Map (using an image from assets if possible, or google maps embed) */}
                    <img 
                      src="/assets/Screenshot_20260331_102208_com.google.android.apps.maps.jpg" 
                      alt="Location Map" 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                    />
                    <div style={{ position: 'absolute', top: '20px', left: '20px', background: 'white', padding: '15px 25px', borderRadius: '15px', color: 'var(--royal-blue)', fontWeight: 700, boxShadow: 'var(--shadow-lg)' }}>
                       اذهب عبر الخرائط
                    </div>
                  </div>
              </motion.div>
           </div>
        </div>
      </div>
      <style>{`
        .social-btn { 
          width: 50px; height: 50px; display: flex; align-items: center; justify-content: center; 
          background: white; color: var(--royal-blue); border: 1px solid #e2e8f0; border-radius: 15px; 
          transition: var(--transition-smooth); 
        }
        .social-btn:hover { background: var(--royal-blue); color: white; transform: translateY(-3px); }
      `}</style>
    </div>
  );
};

export default Contact;
