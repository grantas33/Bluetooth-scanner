FROM node

# Install dependencies
RUN apt-get update \
 && apt-get install -y git \
 && rm -rf /var/lib/apt/lists/*

WORKDIR /app
VOLUME /app

CMD '/bin/bash'
