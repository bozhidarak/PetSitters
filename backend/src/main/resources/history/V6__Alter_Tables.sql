ALTER TABLE users ADD COLUMN pet_sitter_offer_id BIGINT;

ALTER TABLE users ADD COLUMN reviewed_user_id BIGINT;

ALTER TABLE users
    ADD CONSTRAINT fk_pet_sitter_offer
        FOREIGN KEY (pet_sitter_offer_id)
            REFERENCES pet_sitter_offer(offer_id);

ALTER TABLE review ADD CONSTRAINT uq_reviewed_user_id UNIQUE (reviewed_user_id);

ALTER TABLE users
    ADD CONSTRAINT fk_reviewed_user
        FOREIGN KEY (reviewed_user_id)
            REFERENCES review(reviewed_user_id);

ALTER TABLE picture
    ADD CONSTRAINT fk_picture_pet_sitter_offer
        FOREIGN KEY (sitter_offer_id)
            REFERENCES pet_sitter_offer(offer_id)
            ON DELETE CASCADE;

ALTER TABLE pet
    ADD CONSTRAINT fk_pet_pet_sitter_offer
        FOREIGN KEY (sitter_offer_id)
            REFERENCES pet_sitter_offer(offer_id)
            ON DELETE CASCADE;

ALTER TABLE picture
    ADD CONSTRAINT fk_picture_pet_owner_offer
        FOREIGN KEY (owner_offer_id)
            REFERENCES pet_owner_offer(id)
            ON DELETE CASCADE;

ALTER TABLE pet
    ADD CONSTRAINT fk_pet_pet_owner_offer
        FOREIGN KEY (owner_offer_id)
            REFERENCES pet_owner_offer(id)
            ON DELETE CASCADE;
