-- Exported from QuickDBD: https://www.quickdatabasediagrams.com/
-- Link to schema: https://app.quickdatabasediagrams.com/#/d/bewOyV
-- NOTE! If you have used non-SQL datatypes in your design, you will have to change these here.


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

