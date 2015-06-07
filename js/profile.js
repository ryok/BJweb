$(function(){
	// var url = 'http://' + location.hostname + ':3000/user';
	var url = 'http://rehack-node.cloudapp.net/user';
	var userId;
	var d = [];
	
	var getProfile = function(){
		$.ajax({
			type: 'get',
			url: url,
			// url: 'http://localhost:3000/user',
			data: {
				userId: userId
			},
			success: function(res){
				console.log(res);
				
				var data = [
					{axis: '可愛い', value: res.type.cute},
					{axis: '清純', value: res.type.pure},
					{axis: '年上', value: res.type.milf},
					{axis: '綺麗', value: res.type.beautiful},
					{axis: 'セクシー', value: res.type.sexy},
					{axis: '年下', value: res.type.lolita}
				];
				d.push(data);

				var options = {
					w: 290,
					h: 290,
					factorLegend: 0.9,
					levels: 3,
					fontSize: 20,
					color: '#8e44ad'
				};

				RadarChart.draw("#chart", d, options);
				// RadarChart.draw("#chart", d);
			},
			error: function(res){
				console.log(res);
			}
		});
	};	

	webNative.getUserID(function(uID){
		if(uID && uID.indexOf('Failed') == -1){
			userId = uID;
			// userId = '52ad511fe16d3b821e000001'; // local
			// userId = '52aef1976570b0f0c0000001'; // rehack-node
		}else{
			alert('ユーザ情報が取得できません。');
		}
		getProfile();
	});;

	$('#main > button').on('click touchend', function(){
		location.href = './girlMap.html';
	});
});
