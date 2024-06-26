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
    const favoriteCountry = { ...country, isSelected: !country.isSelected };

    setData((prevData) =>
      prevData.map((clickCountry) =>
        clickCountry.cca2 === country.cca2 ? favoriteCountry : clickCountry
      )
    );

    if (favoriteCountry.isSelected) {
      setSelectedCountries((prevSelected) => [
        ...prevSelected,
        favoriteCountry,
      ]);
    } else {
      setSelectedCountries((prevSelected) =>
        prevSelected.filter(
          (clickCountry) => clickCountry.cca2 !== country.cca2
        )
      );
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div>
        <h1 className="text-3xl font-bold text-center mb-8">
          Favorite Countries
        </h1>
        <div className="country-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {selectedCountries.map((country) => (
            <CountryCard
              key={country.cca2}
              country={country}
              onClick={() => handleAddCountry(country)}
              isSelected={true}
            />
          ))}
        </div>
      </div>
      <div>
        <h1 className="text-3xl font-bold text-center mt-8 mb-8">Countries</h1>
        <div className="country-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {data
            .filter((country) => !country.isSelected)
            .map((country) => (
              <CountryCard
                key={country.cca2}
                country={country}
                onClick={() => handleAddCountry(country)}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

export default CountryList;
