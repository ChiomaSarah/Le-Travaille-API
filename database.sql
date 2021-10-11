CREATE DATABASE jobboard;

CREATE TABLE job_seeker(
    user_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    age INTEGER NOT NULL,
    degree VARCHAR(255) NOT NULL,
    experience VARCHAR(50) NOT NULL,
    location VARCHAR(255) NOT NULL,
    image_url VARCHAR(255) NOT NULL,
    cloudinary_id VARCHAR(255) NOT NULL
);
