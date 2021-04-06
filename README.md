# SIMPLE WEBAPP USING NODEJS, EXPRESS, REACT AND TYPESCRIPT

## Description

- Building a SPA application using NodeJS, Express, Mysql, Material UI, Typescript and React. The goal is to show a little from my skills set to **Terveystalo** people. After a year didn't touch to these technologies, it is a good time to practise them again.  

## Release

- Fri 6 Apr 2021

## Technologies

- NodeJS, Express, Mysql, React, Material UI, Typescript, Rest API.

## Branches

- **1-server-project-creating**
- **2-database-creating**
- **3-models-creating**
- **4-database-connection-creating**
- **5-server-configuration**
- **6-services-creating**
- **7-controller-creating**
- **8-tests-configuration**
- **9-client-project-creating**
- **10-projects-structure-creating**
- **11-service-handling**
- **12-insert-feature-support**
- **13-delete-feature-support**
- **14-update-feature-support**
- **15-readme-creating**
- **master**: default

## Configuration

- **npx create-react-app <client-app> --template typescript** or **yarn create react-app <client-app> --template typescript** create client app with react and typescript
- **cd server && npm init** create server project
- **mysql -h <hostname> -u <user> <database> -p** connect to database
- **mysql> source <data.sql>;** or **mysql -h <hostname> -u <user> <database> < path/to/test.sql** run sql script
- **cd server && npm run dev** start server project
- **npm install -D jest @types/jest ts-jest** install jest for testing
- **cd client && npm start** start client project
- **./node_modules/.bin/jest --init** generate jest configuration file
- **./node_modules/.bin/tsc --init** generate typescript configuration file


## Testing

- **curl -X GET -H "Content-Type: application/json" http://localhost:3001/api/v1/measurements** find all measurements
- **curl -X GET -H "Content-Type: application/json" http://localhost:3001/api/v1/measurement/:id** find measurement by id
- **curl -X POST -H "Content-Type: application/json" -d @test-data/insert.json http://localhost:3001/api/v1/measurement** create a new measurement
- **curl -X PUT -H "Content-Type: application/json" -d @test-data/update.json http://localhost:3001/api/v1/measurement** update an existing measurement
- **curl -X DELETE -H "Content-Type: application/json" -d @test-data/delete.json http://localhost:3001/api/v1/measurement** delete an existing measurement

## Demo

- ![Terveystalo SPA Demo](https://j.gifs.com/jZ7YnB.gif)
- [Full Video Demo Here](https://youtu.be/672yDOo0z9g)

## Author

- Thinh Dinh
- Backend Developer at **Aktia Bank Oyj**

## Copyright

- © www.tikkidinh.com

