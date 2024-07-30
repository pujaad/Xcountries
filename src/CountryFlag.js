import {useState,React, useEffect} from "react";

const CountryInfo=({name,flag,altText})=>{
    return (
        <div style={{display:"flex", flexDirection: "column" , justifyContent:"center",alignItems:"center",gap:"5px",padding:"10px"}}>
        <img src={flag} alt={altText}/>
        <h2>{name}</h2>
        </div>
    )
}


const CountryFlag=()=>{
    const [country,setCountries]=useState([])
    const fetchApi=async()=>{
        try{
      let response= await fetch("https://xcountries-backend.azurewebsites.net/all")
      let responseJson= await response.json()
         setCountries(responseJson)
    }catch(error){
        console.log(error)
    }
}
    useEffect(()=>{
       fetchApi()
    },[])
    return(
        <div style={{display:"flex" ,flexWrap:"wrap"}}>
        {country.map((item)=>(
          <CountryInfo name={item.name} flag={item.flag} altText={item.abbr}/>
        ))}
        
        </div>
    )
}
export default CountryFlag;