import React, {useState} from "react";
import './style/Register.css';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  localStorage.setItem('hasCreatedCharacter', 'false');

  const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/register', {
                email,
                password
            });

            localStorage.setItem('token', response.data.token);
            navigate('/character');
        } catch (error) {
            console.error('Register failed:', error);
        }
    };

    return (
        <div className="register-container">
        <div className="register-card">
          <form className="register-form" onSubmit={handleSubmit}>
            <h2>Register</h2>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit">Register</button>
          </form>
        </div>
      </div>
    );
}

export default RegisterPage;