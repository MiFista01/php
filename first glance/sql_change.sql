CREATE TABLE games(
    ID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name NVARCHAR(500),
    genres NVARCHAR(500),
    description NVARCHAR(500),
    developer NVARCHAR(500),
    poster NVARCHAR(500),
    anchor NVARCHAR(500)
);
INSERT INTO games (name, genres, description,developer,poster,anchor) 
VALUES ("$name",'$genres','$des',"$dev","$poster","$anchor");
INSERT INTO persons(FirstName,LastName,Address,City) 
VALUES ("Dima","Kreivald","no information","Narva");