CREATE TABLE movement_types (
    id SERIAL PRIMARY KEY,
    "name" VARCHAR(100) NOT NULL
);

CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    "name" VARCHAR(100) NOT NULL,
    icon VARCHAR(100) NOT NULL,
    "type" int not null,
    "system" boolean not null default false,
    CONSTRAINT fk_categories_types FOREIGN KEY("type") REFERENCES movement_types(id)
);

CREATE TABLE accounts (
    id SERIAL PRIMARY KEY,
    "name" VARCHAR(100) NOT NULL,
    "system" boolean not null default false
);

CREATE TABLE movements (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    date_start date NOT NULL,
    date_end date NULL,
    recurrent boolean NOT NULL,
    category int not null,
    amount int not null,
    account_id int not null,
    CONSTRAINT fk_movements_categories FOREIGN KEY(category) REFERENCES categories(id),
    CONSTRAINT fk_movements_accounts FOREIGN KEY(account_id) REFERENCES accounts(id)
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

INSERT INTO public.accounts ("name","system") VALUES
	 ('visa',false);


INSERT INTO public.categories ("name",icon,"type","system") VALUES
	 ('Salary','work',1,false),
	 ('Unassigned','indeterminate_question_box',1,true),
	 ('Unassigned','indeterminate_question_box',2,true),
	 ('Awards','emoji_events',1,false),
	 ('Investment','price_change',1,false),
	 ('Renting','bedroom_parent',1,false),
	 ('Sales','attach_money',1,false),
	 ('Home','home',2,false),
	 ('Commuting','commute',2,false),
	 ('Savings','savings_account',2,false);
INSERT INTO public.categories ("name",icon,"type","system") VALUES
	 ('Shopping','shopping_cart_checkout',2,false),
	 ('Vacations','card_giftcard',2,false),
	 ('Cryptos','currency_bitcoin',2,false);
