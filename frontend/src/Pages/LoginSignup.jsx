import React, { useState } from "react";
import "./CSS/LoginSignup.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";

const LoginSignup = () => {

    const [state, setState] = useState("Login");
    const [formData, setFormData] = useState({ username: "", email: "", password: "" });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const changeHandler = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        // Xóa lỗi khi người dùng nhập lại
        if (errors[e.target.name]) {
            setErrors({
                ...errors,
                [e.target.name]: ""
            });
        }
    }

    const validateLoginForm = () => {
        const newErrors = {};
        let isValid = true;

        // Kiểm tra username/email (cho đăng nhập)
        if (!formData.username) {
            newErrors.username = "Vui lòng nhập tên đăng nhập hoặc email";
            isValid = false;
        }

        // Kiểm tra password (cho đăng nhập)
        if (!formData.password) {
            newErrors.password = "Vui lòng nhập mật khẩu";
            isValid = false;
        } else if (formData.password.length < 6) {
            newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    }

    const validateSignupForm = () => {
        const newErrors = {};
        let isValid = true;

        // Kiểm tra fullname (cho đăng ký)
        if (!formData.fullname) {
            newErrors.fullname = "Vui lòng nhập họ tên";
            isValid = false;
        }

        // Kiểm tra username (cho đăng ký)
        if (!formData.username) {
            newErrors.username = "Vui lòng nhập tên đăng nhập";
            isValid = false;
        }

        // Kiểm tra email (cho đăng ký)
        if (!formData.email) {
            newErrors.email = "Vui lòng nhập email";
            isValid = false;
        } else {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.email)) {
                newErrors.email = "Email không hợp lệ";
                isValid = false;
            }
        }

        // Kiểm tra password (cho đăng ký)
        if (!formData.password) {
            newErrors.password = "Vui lòng nhập mật khẩu";
            isValid = false;
        } else if (formData.password.length < 6) {
            newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    }

    const login = async () => {
        // Validate form trước khi submit
        if (!validateLoginForm()) {
            return;
        }

        setIsLoading(true);
        try {
            const response = await fetch('http://localhost:4000/login', {
                method: 'POST',
                headers: {
                    Accept: 'application/form-data',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            
            const dataObj = await response.json();
            console.log(dataObj);
            
            if (dataObj.success) {
                localStorage.setItem('auth-token', dataObj.token);
                window.location.replace("/");
            } else {
                setErrors({ general: dataObj.errors || "Đăng nhập không thành công" });
            }
        } catch (error) {
            console.error("Login error:", error);
            setErrors({ general: "Lỗi kết nối đến máy chủ. Vui lòng thử lại sau." });
        } finally {
            setIsLoading(false);
        }
    }

    const signup = async () => {
        // Validate form trước khi submit
        if (!validateSignupForm()) {
            return;
        }

        setIsLoading(true);
        try {
            const response = await fetch('http://localhost:4000/signup', {
                method: 'POST',
                headers: {
                    Accept: 'application/form-data',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            
            const dataObj = await response.json();
            
            if (dataObj.success) {
                localStorage.setItem('auth-token', dataObj.token);
                window.location.replace("/");
            } else {
                setErrors({ general: dataObj.errors || "Đăng ký không thành công" });
            }
        } catch (error) {
            console.error("Signup error:", error);
            setErrors({ general: "Lỗi kết nối đến máy chủ. Vui lòng thử lại sau." });
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="loginsignup">
            <div className="loginsignup-container border rounded-md shadow-md flex flex-col items-start justify-start gap-4">
                {/* Switch button */}
                <div className="loginsignup-switch flex items-center justify-center w-full relative border-b-2">
                    <div className="w-full text-center p-3 cursor-pointer" onClick={() => {
                        setState("Login");
                        document.querySelector(".loginsignup-switch-active").style.left = "0";
                        setErrors({});
                    }}>Đăng nhập</div>
                    <div className="w-full text-center p-3 cursor-pointer"
                        onClick={() => {
                            setState("Signup");
                            document.querySelector(".loginsignup-switch-active").style.left = "50%";
                            setErrors({});
                        }}>
                        Đăng ký</div>

                    {/* Active border */}
                    <div className={`loginsignup-switch-active absolute h-[2px] w-1/2 bottom-0 bg-blue-500 transition-all duration-300 ease-in-out ${state === "Login" ? "left-0" : "left-[50%]"}`}></div>
                </div>

                {/* Field */}
                <div className="flex flex-col items-start justify-start gap-4 p-4 w-full">
                    {/* Hiển thị lỗi chung nếu có */}
                    {errors.general && (
                        <div className="w-full p-2 mb-2 bg-red-100 border border-red-400 text-red-700 rounded">
                            {errors.general}
                        </div>
                    )}
                
                    {state === "Signup" && (
                        <div className="w-full">
                            <input 
                                type="text" 
                                name="fullname" 
                                placeholder="Họ tên" 
                                className={`outline-none w-full border-b-2 pb-2 ${errors.fullname ? 'border-red-500' : ''}`} 
                                onChange={changeHandler} 
                            />
                            {errors.fullname && <p className="text-red-500 text-xs mt-1">{errors.fullname}</p>}
                        </div>
                    )}
                    
                    <div className="w-full">
                        <input 
                            type="text" 
                            name="username" 
                            placeholder={state === "Login" ? "Tên đăng nhập hoặc email" : "Tên đăng nhập"} 
                            className={`outline-none w-full border-b-2 pb-2 ${errors.username ? 'border-red-500' : ''}`} 
                            onChange={changeHandler} 
                        />
                        {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username}</p>}
                    </div>
                    
                    {state === "Signup" && (
                        <div className="w-full">
                            <input 
                                type="email" 
                                name="email" 
                                placeholder="Email" 
                                className={`outline-none w-full border-b-2 pb-2 ${errors.email ? 'border-red-500' : ''}`} 
                                onChange={changeHandler} 
                            />
                            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                        </div>
                    )}
                    
                    <div className="w-full">
                        <input 
                            type="password" 
                            name="password" 
                            placeholder="Mật khẩu" 
                            className={`border-b-2 w-full pb-2 outline-none ${errors.password ? 'border-red-500' : ''}`} 
                            onChange={changeHandler} 
                        />
                        {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                    </div>
                    
                    <button 
                        className="w-full bg-black text-white p-4 uppercase rounded-md cursor-pointer hover:bg-blue-600 transition-all duration-300 ease-in-out text-sm flex justify-center items-center" 
                        onClick={state === "Login" ? login : signup}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
                        ) : null}
                        {state === "Login" ? "Đăng nhập" : "Đăng ký"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LoginSignup;
