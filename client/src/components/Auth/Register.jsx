import React from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';

function Register({updateUser}) {
    const navigate = useNavigate();
    let [user, setUser] = React.useState({
        name: "",
        bio: "",
        password: "",
        email: "",
        role: "user"
    });

    let [error, setError] = React.useState(null);

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:4000/api/register', user);
            updateUser(response.data.user);
            navigate('/');
        } catch (error) {
            console.log(error.response.data);
            setError(error.response.data.message)
        } finally {
            setUser({name: "", bio: "", password: "", email: "", role: "user"}) 
        }
    }


    return (
        <form className="formContainer" onSubmit={handleSubmit}>
            <div className="labelContainer">
                <input
                    type="text"
                    name="name"
                    placeholder="name"
                    value={user.name}
                    onChange={(e) => setUser(prev => ({ ...prev, name: e.target.value }))}
                />
            </div>

            <div className="labelContainer">
                <input
                    type="text"
                    placeholder="bio"
                    name="bio"
                    value={user.bio}
                    onChange={(e) => setUser(prev => ({ ...prev, bio: e.target.value }))}
                />

            </div>

            <div className="labelContainer">
                <input
                    type="email"
                    name="email"
                    placeholder="email"
                    value={user.email}
                    onChange={(e) => setUser(prev => ({ ...prev, email: e.target.value }))}
                />
            </div>

            <div className="labelContainer">
                <input
                    type="password"
                    name="password"
                    placeholder="password"
                    value={user.password}
                    onChange={(e) => setUser(prev => ({ ...prev, password: e.target.value }))}
                />
            </div>

            <button type="submit">Submit</button>
            <Link to={"/login"}>
                Login
            </Link>
            { error && <p>{error}</p> }
        </form>
    )
}

export default Register