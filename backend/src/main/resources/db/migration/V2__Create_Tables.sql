CREATE TABLE users (
                       id SERIAL PRIMARY KEY,
                       username VARCHAR(50) NOT NULL,
                       password VARCHAR(255) NOT NULL,
                       email VARCHAR(100) NOT NULL,
                       location VARCHAR(100),
                       birth_date DATE,
                       gender BOOLEAN,
                       profile_pic VARCHAR(255),
                       name VARCHAR(100)
);

CREATE TABLE pet_sitter_offer (
                                  offer_id SERIAL PRIMARY KEY,
                                  description TEXT,
                                  price_per_day DOUBLE PRECISION,
                                  available_from DATE,
                                  available_until DATE,
                                  user_id BIGINT,
                                  CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE pet_owner_offer (
                                 id SERIAL PRIMARY KEY,
                                 description TEXT,
                                 location VARCHAR(100),
                                 start_date DATE,
                                 end_date DATE,
                                 user_id BIGINT,
                                 CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE review (
                        id SERIAL PRIMARY KEY,
                        stars INTEGER,
                        description TEXT,
                        reviewed_user_id BIGINT,
                        author_id BIGINT,
                        CONSTRAINT fk_reviewed_user FOREIGN KEY (reviewed_user_id) REFERENCES users(id) ON DELETE CASCADE,
                        CONSTRAINT fk_author FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE CASCADE
);
