jQuery( function($) {

	//遷移先のURLを設定
	var url = "http://artra.cloudapp.net:3000/";
	//var url = "http://rehack-node.cloudapp.net";

	// メニュー開閉ボタンをクリックしたときの処理
	$("#lBtn img").bind("click", function() {
		// メニューが非表示の場合
		if($("#panel").css("left") == "-201px") {
			// メニューを表示する
			$("#panel").animate({
				left: "0px"
			}, 300);
		// メニューが表示の場合
		} else {
			// メニューを非表示にする
			$("#panel").animate({
				left: "-201px"
			}, 300);
		}
	});

	//メニュー内の閉じるボタンをクリックしたときの処理
	$("#panel img").bind("click", function() {
		if($("#panel").css("left") == "-201px") {
			$("#panel").animate({
				left: "0px"
			}, 300);
		} else {
			$("#panel").animate({
				left: "-201px"
			}, 300);
		}
	});

	// メニューからマップを選択したときの処理
	$("#mapBar").bind("click", function() {
		location.href = url + "views/girlmap.html";
	});

	// メニューからお気に入りを選択したときの処理
	$("#favoBar").bind("click", function() {
		location.href = url + "views/registerFavo.html";
	});

	// メニューからプロファイル設定を選択したときの処理
	$("#profileBar").bind("click", function() {
		location.href = url + "views/profile2.html";
	});

	// ヘッダーのタッチ操作を無効にする
	$("header").bind("touchstart", function() {
		event.preventDefault();//スマホのデフォルトのタッチイベントを無効
	});

	// ヘッダーのタッチ操作を無効にする
	$("header").bind("touchmove", function() {
		event.preventDefault();//スマホのデフォルトのタッチイベントを無効
	});

	// ヘッダーのタッチ操作を無効にする
	$("header").bind("touchend", function() {
		event.preventDefault();//スマホのデフォルトのタッチイベントを無効
	});

	// ショップ概要に遷移
	$(document).on("click", ".dBtn", function() {
		var offerId = this.id.split("_")[1];
		location.href = url + "views/detail.html?offerId=" + offerId;
	});

	// お気に入り登録の処理
	$(document).on("click", ".favBtn", function() {
		var offerId = this.id;
		// ユーザIDの取得
		webNative.getUserID(function(uID) {
			// ユーザIDが取得できた場合
			if(uID && uID.indexOf("Failed") == -1) {
				var reqUrl = url + "/user";
				var type = "PUT";
				var params = {
					userId: uID,
					fav: offerId
				}
				// お気に入り登録を実行
				sendRequest(type, reqUrl, params, function(data) {
					// 成功した場合
					if(data && data != "error") {
						alert("お気に入りに登録しました");
					// 失敗した場合
					} else {
						alert("お気に入りに登録できませんでした");
					}
					var nowUrl = location.href;
					// マップからの遷移ではない場合
					if(nowUrl.indexOf("girlmap") == -1) {
						location.reload(true);
					}
				});
			// ユーザIDが取得できない場合
			} else {
				console.log("ユーザIDを取得できません");
			}
		});
	});

	// お気に入りから削除する処理
	$(document).on("click", ".deleteBtn", function() {
		if(window.confirm("お気に入りから削除してもよろしいですか？")) {
			var offerId = this.id;
			// ユーザIDの取得
			webNative.getUserID(function(uID) {
				// ユーザIDが取得できた場合
				if(uID && uID.indexOf("Failed") == -1) {
					var reqUrl = url + "/user";
					var type = "DELETE";
					var params = {
						userId: uID,
						fav: offerId
					}
					// お気に入り登録を実行
					sendRequest(type, reqUrl, params, function(data) {
						// 成功した場合
						if(data && data != "error") {
							alert("お気に入りから削除しました");
						// 失敗した場合
						} else {
							alert("お気に入りから削除できませんでした");
						}
						location.reload(true);
					});
				// ユーザIDが取得できない場合
				} else {
					console.log("You can't get uID");
				}
			});
		}
	});
});
