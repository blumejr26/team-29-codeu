google.charts.load('current', {packages: ['corechart']});
google.charts.setOnLoadCallback(drawChart);

function drawChart(){
    fetch("/eatschart")
    .then((response) => {
        return response.json();
    })

    .then((restaurantJson) => {
        var restaurantData = new google.visualization.DataTable();

        //define columns for the DataTable instance
        restaurantData.addColumn('string', 'Restaurant Name');
        restaurantData.addColumn('number', 'Rating');

        for (i = 0; i < restaurantJson.length; i++) {
            restaurantRow = [];
            var name = restaurantJson[i].name;
            var ratings = restaurantJson[i].rating;
            restaurantRow.push(name, ratings);
            restaurantData.addRow(restaurantRow);
        }

        var chartOptions = {
            width: 800,
            height: 400
        };

        var restaurantChart = new google.visualization.BarChart(document.getElementById('restaurant_chart'));
        restaurantChart.draw(restaurantData, chartOptions);
    });
}
