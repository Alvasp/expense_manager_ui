CREATE TABLE movement_types (
    id SERIAL PRIMARY KEY,
    "name" VARCHAR(100) NOT NULL
);

CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    "name" VARCHAR(100) NOT NULL,
    icon VARCHAR(100) NOT NULL,
    color VARCHAR(100) NOT NULL,
    "type" int not null,
    CONSTRAINT fk_categories_types FOREIGN KEY("type") REFERENCES movement_types(id)
);

CREATE TABLE movements (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    date_start date NOT NULL,
    date_end date NULL,
    recurrent boolean NOT NULL,
    category int not null,
    amount int not null,
    CONSTRAINT fk_movements_categories FOREIGN KEY(category) REFERENCES categories(id)
);

CREATE TABLE movement_exceptions (
    date_start date NOT NULL,
    movement_id int not null
);

insert into
    movement_types ("name")
values
    ('income'),
    ('expense');

insert into
    categories ("name", icon, color, "type")
values
    ('Salary', 'work', 'blue', 1),
    ('Hogar', 'home', 'red', 2);