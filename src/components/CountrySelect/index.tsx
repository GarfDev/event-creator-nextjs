import { COUNTRIES } from "@/constants/COUNTRIES";
import { DetailedHTMLProps, SelectHTMLAttributes } from "react";
import styled from "styled-components";

type Props = DetailedHTMLProps<
  SelectHTMLAttributes<HTMLSelectElement>,
  HTMLSelectElement
>;

const CountrySelect = ({ ...rest }: Props) => {
  return (
    <Select {...rest} className={rest.className + ' p-2'}>
      {COUNTRIES.map((country) => (
        <option key={country.code} value={country.code}>
          {country.name}
        </option>
      ))}
    </Select>
  );
};

export default CountrySelect;

const Select = styled.select`
  background: white;
` as any;
