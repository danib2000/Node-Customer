# Node-Customer

npm install - install all packages

port - 1234


localhost:1234/customer - (GET) returns all the customers in the database.

localhost:1234/customer/_id - (GET) returns customers with specific id.

localhost:1234/customer - (POST) writes into database (inside the body write name, email, and phone).

localhost:1234/customer/search?name=' '&phone=' '&email=' ' - (GET) searches the database for a specific customers.
