LighthouseLunch 
=========
 Food Pick-up Ordering App
 
## Midterm project for Lighthouse Labs Web Development Flex Programme

This project is a food ordering and pickup app for a single restaurant.In this app customers able to place orders, as well as restaurant being able to confirm orders, and notify the customer when their food is ready using the Twilio API to send a text message.

## Final Product

- Website's Main page

<img width="1440" alt="Main page" src="https://user-images.githubusercontent.com/82424998/139512567-34e4a536-bc66-4f08-ad96-dd3e88a679cc.png">

- LighthouseLunch's Menu
<img width="1440" alt="Menu" src="https://user-images.githubusercontent.com/82424998/139512627-495df188-0ecb-49f1-a1d8-6a408f4c2094.png">

- Increase, decrease, remove item from the cart and showing the total price
<img width="1440" alt="Increase, decrease and remove items and showing price" src="https://user-images.githubusercontent.com/82424998/139512737-4d5dbc82-3ba3-435f-b0d5-97b9f1a67d24.png">

- Checkout
<img width="1440" alt="Checkout " src="https://user-images.githubusercontent.com/82424998/139512815-1002f2bd-96c1-422c-a4f4-314af7247571.png">


## Project Stack

- Front-End: HTML, SASS, JavaScript, jQuery
- Back-End: Nodejs, Express, PSQL

## Collaboration

- [Ayisha Farishta](https://github.com/ayisha92farishta)
- [Brian LaFond](https://github.com/briandlafond)
- [Hatem Alahmad Alrakad](https://github.com/hrakad)

## Getting Started

1. Create the `.env` by using `.env.example` as a reference: `cp .env.example .env`
2. Update the .env file with your correct local information 
  - username: `labber` 
  - password: `labber` 
  - database: `midterm`
3. Install dependencies: `npm i`
4. Fix to binaries for sass: `npm rebuild node-sass`
5. Reset database: `npm run db:reset`
  - Check the db folder to see what gets created and seeded in the SDB
7. Run the server: `npm run local`
  - Note: nodemon is used, so you should not have to restart your server
8. Visit `http://localhost:8080/`

## Dependencies

- body-parser
- alert
- chalk
- cookie-session
- dotenv
- ejs
- express
- jquery
- morgan
- sass
- pg
- pg-native
- socket.io
- twilio
