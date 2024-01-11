## Taatee
Taatee is an event booking system for AAiT Tech Club - a club under formation. Students will use Taatee to register for the monthly tech talks and other networking events that is planned to be organized by the club.

- Database: PostgreSQL - We will be using relational database to store user, event and booking details. Relational SQL Databases are well suited for this.

- Containerization: Docker, to make sure the web app works as expected both on our development environemnt, and instructor's working environment, we decided to use Docker for containerization.

## How to Run this Project?
There are three steps to run this project.
#### Requirements
- Node Installed Machine (https://nodejs.org/en)
- Docker  (https://www.docker.com/)
- yarn (`npm i -g yarn`)

### Step 1 - Clone this Repository
    `
    git clone https://github.com/abdulmunimjemal/Taatee.git
    `
  Make sure yarn is installed


### Step 2 - Run the backend
    `
    cd taatee-backend
    yarn install  (install dependencies)
    (make sure your docker engine is running)
    yarn db:restart  ( this creates a docker instance, if you are on Linux, please make sure to separately install docker compose)
    yarn start  ( this starts the nest app )
    `

### Step 3 - Run the frontend
    cd taatee-frontend
    yarn install
    (make sure your docker engine is running)
    yarn load
    
### Step 4 - Run the backend tests
    `
    (First don't forget to install jest)
    yarn add --dev jest

    (If not installed add this: )
    yarn add --dev jest @nestjs/testing

    (Then start checking by this)
    yarn jest bookings.spec
    yarn jest events.spec
    yarn test users.spec  ( these are the unit test)

    yarn jest integrations.spec (this is for the integration testing)
    `

## Web Programming: Group Project

## Group Memebers
- Abdulmunim Jundurahman UGR/8625/14
- Meti Lamessa UGR/5877/14
- Salman Ali UGR/7808/14
- Sifan Fita UGR/8856/14

