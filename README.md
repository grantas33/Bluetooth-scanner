A Symfony project created on November 24, 2018, 9:41 pm.

This project requires Docker to be installed.

Start the containers from root directory: `docker-compose up`

ssh into ubuntu container to manage php: `docker exec -it myproject /bin/bash`

ssh into frontend container to manage node.js: `docker-compose run --rm frontend`

Inside the ubuntu container, cd into my_project and install composer dependencies: `composer install`

Server will begin running on `localhost:8080`

Inside the frontend container, cd into my_project and install js dependencies: `npm install`

Build javascript, css:
* for dev: `yarn encore dev`
* for production: `yarn encore production`

Connect to database:
* IP: `localhost:4000`
* user: `root`
* password: `root`
