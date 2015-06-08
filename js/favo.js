/*
 *	favo.htmlを読み込んだときに実行
*/

// ユーザIDの取得
webNative.getUserID(function(uID) {
	// ユーザIDを取得できた場合
	if(uID && uID.indexOf("Failed") == -1) {
		var type = "GET";
		var url = "http://artra.cloudapp.net:3000/fav?userId=" + uID;
		//var url = "http://rehack-node.cloudapp.net/fav?userId=" + uID;
		sendRequest(type, url, {}, function(data) {
			// お気に入り登録がある場合
			if(data && data.length > 0) {
				var len = data.length;
				for(var i=0; i < len; i++) {
					var item = $("<div class='item'></div>");
					var img = $("<img src="+data[i].img+">");
					img.appendTo(item);
					var sName = $("<div class='sName'>"+ data[i].name +"</div>");
					sName.appendTo(item);
					var btn = $("<button type='button' class='btn btn-info dBtn' id='sID_"+ data[i]._id +"' onclick='' style='width: 100%;'>見る</button>");
					btn.appendTo(item);
					item.appendTo("#favContainer");
				}
				$("#favContainer > .item img").imagesLoaded( function(){
					$("#favContainer").BlocksIt({
						numOfCol: 2,
						offsetX: 8,
						offsetY: 8,
						blockElement: '.item'
					});
				});
			// お気に入り登録がない場合
			} else {
				console.log("You don't register your favorite");
			}
		});
	// ユーザIDが取得できない場合
	} else if(uID.indexOf("Failed") != -1) {
		console.log("Not found your uID");
	// PCからアクセスした場合
	} else {
		var type = "JSONP";
		//var url = "http://rehacktest.azurewebsites.net/menu/data.jsonp";
		var url = "http://artra.cloudapp.net:3000/menu/data.jsonp";
		sendRequest(type, url, {}, function(data) {
			// お気に入り登録がある場合
			if(data && data.length > 0) {
				var len = data.length;
				for(var i=0; i < len; i++) {
					var item = $("<div class='item'></div>");
					var img = $("<img src="+data[i].img+">");
					img.appendTo(item);
					var sName = $("<div class='sName'>"+ data[i].name +"</div>");
					sName.appendTo(item);
					var btn = $("<button type='button' class='btn btn-primary dBtn' id='sID_"+ data[i]._id +"' onclick=''>内容を見る</button>");
					btn.appendTo(item);
					item.appendTo("#favContainer");
				}
				$("#favContainer > .item img").imagesLoaded( function(){
					$("#favContainer").BlocksIt({
						numOfCol: 2,
						offsetX: 8,
						offsetY: 8,
						blockElement: '.item'
					});
				});
			// お気に入り登録がない場合
			} else {
				console.log("You don't register your favorite");
			}
		});
	}
});
