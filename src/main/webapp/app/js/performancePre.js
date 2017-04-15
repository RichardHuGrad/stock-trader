$( document ).ready(function() {
	
//	var calculatePercentageArray = [];
	var calculatePercentageArrayofArray = [[]];
	var dateArray = [];
	var calculatePercentage = 0;
	var calculatePredictionArrayofArray = [[]];
	
	var companyArray = ['HC0','HC1','HC2','HC3','HC4','IT0','IT1','IT2','IT3','IT4','ENG0','ENG1','ENG2','ENG3','ENG4','FIN0','FIN1','FIN2','FIN3','FIN4','MAN0','MAN1','MAN2','MAN3','MAN4'];
	  
	            for(var i= 0; i < companyArray.length ; i++){
	            	var xmlHttp = new XMLHttpRequest();
	            	xmlHttp.open( "GET", 'https://api.mlab.com/api/1/databases/prediction/collections/'+ companyArray[i] +'?apiKey=3qyLsr9-pCvIhWM6vUda65-ZHzEZQXA1' , false ); // false for synchronous request
		            xmlHttp.send( null );
		            var parsedData = JSON.parse(xmlHttp.responseText);
		            var calculatePercentageArray = [];
					for(var j=0; j< parsedData.length ; j++ ){
						calculatePercentage = ((parsedData[j].Close - parsedData[j].Open) / parsedData[j].Close) * 100;
						calculatePercentageArray.push(calculatePercentage);
						
						if(i == 20){
							dateArray.push(parsedData[j].Date);	
						}
					}
					calculatePercentageArrayofArray.push(calculatePercentageArray);
	            }
	            
	            for(var i=1; i< calculatePercentageArrayofArray.length; i = i + 5 ){
	            	var calculatePredictionArray = [];
	            	for(var j = 0 ; j < calculatePercentageArrayofArray[i].length; j++){
	            		calculatePredictionArray.push( (calculatePercentageArrayofArray[i][j]  + calculatePercentageArrayofArray[i + 1][j] + calculatePercentageArrayofArray[i + 2][j] + calculatePercentageArrayofArray[i + 3][j] + calculatePercentageArrayofArray[i + 4][j]) / 5 );
	            	}
	            	calculatePredictionArrayofArray.push(calculatePredictionArray);
	            }
	            
	            console.log(calculatePercentageArray.length);
	 			console.log(dateArray.length);
	  
	  Highcharts.chart('container', {
	    chart: {
	        type: 'area'
	    },
	    title: {
	        text: 'Stock Data Prediction'
	    },
	    subtitle: {
	        text: ''
	    },
	    xAxis: {
	        categories: dateArray, 
	        	//['1750', '1800', '1850', '1900', '1950', '1999', '2050'],
	        tickmarkPlacement: 'on',
	        title: {
	            enabled: false
	        }
	    },
	    yAxis: {
	        title: {
	            text: '%'
	        },
	        labels: {
	            formatter: function () {
	                return this.value;
	            }
	        }
	    },
	    tooltip: {
	        split: true,
	        valueSuffix: ''
	    },
	    plotOptions: {
	        area: {
	            stacking: 'normal',
	            lineColor: '#666666',
	            lineWidth: 1,
	            marker: {
	                lineWidth: 1,
	                lineColor: '#666666'
	            }
	        }
	    },
	    
	    series: 
	    [{
	       name: 'HC',
	        data : calculatePredictionArrayofArray[1]
	    }, {
	        name: 'IT',
	        data: calculatePredictionArrayofArray[2]
	    }, {
	        name: 'ENG',
	        data: calculatePredictionArrayofArray[3]
	    }, {
	        name: 'FIN',
	        data: calculatePredictionArrayofArray[4]
	    }, {
	        name: 'MAN',
	        data: calculatePredictionArrayofArray[5]
	    }]
	});
});