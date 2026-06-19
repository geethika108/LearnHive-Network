import { useState, useEffect } from "react";

function Login({ setPage }) {

  const [captcha,setCaptcha] = useState("");

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [captchaInput,setCaptchaInput] = useState("");

  useEffect(()=>{
    generateCaptcha();
  },[]);

  const generateCaptcha = ()=>{

    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    let code = "";

    for(let i=0;i<6;i++){
      code += chars.charAt(
        Math.floor(Math.random()*chars.length)
      );
    }

    setCaptcha(code);
  };

  const handleSubmit=(e)=>{
    e.preventDefault();

    if(captchaInput !== captcha){
      alert("Invalid CAPTCHA");
      return;
    }

    const users =
      JSON.parse(localStorage.getItem("allUsers"))
      || [];

    const user =
      users.find(
        u =>
          u.email === email &&
          u.password === password
      );

    if(!user){
      alert("Invalid credentials");
      return;
    }

    localStorage.setItem(
      "learnhiveUser",
      JSON.stringify(user)
    );

    setPage("dashboard");
  };

  return (
    <div className="login-wrapper">

      <div className="login-glass">

        <form
          className="login-card"
          onSubmit={handleSubmit}
        >

          <h1>Sign In</h1>

          <label>Email</label>

          <input
            type="email"
            placeholder="alice@test.com"
            value={email}
            onChange={(e)=>
              setEmail(e.target.value)
            }
          />

          <label>Password</label>

          <input
            type="password"
            placeholder="******"
            value={password}
            onChange={(e)=>
              setPassword(e.target.value)
            }
          />

          <label>CAPTCHA Code</label>

          <input
            value={captcha}
            readOnly
          />

          <label>Enter CAPTCHA</label>

          <input
            value={captchaInput}
            onChange={(e)=>
              setCaptchaInput(
                e.target.value
              )
            }
            placeholder="Type CAPTCHA"
          />

          <button
            type="button"
            className="captcha-btn"
            onClick={generateCaptcha}
          >
            Refresh CAPTCHA
          </button>

          <button
            className="btn-main"
            type="submit"
          >
            Login
          </button>

          <p className="switch-auth">
            New User?

            <button
              type="button"
              className="link-btn"
              onClick={()=>
                setPage("register")
              }
            >
              Create Account
            </button>

          </p>

        </form>

      </div>

    </div>
  );
}

export default Login;