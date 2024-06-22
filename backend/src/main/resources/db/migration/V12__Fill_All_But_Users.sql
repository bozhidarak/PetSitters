-- V12__Insert_initial_data.sql
-- Flyway migration script to insert initial data into the tables

INSERT INTO pet_owner_offer (description, location, start_date, end_date, user_id) VALUES
('Looking for a pet sitter for my dogs', 'New York', '2023-07-01', '2023-07-10', 1),
('Need someone to take care of my cats', 'Los Angeles', '2023-08-01', '2023-08-15', 2);

INSERT INTO pet_sitter_offer (description, price_per_day, available_from, available_until, user_id) VALUES
('Experienced pet sitter available', 25.00, '2023-06-01', '2023-12-31', 1),
('Loving pet sitter with flexible hours', 30.00, '2023-06-15', '2023-11-30', 2);

INSERT INTO pet (pet_type, number_of_pets, sitter_offer_id, owner_offer_id) VALUES
('DOG', 2, NULL, 1),
('CAT', 3, NULL, 2),
('DOG', 1, 1, NULL);

INSERT INTO review (stars, description, reviewed_user_id, author_id) VALUES
(5, 'Great service!', 2, 1),
(4, 'Very good experience', 1, 2);
