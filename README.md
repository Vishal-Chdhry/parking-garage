## Description
A parking garage API implimentation using [NestJS](https://github.com/nestjs/nest) and [Prisma](https://www.prisma.io/)


## Table of Contents
- [Installation and First Steps](#installation-and-first-steps)
- [Running the app](#running-the-app)
- [Testing the app](#testing)
## Installation and First Steps

### Note: You will need docker to run this application
#### Clone the repository
```bash
git clone https://github.com/Vishal-Chdhry/parking-garage.git
```

#### Install the dependencies
```bash
npm install
```

#### Start the database
```bash
docker compose up dev-db -d
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Testing

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```