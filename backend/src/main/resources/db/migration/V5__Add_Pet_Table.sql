CREATE TABLE IF NOT EXISTS pet (
                     id SERIAL PRIMARY KEY,
                     pet_type VARCHAR(255) NOT NULL,
                     number_of_pets INT,
                     sitter_offer_id BIGINT,
                     owner_offer_id BIGINT,
                     FOREIGN KEY (sitter_offer_id) REFERENCES pet_sitter_offer(offer_id),
                     FOREIGN KEY (owner_offer_id) REFERENCES pet_owner_offer(id)
);

