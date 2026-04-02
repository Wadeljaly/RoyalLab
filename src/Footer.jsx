import React from 'react';
import { MapPin, Phone, Mail, Share2, Globe, Shield } from 'lucide-react';

const Footer = () => {
  const fbLink = "https://web.facebook.com/people/%D9%85%D8%AC%D9%85%D9%88%D8%B9%D8%A9-%D8%B1%D9%88%D9%8A%D8%A7%D9%84-%D8%A7%D9%84%D8%B7%D8%A8%D9%8A%D8%A9/100084726336225/?_rdc=1&_rdr#";
  return (
    <footer style={{ background: '#1e293b', color: 'white' }} className="section-padding">
      <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '50px' }}>
        <div className="footer-col">
          <h3 className="section-title">مختبرات رويال الطبية</h3>
          <p style={{ opacity: 0.8, lineHeight: '28px', marginTop: '15px' }}>مؤسسة طبية رائدة توفر أفضل الخدمات التشخيصية والطبية بأحدث التقنيات وبإشراف نخبة من الخبراء.</p>
          <div className="social-links" style={{ display: 'flex', gap: '15px', marginTop: '20px' }}>
            <a href={fbLink} target="_blank" className="social-link"><Share2 size={24} /></a>
            <a href="#" className="social-link"><Globe size={24} /></a>
            <a href="#" className="social-link"><Shield size={24} /></a>
          </div>
        </div>

        <div className="footer-col">
          <h4 style={{ color: 'var(--emerald-green)' }}>روابط سريعة</h4>
          <ul style={{ marginTop: '15px', display: 'grid', gap: '10px' }}>
            <li><a href="/">الصفحة الرئيسية</a></li>
            <li><a href="/clinics">عرض العيادات</a></li>
            <li><a href="/al-moataman">مستشفى المؤتمن التخصصي</a></li>
            <li><a href="/tests">قائمة التحاليل</a></li>
            <li><a href="/results">نتائج المرضى</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4 style={{ color: 'var(--emerald-green)' }}>تواصل معنا</h4>
          <ul style={{ marginTop: '15px', display: 'grid', gap: '15px' }}>
            <li className="flex-center" style={{ justifyContent: 'start', gap: '10px' }}>
              <MapPin size={22} color="var(--emerald-green)" />
              <div style={{ fontSize: '0.85rem' }}>
                 <p>رويال: عطبرة، جنوب المسجد الكبير</p>
                 <p>المؤتمن: السوق، جنوب الريان الطبي</p>
              </div>
            </li>
            <li className="flex-center" style={{ justifyContent: 'start', gap: '10px' }}>
              <Phone size={22} color="var(--emerald-green)" />
              <div style={{ fontSize: '0.85rem' }}>
                 <p><a href="tel:0115566002">0115566002</a> (رويال)</p>
                 <p><a href="tel:0117716776">0117716776</a> - <a href="tel:0933096630">0933096630</a></p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div style={{ textAlign: 'center', marginTop: '60px', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '20px' }}>
        <p>&copy; 2026 جميع الحقوق محفوظة - مختبرات رويال الطبية</p>
      </div>
      <style>{`
        .footer-col a { color: white; opacity: 0.8; transition: var(--transition-smooth); }
        .footer-col a:hover { color: var(--emerald-green); opacity: 1; }
        .social-link { width: 45px; height: 45px; display: flex; align-items: center; justify-content: center; background: rgba(255,255,255,0.1); border-radius: 50%; border: 1px solid rgba(255,255,255,0.05); }
        .social-link:hover { background: var(--emerald-green); }
      `}</style>
    </footer>
  );
};

export default Footer;
