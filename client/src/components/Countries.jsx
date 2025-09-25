import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import "./Countries.css";
import { Link } from 'react-router-dom';
import { ThemeContext } from './context/Context';


function Countries() {
    const { theme, setTheme, country, setCountry, token, user } = useContext(ThemeContext);

    const [fdata, setFdata] = useState(country);

    async function getCountryData() {
        try {
            const response = await axios.get('http://localhost:4000/flag', {
                headers: {
                    authorization: `bearer ${token}`
                }
            });
            setCountry(prev => ({ ...prev, data: response.data, loading: false }));
            setFdata(prev => ({ ...prev, data: response.data, loading: false }))
        } catch (error) {
            setCountry(prev => ({ ...prev, error: error.message }))
        }
    }

   
    function setCountriesByFilter(filter) {
        let countries = country.data.filter(x => x.name.toLowerCase().includes(filter.toLowerCase()));
        setFdata(prev => ({ ...prev, data: countries }));
    }

    useEffect(() => {
        getCountryData();
    }, [token])

    const { loading, data, error } = fdata;

    if (loading && token.length > 0) {
        return (
            <div>
                Loading....
            </div>
        )
    }

    if (error !== null) {
        return (
            <div>
                {error}
            </div>
        )
    }

    return (
        <div>
            {user}
            <div>
                <input
                    placeholder="filter country...."
                    onChange={(e) => setCountriesByFilter(e.target.value)}
                />
        
            </div>
            <div className="CountryContainer">
                {
                    data.map((item) => (
                        <Link to={`/alpha3Code/${item.isoAlpha3}`} key={item.id} className="flagContainer">
                            <img src={`data:image/png;base64,${item.flag}`} alt={item.name} width={150} height={150} />
                            <p className="name">{item.name}</p>
                        </Link>
                    ))
                }
            </div>
        </div>
    )
}

export default Countries

