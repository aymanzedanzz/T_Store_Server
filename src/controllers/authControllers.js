const User = require("../models/Users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
    try {
        const { name, email, phone, password, termsAccepted } = req.body;

        // تحقق من قبول الشروط
        if (!termsAccepted) {
            return res.status(400).json({ msg: "يجب الموافقة على الشروط والأحكام" });
        }

        // تحقق من وجود المستخدم مسبقًا
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ msg: "البريد الإلكتروني مستخدم بالفعل" });

        let phoneExists = await User.findOne({ phone });
        if (phoneExists) return res.status(400).json({ msg: "رقم الهاتف مستخدم بالفعل" });

        // تشفير كلمة المرور
        const hashedPassword = await bcrypt.hash(password, 10);

        // إنشاء المستخدم الجديد
        user = new User({ name, email, phone, password: hashedPassword, termsAccepted });
        await user.save();

        // إنشاء JWT Token
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.status(201).json({ token });
    } catch (err) {
        console.error("Error Details:", err);
        res.status(500).json({ msg: "حدث خطأ أثناء التسجيل" });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, phone, password } = req.body;

        // البحث عن المستخدم باستخدام البريد الإلكتروني أو رقم الهاتف
        let user = await User.findOne({ $or: [{ email }, { phone }] });
        if (!user) return res.status(400).json({ msg: "المستخدم غير موجود" });

        // التحقق من كلمة المرور
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: "كلمة المرور غير صحيحة" });

        // إنشاء JWT Token
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.json({ token });
    } catch (err) {
        console.error("Error Details:", err);
        res.status(500).json({ msg: "حدث خطأ أثناء تسجيل الدخول" });
    }
};