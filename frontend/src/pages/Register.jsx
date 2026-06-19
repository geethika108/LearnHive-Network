import { useState, useEffect } from "react";

function Register({ setPage }) {
  const [captcha, setCaptcha] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    skillsKnown: "",
    skillsLearning: "",
    captchaInput: "",
    photo: "",
  });

  useEffect(() => {
    generateCaptcha();
  }, []);

  const generateCaptcha = () => {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    let code = "";

    for (let i = 0; i < 6; i++) {
      code += chars.charAt(
        Math.floor(Math.random() * chars.length)
      );
    }

    setCaptcha(code);
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handlePhoto = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      setForm((prev) => ({
        ...prev,
        photo: reader.result,
      }));
    };

    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.captchaInput !== captcha) {
      alert("Invalid CAPTCHA");
      generateCaptcha();
      return;
    }

    const users =
      JSON.parse(localStorage.getItem("allUsers")) ||
      [];

    const exists = users.find(
      (u) => u.email === form.email
    );

    if (exists) {
      alert("Email already registered");
      return;
    }

    const newUser = {
      id: Date.now(),
      name: form.name,
      email: form.email,
      password: form.password,
      skillsKnown: form.skillsKnown,
      skillsLearning: form.skillsLearning,
      photo: form.photo,
    };

    users.push(newUser);

    localStorage.setItem(
      "allUsers",
      JSON.stringify(users)
    );

    localStorage.setItem(
      "learnhiveUser",
      JSON.stringify(newUser)
    );

    alert("Registration Successful");

    setPage("dashboard");
  };

  return (
  <div className="auth-wrapper">
    <div className="glass-card">

      <form className="register-form" onSubmit={handleSubmit}>

        <h1>Create Account</h1>

        <label>Name</label>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <label>Email</label>
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={form.email}
          onChange={handleChange}
          required
        />

        <label>Password</label>
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />

        <label>Skills I Know</label>
        <input
          type="text"
          name="skillsKnown"
          placeholder="Java, HTML, CSS"
          value={form.skillsKnown}
          onChange={handleChange}
        />

        <label>Skills I Want To Learn</label>
        <input
          type="text"
          name="skillsLearning"
          placeholder="React, Node.js"
          value={form.skillsLearning}
          onChange={handleChange}
        />

        <label>Profile Photo</label>

        <input
          type="file"
          accept="image/*"
          onChange={handlePhoto}
        />

        {form.photo && (
          <img
            src={form.photo}
            alt="preview"
            className="preview-image"
          />
        )}

        <label>CAPTCHA Code</label>

        <input
          value={captcha}
          readOnly
          className="captcha-display"
        />

        <input
          type="text"
          name="captchaInput"
          placeholder="Enter CAPTCHA"
          value={form.captchaInput}
          onChange={handleChange}
          required
        />

        <button
          type="button"
          className="refresh-btn"
          onClick={generateCaptcha}
        >
          Refresh CAPTCHA
        </button>

        <button
          type="submit"
          className="btn-main"
        >
          Register
        </button>

        <p className="switch-auth">
          Already have an account?

          <span
            className="link-btn"
            onClick={() => setPage("login")}
          >
            Login
          </span>
        </p>

      </form>

    </div>
  </div>
);
}

export default Register;