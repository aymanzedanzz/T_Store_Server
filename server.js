require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./src/config/db");

// استيراد مسارات المصادقة فقط
const authRoutes = require("./src/routes/authRoutes");

// إنشاء التطبيق
const app = express();
app.use(express.json()); // ضروري لمعالجة JSON القادم من الطلبات

// الاتصال بقاعدة البيانات مع معالجة الخطأ
connectDB().catch(err => {
    console.error("❌ Database Connection Failed:", err);
    process.exit(1); // إيقاف التطبيق إذا فشل الاتصال
});

// // إعداد الـ Middleware
// app.use(express.json());
// app.use(cors({
//     origin: "http://localhost:3000", // السماح فقط لتطبيق معين بالوصول (يمكنك تغييره)
//     credentials: true
// }));

// تسجيل الطلبات في التطوير (اختياري)
if (process.env.NODE_ENV === "development") {
    const morgan = require("morgan");
    app.use(morgan("dev"));
}

// ربط مسارات تسجيل الدخول وإنشاء الحساب
app.use("/api/auth", authRoutes);

// تشغيل السيرفر
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));























































// require("dotenv").config();
// const express = require("express");
// const cors = require("cors");
// const connectDB = require("./src/config/db");

// // استيراد مسارات المصادقة فقط
// const authRoutes = require("./src/routes/authRoutes");

// // إنشاء التطبيق
// const app = express();

// // الاتصال بقاعدة البيانات
// connectDB();

// // إعداد الـ Middleware
// app.use(express.json());
// app.use(cors());

// // ربط مسارات تسجيل الدخول وإنشاء الحساب
// app.use("/api/auth", authRoutes);

// // تشغيل السيرفر
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));