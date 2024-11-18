import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import { Heading } from "../components/Heading";
import { SubHeading } from "../components/SubHeading";
import { InputBox } from "../components/InputBox";
import { Button } from "../components/Button";

export function SendMoney() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const id = searchParams.get("id");
    const name = searchParams.get("name");
    const [amount, setAmount] = useState(0);

    const handleTransfer = async () => {
        try {   
           const res = await axios.post(
                "http://localhost:3000/api/v1/account/transfer",
                {
                    to: id,
                    amount
                },
                {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token")
                    }
                }
            );

            navigate('/transferdone');
       
        } catch (error) {
            if (error.response) {
                console.error('Error response data:', error.response.data);
                console.error('Error response status:', error.response.status);
                console.error('Error response headers:', error.response.headers);
            } else if (error.request) {
                console.error('Error request:', error.request);
            } else {
                console.error('Error message:', error.message);
            }
            console.error('Error config:', error.config);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-400 to-purple-500 flex justify-center items-center p-4">
            <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
                <Heading label="Send Money" />
                <SubHeading label={`Sending money to ${name}`} />
                
                <div className="flex items-center space-x-4 my-6">
                    <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                        <span className="text-2xl text-white">{name[0].toUpperCase()}</span>
                    </div>
                    <h3 className="text-2xl font-semibold">{name}</h3>
                </div>
                
                <InputBox 
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Enter amount"
                    label="Amount (in Rs)"
                    type="number"
                />
                
                <div className="mt-6">
                    <Button 
                        onClick={handleTransfer}
                        label="Initiate Transfer"
                    />
                </div>
            </div>
        </div>
    );
}