#!/bin/bash
API_KEY=$(openssl rand -base64 48 | tr -d /=+ | cut -c1-64)

echo "API_KEY=$API_KEY" > .env

echo ".env file created with API_KEY=$API_KEY"
