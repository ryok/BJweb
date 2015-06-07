/**
 *	位置情報取得関数
**/

var getUserLocation = function(callback) {
	if(navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position) {
			//正常に位置情報が取得できた場合
			var location = {
				lat: position.coords.latitude,
				lng: position.coords.longitude,
			};
			callback(location);
		},
		function(error) {
			//位置情報が取得できなかった場合
			console.log("位置情報が取得できませんでした。");
			if(error.code === 1) {
				console.log("位置情報の利用が許可されていません。 message: " + error.message);
			} else if(error.code === 2) {
				console.log("位置情報取得が利用できません。 message: " + error.message);
			} else if(error.code === 3) {
				console.log("タイムアウトです。 message: " + error.message);
			}
		},
		{ enableHighAccuracy:true,timeout:10000,maximumAge:0 });
	}
};
