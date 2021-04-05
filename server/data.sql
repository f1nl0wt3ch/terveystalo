-- mysql -u sql4402980 -h sql4.freemysqlhosting.net sql4402980 -p
CREATE TABLE index_tb
(
    id   INT AUTO_INCREMENT PRIMARY KEY,
    name TEXT
);

CREATE TABLE unit_tb
(
    id   INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255)
);

CREATE TABLE measurement_tb
(
    id          INT AUTO_INCREMENT PRIMARY KEY,
    fk_index_id INT,
    fk_unit_id  INT,
    over        INT,
    under       INT,
    FOREIGN KEY (fk_index_id) REFERENCES index_tb (id) ON DELETE CASCADE ON UPDATE CASCADE ,
    FOREIGN KEY (fk_unit_id) REFERENCES unit_tb (id) ON DELETE CASCADE ON UPDATE CASCADE
);

INSERT INTO index_tb(name) VALUES ("Hemoglobiini"),("LDL-kolesteroli");
INSERT INTO unit_tb(name) VALUES ("g/l"),("mmol/l");
INSERT INTO measurement_tb(fk_index_id, fk_unit_id, over, under) VALUES (1,1,134,167), (2,2,0,3);

