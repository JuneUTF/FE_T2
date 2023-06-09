import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom';

function User() {
    const userName = useParams();
    const [userData,setUserData]=useState("");
    useEffect(() => {
      axios.get('http://localhost:8080/mypage/'+userName.username, {
        headers: {
          'Content-Type': 'application/json'
        }})
    .then(response =>{
      console.log(response)
      if(response.data!==undefined){
          setUserData(response.data[0])
        }
    })
    .catch(e=>{

    })
  }, [1])
      if(userData===undefined){
        return(
          <>
          <h1>ユーザー名が存じませんません</h1>
          </>
        )
      }else{
        return(
          <>
          <h1>{userData.username}</h1>
      <table>
        <tbody>
        <tr>
          <td>ユーザー名：</td>
          <td>{userData.username}</td>
        </tr>
        <tr>
          <td>ビザID：：</td>
          <td>{userData.visa_id}</td>
        </tr>
        <tr>
          <td>名前：</td>
          <td>{userData.name}</td>
        </tr>
        <tr>
          <td>生年月日：</td>
          <td>{userData.birthday}</td>
        </tr>
        <tr>
          <td>性別：</td>
          <td>{userData.sex}</td>
        </tr>
        <tr>
          <td>国籍：</td>
          <td>{userData.country}</td>
        </tr>
        <tr>
          <td>住所：</td>
          <td>{userData.address}</td>
        </tr>
      <tr>
          <td>ビザ期限：</td>
          <td >{userData.visa_date}</td>
        </tr>
        <tr>
          <td>在留資格：</td>
          <td >{userData.visa_type}</td>
        </tr>
        </tbody>
      </table>
      <Link to="/logout">logout</Link><br></br>
      <Link to="/admin">admin</Link><br></br>
      <Link to="/login">login</Link>
      </>
    )
  }
}

export default User