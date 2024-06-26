import { CountryType } from "../types/data";

interface CountryCardProps {
  country: CountryType;
  isSelected?: boolean;
  onClick: React.MouseEventHandler<HTMLDivElement>;
}

function CountryCard({
  country,
  isSelected = false,
  onClick,
}: CountryCardProps) {
  return (
    <>
      <div
        className={`p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-transform transform cursor-pointer ${
          isSelected ? "bg-pink-100 border border-pink-500" : "border-none"
        }`}
        onClick={onClick}
      >
        <img
          className="w-20 h-auto mx-auto mb-4"
          src={country.flags.svg}
          alt={`${country.name.common} flag`}
        />
        <h3 className="text-xl font-semibold mb-2">{country.name.common}</h3>
        <p className="text-gray-600">{country.capital}</p>
      </div>
    </>
  );
}

export default CountryCard;
