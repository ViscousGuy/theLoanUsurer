# The Loan Usurer




The Loan Usurer is a minimal RESTful Loan Management API powered by Express, A lightweight web framework for Nodejs.

  

#  Features!

  - Mult-user feature, Primarily focused on three roles: Customer, Agent and Admin.
  - All CRUD operations can be performed.
  - Secure Authentication system.


You can also:
  - Calcultate EMI and Total Interest Amount once application is submitted.
  - Approve or Reject Loan request of a Customer.
  - Reset or update password.
  - Send welcome email to user's email id once user has registered.
  
### Documentation and Test Cases for the API

(https://documenter.getpostman.com/view/13639023/TVmFmgik)



### Tech

The Loan Usurer uses a number of open source projects to work properly:

* [node.js]- evented I/O for the backend
* [Express] - fast node.js network app framework 
* [MongoDB](https://www.mongodb.com//) - cross-platform document-oriented database program
* [Postman](https://www.postman.com/) - the collaboration platform for API development and testing
* [Mongoose](https://mongoosejs.com/) - elegant mongodb object modeling for node.js
And of course The Loan Usurer itself is open source with a [public repository][dill]
 on GitHub.

### Installation

The Loan Usurer requires [Node.js](https://nodejs.org/) v12.10+ to run.

Install the dependencies and devDependencies and start the server.

```sh
$ cd theLoanUsurer
$ npm install -d
$ npm run start
```

For production environments...

```sh
$ npm install 
$ npm run prod
```

### Login Credentials for Testing

Admin 
 - email: admin@example.com
 - password: examplepassword

Agent
 - email: agent@email.com
 - password: examplepassword
### Docker
The Loan Usurer is very easy to install and deploy in a Docker container.

By default, the Docker will expose port 8080, so change this within the Dockerfile if necessary. When ready, simply use the Dockerfile to build the image.

```sh
cd dillinger
docker build -t joemccann/dillinger:${package.json.version} .
```
This will create the dillinger image and pull in the necessary dependencies. Be sure to swap out `${package.json.version}` with the actual version of Dillinger.

Once done, run the Docker image and map the port to whatever you wish on your host. In this example, we simply map port 8000 of the host to port 8080 of the Docker (or whatever port was exposed in the Dockerfile):

```sh
docker run -d -p 8000:8080 --restart="always" <youruser>/dillinger:${package.json.version}
```

Verify the deployment by navigating to your server address in your preferred browser.

```sh
127.0.0.1:8000
```
### FAQs

1. What auhthentication system is being used in this project and why?
- I have used token based authenticatin system called JWT for this project due to its stateless nature which eliminate the complexity of managing sessions. It is also portable. It also reduces network round trip time which is a deciding factor for a good API. More Importantly, It is decoupled and decentralized which means the token can be generated anywhere. Authentication can happen on the resource server, or easily separated into its own server.

2. How User Authorization is implemented?
- Firstly, There are three types of user in this system: CUSTOMER, AGENT, and ADMIN. I have used express middleware to restrict the user based on their roles and give them access to only those routes which they are allowed to. Everytime a user access a route, The token extracted from the authroization header is verified and the "user_id" extracted from that token is compared against the user data in db. If the given role of the mentioned user allows him/her to access the route then only he/she can access it.

3. How passwords are stored in the db?
- Before any password are stored in the db, They are first hashed for security purpose using Bcrypt (https://www.npmjs.com/package/bcrypt), A password-hashing function. Password forgot and reset functionality is also implemented.

4. Why MongDb?
- The reason I used MongoDb is because of its document-based data model. It also enables faster access of the data due to its nature of using the internal memory for the storage. Since, it is a NOSQL database, then it is obviously secure because no sql injection can be made. The support for Sharding is one of its key feature. Additionally; It is very easy to scale, easy to install and setup, high performance and speed. 
    


### Additional Note

I have included the env confirguration file too with the project which contains database configuration ( Mongo Atlas ). It will ease the spawning of database server on the cloud and thereby eliminating additional config of the db. Though, It is for testing purpose only and the credentials will expire in one month starting from the date when this project was first released. 
The jwt token is also temporary for testing purpose and will expire by next month starting from the project release date.
### Todos

 - Design the frontend using ReactJS.
 - Add Google Signup option.
 - Add filter and Searching feature.

License
----

ISC

### Author

Shubam D. Anchaliya (shubhamanchaliya84@gmail.com)




