/*
 *	Webとネイティブ(iPhone/iPad)とのデータ連携処理
*/

var webNative = {};
webNative.userCallback = null;
webNative.saveUserCallback = null;

// ユーザIDをiPhone/iPadに保存
webNative.saveUserID = function(userID, callback) {
	var agent = navigator.userAgent;
	// iPhone/iPadの場合
	if(agent.indexOf('iPhone') != -1 || agent.indexOf('iPad') != -1) {
		webNative.saveUserCallback = callback;
		document.location = "rehack.app.local://saveUserID_" + userID;
	} else {
		callback("52aef1976570b0f0c0000001");
	}
};

// iPhone/iPadからユーザIDを取得
// ユーザIDがない場合: Failed が返る
// iPhone/iPad以外からアクセスした場合: PC_ACCESS が返る
webNative.getUserID = function(callback) {
	var agent = navigator.userAgent;
	console.log('webNative get User ID...');

	// iPhone/iPadの場合
	if(agent.indexOf('iPhone') != -1 || agent.indexOf('iPad') != -1) {
		webNative.userCallback = callback;
		document.location = "rehack.app.local://getUserID";
	// それ以外の場合(テストIDを使用)
	} else {
		//callback("PC_ACCESS");
		callback("52b4939261c56a7f29000001");
	}
}

// iPhone/iPadに保存されたユーザIDを更新(今回は使用しないと思います)
webNative.updateUserID = function(userID) {
	var agent = navigator.userAgent;

	// iPhone/iPadの場合
	if(agent.indexOf('iPhone') != -1 || agent.indexOf('iPad') != -1) {
		webNativeCallback = callback;
		document.location = "rehack.app.local://updateUserID_" + userID;
	}
}

// iPhone/iPadからユーザIDを受け取る処理(iPhone/iPadから実行される処理)
var setUserID = function(userID) {
	webNative.userCallback(userID);
}

// iPhone/iPadからユーザIDを受け取る処理(ユーザIDを端末に保存した後に実行される)
var savedUserID = function(userID) {
	webNative.saveUserCallback(userID);
}
