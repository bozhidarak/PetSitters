CREATE TABLE picture (
    id SERIAL PRIMARY KEY,
    filepath VARCHAR(255) NOT NULL,
    sitter_offer_id BIGINT,
    owner_offer_id BIGINT,
    CONSTRAINT fk_sitter_offer FOREIGN KEY (sitter_offer_id)
        REFERENCES pet_sitter_offer(offer_id) ON DELETE CASCADE,
    CONSTRAINT fk_owner_offer FOREIGN KEY (owner_offer_id)
        REFERENCES pet_owner_offer(id) ON DELETE CASCADE
);
