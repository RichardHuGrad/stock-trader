/*$(document).ready(function(){
	var URL = "";
	var UID = "";
	var curTime = new Date();
	var realTime = curTime.getFullYear() + "-" + (curTime.getMonth()+1)  + "-" + curTime.getDate();
	var StartDate = realTime;
	var EndDate = realTime;
	var dateRange = 1;
	
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
		
		var iframWidth = document.getElementById("iframeCon").getAttribute("width");
		var iframeHeight = document.getElementById("iframeCon").getAttribute("height");
		alert(iframeHeight);
		
		var points = [];
		
		for(var i = 0; i < JsonData.responseJSON.data.length; i++){
			if(JsonData.responseJSON.data[i].click_pos.click_x != 0){
				var point = {
						x: JsonData.responseJSON.data[i].click_pos.click_x * iframWidth / JsonData.responseJSON.data[i].client_size.client_width,
						y: JsonData.responseJSON.data[i].click_pos.click_y,
						value: JsonData.responseJSON.data[i].count
				};
				points.push(point);
			}
		}
		
		var data = {
    		max: 200,
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
		    		$('.btn-group').removeClass("hidden");
	    		}
	    		
	    		var index = $(this).index();
	    		var element = "item" + index;
	    		var urltext = document.getElementsByClassName(element)[0].children[0].children[0].textContent;
	    		URL = urltext;
	    		
	    		$("#iframeCon").attr("src", urltext);
	    		
	    		var ajaxUrl = "http://sit.cloud.ezijing.com/v1/heatmap/getdata?url=http://www.ezijing.com/&range=30&date=2015-05-31"; //"http://sit.cloud.ezijing.com/v1/heatmap/getdata?url=" + urltext + "&range=30" + "&date=" + realTime; //"http://www.ezijing.com/api/heatmap/heatmap_click_pos?url=" + urltext + "&range" + realTime + "&date" + realTime;
	    		generalData = $.ajax({
	    			url: ajaxUrl, async: false
	    		});
	    		
	    		//console.log(generalData.responseJSON.data.length);
	    		
	    		//generalData = '{"click_pos":[{"x":239,"y":178,"count":10},{"x":132,"y":67,"count":59},{"x":388,"y":180,"count":100},{"x":92,"y":81,"count":150},{"x":350,"y":182,"count":20},{"x":203,"y":345,"count":40},{"x":105,"y":186,"count":10},{"x":614,"y":191,"count":50}],"clientSize":[{"clientWidth":1887,"clientHeight":1076}]}';
	    		RenderHeatMap(generalData);
	    		
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
			startDate: '2015-03-17',
			endDate: '2015-04-15'
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
	
	$('.btn-daterange').click(function(){
        if($(this).index() == 0){
        	dateRange = 1;
        }else if($(this).index() == 1){
        	dateRange = 7;
        }else if($(this).index() == 2){
        	dateRange = 30;
        }else {
        	dateRange = 1;
        };
    });
	
	$('#heat-btn').click(function(){
		if(/^[\u4e00-\u9fa5]+$/i.test($(".form-control")[0].value) || $(".form-control")[0].value == ""){
			$(".form-control")[0].value = "请选择一个日期";
		}else{
			$('.heatmap-canvas').remove();
			var ajaxUrl = "http://sit.cloud.ezijing.com/v1/heatmap/getdata?url=" + URL + "&range=" + dateRange + "&date=" + $(".form-control")[0].value;
			var JsonData = $.ajax({
				url: ajaxUrl, async: false
			});
			
			RenderHeatMap(JsonData);
		}
		
		//alert(URL + UID + StartDate + EndDate);
	});
});

*/