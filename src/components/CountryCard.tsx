import { CountryType } from "../types/data";

interface CountryCardProps {
  country: CountryType;
  onClick: React.MouseEventHandler<HTMLDivElement>;
}

function CountryCard({ country, onClick }: CountryCardProps) {
  return (
    <>
      <div onClick={onClick}>
        <img src={country.flags.svg} alt={`${country.name.common} flag`} />
        <h3>{country.name.common}</h3>
        <p>Capital: {country.capital}</p>
      </div>
    </>
  );
}

export default CountryCard;
