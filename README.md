# fetch-rewards-assignment
Fetch Rewards Back-End developer intern take home assignment.

Pre-requisites:
- Node.js has to be installed in the machine.
- Port 3000 should be available for the app to run.

<p align="justify">There is a test server for the application which executes the test cases mentioned in the original document.</p>

<p align="justify">Use the following command to run the test, please run this command in the root directory of the project:</p>

```
npm test
```

<p align="justify">After running the tests, the following output will be displayed:</p>

```
> fetch-rewards@1.0.0 test fetch-rewards
> mocha

App running on port:  3000


  POST /add_transaction
[{"payer":"DANNON","points":1000,"timestamp":"2020-11-02T14:00:00.000Z"}]
    √ Add points (149ms)

  POST /add_transaction
[{"payer":"UNILEVER","points":200,"timestamp":"2020-10-31T11:00:00.000Z"},{"payer":"DANNON","points":1000,"timestamp":"2020-11-02T14:00:00.000Z"}]
    √ Add points

  POST /add_transaction
[{"payer":"UNILEVER","points":200,"timestamp":"2020-10-31T11:00:00.000Z"},{"payer":"DANNON","points":-200,"timestamp":"2020-10-31T15:00:00.000Z"},{"payer":"DANNON","points":1000,"timestamp":"2020-11-02T14:00:00.000Z"}]
    √ Add points

  POST /add_transaction
[{"payer":"UNILEVER","points":200,"timestamp":"2020-10-31T11:00:00.000Z"},{"payer":"DANNON","points":-200,"timestamp":"2020-10-31T15:00:00.000Z"},{"payer":"MILLER COORS","points":10000,"timestamp":"2020-11-01T14:00:00.000Z"},{"payer":"DANNON","points":1000,"timestamp":"2020-11-02T14:00:00.000Z"}]
    √ Add points

  POST /add_transaction
[{"payer":"DANNON","points":300,"timestamp":"2020-10-31T10:00:00.000Z"},{"payer":"UNILEVER","points":200,"timestamp":"2020-10-31T11:00:00.000Z"},{"payer":"DANNON","points":-200,"timestamp":"2020-10-31T15:00:00.000Z"},{"payer":"MILLER COORS","points":10000,"timestamp":"2020-11-01T14:00:00.000Z"},{"payer":"DANNON","points":1000,"timestamp":"2020-11-02T14:00:00.000Z"}]
    √ Add points

  POST /spend_points
[{"payer":"DANNON","points":-100},{"payer":"UNILEVER","points":-200},{"payer":"MILLER COORS","points":-4700}]
    √ Deduct points, First come first basis

  GET /points_balance
{"DANNON":1000,"UNILEVER":0,"MILLER COORS":5300}
    √ Get points balance


  7 passing (217ms)
```

<p align="justify">After adding a transaction the API returns the queue of transactions currently present in the transaction queue. To stop the test server press CTRL+C and enter Y.</p>

<p align="justify">For testing the server/app without the test server, <a href="https://www.postman.com/downloads/">Postman</a> can be used to send POST and GET requests to the API and a JSON body can be put as input.</p>

For example, while running the app locally with <a href="https://www.postman.com/downloads/">Postman</a>, 

- http://localhost:3000/add_transaction will be our request URL.
- We will pass {"payer":"DANNON","points":1000,"timestamp":"2020-11-02T14:00:00.000Z"} as body for the POST request.
- Then the server will give the response to the request in a JSON format.
