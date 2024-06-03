import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserService from '../services/UserService';
import './loginSignUp.css'; // Import CSS file for additional styling
import swal from 'sweetalert';

const LoginForm: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const saveUser = async (e: React.FormEvent) => {
        e.preventDefault();

        const user = { email, password };
        // Use the correct endpoint for user signup
        try {
            const response = await UserService.signin(user);
            console.log(response.data);
            
            if (response.data.token) {
                const { token, expiresIn } = response.data;

                // Store the token and expiration time
                localStorage.setItem('token', token);
                localStorage.setItem('tokenExpiry', expiresIn);
                localStorage.setItem('login', JSON.stringify({
                    login: true,
                    token: response.data.token
                }))

                swal("Good job!", "You have successfully logged in!", "success");
                navigate('/welcome');
            } else {
                swal("Oops!", "Login failed!", "error");
            }
        } catch (error) {
            console.error(error);
            swal("Oops!", "You have entered a wrong email or password!", "error");
        }

    };
    const signup = async () => {
        navigate('/');
    };

    const mainStyle = {
        margin: 0,
        padding: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        fontFamily: 'Jost, sans-serif',
        background: 'linear-gradient(to bottom, #0f0c29, #302b63, #24243e)',
    };

    const containerStyle = {
        width: '350px',
        height: '500px',
        overflow: 'hidden',
        // background: 'red',
        backgroundImage: 'url("https://doc-08-2c-docs.googleusercontent.com/docs/securesc/68c90smiglihng9534mvqmq1946dmis5/fo0picsp1nhiucmc0l25s29respgpr4j/1631524275000/03522360960922298374/03522360960922298374/1Sx0jhdpEpnNIydS4rnN4kHSJtU1EyWka?e=view&authuser=0&nonce=gcrocepgbb17m&user=03522360960922298374&hash=tfhgbs86ka6divo3llbvp93mg4csvb38")',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center/cover',
        borderRadius: '10px',
        boxShadow: '5px 20px 50px #000',
    };

    return (
        <div style={mainStyle}>
            <div className="main" style={containerStyle}>
                <input type="checkbox" id="chk" aria-hidden="true" />
                <div className="signup">
                    <form onSubmit={saveUser}>
                        <label htmlFor="chk" aria-hidden="true">Login</label>
                        <input type="email" name="email" placeholder="Email" required value={email} onChange={(e) => setEmail(e.target.value)} />
                        <input type="password" name="pswd" placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                        <button type="submit">Login</button>
                        <button type="button" onClick={signup}>Signup</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
