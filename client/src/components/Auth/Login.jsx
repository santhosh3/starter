import React from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';

function Login({updateUser}) {
    const navigate = useNavigate();

    let [user, setUser] = React.useState({     
        password: "",
        email: "",
    });

    let [error, setError] = React.useState(null);

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:4000/api/login', user);
            updateUser(response.data.user);
            navigate('/');
        } catch (error) {
            console.log(error.response.data);
            setError(error.response.data.message)
        } finally {
            setUser({password: "", email: ""}) 
        }
    }


    return (
        <form className="formContainer" onSubmit={handleSubmit}>
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
            if not login please
            <Link to={"/register"}>
              register
            </Link>
            { error && <p>{error}</p> }
        </form>
    )
}

export default Login