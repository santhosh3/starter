import React from 'react';
import Boards from './components/trello/Boards';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import List from './components/trello/List';

function App() {
  return (
       <BrowserRouter>
         <Routes>
           <Route path='/' element={<Boards />} />
           <Route path='/:boardId' element={<List />} />
           <Route path='*' element={<Navigate to="/" />} />
         </Routes>
       </BrowserRouter>
     )
}

export default App








































































// import React, { useState, useEffect, useContext } from 'react'
// import Register from './components/Auth/Register';
// import Countries from './components/Countries';
// import ShowFlag from './components/ShowFlag';
// import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
// import Login from './components/Auth/Login';
// import axios from 'axios';
// import { ThemeContext } from './components/context/Context';

// function App() {

//   const {setToken, setUser} = useContext(ThemeContext);

//   let [update, setUpdate] = useState({
//     isLoggedIn: false,
//     user: null,
//     isVerified: true
//   })

//   async function profile() {
//     try {
//       let token = await localStorage.getItem('token');
//       if (token) {
//         const response = await axios.get("http://localhost:4000/api/profile", {
//           headers: {
//             authorization: `bearer ${token}`
//           }
//         })
//         updateUser(response.data.user);
//       } else {
//         setUpdate({ isVerified: false });
//       }
//     } catch (error) {
//         console.log(error);
//         setUpdate({ isVerified: false });
//         localStorage.removeItem('token');
//         localStorage.removeItem('user');
//     }
//   }


//   useEffect(() => {
//     profile()
//   },[]);

//   function updateUser(user) {
//     setUpdate({isLoggedIn : true, isVerified : false, user});
//     localStorage.setItem("token", user.token);
//     setToken(user.token);
//     console.log(user.name);
//     setUser(user.name);
//     localStorage.setItem("user", user.name);
//   }


//   let { isLoggedIn, user, isVerified } = update;




//   if (isVerified) {
//     return (
//       <div>
//         This is main page loading....
//       </div>
//     );
//   } else if (!isLoggedIn) {
//     return (
//       <BrowserRouter>
//         <Routes>
//           <Route path='/register' element={<Register updateUser={updateUser}/>} />
//           <Route path='/login' element={<Login updateUser={updateUser}/>} />
//           <Route path='*' element={<Navigate to="/login" />} />
//         </Routes>
//       </BrowserRouter>
//     )
//   } else {
//     return (
//       <BrowserRouter>
//         <Routes>
//           <Route path='/' element={<Countries/>} />
//           <Route path='/alpha3Code/:id' element={<ShowFlag />} />
//           <Route path='*' element={<Navigate to="/" />} />
//         </Routes>
//       </BrowserRouter>
//     )
//   }
// }

// export default App

