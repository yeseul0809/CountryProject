import { useEffect, useState } from "react";
import { fetchData } from "../api/fetchdata";
import { CountryType } from "../types/data";
import CountryCard from "./CountryCard";
import { AxiosError } from "axios";

const CountryList: React.FC = () => {
  const [data, setData] = useState<CountryType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<AxiosError | null>(null);
  //   const [selectedCountries, setSelectedCountries] = useState<CardType[]>([]);

  useEffect(() => {
    const getdata = async () => {
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

    getdata();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>error</div>;
  }

  return (
    <>
      <h2>Countries</h2>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
        {data.map((country) => (
          <CountryCard
            key={country.cca2}
            country={{
              flags: country.flags,
              name: country.name,
              capital: country.capital,
            }}
          />
        ))}
      </div>
    </>
  );
};

export default CountryList;
