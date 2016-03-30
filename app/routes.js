var Food = require('./models/food');

function getFoods(res) {
    Food.find(function (err, foods) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }

        res.json(foods); // return all food items in JSON format
    });
}
;

module.exports = function (app) {

    // api ---------------------------------------------------------------------
    // get all food items
    app.get('/api/food', function (req, res) {
        // use mongoose to get all food items in the database
        getFoods(res);
    });

    // create food item and send back all food items after creation
    app.post('/api/food', function (req, res) {

        // create a food item, information comes from AJAX request from Angular
        Food.create({
            name: req.body.name,
            price: req.body.price
        }, function (err, food) {
            if (err)
                res.send(err);

            // get and return all the food items after you create another
            getFoods(res);
        });

    });

    // delete a food item
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
        // use mongoose to get all food items in the database
            Food.find(function (err, foods) {
            var total_cost =0 ;
            foods.forEach(function(food){
                total_cost += food.price;
            }); 
            // Adding 7.5 % tax
            total_cost += 0.075 * total_cost;
            res.json({'total_cost':total_cost});
        });
    });

    // application -------------------------------------------------------------
    app.get('*', function (req, res) {
        res.sendFile(__dirname + '/public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });
};