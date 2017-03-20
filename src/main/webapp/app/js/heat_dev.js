$(document).ready(function(){
	userJson = $.ajax({
		url: "./servlet/ReadServlet", async: false
	});
	
	var URL = "";
	var UID = "";
	var curTime = new Date();
	var realTime = curTime.getFullYear() + "-" + (curTime.getMonth()+1)  + "-" + curTime.getDate();
	var StartDate = realTime;
	var EndDate = realTime;
	
	var ms = $('#magicsuggest').magicSuggest({
		allowFreeEntries: true,
		allowDuplicates: false,
		toggleOnClick: true,
		expandOnFocus: true,
		data: [{"id":7010,"name":"奥巴马"},{"id":6010,"name":"金三胖"},{"id":5010,"name":"huxiaodong"},{"id":4010,"name":"开着飞机炸碉堡。。"}],
		ajaxConfig: {
			xhrFields: {
				withCredentials: true,
			}
		}
	});
	
	$(ms).on('selectionchange', function(){
		UID = JSON.stringify(this.getValue());
	});
	
	function RenderHeatMap(JsonData){
		
		$('.heatmap-canvas').remove();
		
		var iframWidth = Number(document.getElementById("iframeCon").getAttribute("width"));
		//var iframeHeight = document.getElementById("iframeCon").getAttribute("height");
		
		var points = [];
//		
		for(var i = 0; i < JsonData.length; i++){
			var point = {
					x: JsonData[i].track_pos.x * iframWidth / JsonData[i].clientSize.clientWidth, //+ Number(50),
					y: JsonData[i].track_pos.y,
					value: 50//JsonData.responseJSON.data[i].count
			};
			points.push(point);
		}
		
		
		var data = {
    		max: 100,
    		data: points
    	};
    	
    	var heatmap = h337.create({
          	container: document.getElementById('heatmapContainer'),
          	radius: 20,
          	maxOpacity: .9,
          	minOpacity: .3,
          	blur: 0.8
        });
        window.h = heatmap;

        h.setData(data);
	}

	
	var isAdded = false;
	getUrl();
	function getUrl(){
		$li = $(".js-sub-menu-toggle").parents("li");
	    $(".js-sub-menu-toggle").click(function(){
	    	if($li.hasClass("active")){
	    		$li.removeClass("active");
	    		$li.find(".toggle-icon").removeClass("fa-angle-up").addClass("fa-angle-down");
	    		$li.find(".sub-menu").slideToggle(300);
	    	}else{
	    		$li.addClass("active");
	    		$li.find(".toggle-icon").removeClass("fa-angle-down").addClass("fa-angle-up");
	    		$li.find(".sub-menu").slideToggle(300);
	    	}
	    });
		
		if (!$li.hasClass("active")) {
	        $li.find(".toggle-icon").removeClass("fa-angle-down").addClass("fa-angle-up");
	        $li.addClass("active");
	        
	        urlJson = $.ajax({
				url: "http://sit.cloud.ezijing.com/v1/heatmap/urls", async: false
			});
	        
	        if(isAdded == false){
				for(var i = 0; i < urlJson.responseJSON.data.length; i++) {
					var liText = "<li class=\"item" + i + "\"><a href=\"heatclick.html\"><span class=\"text\">" 
								+ urlJson.responseJSON.data[i].url + "</span></a></li>";
					$(".sub-menu").append(liText);
				}
				isAdded = true;
	        }
	        
	        $(".sub-menu li").click(function(e){
	    		e.preventDefault();
	    		
	    		if($('#suggestion').hasClass("hidden") || $('#daterange').hasClass("hidden") || $('#heat-btn').hasClass("hidden") || $('#pickadate').hasClass("hidden")){
	    			$('#suggestion').removeClass("hidden").addClass("active");
		    		$('#daterange').removeClass("hidden");
		    		$('#heat-btn').removeClass("hidden");
		    		$('#pickadate').removeClass("hidden");
	    		}
	    		
	    		var index = $(this).index();
	    		var element = "item" + index;
	    		var urltext = document.getElementsByClassName(element)[0].children[0].children[0].textContent;
	    		URL = urltext;
	    		
	    		$("#iframeCon").attr("src", urltext);
	    		
	    		var ajaxUrl = "http://sit.cloud.ezijing.com/v1/heatmap/getdata?url=" + urltext + "&range=30" + "&date=2015-05-30";// + realTime; //"http://www.ezijing.com/api/heatmap/heatmap_click_pos?url=" + urltext + "&range" + realTime + "&date" + realTime;
	    		
	    		var examData = [{"timestamp":1433298096636,"uid":0,"host":"localhost","url":"http://localhost/mouseTrack.html","resolution":{"width":1920,"height":1080},"track_pos":{"x":1919,"y":8},"click_pos":{"x":0,"y":0},"clientSize":{"clientWidth":1920,"clientHeight":5078},"windowSize":{"winWidth":1903,"winHeight":596}},{"timestamp":1433298096649,"uid":0,"host":"localhost","url":"http://localhost/mouseTrack.html","resolution":{"width":1920,"height":1080},"track_pos":{"x":1919,"y":78},"click_pos":{"x":0,"y":0},"clientSize":{"clientWidth":1920,"clientHeight":5078},"windowSize":{"winWidth":1903,"winHeight":596}},{"timestamp":1433298096657,"uid":0,"host":"localhost","url":"http://localhost/mouseTrack.html","resolution":{"width":1920,"height":1080},"track_pos":{"x":1919,"y":114},"click_pos":{"x":0,"y":0},"clientSize":{"clientWidth":1920,"clientHeight":5078},"windowSize":{"winWidth":1903,"winHeight":596}},{"timestamp":1433298096663,"uid":0,"host":"localhost","url":"http ://localhost/mouseTrack.html","resolution":{"width":1920,"height":1080},"track_pos":{"x":1919,"y":155},"click_pos":{"x":0,"y":0},"clientSize":{"clientWidth":1920,"clientHeight":5078},"windowSize":{"winWidth":1903,"winHeight":596}},{"timestamp":1433298096671,"uid":0,"host":"localhost","url":"http://localhost /mouseTrack.html","resolution":{"width":1920,"height":1080},"track_pos":{"x":1919,"y":188},"click_pos":{"x":0,"y":0},"clientSize":{"clientWidth":1920,"clientHeight":5078},"windowSize":{"winWidth":1903,"winHeight":596}},{"timestamp":1433298096679,"uid":0,"host":"localhost","url":"http://localhost/mouseTrack.html","resolution":{"width":1920,"height":1080},"track_pos":{"x":1919,"y":221},"click_pos":{"x":0,"y":0},"clientSize":{"clientWidth":1920,"clientHeight":5078},"windowSize":{"winWidth":1903,"winHeight":596}},{"timestamp":1433298096687,"uid":0,"host":"localhost","url":"http://localhost/mouseTrack.html","resolution":{"width":1920,"height":1080},"track_pos":{"x":1919,"y":259},"click_pos":{"x":0,"y":0},"clientSize":{"clientWidth":1920,"clientHeight":5078},"windowSize":{"winWidth":1903,"winHeight":596}},{"timestamp":1433298096695,"uid":0,"host":"localhost","url":"http://localhost/mouseTrack.html","resolution":{"width":1920,"height":1080},"track_pos":{"x":1919,"y":296},"click_pos":{"x":0,"y":0},"clientSize":{"clientWidth":1920,"clientHeight":5078},"windowSize":{"winWidth":1903,"winHeight":596}},{"timestamp":1433298096703,"uid":0,"host":"localhost","url":"http://localhost/mouseTrack.html","resolution":{"width":1920,"height":1080},"track_pos":{"x":1919,"y":331},"click_pos":{"x":0,"y":0},"clientSize":{"clientWidth":1920,"clientHeight":5078},"windowSize":{"winWidth":1903,"winHeight":596}},{"timestamp":1433298096711,"uid":0,"host":"localhost","url":"http ://localhost/mouseTrack.html","resolution":{"width":1920,"height":1080},"track_pos":{"x":1919,"y":379},"click_pos":{"x":0,"y":0},"clientSize":{"clientWidth":1920,"clientHeight":5078},"windowSize":{"winWidth":1903,"winHeight":596}},{"timestamp":1433298096719,"uid":0,"host":"localhost","url":"http://localhost /mouseTrack.html","resolution":{"width":1920,"height":1080},"track_pos":{"x":1919,"y":425},"click_pos":{"x":0,"y":0},"clientSize":{"clientWidth":1920,"clientHeight":5078},"windowSize":{"winWidth":1903,"winHeight":596}},{"timestamp":1433298096727,"uid":0,"host":"localhost","url":"http://localhost/mouseTrack.html","resolution":{"width":1920,"height":1080},"track_pos":{"x":1919,"y":473},"click_pos":{"x":0,"y":0},"clientSize":{"clientWidth":1920,"clientHeight":5078},"windowSize":{"winWidth":1903,"winHeight":596}},{"timestamp":1433298096735,"uid":0,"host":"localhost","url":"http://localhost/mouseTrack.html","resolution":{"width":1920,"height":1080},"track_pos":{"x":1919,"y":518},"click_pos":{"x":0,"y":0},"clientSize":{"clientWidth":1920,"clientHeight":5078},"windowSize":{"winWidth":1903,"winHeight":596}},{"timestamp":1433298096743,"uid":0,"host":"localhost","url":"http://localhost/mouseTrack.html","resolution":{"width":1920,"height":1080},"track_pos":{"x":1919,"y":554},"click_pos":{"x":0,"y":0},"clientSize":{"clientWidth":1920,"clientHeight":5078},"windowSize":{"winWidth":1903,"winHeight":596}},{"timestamp":1433298096751,"uid":0,"host":"localhost","url":"http://localhost/mouseTrack.html","resolution":{"width":1920,"height":1080},"track_pos":{"x":1919,"y":585},"click_pos":{"x":0,"y":0},"clientSize":{"clientWidth":1920,"clientHeight":5078},"windowSize":{"winWidth":1903,"winHeight":596}}];
	    		
	    		generalData = $.ajax({
	    			url: ajaxUrl, async: false
	    		});
	    		
	    		//console.log(generalData.responseJSON.data.length);
	    		
	    		//generalData = '{"click_pos":[{"x":239,"y":178,"count":10},{"x":132,"y":67,"count":59},{"x":388,"y":180,"count":100},{"x":92,"y":81,"count":150},{"x":350,"y":182,"count":20},{"x":203,"y":345,"count":40},{"x":105,"y":186,"count":10},{"x":614,"y":191,"count":50}],"clientSize":[{"clientWidth":1887,"clientHeight":1076}]}';
	    		RenderHeatMap(examData);
	    		
	    		//$('#user-dropdown-toggle').html("选择昵称(默认所有)<b class=\"caret\"></b>");
	    		$('#daterange').html("<i class=\"fa fa-calendar\"></i><a>今天</a><b class=\"caret\"></b>");
	    		
	    		UID = "";
	    		StartDate = realTime;
	    		EndDate = realTime;
	    	});
	    } else {
	        $li.find(".toggle-icon").removeClass("fa-angle-up").addClass("fa-angle-down");
	        $li.removeClass("active");
	    }
	    $li.find(".sub-menu").slideToggle(300);
	}
		
	$('#daterange').daterangepicker(
		{
			ranges: {
	           '今天': [new Date(), new Date()],
	           '昨天': [moment().subtract(1, 'days'), moment().subtract('days', 1)],
	           '过去 7 天': [moment().subtract(6, 'days'), new Date()],
	           '过去 30 天': [moment().subtract(29, 'days'), new Date()],
	           '这个月': [moment().startOf('month'), moment().endOf('month')],
	           '上个月': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
			},
			opens: 'left',
			format: 'YYYY-MM-DD'
			/*startDate: '2015-03-17',
			endDate: '2015-04-15'*/
		},
		
		function(start, end) {
			$('#daterange a').html(start.format('YYYY-MM-DD') + ' - ' + end.format('YYYY-MM-DD'));
			StartDate = start.format("YYYY-MM-DD");
			EndDate = end.format("YYYY-MM-DD");
		}
	);
	
	$('.form_date').datetimepicker({
        language:  'zh-CN',
        weekStart: 1,
        todayBtn:  1,
		autoclose: 1,
		todayHighlight: 1,
		startView: 2,
		minView: 2,
		forceParse: 0
    });
	
	
	$('#heat-btn').click(function(){
		$('.heatmap-canvas').remove();
		
		var ajaxUrl = "http://sit.cloud.ezijing.com/v1/heatmap/getdata?url=" + URL + "&range=30" + "&date=" + StartDate;
		var JsonData = $.ajax({
			url: ajaxUrl, async: false
		});
		
		RenderHeatMap(JsonData);
		alert(URL + UID + StartDate + EndDate);
	});
});

