import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import "../App.css"

export function Signin() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSignIn = async () => {
        try {
            const response = await axios.post("http://localhost:3000/api/v1/user/signin", {
                username,
                password
            });
            localStorage.setItem("token", response.data.token);
            navigate("/dashboard");
        } catch (error) {
            console.error("Sign in failed:", error);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-400 to-purple-500 flex justify-center items-center p-4">
            <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
                <Heading label="Sign In" />
                <SubHeading label="Enter your credentials to access your account" />
                
                <InputBox 
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="abc@gmail.com"
                    label="Email"
                />
                
                <InputBox 
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    label="Password"
                    type="password"
                />
                
                <div className="mt-6">
                    <Button 
                        onClick={handleSignIn}
                        label="Sign In"
                    />
                </div>
                
                <BottomWarning 
                    label="Don't have an account?"
                    buttontext="Sign up"
                    to="/signup"
                />
            </div>
        </div>
    );
}