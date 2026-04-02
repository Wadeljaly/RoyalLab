const mongoose = require('mongoose');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/royal-medical';

const DoctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  specialty: { type: String, required: true },
  hours: { type: String, required: true },
  image: String
});

const TestSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  description: String
});

const ResultSchema = new mongoose.Schema({
  patientId: { type: String, required: true },
  phone: { type: String, required: true },
  testName: { type: String, required: true },
  pdfUrl: String,
  uploadDate: { type: Date, default: Date.now }
});

const ExpenseSchema = new mongoose.Schema({
  description: { type: String, required: true },
  amount: { type: Number, required: true },
  category: { type: String, required: true },
  date: { type: Date, default: Date.now },
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' }
});

const Doctor = mongoose.model('Doctor', DoctorSchema);
const Test = mongoose.model('Test', TestSchema);
const Result = mongoose.model('Result', ResultSchema);
const Expense = mongoose.model('Expense', ExpenseSchema);

const seed = async () => {
  await mongoose.connect(MONGODB_URI);
  console.log('✅ Connected to MongoDB for seeding');

  // Clear existing
  await Doctor.deleteMany({});
  await Test.deleteMany({});
  await Result.deleteMany({});
  await Expense.deleteMany({});

  const doctors = [
    { name: 'د. سلوى أحمد', specialty: 'اختصاصي نساء وتوليد', hours: 'الأحد - الخميس (8ص - 2م)', image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
    { name: 'د. حسن سليمان', specialty: 'استشاري الأطفال', hours: 'السبت - الأربعاء (10ص - 4م)', image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
    { name: 'د. الصادق عمر', specialty: 'اختصاصي باطنية', hours: 'طول أيام الأسبوع', image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
    { name: 'د. الفاتح عبد الباقي', specialty: 'اختصاصي كبد ومناظير', hours: 'الأحد، الثلاثاء، الخميس (1م - 5م)', image: 'https://images.unsplash.com/photo-1510333313204-747806180191?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' }
  ];

  const tests = [
    { name: 'فحص دم شامل (CBC)', price: 2500, category: 'Hematology', description: 'Complete Blood Count' },
    { name: 'وظائف كبد (LFT)', price: 4000, category: 'Biochemistry', description: 'Liver Function Tests' },
    { name: 'وظائف كلى (KFT)', price: 3500, category: 'Biochemistry', description: 'Kidney Function Tests' },
    { name: 'فحص سكري تراكمي (HbA1c)', price: 1800, category: 'Endocrinology', description: 'Average blood sugar over 3 months' },
    { name: 'فحص فيروس B', price: 3000, category: 'Serology', description: 'Hepatitis B Surface Antigen' },
    { name: 'فحص الملاريا', price: 1000, category: 'Parasitology', description: 'Malaria Parasite test' }
  ];

  const results = [
    { patientId: 'ROY-1001', phone: '0912345678', testName: 'CBC + LFT', pdfUrl: '#', uploadDate: new Date() },
    { patientId: 'ROY-1002', phone: '0999999999', testName: 'HbA1c', pdfUrl: '#', uploadDate: new Date() }
  ];

  await Doctor.insertMany(doctors);
  await Test.insertMany(tests);
  await Result.insertMany(results);

  // Seed some generic expenses
  await Expense.insertMany([
    { description: 'فاتورة مياه شهر مارس', amount: 1200, category: 'utilities', date: new Date() },
    { description: 'مستلزمات نظافة', amount: 800, category: 'supplies', date: new Date() }
  ]);

  console.log('✅ Seeding complete!');
  process.exit();
};

seed();
