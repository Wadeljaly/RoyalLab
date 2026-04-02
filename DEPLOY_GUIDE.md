# خطة رفع تطبيق رويال ميديكال (Royal Medical)

تم تجهيز الكود بالكامل ليكون جاهزاً للرفع. تتبع هذه الخطة لرفع الواجهة الأمامية (Frontend) والخلفية (Backend) وقاعدة البيانات (MongoDB).

## 1. رفع قاعدة البيانات (MongoDB Atlas)
لقد قمت بالفعل بإعداد رابط MongoDB في ملف `.env` الخاص بالسيرفر. تأكد من أن عنوان IP الخاص بالاستضافة (أو `0.0.0.0/0` للوصول العام) مسموح به في إعدادات **Network Access** في MongoDB Atlas.

## 2. رفع السيرفر (Backend) على Render
يعد **Render** خياراً ممتازاً ومجانياً لرفع سيرفرات Node.js.

1. قم بإنشاء حساب في [Render](https://render.com/).
2. اضغط على **New** ثم **Web Service**.
3. قم بتقديم رابط مستودع GitHub الخاص بك.
4. استخدم الإعدادات التالية:
   - **Environment**: `Node`
   - **Build Command**: `npm install` (داخل مجلد `server`)
   - **Start Command**: `npm start`
5. اضغط على **Advanced** وأضف المتغيرات البيئية (Environment Variables) التالية:
   - `MONGODB_URI`: (رابط قاعدة البيانات الخاص بك من ملف `.env`)
   - `PORT`: `5000`
6. بعد اكتمال الرفع، ستحصل على رابط مثل `https://royal-medical-api.onrender.com`.

---

## 3. رفع الواجهة الأمامية (Frontend) على Vercel أو Netlify
الواجهة الأمامية تعتمد على React و Vite.

1. قم بتعديل ملف `src/api.js` أو تأكد أن رابط السيرفر الجديد مضاف في ملف `.env.production`.
2. قم بإنشاء حساب في [Vercel](https://vercel.com/).
3. اضغط على **Add New** ثم **Project**.
4. قم بربط مستودع GitHub الخاص بك.
5. في إعدادات المشروع (Build & Development Settings):
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
6. أضف المتغير البيئي التالي في Vercel:
   - `VITE_API_URL`: (رابط السيرفر الذي حصلت عليه من Render)
7. اضغط على **Deploy**.

---

## ما تم إنجازه في الكود:
- [x] إنشاء ملف `src/api.js` لتوحيد روابط الـ API.
- [x] تحديث جميع المكونات (`Dashboard`, `Clinics`, `Tests`, `Results`, `Booking`) لتستخدم الرابط المتغير بدلاً من `localhost`.
- [x] إضافة `start script` لملف `package.json` الخاص بالسيرفر.
- [x] إعداد ملفات `.env` للفصل بين بيئة التطوير والإنتاج.

---

**ملاحظة:** إذا كنت ترفع المشروع بالكامل من مجلد واحد يحتوي على `client` و `server` كـ subfolders، تأكد من تحديد مجلد الجذر (Root Directory) لكل خدمة في إعدادات Vercel و Render.
