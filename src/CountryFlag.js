import { useState, React, useEffect } from "react";

const CountryInfo = ({ name, flag, altText }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: "5px", padding: "10px" }}>
      <img src={flag} alt={altText} />
      <h2>{name}</h2>
    </div>
  );
};

const CountryFlag = () => {
  const [countries, setCountries] = useState([]);
  const [error, setError] = useState(null);

  const fetchApi = async () => {
    try {
      const response = await fetch("https://xcountries-backend.azurewebsites.net/all");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const responseJson = await response.json();
      setCountries(responseJson);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to fetch country data. Please try again later.");
    }
  };

  useEffect(() => {
    fetchApi();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {countries.map((item) => (
        <CountryInfo key={item.abbr} name={item.name} flag={item.flag} altText={item.abbr} />
      ))}
    </div>
  );
};

export default CountryFlag;
