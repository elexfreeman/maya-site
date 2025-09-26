-- Schema change: add `uri` column for clean URLs
-- Run once in your DB:
-- ALTER TABLE products ADD COLUMN uri VARCHAR(128) NOT NULL UNIQUE AFTER id;

-- INSERTs updated to include `uri` field

INSERT INTO products (caption, description, tags, img, uri) VALUES
('Букет пионов', 'Акварель на бумаге, 30×40 см', 'Оригинал, 2024, В наличии', '/img/IMG_8886.jpg', 'buket-pionov');

INSERT INTO products (caption, description, tags, img, uri) VALUES
('Утро у моря', 'Акварель на бумаге, 40×50 см', 'Оригинал, 2023, В наличии', '/img/IMG_8886.jpg', 'utro-u-morya');

INSERT INTO products (caption, description, tags, img, uri) VALUES
('Эвкалипт', 'Акварель на бумаге, 21×30 см (A4)', 'Оригинал, 2024, В наличии', '/img/IMG_8886.jpg', 'evkalipt-a4');

INSERT INTO products (caption, description, tags, img, uri) VALUES
('Закат в горах', 'Акварель на бумаге, 30×40 см', 'Оригинал, 2023, В наличии', '/img/IMG_8886.jpg', 'zakat-v-gorah');

INSERT INTO products (caption, description, tags, img, uri) VALUES
('Белые тюльпаны', 'Акварель на бумаге, 21×30 см (A4)', 'Оригинал, 2024, В наличии', '/img/IMG_8886.jpg', 'belye-tyulpany-a4');

INSERT INTO products (caption, description, tags, img, uri) VALUES
('Зелёная ветвь', 'Акварель на бумаге, 30×40 см', 'Оригинал, 2024, В наличии', '/img/IMG_8886.jpg', 'zelenaya-vetv-30x40');
