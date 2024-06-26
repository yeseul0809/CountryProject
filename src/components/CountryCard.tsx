import { CountryType } from "../types/data";

interface CountryCardProps {
  country: CountryType;
}

const CountryCard = ({ country }: CountryCardProps) => {
  return (
    <>
      <div>
        <img src={country.flags.svg} alt={`${country.name.common} flag`} />
        <h3>{country.name.common}</h3>
        <p>Capital: {country.capital}</p>
      </div>
    </>
  );
};

export default CountryCard;
