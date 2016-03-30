var Food = require('./models/food');

function getFoods(res) {
    Food.find(function (err, foods) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }

        res.json(foods); // return all todos in JSON format
    });
}
;

module.exports = function (app) {

    // api ---------------------------------------------------------------------
    // get all todos
    app.get('/api/foods', function (req, res) {
        // use mongoose to get all todos in the database
        getFoods(res);
    });

    // create todo and send back all todos after creation
    app.post('/api/food', function (req, res) {

        // create a todo, information comes from AJAX request from Angular
        Food.create({
            name: req.body.name,
            price: req.body.price
        }, function (err, food) {
            if (err)
                res.send(err);

            // get and return all the todos after you create another
            getFoods(res);
        });

    });

    // delete a todo
    app.delete('/api/food/:food_id', function (req, res) {
        Food.remove({
            _id: req.params.food_id
        }, function (err, food) {
            if (err)
                res.send(err);

            getFoods(res);
        });
    });

    //Calculate the total of bill
        app.get('/api/total', function (req, res) {
        // use mongoose to get all todos in the database
            Food.find(function (err, foods) {
            var total_cost =0    ;
            foods.forEach(function(food){
                total_cost += food.price;
            }); 
            total_cost += 0.075 * total_cost;
            res.json({'total_cost':total_cost});
        });
    });

    // application -------------------------------------------------------------
    app.get('*', function (req, res) {
        res.sendFile(__dirname + '/public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });
};