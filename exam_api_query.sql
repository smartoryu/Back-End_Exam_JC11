SELECT * FROM exam_api.movies;
SELECT * FROM exam_api.categories;
SELECT * FROM exam_api.movcat ORDER BY idmovie;
SELECT * FROM exam_api.users;

SELECT id FROM exam_api.categories;

-- SELECT * FROM categories WHERE name LIKE '%drama%' ORDER BY id LIMIT ${startIndex}, ${limit}
SELECT * FROM categories WHERE name LIKE '%dr%' ORDER BY id LIMIT 0, 1;
SELECT * FROM movies WHERE name LIKE '%frozen%' ORDER BY id;

SELECT * FROM movies WHERE name LIKE '%a%';
SELECT * FROM movies WHERE name = 'Fast X';

INSERT INTO `exam_api`.`movies` (`name`, `year`, `description`) VALUES ('Equalizer', '2012', 'keren abis');
INSERT INTO `exam_api`.`movies` (`name`, `year`, `description`) VALUES ('Transformer', '2010', 'boleh lah');
INSERT INTO `exam_api`.`movies` (`name`, `year`, `description`) VALUES ('Frozen', '2014', 'oke deh');

INSERT INTO `exam_api`.`categories` (`name`) VALUES ('Cartoon');
INSERT INTO `exam_api`.`categories` (`name`) VALUES ('Drama');
INSERT INTO `exam_api`.`categories` (`name`) VALUES ('Mellow');
INSERT INTO `exam_api`.`categories` (`name`) VALUES ('Horror');

INSERT INTO `exam_api`.`movcat` VALUES ('1', '1');
INSERT INTO `exam_api`.`movcat` VALUES ('1', '2');
INSERT INTO `exam_api`.`movcat` VALUES ('2', '1');
INSERT INTO `exam_api`.`movcat` VALUES ('2', '3');
INSERT INTO `exam_api`.`movcat` VALUES ('4', '4');
INSERT INTO `exam_api`.`movcat` VALUES ('5', '2');
INSERT IGNORE INTO `exam_api`.`movcat` VALUES ('2', '2');

SELECT m.name AS 'Movie Name', c.name AS 'Category Name' FROM movies m INNER JOIN movcat mc ON m.id=mc.idmovie INNER JOIN categories c ON mc.idcategory=c.id ORDER BY mc.idmovie;