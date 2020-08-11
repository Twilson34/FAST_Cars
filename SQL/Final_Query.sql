CREATE TABLE "mmy" (
    "make" VARCHAR   NOT NULL,
    "model" VARCHAR   NOT NULL,
    "year" INT   NOT NULL,
    CONSTRAINT "pk_mmy" PRIMARY KEY (
        "make","model","year"
     )
);

CREATE TABLE "cars" (
    "make" VARCHAR   NOT NULL,
    "model" VARCHAR   NOT NULL,
    "year" INT   NOT NULL,
    "mpg" INT   NOT NULL,
    "fuel" VARCHAR,
    "size_class" VARCHAR,
    "cylinders" INT,
    "displacement_liters" DECIMAL,
    "drive" VARCHAR,
    "transmission" VARCHAR,
    "super_charger" BOOLEAN,
    "turbo_charger" BOOLEAN
);

CREATE TABLE "craigs_list" (
    "make" VARCHAR   NOT NULL,
    "model" VARCHAR   NOT NULL,
    "year" INT   NOT NULL,
    "craigslist_price" INT   NOT NULL,
    "image_url" VARCHAR,
    "description" VARCHAR,
    "paint_color" VARCHAR,
    "state" VARCHAR   NOT NULL,
    "city" VARCHAR   NOT NULL,
    "lat" FLOAT   NOT NULL,
    "lng" FLOAT   NOT NULL
);

CREATE TABLE "gas_cost" (
    "state" VARCHAR   NOT NULL,
    "regular" FLOAT   NOT NULL,
    "mid-grade" FLOAT   NOT NULL,
    "premium" FLOAT   NOT NULL,
    "diesel" FLOAT   NOT NULL,
    CONSTRAINT "pk_gas_cost" PRIMARY KEY (
        "state"
     )
);

ALTER TABLE "cars" ADD CONSTRAINT "fk_cars_make_model_year" FOREIGN KEY("make", "model", "year")
REFERENCES "mmy" ("make", "model", "year");

ALTER TABLE "craigs_list" ADD CONSTRAINT "fk_craigs_list_make_model_year" FOREIGN KEY("make", "model", "year")
REFERENCES "mmy" ("make", "model", "year");

ALTER TABLE "craigs_list" ADD CONSTRAINT "fk_craigs_list_state" FOREIGN KEY("state")
REFERENCES "gas_cost" ("state");

/* I was getting thrown an error about an int out of range */
ALTER TABLE "craigs_list" ALTER COLUMN "craigslist_price" TYPE BIGINT;

SELECT * FROM cars

SELECT cl.Make, cl.Model, cl.Year, cl.craigslist_price, cl.lat, cl.lng, c.mpg 
FROM craigs_list cl JOIN cars c on cl.make = c.make AND cl.model = c.model AND cl.year = c.year
ORDER BY cl.Make DESC
