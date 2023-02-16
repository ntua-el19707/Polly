Software Engineering

Title: POLLY

Tools Used:

MySql - Sequelize for the Datebase



Api-Backend

  This folder contains: 

    config:

    controllers: for every route we have used a controller to execute

    models: contains the code for every table in our database (sequalize)

    routes: each route starts with: https://localhost:9103:/inteliq_api/<endpoint>, each route is used for a specific use in our project

    utils: contains supportive functions for the back-end implementation. All files can use these functions

  
Commant Line Interface
  
  This folder contains:
    
    bin: containes the declaration of the cli-client-commands
    
    src: contains the implementation of the cli-client-commands
    
      node ./index.js doanswer --questionnaireID 1 --questionID 2 --session aaaa --optionsID 2 --format json"
      node ./index.js question --questionnaireID 1 --questionID 2 --format json
      
      node ./index.js questionnaire --questionnaireID 1 --format json
      
      node ./index.js getsessionanswers --questionnaireID 1 --sessionID aaaa --format json
      
      node ./index.js getquestionanswers --questionnaireID 1 --sessionID 2 --format json
      
      node ./index.js healthcheck --token token
      
      node ./index.js resetall --token 
      
      node ./index.js resetq --questionnaireID 1 --token token
      
      
      
      
    
 Frontend
  This folder contains all the files for the implementetion of the front end
  For the front end we use Angular
 
 
 Test
  
   This folder contains:
   
    Testing for api-backend 
    Testing for cli-client
    
  VPP
    This folder contains:
       SRS Document
       VPP File with all the UML Diagrams
    
    
    
    

  
