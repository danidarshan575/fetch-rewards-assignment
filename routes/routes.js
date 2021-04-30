/* Declaring constants */
let accounts = {}
let totalPoints = 0

let transactionQueue = [];

/* Defining routes,
   1) add_transaction: Adding points to account, add transaction to queue
   2) spend_points: Deduct points from accounts, spend according to which transaction came first
   3) points_balance: Get points balance of each account */
var appRouter = function (app) {

    /* add_transaction route */
    app.post('/add_transaction', (req, res) => {

        /* Get all the fields from the body of the request */
        var payer = req.body.payer;
        var points = req.body.points;
        /* Converting the given ISO 8601 time format to JavaScript Date object for easier comparison */
        var timeStamp = new Date(req.body.timestamp);

        /* If the points in the request body are positive then add the points to the totalPoints constant and add the request to our transactionQueue */
        if (points > 0) {

            totalPoints += points;

            /* Enqueuing the upcoming request to the transactionQueue */
            transactionQueue.push({ 'payer': payer, 'points': points, 'timestamp': timeStamp });

            /* If the current payer has an account, simply add points to his/her account */
            if (!(payer in accounts)) {

                accounts[payer] = points;

            } else {

                accounts[payer] += points;
            }
        } 
        else if (points < 0) {

            /* If points are less then 0, negative points, Then subtract from the actual points the user has till now and then add the transaction to our transactionQueue 
               All this if the user has an account, else simply return a 400 status, as no user can have negative balance */

            if ((payer in accounts) && ((accounts[payer] - points) < 0)) {

                res.status(400).send("Invalid record");
                
            } else if ((payer in accounts) && ((accounts[payer] - points) > 0)) {

                /* If the payer has an account and has positive balance, then only add the points to the account and add it to total spendable points, also push the transaction to our queue */

                accounts[payer] += points;
                totalPoints += points;

                transactionQueue.push({ 'payer': payer, 'points': points, 'timestamp': timeStamp });

            } else {

                /* The user has negative balance, return 400 status as no user can have negative points */
                res.status(400).send("Invalid transaction error");
            }
        }

        /* Sort the queue based on the timestamp */
        transactionQueue.sort(function(x, y) {

            return x.timestamp - y.timestamp;
        });

        /* Returned JSON result and return all transactions*/
        res.status(200).send(JSON.stringify(transactionQueue));
    });

    /* spend_points route */
    app.post('/spend_points', (req, res) => {

        /* Get the points value from request body */
        var pointsToDeduct = req.body.points;

        /* If the total spendable points are less than the points which are needed to be deducted, return a 400 status */
        if (totalPoints < pointsToDeduct) {

            res.status(400).send("Insufficient points");

        } else {

            /* If it is a valid transaction and if there are enough spendable points we start spending the points 
               Utilizing the transactions which have come the earliest as we have sorted the queue by the timestamp */
            var pointsList = {};

            /* While we still have some points to deduct */
            while (pointsToDeduct > 0) {

                /* Get the earliest transaction from the transactionQueue */
                var currentTransaction = transactionQueue.shift();

                /* Subtract the points of the earliest transaction from pointsToDeduct */
                pointsToDeduct -= currentTransaction['points'];

                /* If the points to deduct are utilized */
                if (pointsToDeduct < 0) {

                    /* Enqueue the newly created points value to the transactionQueue */
                    var pointsDeducted = currentTransaction['points'] + pointsToDeduct;
                    currentTransaction['points'] = pointsDeducted;
                    transactionQueue.push(currentTransaction);

                } else {

                    /* If we still have some points to deduct the pointsDeducted value will be equal to the amount of points left from the current transaction */
                    pointsDeducted = currentTransaction['points'];
                }

                /* Add the pointsDeducted to current transaction's point which will give us how many points have been deducted from a particular transaction from our queue */
                currentTransaction['points'] = pointsDeducted;
                /* This is a new transaction, so add today's date */
                currentTransaction['timestamp'] = new Date();

                /* As there are multiple transaction, and there may be a case that multiple transactions are made by the same user hence, we check 
                   if the payer exists in our list, if yes then simply add points utilized to the points field, else create a new entry and add points deducted */
                if (!(currentTransaction['payer'] in pointsList)) {

                    pointsList[currentTransaction['payer']] = {'points': currentTransaction['points'], 'timestamp': new Date()};

                } else {

                    pointsList[currentTransaction['payer']] = {'points': pointsList[currentTransaction['payer']]['points'] + currentTransaction['points'], 'timestamp': new Date()};
                }

                /* Update the account of current payer and deduct the utilized points from his/her account */
                accounts[currentTransaction['payer']] -= pointsDeducted
                /* Update the total spendable points by subtracting utilized points from it */
                totalPoints -= pointsDeducted;
            }
        }

        /* Initializing our result array */
        result = []

        /* Pushing the resultant pointsList to our result array */
        for (const [key, value] of Object.entries(pointsList)) {

            result.push({'payer': key, 'points': -value['points']})
        }

        /* Returning a 200 status with result */
        res.status(200).send(JSON.stringify(result));
    });

    /* points_balance route*/
    app.get('/points_balance', (req, res) => {

        /* Return a 200 status with accounts object */
        res.status(200).send(JSON.stringify(accounts));
    });
}

module.exports = appRouter;