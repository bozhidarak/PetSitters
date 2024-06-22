-- Begin transaction
BEGIN;

-- Insert a new user
INSERT INTO users (username, password, email, location, birth_date, gender, profile_pic, name)
VALUES ('testuser', 'password123', 'testuser@example.com', '123 Test St', '1990-01-01', TRUE, 'profile_pic_url', 'Test User');

-- Insert a new pet owner offer
INSERT INTO pet_owner_offer (description, location, start_date, end_date, user_id)
VALUES ('Pet owner offer description', '123 Pet St', '2023-01-01', '2023-12-31', 2);

-- Insert two pets for the pet owner offer
INSERT INTO pet (pet_type, number_of_pets, owner_offer_id)
VALUES ('DOG', 1, 2);

INSERT INTO pet (pet_type, number_of_pets, owner_offer_id)
VALUES ('CAT', 1, 2);

COMMIT;
