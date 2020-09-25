$(function() {
  var googleSheetKey = '17AJprKjdveCCLqY5zKGiWhJYguvu-x1STIyjs8YaG-s';

  // JSON
  var url = 'https://spreadsheets.google.com/feeds/list/' + googleSheetKey + '/od6/public/values?alt=json';
  $.ajax({
    url: url,
    dataType: 'json',
    success: function(data) {
      doStuff(data);
    }
  });
});

//
// do stuff
//
function doStuff(data) {
  if (data) {
    // console.log('data', data);

    var feed = data.feed;
    var rows = feed.entry || [];
    var html = [];
    var alldata = [];

    for (var i = 0; i < rows.length; ++i) {
      var row = rows[i];

      // populate table body
      // html.push('<tbody>', '<tr>');
      for (var prop in row) {
        if (prop.substring(0, 4) === 'gsx$' && row[prop].$t !== 'undefined') { // sheet data cell

          alldata.push(row[prop].$t);
        }
      }

    }
    console.log(alldata);
    $('#test2').html(alldata[8]);
    $('#test3').html(alldata[9]);
    $('#test1').html(alldata[10]);

    if (alldata[14] === 'TRUE') { // sheet data cell

      $('#test4').addClass('show')
    }
  }
  var ctx = document.getElementById('myChart').getContext('2d');
  var myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: ["One", "Two", "Three", "Four"],
      datasets: [{
        label: 'Orange',
        backgroundColor: 'rgba(239, 188, 113, .1)',
        borderColor: 'rgba(239, 188, 113, 1)',
        borderWidth: 1,
        data: [alldata[0], alldata[2], alldata[4], alldata[6]],
      }, {
        label: 'Pink',
        backgroundColor: 'rgba(208, 166, 193, .1)',
        borderColor: 'rgba(208, 166, 193, 1)',
        borderWidth: 1,
        data: [alldata[1], alldata[3], alldata[5], alldata[7]],
      }],
    },
    options: {
      scales: {
        xAxes: [{
          stacked: false
        }],

        yAxes: [{
          stacked: false,
          ticks: {
            maxTicksLimit: 3,
            suggestedMin: 0,
            suggestedMax: .02,
            // stepSize: 4, /* total/4 shows 0, 25%, 50%, 75%, 100% */
            beginAtZero: true,
            callback: function(value) {
              return value.toLocaleString('de-DE', {
                style: 'percent'
              });
            },

          }
        }]
      }
    }
  });
  var ctx = document.getElementById('myChart2').getContext('2d');
  var myChart2 = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Brown', 'Purple', 'Blue'],
      datasets: [{

        data: [alldata[11], alldata[12], alldata[13]],
        backgroundColor: [

          'rgba(48, 6, 3, 0.25)',
          'rgba(165, 55, 214, 0.25)',
          'rgba(39, 88, 213, 0.25)'
        ],
        borderColor: [

          'rgba(48, 6, 3, 1)',
          'rgba(165, 55, 214, 1)',
          'rgba(39, 88, 213, 1)'

        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {

      }
    }
  });
}
