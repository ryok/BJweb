/*
 * init_result.html読み込み時　実行
*/

var type = "GET";

// ユーザIDの取得
var userID = "";
webNative.getUserID(function(uID) {

    // ユーザIDを取得できた場合
    if(uID && uID.indexOf("Failed") == -1) {
        console.log("userid get succeess.");
        userID = uID;

    // ユーザIDが取得できない場合
    } else if(uID.indexOf("Failed") != -1) {
        console.log("failed to get userID.");
        
        //テスト用ID設定
        userID = "52a4961cf9d6ee6a59000001";
            
    //PCの場合
    } else {
        console.log("pc case");
        userID = uID;
    }
});

var url = "http://rehack-node.cloudapp.net:3000/user?userId=" + userID;

// 女の子の好み情報をGET
sendRequest(type, url, {}, function(data) {
	if (data != "error") {
		for(var i in data) {
			console.log("toString : " + data[i].toString() );
			// 結果表示ロジックを実装
		}
	} else {
		console.log("get failed...");
	}
});