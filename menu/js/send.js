/*
 *	サーバへリクエストを投げる処理
 *	@param	String	type		リクエストタイプ(GET: 取得, POST: 登録, PUT: 更新, DELETE: 削除)
 *	@param	String	url			リクエスト先のURL(type: "GET"の場合は?userId=******のようにパラメータを付与)
 *	@param	Object	params		リクエストパラメータ(type: "POST", "PUT", "DELETE"の場合のみ使用。type: "GET"では{}を指定)
 *	@param	Object	callback	コールバック関数
*/

var sendRequest = function(type, url, params, callback) {
	// テスト用に使用
	if(type === "JSONP") {
		$.ajax({
			type: "GET",
			url: url,
			dataType: "jsonp",
			jsonp: 'jsoncallback',
			jsonpCallback: 'iphone',
			success: function(data) {
				console.log("success");
				callback(data);
			},
			error: function(req, err, errObj) {
				console.log("err: " + err);
				callback(err);
			}
		});
	// GETの場合
	} else if(type === "GET") {
		$.ajax({
			type: type,
			url: url,
			dataType: "json",
			success: function(data) {
				console.log("success");
				callback(data);
			},
			error: function(req, err, errObj) {
				console.log("err: " + err);
				callback(err);
			}
		});
	// POST or PUT or DELETEの場合
	} else if(type === "POST" || type === "PUT" || type === "DELETE") {
		$.ajax({
			type: type,
			url: url,
			dataType: "json",
			data: {
				params: params
			},
			success: function(data) {
				console.log("success");
				callback(data);
			},
			error: function(req, err, errObj) {
				console.log("err: " + err);
				callback(err);
			}
		});
	} else {
		console.log("Not found type");
	}
}
