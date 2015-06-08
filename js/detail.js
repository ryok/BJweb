/*
 *	detail.htmlを読み込んだときに実行
*/

// 現在のURLからofferIdを取得
var offerId = get_url_vars().offerId;
var type = "";
var url = {};
var registeredFlag = false;

// offerIdがある場合
if(offerId) {
	type = "GET";
	url = "http://artra.cloudapp.net:3000/";
	//url = "http://rehack-node.cloudapp.net/";
} else {
	type = "JSONP";
	url = "http://192.168.1.20/~kato_takahiro/rehackf/data.jsonp";
}

var offerUrl = url + "offer?offerId=" + offerId;
// サーバからショップ概要を取得
sendRequest(type, offerUrl, {}, function(data) {
	// テスト用
	if(type === "JSONP") {
		data = data[0];
	}
	// 概要が取得できた場合
	if(data) {
		$("#dSName").html(data.name);
		$("#dSImg").append("<img src="+ data.img+" class='img-rounded' />");
		$("#dSSalary").html(data.pay);
		$("#dSWork").html(data.detail);
		$("#dSPr").html(data.catch);
		$(".btn a").attr("href", data.url);

		// 端末からユーザIDを取得
		webNative.getUserID(function(uID) {
			// ユーザIDを取得できた場合
			if(uID && uID.indexOf("Failed") == -1) {
				var userUrl = url + "user?userId=" + uID;
				// サーバにユーザ情報を問い合わせる
				sendRequest(type, userUrl, {}, function(user) {
					// お気に入り登録がある場合
					if(user && user.fav) {
						var userFavArray = user.fav,
							userFavArrayLength = userFavArray.length;
						if(userFavArrayLength > 0) {
							for(var i=0; i<userFavArrayLength; i++) {
								// お気に入り登録がされているIDと一致する場合
								if(offerId === userFavArray[i]) {
									registeredFlag = true;
								}
							}
						}
						// お気に入り登録済みのショップである場合
						if(registeredFlag) {
							$("#dSImg").after("<button type='button' class='btn rehackBtn btn-danger deleteBtn'>お気に入りから削除</button>");
							$(".deleteBtn").attr("id", data._id);
						// お気に入りに登録していないショップの場合
						} else {
							$("#dSImg").after("<button type='button' class='btn rehackBtn btn-warning favBtn'>お気に入り</button>");
							$(".favBtn").attr("id", data._id);
						}
						// 『この美女をお気に入りに登録している人は他にこんな美女をお気に入りに登録しています』の処理
						var array = ["./img/girl1.jpg", "./img/girl2.jpg", "./img/girl3.png", "./img/girl4.jpg", "./img/girl5.jpg", "./img/girl6.gif", "./img/girl7.jpg"];
						var arrayLen = array.length;
						for(var i=0; i < arrayLen; i++) {
							$("#owl-example").append("<div class='owlImg'><img src=" + array[i] + " /></div>");
						}
						// カルーセル表示
						$("#owl-example").owlCarousel({autoPlay: 5000});
					}
				});
			// ユーザIDを取得できなかった場合
			} else {
				console.log("You can't get uID");
			}
		});
	// 概要が取得できない場合
	} else {
		console.log("You Can't get the brief");
	}
});
