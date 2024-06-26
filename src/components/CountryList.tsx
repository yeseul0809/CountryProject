import { useEffect, useState } from "react";
import { fetchData } from "../api/fetchdata";
import { CountryType } from "../types/data";
import CountryCard from "./CountryCard";
import { AxiosError } from "axios";

function CountryList() {
  const [data, setData] = useState<CountryType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<AxiosError | null>(null);
  const [selectedCountries, setSelectedCountries] = useState<CountryType[]>([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchData();
        setData(data);
        console.log(data);
      } catch (err) {
        if (err instanceof AxiosError) {
          setError(err);
        } else {
          console.error(err);
        }
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const handleAddCountry = (country: CountryType) => {
    const favoriteCountry = { ...country, isDone: !country.isDone };

    setData((prevData) =>
      prevData.map((item) =>
        item.cca2 === country.cca2 ? favoriteCountry : item
      )
    );

    if (favoriteCountry.isDone) {
      setSelectedCountries((prevSelected) => [
        ...prevSelected,
        favoriteCountry,
      ]);
    } else {
      setSelectedCountries((prevSelected) =>
        prevSelected.filter((item) => item.cca2 !== country.cca2)
      );
    }
  };

  return (
    <>
      <div>
        <h2>Favorite Countries</h2>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
          {selectedCountries.map((country) => (
            <CountryCard
              key={country.cca2}
              country={country}
              onClick={() => handleAddCountry(country)}
            />
          ))}
        </div>
      </div>
      <div>
        <h2>Countries</h2>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
          {data
            .filter((country) => !country.isDone)
            .map((country) => (
              <CountryCard
                key={country.cca2}
                country={country}
                onClick={() => handleAddCountry(country)}
              />
            ))}
        </div>
      </div>
    </>
  );
}

export default CountryList;
