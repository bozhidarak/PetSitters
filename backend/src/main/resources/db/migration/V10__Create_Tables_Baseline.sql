-- V10__Baseline.sql
-- Baseline Flyway migration script to create tables for the project

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    location VARCHAR(255),
    profile_pic VARCHAR(255), -- Use camelCase to match the entity
    name VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS pet_owner_offer (
    id SERIAL PRIMARY KEY,
    description TEXT,
    location VARCHAR(255),
    start_date DATE,
    end_date DATE,
    user_id INTEGER,
    CONSTRAINT fk_pet_owner_offer_user FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS pet_sitter_offer (
    offer_id SERIAL PRIMARY KEY,
    description TEXT,
    price_per_day DOUBLE PRECISION,
    available_from DATE,
    available_until DATE,
    user_id INTEGER,
    CONSTRAINT fk_pet_sitter_offer_user FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS pet (
    id SERIAL PRIMARY KEY,
    pet_type VARCHAR(255),
    number_of_pets INTEGER,
    sitter_offer_id INTEGER,
    owner_offer_id INTEGER,
    CONSTRAINT fk_pet_sitter_offer FOREIGN KEY (sitter_offer_id) REFERENCES pet_sitter_offer(offer_id),
    CONSTRAINT fk_pet_owner_offer FOREIGN KEY (owner_offer_id) REFERENCES pet_owner_offer(id)
);

CREATE TABLE IF NOT EXISTS picture (
    id SERIAL PRIMARY KEY,
    filepath VARCHAR(255) NOT NULL,
    sitter_offer_id INTEGER,
    owner_offer_id INTEGER,
    CONSTRAINT fk_picture_sitter_offer FOREIGN KEY (sitter_offer_id) REFERENCES pet_sitter_offer(offer_id),
    CONSTRAINT fk_picture_owner_offer FOREIGN KEY (owner_offer_id) REFERENCES pet_owner_offer(id)
);

CREATE TABLE IF NOT EXISTS review (
    id SERIAL PRIMARY KEY,
    stars INTEGER,
    description TEXT,
    reviewed_user_id INTEGER,
    author_id INTEGER,
    CONSTRAINT fk_review_reviewed_user FOREIGN KEY (reviewed_user_id) REFERENCES users(id),
    CONSTRAINT fk_review_author FOREIGN KEY (author_id) REFERENCES users(id)
);
