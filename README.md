A Symfony project created on November 24, 2018, 9:41 pm.

This project requires Docker to be installed.

Start the containers from root directory: `docker-compose up`

ssh into ubuntu container to manage php: `docker exec -it myproject /bin/bash`

Inside the container, cd into my_project and install composer dependencies: `composer install`

Connect to database:
IP: `localhost:4000`
user: `root`
password: `root`
