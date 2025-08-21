const { hashedPassword, comparePassword } = require("../middleware/Authcheck");
const Usermodel = require("../model/usermodel");
const jwt = require("jsonwebtoken");
const fs = require("fs").promises;
const fsSync = require("fs");
const path = require("path");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const axios = require("axios");

const apiUrl = "http://localhost:5000/api/productlist";
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.my_email,
    pass: process.env.my_password,
  },
});

const generateOtp = () => crypto.randomInt(100000, 999999).toString();

const generateHTMLTable = (data) => {
  if (!Array.isArray(data) || data.length === 0) return "<p>No products found.</p>";

  const headers = Object.keys(data[0]);
  const headerRow = headers.map((h) => `<th>${h}</th>`).join("");

  const rows = data
    .map(
      (item) =>
        `<tr>${headers.map((h) => `<td>${item[h]}</td>`).join("")}</tr>`
    )
    .join("");

  return `<table border="1" cellpadding="5" cellspacing="0"><tr>${headerRow}</tr>${rows}</table>`;
};


class AuthController {
  async register(req, res) {
    try {
      const { name, email, phone, password } = req.body;

      if (await Usermodel.findOne({ email })) {
        return res.status(409).json({ status: false, message: "Email already registered" });
      }

      const user = new Usermodel({
        name,
        email,
        phone,
        password: hashedPassword(password),
        otp: generateOtp(),
        otpExpiry: new Date(Date.now() + 10 * 60 * 1000),
        image: req.file ? req.file.path : undefined,
      });

      await user.save();

      await transporter.sendMail({
        from: "rishi2020.rp@gmail.com",
        to: email,
        subject: "OTP Verification",
        html: `<p>Dear ${name},</p>
               <p>Please verify your email with this OTP:</p>
               <h2>${user.otp}</h2>
               <p>Valid for 10 minutes.</p>`,
      });

      res.status(201).json({ status: true, message: "User registered successfully", data: user });
    } catch (err) {
      res.status(400).json({ status: false, message: err.message });
    }
  }

  
  async verifyotp(req, res) {
    try {
      const { email, otp } = req.body;
      const user = await Usermodel.findOne({ email });

      if (!email || !otp) return res.status(400).json({ message: "Email & OTP required" });
      if (!user) return res.status(400).json({ message: "User not found" });
      if (user.isVerified) return res.status(400).json({ message: "User already verified" });
      if (user.otp !== otp) return res.status(400).json({ message: "Invalid OTP" });
      if (user.otpExpiry < new Date()) return res.status(400).json({ message: "OTP expired" });

      user.isVerified = true;
      user.otp = undefined;
      user.otpExpiry = undefined;
      await user.save();

      res.status(200).json({ message: "User verified successfully" });
    } catch (err) {
      res.status(500).json({ message: "Internal server error" });
    }
  }

  
  async resendotp(req, res) {
    try {
      const { email } = req.body;
      const user = await Usermodel.findOne({ email });

      if (!user) return res.status(400).json({ message: "User not found" });
      if (user.isVerified) return res.status(400).json({ message: "User already verified" });

      user.otp = generateOtp();
      user.otpExpiry = new Date(Date.now() + 10 * 60 * 1000);
      await user.save();

      await transporter.sendMail({
        from: "rishi2020.rp@gmail.com",
        to: email,
        subject: "Resend OTP Verification",
        html: `<p>Dear ${user.name},</p><h2>${user.otp}</h2><p>Valid for 10 minutes.</p>`,
      });

      res.status(200).json({ message: "OTP resent successfully" });
    } catch (err) {
      res.status(500).json({ status: false, message: err.message });
    }
  }

  
  async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await Usermodel.findOne({ email });

      if (!user) return res.status(400).json({ status: false, message: "User not found" });
      if (!comparePassword(password, user.password))
        return res.status(400).json({ status: false, message: "Invalid password" });

      const token = jwt.sign(
        { _id: user._id, name: user.name, email: user.email, profile: user.image },
        process.env.JWT_SECRECT_KEY,
        { expiresIn: "2h" }
      );

      res.status(200).json({
        status: true,
        message: "Login successful",
        user: { _id: user._id, name: user.name, email: user.email, profile: user.image },
        token,
      });
    } catch (err) {
      res.status(400).json({ status: false, message: err.message });
    }
  }

  async profile(req, res) {
    res.status(200).json({ status: true, message: "Welcome to user profile", data: req.user });
  }

  async editprofile(req, res) {
    try {
      const user = await Usermodel.findById(req.params.id);
      if (!user) return res.status(404).json({ status: false, message: "User not found" });

      res.status(200).json({ status: true, message: "Single profile fetched", data: user });
    } catch (err) {
      res.status(400).json({ status: false, message: err.message });
    }
  }

  async updateprofile(req, res) {
    try {
      const { id } = req.params;
      const user = await Usermodel.findById(id);

      if (!user) return res.status(404).json({ status: false, message: "User not found" });

      const updateData = { ...req.body };
      if (req.file) {
        if (user.image) {
          const oldPath = path.join(__dirname, "..", "..", user.image);
          if (fsSync.existsSync(oldPath)) await fs.unlink(oldPath);
        }
        updateData.image = req.file.path;
      }

      const updated = await Usermodel.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
      res.status(200).json({ status: true, message: "Profile updated successfully", data: updated });
    } catch (err) {
      res.status(400).json({ status: false, message: err.message });
    }
  }

  async deleteprofile(req, res) {
    try {
      const { id } = req.params;
      const deleted = await Usermodel.findByIdAndDelete(id);

      if (!deleted) return res.status(404).json({ status: false, message: "User not found" });

      if (deleted.image) {
        const imgPath = path.join(__dirname, "..", "..", deleted.image);
        if (fsSync.existsSync(imgPath)) await fs.unlink(imgPath);
      }

      res.status(200).json({ status: true, message: "Profile deleted successfully" });
    } catch (err) {
      res.status(400).json({ status: false, message: err.message });
    }
  }

  
  async sendProductListEmail(req, res) {
    try {
      const { email } = req.body;
      if (!email) return res.status(400).json({ message: "Email required" });

      const user = await Usermodel.findOne({ email });
      if (!user) return res.status(400).json({ message: "User not found" });

      const { data } = await axios.get(apiUrl);

      await transporter.sendMail({
        from: "rishi2020.rp@gmail.com",
        to: email,
        subject: "Product List",
        html: `<h3>Here is the latest product list:</h3>${generateHTMLTable(data.data)}`,
      });

      res.status(200).json({ status: true, message: "Email sent successfully" });
    } catch (err) {
      res.status(500).json({ status: false, message: err.message });
    }
  }
}

module.exports = new AuthController();
