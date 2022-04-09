# Parking Garage API
## Description
A parking garage API implimentation using [NestJS](https://github.com/nestjs/nest) and [Prisma](https://www.prisma.io/)


## Table of Contents
- [Parking Garage API](#parking-garage-api)
  - [Description](#description)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
    - [First Steps](#first-steps)
    - [Running the app](#running-the-app)
    - [Testing](#testing)
  - [Proposed Design](#proposed-design)
    - [Requirements](#requirements)
    - [Design](#design)
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

### Requirements
1. Need to be able to reserve a parking spot and pay for it
2. System should have high consistency, so, no two people are able to reserve the same spot at once.
3. A proper payment system preferablly handled by a third party like stripe.

### Design

![flow chart](./assets/flowchart.png)
We are going to have a mobile or web view connected to the backend server, which will be connected to our main database, which is postgreSQL in this case. 
Since, we will be reading more than writing, its a good choice to have some read replicas to enable faster reads. The replicas will be connected to a load balancer as well to maintain proper usage.

**Considerations:** 
- *A garage is likely to have atmost 200x10 spots, and there are not a lot of garages, so it isn't a necessity for the garage to be a distributed system*

- *In this case we will have to maintain strong consistency instead of eventual consistency to avoid race condition and wrong data on replicas. Since the number of booking will be much less than reads, the latency in booking won't be much of an issue.*
- *We can also readlock the replicas based on location while writing, so we will also shard the database based on location*
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
vehicle_type |   VEHICLE_TYPE  (Enum)
status      |    SPOT_STATUS  (Enum) 
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
  email| String 
  hash|  String

### Vehicle

name | type
:- | :-
id         |     Primary Key   
  user_id  |    Int
  user      |   User      
  license    |  String
  vehicle_type | VEHICLE_TYPE (Enum) 

