var pokedexApp = angular.module('pokedexApp', []);

pokedexApp.controller('PokedexCtrl', ['$anchorScroll', '$location', '$http', '$scope',
    function ($anchorScroll, $location, $http, $scope) {
        $scope.pokemons = [];

        var limit = 12;
        var offset = 0;
        $scope.isLoading = false;
        $scope.showDetailedInfo = false;

        function getPokemonListApi(limit, offset) {
            $scope.isLoading = true;
            $http.get('http://pokeapi.co/api/v1/pokemon/?limit=' + limit + '&offset=' + offset)
                .success(function (data) {
                    $scope.pokemons = $scope.pokemons.concat(data.objects);
                    $scope.isLoading = false;
                });
        }

        $scope.loadMore = function () {
            $scope.showDetailedInfo = false;
            offset += limit;
            getPokemonListApi(limit, offset);
        };

        $scope.showDetails = function (selectedPokemon) {
            $scope.selectedPokemon = selectedPokemon;
            $scope.showDetailedInfo = true;
            $scope.gotoAnchor('details')
        };

        $scope.filterPokemons = function (typeName) {
            $scope.pokemons = $scope.pokemons.filter(function (pokemon) {
                return pokemon.types.reduce(function (previousValue, currentValue) {
                    return previousValue || (currentValue.name === typeName);
                }, false);
            });
        };

        String.prototype.capitalizeFirstLetter = function () {
            return this.charAt(0).toUpperCase() + this.slice(1);
        };

        getPokemonListApi(limit, offset);

        $scope.gotoAnchor = function(x) {
            var newHash = 'anchor' + x;
            if ($location.hash() !== newHash) {
                $location.hash('anchor' + x);
            } else {
                $anchorScroll();
            }
        };

        $scope.typeColors = {
            "normal": "#ffffff",
            "fighting": "#ff5050",
            "flying": "#6699ff",
            "poison": "#cc3399",
            "ground": "#996633",
            "rock": "#999966",
            "bug": "#33cc33",
            "ghost": "#ccccff",
            "steel": "#669999",
            "fire": "#ff3300",
            "water": "#66ccff",
            "grass": "#99ff99",
            "electric": "#ffff00",
            "ice": "#00ffff",
            "dragon": "#00cc66",
            "dark": "#336699",
            "fairy": "#ffcccc",
            "unknown": "#ff66ff",
            "shadow": "#cc6699",
            "psychic": "#ff00ff"
        };
    }
]);