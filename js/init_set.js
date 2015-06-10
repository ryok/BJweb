/*
 * init001.html, init002.html, init003.html用
 * 女の子の好み情報をPUT
*/

var setGirlPreference = function(cute, beatiful, lolita, milf, sexy, pure, callback) {
    //console.log("setGirlPreference start..");
    var type = "PUT";
    //var url = "http://rehack-node.cloudapp.net/user";
    var url = "http://artra.cloudapp.net:3000/user";

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
		var params = {
				'userId': userID,
				'cute': cute,
				'beautiful': beatiful,
				'lolita': lolita,
				'milf': milf,
				'sexy': sexy,
				'pure': pure
			};

		//女の子の好みをPOST
		sendRequest(type, url, params, function(data) {
			console.log("data : " + data);
			if (data != "error") {
				console.log("put success..");
				callback("OK");
			} else {
				console.log("put failed..");
				callback("NG");
			}
		});
    });
}
