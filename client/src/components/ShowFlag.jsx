import React, {useEffect, useState, useContext} from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios';
import "./Countries.css";
import Helper from './Helper';
import { ThemeContext } from './context/Context';


function ShowFlag() {
  const {id} = useParams();
  const {country} = useContext(ThemeContext);

  console.log(country);
  
    let [flag, setFlag] = useState({
      loading : true,
      data : {},
      error : null
   })

   async function getCountryData() {
       try {
          // const response = await axios.get(`http://localhost:4000/flag/${id}`);
          const isoAlpha3 = country.data.map(item => item.isoAlpha3);
          const obj = country.data.find(item => item.isoAlpha3 === id);
          const response = {isoAlpha3, obj};
          setFlag(prev => ({...prev, data : response, loading : false}))
       } catch (error) {
          setFlag(prev => ({...prev, error : error.message}))
       } 
   }

   useEffect(() => {
    getCountryData()
   },[id])

   const {loading, data, error} = flag;

    if(loading) {
    return (
        <div>
            Loading....
        </div>
    )
  }

  if(error !== null) {
    return (
        <div>
            {error}
        </div>
    )
  } 
  
  return (
    <div className = "Flagcontainer">
      <div>
          <img src={`data:image/png;base64,${data.obj.flag}`} alt={data.obj.name} width={150} height={150}/>
      </div>
      <div>
          <p>{data.obj.name}</p>
          <Helper data={data}/>
      </div>
    </div>
  )
}

export default ShowFlag