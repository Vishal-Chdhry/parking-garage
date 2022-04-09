## Description
A parking garage API implimentation using [NestJS](https://github.com/nestjs/nest) and [Prisma](https://www.prisma.io/)


## Table of Contents
- [Description](#description)
- [Table of Contents](#table-of-contents)
- [Installation](#installation)
  - [First Steps](#first-steps)
  - [Running the app](#running-the-app)
  - [Testing](#testing)
- [Proposed Design](#proposed-design)
- [Endpoints](#endpoints)
  - [POST `auth/create_account`](#post-authcreate_account)
  - [POST `auth/login`](#post-authlogin)
  - [GET `user/me`](#get-userme)
  - [PATCH `user/me`](#patch-userme)
  - [POST `spot/reserve`](#post-spotreserve)
  - [GET `spot/freespots`](#get-spotfreespots)
  - [POST `payment/calculate_payment`](#post-paymentcalculate_payment)
  - [POST `payment/cancel`](#post-paymentcancel)
- [Schema](#schema)
  - [Reservations](#reservations)
  - [Garage](#garage)
  - [Spot](#spot)
  - [Users](#users)
  - [Vehicle](#vehicle)
## Installation 

### First Steps

Note: You will need docker to run this application

Clone the repository
```bash
git clone https://github.com/Vishal-Chdhry/parking-garage.git
```

Install the dependencies
```bash
npm install
```

Start the database
```bash
docker compose up dev-db -d
```

### Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

### Testing

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Proposed Design
## Endpoints

### POST `auth/create_account`
Creates a new user <br>
**Params**: [User](#users) <br>
**Returns**: JWT Token

### POST `auth/login`
Logs in with the user credential <br>
**Params**: email, password <br>
**Returns**: JWT Auth Token
### GET `user/me` 
Returns with the info of the logged-in user

### PATCH `user/me`
Updates the logged-in user's info

### POST `spot/reserve`
**Params:** garage_id, vehicle_type, end_time <br>
**Returns:** [Reservation](#reservations)

### GET `spot/freespots`
**Params:** garage_id, vehicle_type <br>
**Returns:** [Spot](#spot) Array

### POST `payment/calculate_payment`
**Params:**: reservation_id <br>
**Returns:**: rate

### POST `payment/cancel`
**Params:** reservation_id <br>
**Returns:** [Spot](#spot)
## Schema

### Reservations
name | type
:- | :-
id | Primary Key
garage_id | foreign Key, Int
spot_id | Foreign Key, Int
start | Timestamp
end | Timestamp
paid | Boolean

### Garage
name | type
:- | :-
id | Primary Key
zipcode  |   String
rate_reg  |  Decimal
rate_large | Decimal
rate_small | Decimal

### Spot

name | type
:- | :-
id         |     Primary Key           
vehicle_type |   VEHICLE_TYPE  
status      |    SPOT_STATUS   
reservation_end | DateTime      
garage_id   |    Int

### Users

name | type
:- | :-
id         |      Primary Key    
 created_at  |DateTime 
  updated_at | DateTime 
  first_name |String
  last_name  | String?
  email| String @unique
  hash|  String

### Vehicle

name | type
:- | :-
id         |     Primary Key   
  user_id  |    Int
  user      |   User      
  license    |  String
  vehicle_type | VEHICLE_TYPE 

