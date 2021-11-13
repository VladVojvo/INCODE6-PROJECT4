CREATE TABLE IF NOT EXISTS users (
    userid SERIAL PRIMARY KEY,
    firstname VARCHAR(100) NOT NULL,
    lastname VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL,
    hashPwd VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS Schedules (
    scheduleID SERIAL PRIMARY KEY,
    userid int NOT NULL,
    sday VARCHAR(100) NOT NULL,
    start_at VARCHAR(100) NOT NULL,
    end_at VARCHAR(100) NOT NULL,
    FOREIGN KEY (userid) REFERENCES users(userid)
);