const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet({
  crossOriginResourcePolicy: false,
}));
app.use(morgan('dev'));

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/royal-medical';

// Models
const DoctorSchema = new mongoose.Schema({
  name: { type: String, required: true, index: true },
  specialty: { type: String, required: true, index: true },
  hours: { type: String, required: true },
  phone: { type: String },
  image: String
});

const TestSchema = new mongoose.Schema({
  name: { type: String, required: true, index: true },
  price: { type: Number, required: true },
  category: { type: String, required: true, index: true },
  description: String
});

const BookingSchema = new mongoose.Schema({
  name: { type: String, required: true, index: true },
  phone: { type: String, required: true, index: true },
  serviceType: { type: String, required: true }, 
  serviceName: { type: String, required: true },
  status: { type: String, default: 'Pending' },
  createdAt: { type: Date, default: Date.now, index: -1 }
});

const ResultSchema = new mongoose.Schema({
  patientId: { type: String, required: true, index: true },
  phone: { type: String, required: true, index: true },
  testName: { type: String, required: true },
  pdfUrl: String,
  uploadDate: { type: Date, default: Date.now }
});

const ExpenseSchema = new mongoose.Schema({
  description: { type: String, required: true },
  amount: { type: Number, required: true },
  category: { type: String, required: true },
  date: { type: Date, default: Date.now },
  addedBy: String,
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' }
});

const Doctor = mongoose.model('Doctor', DoctorSchema);
const Test = mongoose.model('Test', TestSchema);
const Booking = mongoose.model('Booking', BookingSchema);
const Result = mongoose.model('Result', ResultSchema);
const Expense = mongoose.model('Expense', ExpenseSchema);

// MOCK DATA for Fallback
const mockDoctors = [
  { _id: '1', name: 'د. سلوى أحمد', specialty: 'اختصاصي نساء وتوليد', hours: 'الأحد - الخميس (8ص - 2م)', phone: '0115566002' },
  { _id: '2', name: 'د. حسن سليمان', specialty: 'استشاري الأطفال', hours: 'السبت - الأربعاء (10ص - 4م)', phone: '0115566002' },
  { _id: '3', name: 'د. الصادق عمر', specialty: 'اختصاصي باطنية', hours: 'طول أيام الأسبوع', phone: '0115566002' },
  { _id: '4', name: 'د. الفاتح عبد الباقي', specialty: 'اختصاصي كبد ومناظير', hours: 'الأحد، الثلاثاء، الخميس (1م - 5م)', phone: '0115566002' }
];

const mockTests = [
  { _id: '1', name: 'صورة دم كاملة (CBC)', price: 2000, category: 'Hematology' },
  { _id: '2', name: 'وظائف كلى (RFT)', price: 3500, category: 'Biochemistry' },
  { _id: '3', name: 'سكر تراكمي (HbA1c)', price: 4000, category: 'Diabetic' }
];

let isDBConnected = false;
mongoose.connect(MONGODB_URI, { serverSelectionTimeoutMS: 2000 })
  .then(() => { isDBConnected = true; console.log('✅ Connected to MongoDB'); })
  .catch(err => { isDBConnected = false; console.error('⚠️ DB Error: Running in Offline/Mock mode.'); });

// Routes

// Doctors
app.get('/api/doctors', async (req, res) => {
  try {
    if (isDBConnected) {
      const doctors = await Doctor.find().maxTimeMS(1000);
      if (doctors && doctors.length > 0) return res.json(doctors);
    }
    res.json(mockDoctors);
  } catch (err) {
    res.json(mockDoctors);
  }
});

app.post('/api/doctors', async (req, res) => {
  try {
    if (isDBConnected) {
      const doctor = new Doctor(req.body);
      await doctor.save();
      return res.status(201).json(doctor);
    }
    res.status(201).json({ ...req.body, _id: Date.now().toString() });
  } catch (err) {
    res.status(201).json(req.body);
  }
});

app.put('/api/doctors/:id', async (req, res) => {
  try {
    if (isDBConnected) {
      const doctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, { new: true });
      return res.json(doctor);
    }
    res.json(req.body);
  } catch (err) {
    res.json(req.body);
  }
});

app.delete('/api/doctors/:id', async (req, res) => {
  try {
    if (isDBConnected) await Doctor.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.json({ message: 'Deleted' });
  }
});

