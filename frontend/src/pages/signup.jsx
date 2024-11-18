import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Heading } from "../components/Heading";
import { SubHeading } from "../components/SubHeading";
import { InputBox } from "../components/InputBox";
import { Button } from "../components/Button";
import { BottomWarning } from "../components/BottomWarning";
import "../App.css"

export function Signup() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSignup = async () => {
        try {
            const response = await axios.post("http://localhost:3000/api/v1/user/signup", {
                username,
                firstName,
                lastName,
                password
            });
            localStorage.setItem("token", response.data.token);
            navigate("/dashboard");
        } catch (error) {
            console.error("Signup failed:", error);
            // You might want to show an error message to the user here
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-400 to-purple-500 flex justify-center items-center p-4">
            <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
                <Heading label="Sign up" />
                <SubHeading label="Enter your information to create account" />
                
                <div className="space-y-4">
                    <InputBox
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="John"
                        label="First Name"
                    />
                    <InputBox
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Doe"
                        label="Last Name"
                    />
                    <InputBox
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="john@example.com"
                        label="Email"
                        type="email"
                    />
                    <InputBox
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        label="Password"
                        type="password"
                    />
                </div>
                
                <div className="mt-6">
                    <Button
                        onClick={handleSignup}
                        label="Sign up"
                    />
                </div>
                
                <BottomWarning
                    label="Already have an account?"
                    buttontext="Sign in"
                    to="/signin"
                />
            </div>
        </div>
    );
}