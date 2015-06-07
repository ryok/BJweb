//サービススタート
$(function() {
	// progress-barのアニメーション
	$('#main > .progress > .progress-bar').animate({width: '90%'},0);

	event.preventDefault();
	console.log("startButton clicked.");

	setTimeout(function(){	

		// ユーザIDの取得
		webNative.getUserID(function(uID) {

			// ユーザIDを取得できた場合
			if(uID && uID.indexOf("Failed") == -1) {
        		console.log("uID : " + uID);

        		//マップ画面に遷移
        		document.location = "./girlMap.html";

				// ユーザIDが取得できない場合
			} else if(uID.indexOf("Failed") != -1) {
        		console.log("can not get user id : " + uID);

        		var type = "POST";
        		var url = "http://rehack-node.cloudapp.net/user";
        		sendRequest(type, url, {}, function(data) {
        			//成功の場合
        			if(data && data._id) {
						console.log("id : " + data._id);
						webNative.saveUserID(data._id, function(uID) {
							//初期設定画面に遷移
							document.location = "./init001.html";
						});
        				//失敗の場合
        			} else {
        				console.log("can not create new id : " + data);
        			}
        		});

				// PCからアクセスした場合
			} else {
        		console.log("uID : " + uID);

        		//マップ画面に遷移
        		document.location = "./init001.html";
        		//document.location = "./map.html";
			}
		});
	}, 1000);
});
