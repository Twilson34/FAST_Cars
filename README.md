# Project-2
<<<<<<< HEAD


Contributors: 
  (1) TJ Wilson
  (2) Frank DeMauro
  (3) Stephen Marshall


Purpose:

Our goal for this project was to develop a dashaboard that was built off of high quality data sources that would assist individuals in looking for the best information on used cars from craigslist in the entire US. We help them in doing this by providing multiple data sets that include (1) available cars on craigslist for the month of May 2020 (2) a refined directory of each car's mpg rating and (3) the average gas price in each state and combined all of that information into a comprehensible dashboard that allows the user to filter through the data on a standard web browser.

We believe that we accomplished this goal by providing the user enough data and dashboard elements inorder to be able to turn a profit in the used car market.

SQL Database:

We decided to develop an SQL database purely due to the relationship our data sets were going to have with each other. Our database came with the challenge of developing primary keys that would be consistent across all databases. We came to the conclusion that using Composite Primary Keys for make, model, and year would be the variables to make as primary keys because it was the most identifiable and consistent variable in our datasets.

Datasets

craigs_list:
=======

### Purpose:

Our goal for this project was to develop a dashaboard that was built off of high quality data sources that would assist individuals in looking for the best information on used cars from craigslist in the entire US. We help them in doing this by providing multiple data sets that include (1) available cars on craigslist for the month of January 2020 (2) a refined directory of each car's mpg rating and (3) the average gas price in each state and combined all of that information into a comprehensible dashboard that allows the user to filter through the data on a standard web browser.

We believe that we accomplished this goal by providing the user enough data and dashboard elements inorder to be able to turn a profit in the used car market.

### SQL Database:

We decided to develop an SQL database purely due to the relationship our data sets were going to have with each other. Our database came with the challenge of developing primary keys that would be consistent across all databases. We came to the conclusion that using Composite Primary Keys for make, model, and year would be the variables to make as primary keys because it was the most identifiable and consistent variable in our datasets.

### Datasets

#### craigs_list:
>>>>>>> abf776fde05f4222ab98a595d9821f881c5f1e5a

Obtained at: https://www.kaggle.com/austinreese/craigslist-carstrucks-data

Last Updated: 2020 This data is scraped every few months, it contains most all relevant information that Craigslist provides on car sales including columns like price, condition, manufacturer, latitude/longitude, and 18 other categories

Contains: make, model, year, price, condition, description, image, location (lat, long: This can be used to assess distance to buyers home state for calculating gas price)
<<<<<<< HEAD

mpg:

mpg: Obtained at: https://www.fueleconomy.gov/feg/download.shtml
=======
​
#### mpg:

Obtained at: https://www.fueleconomy.gov/feg/download.shtml
>>>>>>> abf776fde05f4222ab98a595d9821f881c5f1e5a

Last Updated: Tuesday June 16 2020. Datasets are for all model years (1984–2021), most cars sold on craigs list are older models, and thus covered under this dataset

Fuel economy data are the result of vehicle testing done at the Environmental Protection Agency's National Vehicle and Fuel Emissions Laboratory in Ann Arbor, Michigan, and by vehicle manufacturers with oversight by EPA.

Contains: make, model, year, engine specs, expected mpg

<<<<<<< HEAD
gas_price:

Obtained using API at: https://gasprices.aaa.com/state-gas-price-averages/

Contains: state, price per gallon (Regular, Mid-Grade, Premium, Diesel)
=======
#### gas_price:

Obtained using API at: https://gasprices.aaa.com/state-gas-price-averages/

Contains: state, price per gallon (Regular, Mid-Grade, Premium, Diesel)
>>>>>>> abf776fde05f4222ab98a595d9821f881c5f1e5a
