--  Количество городов в каждом государстве таблица City
SELECT COUNT(city.ID),country.Name
from city,country
WHERE city.CountryCode = country.Code
GROUP BY country.Name