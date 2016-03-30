angular.module('foodController', [])

	// inject the food service factory into our controller
	.controller('mainController', ['$scope','$http','Foods', function($scope, $http, Foods) {
		$scope.formData = {};
		$scope.loading = true;

		// GET =====================================================================
		// when landing on the page, get all food items in the database and show them
		// use the service to get all the food items
		Foods.get()
			.success(function(data) {
				$scope.loading = false;
				$scope.foods = data;
			});

		// Add ==================================================================
		// when submitting the add form, send the name of food item and price to the node API
		$scope.addFood = function() {

			// validate the formData to make sure that something is there
			// if form is empty, nothing will happen
			if ($scope.formData.name != undefined && $scope.formData.price != undefined) {
				$scope.loading = true;

				// call the create function from our service (returns a promise object)
				Foods.add($scope.formData)

					// if successful creation, call our get function to get all the new Food Items
					.success(function(data) {
						$scope.loading = false;
						$scope.formData = {}; // clear the form so our user is ready to enter another
						$scope.foods = data; // assign our new list of Food Items
						$scope.total = {};
					});
			}
		};

		$scope.getTotal = function() {
			//When user click on GetTotal Bill call the total API to get total bill of the food
			Foods.getTotal()
			.success(function(data) {
				$scope.loading = false;
				$scope.total = data;
			});
		};


		// DELETE ==================================================================
		// delete a Food Item after checking it
		$scope.deleteFood = function(id) {
			$scope.loading = true;

			Foods.delete(id)
				// if successful deletion, call our get function to get all the remaining Food items
				.success(function(data) {
					$scope.loading = false;
					$scope.foods = data; // assign our new list of food items
					$scope.total = {};
				});
		};
	}]);