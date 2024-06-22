-- V11__Insert_initial_data.sql
-- Flyway migration script to insert initial data into the tables

INSERT INTO users (password, email, location, name) VALUES
('password123', 'user1@example.com', 'New York', 'John Doe'),
('password456', 'user2@example.com', 'Los Angeles', 'Jane Smith');
