import axios from "axios";
import { CountryType, Data } from "../types/data";

export const fetchData = async (): Promise<CountryType[]> => {
  const response = await axios.get<Data[]>(
    "https://restcountries.com/v3.1/all"
  );
  const data = response.data;

  // isSelected, index 있는 데이터로 변경
  const countryData: CountryType[] = data.map((country) => ({
    cca2: country.cca2,
    flags: country.flags,
    name: country.name,
    capital: country.capital,
    isSelected: false,
  }));

  return countryData;
};
