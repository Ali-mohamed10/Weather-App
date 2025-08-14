import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function SelectDemo({ cities, handleCityChange }) {
  return (
    <Select
      onValueChange={(value) => {
        handleCityChange(value);
      }}
    >
      <SelectTrigger className="w-[180px] cursor-pointer bg-blue-400 border-none">
        <SelectValue placeholder="Select a city" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Cities</SelectLabel>
          {cities.map((city, index) => (
            <SelectItem key={index} value={JSON.stringify(city)}>
              {city.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
