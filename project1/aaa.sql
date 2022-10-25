SELECT country.Continent,country.Name,city.Name as "city_name",city.Population FROM city,country
WHERE country.Code = city.CountryCode;