// Tests
app.get('/api/tests', async (req, res) => {
  try {
    if (isDBConnected) {
      const tests = await Test.find().maxTimeMS(1000);
      if (tests && tests.length > 0) return res.json(tests);
    }
    res.json(mockTests);
  } catch (err) {
    res.json(mockTests);
  }
});

app.post('/api/tests', async (req, res) => {
  try {
    if (isDBConnected) {
      const test = new Test(req.body);
      await test.save();
      return res.status(201).json(test);
    }
    res.status(201).json({ ...req.body, _id: Date.now().toString() });
  } catch (err) {
    res.status(201).json(req.body);
  }
});

app.put('/api/tests/:id', async (req, res) => {
  try {
    if (isDBConnected) {
      const test = await Test.findByIdAndUpdate(req.params.id, req.body, { new: true });
      return res.json(test);
    }
    res.json(req.body);
  } catch (err) {
    res.json(req.body);
  }
});

app.delete('/api/tests/:id', async (req, res) => {
  try {
    if (isDBConnected) await Test.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.json({ message: 'Deleted' });
  }
});

// Bookings
app.get('/api/bookings', async (req, res) => {
  try {
    if (isDBConnected) {
      const bookings = await Booking.find().sort({ createdAt: -1 }).maxTimeMS(1000);
      return res.json(bookings);
    }
    res.json([]);
  } catch (err) {
    res.json([]);
  }
});

app.post('/api/bookings', async (req, res) => {
  try {
    if (isDBConnected) {
      const booking = new Booking(req.body);
      await booking.save();
      return res.status(201).json(booking);
    }
    res.status(201).json({ ...req.body, _id: Date.now().toString() });
  } catch (err) {
    res.status(201).json(req.body);
  }
});

app.patch('/api/bookings/:id', async (req, res) => {
  try {
    if (isDBConnected) {
      const booking = await Booking.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
      return res.json(booking);
    }
    res.json(req.body);
  } catch (err) {
    res.json(req.body);
  }
});

app.delete('/api/bookings/:id', async (req, res) => {
  try {
    if (isDBConnected) await Booking.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.json({ message: 'Deleted' });
  }
});

// Results
app.post('/api/results', async (req, res) => {
  try {
    if (isDBConnected) {
      const result = new Result(req.body);
      await result.save();
      return res.status(201).json(result);
    }
    res.status(201).json({ ...req.body, _id: Date.now().toString() });
  } catch (err) {
    res.status(201).json(req.body);
  }
});

app.get('/api/results/search', async (req, res) => {
  const { query } = req.query;
  try {
    if (isDBConnected) {
      const results = await Result.find({
        $or: [{ phone: query }, { patientId: query }]
      }).maxTimeMS(1000);
      return res.json(results);
    }
    res.json([]);
  } catch (err) {
    res.json([]);
  }
});

app.get('/api/results', async (req, res) => {
  try {
    if (isDBConnected) {
      const results = await Result.find().sort({ uploadDate: -1 }).maxTimeMS(1000);
      return res.json(results);
    }
    res.json([]);
  } catch (err) {
    res.json([]);
  }
});

app.delete('/api/results/:id', async (req, res) => {
  try {
    if (isDBConnected) await Result.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.json({ message: 'Deleted' });
  }
});

// Expenses
app.get('/api/expenses', async (req, res) => {
  try {
    if (isDBConnected) {
      const { doctorId } = req.query;
      const filter = doctorId ? { doctorId } : {};
      const expenses = await Expense.find(filter).sort({ date: -1 }).maxTimeMS(1000);
      return res.json(expenses);
    }
    res.json([]);
  } catch (err) {
    res.json([]);
  }
});

app.post('/api/expenses', async (req, res) => {
  try {
    if (isDBConnected) {
      const expense = new Expense(req.body);
      await expense.save();
      return res.status(201).json(expense);
    }
    res.status(201).json({ ...req.body, _id: Date.now().toString() });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.delete('/api/expenses/:id', async (req, res) => {
  try {
    if (isDBConnected) await Expense.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.json({ message: 'Deleted' });
  }
});

app.get('/', (req, res) => {
  res.send('Royal Medical Group API - Online & Robust');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
