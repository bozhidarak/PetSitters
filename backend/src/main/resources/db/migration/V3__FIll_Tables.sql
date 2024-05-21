-- Insert data into users table
INSERT INTO users (username, password, email, location, birth_date, gender, profile_pic, name)
VALUES
    ('user1', 'password1', 'user1@example.com', 'Location1', '1990-01-01', TRUE, 'pic1.jpg', 'User One'),
    ('user2', 'password2', 'user2@example.com', 'Location2', '1992-02-02', FALSE, 'pic2.jpg', 'User Two');

-- Insert data into pet_sitter_offer table
INSERT INTO pet_sitter_offer (description, price_per_day, available_from, available_until, user_id)
VALUES
    ('Pet sitting service 1', 20.0, '2023-06-01', '2023-06-30', 1),
    ('Pet sitting service 2', 25.0, '2023-07-01', '2023-07-31', 2);

-- Insert data into pet_owner_offer table
INSERT INTO pet_owner_offer (description, location, start_date, end_date, user_id)
VALUES
    ('Pet owner offer 1', 'Location1', '2023-06-01', '2023-06-30', 1),
    ('Pet owner offer 2', 'Location2', '2023-07-01', '2023-07-31', 2);

-- Insert data into review table
INSERT INTO review (stars, description, reviewed_user_id, author_id)
VALUES
    (5, 'Great service!', 2, 1),
    (4, 'Good experience', 1, 2);
