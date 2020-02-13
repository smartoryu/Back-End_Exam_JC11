SELECT * FROM exam_api.movies;
SELECT * FROM exam_api.categories;
SELECT * FROM exam_api.movcat ORDER BY idmovie;
SELECT * FROM exam_api.users;

SELECT id FROM exam_api.categories;

SELECT * FROM exam_api.categories ORDER BY id LIMIT 0, 5;

SELECT name FROM movies where name = 'Fast X';

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