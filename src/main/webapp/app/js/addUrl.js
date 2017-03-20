function formdel(cc){
	$('#'+ cc.id).parent().parent().remove();
	
	for(var i = 0; i < document.getElementsByTagName('tbody')[0].childElementCount; i++){
		$('tbody').children().children()[i * 7].innerHTML = i + 1;
	}
}

var ccid = "";
function formHandle(cc){
	ccid = cc.id;
}

$(document).ready(function(){
	$.ajax({
		type: 'GET',
	    dataType: "json",
		url: "http://cloud.ezijing.com/v1/heatmap/urls",
		success:function(data, textStatus, request) {
			for(var i = 0; i < data.data.length; i++){
				var template = '<tr><td>' + (i+1) + '</td><td>' + data.data[i].name + '</td><td>' + data.data[i].url + '</td><td>' + data.data[i].created_at 
				+ '</td><td>' + (data.data[i].updated_at == null? '未更新' : data.data[i].updated_at) + '</td><td><i class="fa fa-check" style="color: #32CD32;"></i></td><td><a data-toggle="modal" data-target="#handlerPageUrl">修改</a> <a id="d' + data.data[i].id + '" onclick="formdel(this);">删除</a></td></tr>';
				
				$('tbody').append(template);
			}
	    }
	});
	
	$('#submitUrl-btn').click(function(){
		var pagename = document.getElementById('page-name').value;
		var pageurl = document.getElementById('page-url').value;
		
		if(pagename == ""){
			
		}
		
		if(pageurl == ""){
			
		}
		
		var curTime = new Date();
		var realTime = curTime.getFullYear() + "-" + (curTime.getMonth() + 1) + "-" + curTime.getDate() 
			+ " " + curTime.getHours() + ":" + curTime.getMinutes() + ":" + curTime.getSeconds();
		var index = document.getElementsByTagName('tbody')[0].childElementCount + 1;
		
		var template = '<tr><td>' + index + '</td><td>' + pagename + '</td><td>' + pageurl + '</td><td>' + realTime 
			+ '</td><td>' + '</td><td><i class="fa fa-check" style="color: #32CD32;"></i></td><td><a data-toggle="modal" data-target="#handlerPageUrl">修改</a> <a id="d' + index + '" onclick="formdel(this);">删除</a></td></tr>';
		
		$('tbody').append(template);
	});
	
	$('#handlerUrl-btn').click(function(){
		var pagename = document.getElementById('handle-page-name').value;
		var pageurl = document.getElementById('handle-page-url').value;
		
		$('#'+ ccid).parent().parent().children()[1].innerHTML = pagename;
		$('#'+ ccid).parent().parent().children()[2].innerHTML = pageurl;
	});
});

