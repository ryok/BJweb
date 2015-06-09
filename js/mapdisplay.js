/*
 * マップ表示用js
*/

var map;
var marker;
var marker_ary = new Array();
var infoWindow_ary = new Array();
var userID;
var currentInfoWindow;
var preName =  "";

//初期化関数
function initialize(location) {
    var latlng = new google.maps.LatLng(location.lat, location.lng);
    var myOptions = {
        zoom: 13,
        center: latlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(document.getElementById("map"), myOptions);

    // 現在位置メーカーを設定
    /*marker = new google.maps.Marker({
        position: map.getCenter(),
        map: map
    });*/
}

// 情報ウィンドウ表示用関数
function setInfoWindow(id, lng, lat, name, img) {
    var infoWindow_num = infoWindow_ary.length;

    //テスト用 同じ場所に何回もプロットしないため
    if (preName != name) {
        console.log("data name : " + name);
        preName = name;
                
        // 情報ウィンドウを表示
        var infoLatLng = new google.maps.LatLng(lat, lng);

        var contentStr = "<dl id='infowin1'><dt><font size='3'>" + name +
                        "</font></dt><dd>" + 
                        "<img src='" + img + "' width='100' align='left' />" + 
                        "<button type='button' class='favBtn' id='" + id +
                        "'><font size='2' >★</font></button><br>" + 
                        "<button type='button' class='dBtn' onClick='' id='sID_" + id + 
                        "'><font size='2'>詳細情報</font></button>" +
                        "</dd></dl>";
                                
        infoWindow_ary[infoWindow_num] = new google.maps.InfoWindow({
                        content: contentStr,
                        position: infoLatLng
                    });
        infoWindow_ary[infoWindow_num].open(map);
    }
}

//情報ウィンドウ削除
function infoWindowClear() {
    //表示中の情報ウィンドウがあれば削除
    if (infoWindow_ary.length > 0) {
        //情報ウィンドウ削除
        for (i = 0; i < infoWindow_ary.length; i++) {
            infoWindow_ary[i].close();
        }
        //配列削除
        for (i = 0; i <= infoWindow_ary.length; i++) {
            infoWindow_ary.shift();
        }
    }
}

//マーカー削除
function MarkerClear() {
    //表示中のマーカーがあれば削除
    if(marker_ary.length > 0){
        //マーカー削除
        for (i = 0; i <  marker_ary.length; i++) {
            marker_ary[i].setMap();
        }
        //配列削除
        for (i = 0; i <=  marker_ary.length; i++) {
            marker_ary.shift();
        }
    }
}

// マーカーセット
function MarkerSet(id, lng, lat, name, img) {
    //console.log("data name : " + name);
    //if (preName != name) {
    //    preName = name;

        //マーカーをプロット
        var marker_num = marker_ary.length;
        var marker_position = new google.maps.LatLng(lat, lng);
        marker_ary[marker_num] = new google.maps.Marker({
            position: marker_position,
            map: map,
			icon: new google.maps.MarkerImage(
				'./img/heart.png',                     // url
				new google.maps.Size(32,32), // size
				new google.maps.Point(0,0),  // origin
				new google.maps.Point(16,16) // anchor
			)
        });

        var contentStr = "<dl class='infowin'><dt><font size='3'>" + name +
                            "</font></dt><dd>" + 
                            "<div align='middle'><img src='" + img + "'/></div>" + 
                            "<div align='bottom'><div align='middle'><button type='button' class='favBtn' id='" + id +
                            "'>★</button>" + 
                            "   <button type='button' class='dBtn' onClick='' id='sID_" + id + 
                            "'>見る</button></div></div>" +
                            "</dd></dl>";

        var infoWndOpts = {
            content: contentStr
        };
        var infoWnd = new google.maps.InfoWindow(infoWndOpts);

        // イベント登録　マーカーをクリックしたとき
        google.maps.event.addListener (marker_ary[marker_num], 'click', function() {
            console.log("########clicked.#########");
     
            //先に開いた情報ウィンドウがあれば、closeする
            if (currentInfoWindow) {
                currentInfoWindow.close();
            }
     
            //情報ウィンドウを開く
            infoWnd.open(map, marker_ary[marker_num]);
     
            //開いた情報ウィンドウを記録しておく
            currentInfoWindow = infoWnd;
        });
    //}
}
 

//サーバーから情報取得用関数
function getInformation(userID) {
    // GET時のパラメータを設定
    var bounds = map.getBounds();
    var maxX = bounds.getNorthEast().lng(); //東
    var minX = bounds.getSouthWest().lng(); //西
    var maxY = bounds.getNorthEast().lat(); //北
    var minY = bounds.getSouthWest().lat(); //南
    var northEast = maxX + ", " + maxY;
    var southWest = minX + ", " + minY;
    var url_params = "?userId=" + userID + 
                "&lng=" + map.getCenter().lng() + 
                "&lat=" + map.getCenter().lat() +
                "&ne=" + northEast +
                "&sw=" + southWest;
    /*var params = {
        userId: userID,
        lng: map.getCenter().lng(),
        lat: map.getCenter().lat(),
        ne: northEast,
        sw: southWest
    };*/
    //var url = "http://rehack-node.cloudapp.net/map/";
    //var url = "http://rehack-node.cloudapp.net/map/" + url_params; 
    var url = "http://artra.cloudapp.net:3000/map/" + url_params; 

    //マップ上に表示する求人（美女）取得GET
    sendRequest("GET", url, {}, function(data) {
        console.log("data length : " + data.length );
        // GET処理が成功した場合
        if(data) {
            for(var i in data) {
                MarkerSet(data[i]._id,
                    data[i].lnglat[0], 
                    data[i].lnglat[1], 
                    data[i].name, 
                    data[i].img);
            }

        //GET処理がエラーの場合
        } else {
            alert("情報の取得に失敗しました");

            //テスト用サンプル
            /*var data = [
                        { 
                            "name": 'テレコムセンター',
                            "img": 'http://imgcc.naver.jp/kaze/mission/USER/20130209/88/899368/40/400x642x1d105fd658f5d7c6689f68c1.jpg',
                            "lnglat": [ location.lng + 0.006, location.lat + 0.001 ]
                        },
                        { 
                            "name": 'デニーズ',
                            "img": 'http://www.kotono8.com/wiki/images/f/f9/%E7%94%B0%E4%B8%AD%E7%BE%8E%E4%BF%9D.jpg',
                            "lnglat": [location.lng - 0.005, location.lat - 0.008]
                        },
                        {   "name": 'ドトール',
                            "img": 'http://s.cinematoday.jp/res/A0/00/12/A0001220-00.jpg',
                            "lnglat": [location.lng + 0.01, location.lat - 0.005]
                       }
                        ]
            for(var i in data) {
                MarkerSet(data[i]._id,
                    data[i].lnglat[0], 
                    data[i].lnglat[1], 
                    data[i].name, 
                    data[i].img);
            }*/
        }
    });
}

//map.html読み込み時に実行
$(function(){
    // 現在位置取得
    getUserLocation(function(location){

        // マップ表示
        initialize(location);

        // ユーザIDの取得
        webNative.getUserID(function(uID) {
            // ユーザIDを取得できた場合
            if(uID && uID.indexOf("Failed") == -1) {
                console.log("userid get succeess.");
                userID = uID;
                //userID = "52aef1976570b0f0c0000001";

            // ユーザIDが取得できない場合
            } else if(uID.indexOf("Failed") != -1) {
                console.log("failed to get userID.");
                alert("ユーザIDが取得できません");
                //userID = "52aef1976570b0f0c0000001";
            
            //PCの場合
            } else {
                console.log("pc case");
                userID = uID;
            }
        });

        //イベント登録　ドラッグやめたらイベントを発生させる
        google.maps.event.addListener(map, 'dragend', function(){
            console.log("*********** DRAGEND ***********");
            //先に開いた情報ウィンドウがあればcloseする
            //infoWindowClear();
            MarkerClear();

            //サーバから情報取得し、地図上に表示
            getInformation(userID);
        });

        //イベント登録 地図が投影されたらイベント発生
        google.maps.event.addListener (map, 'projection_changed', function() {
            console.log("*********** projection_changed ***********");
            //先に開いた情報ウィンドウがあればcloseする
            //infoWindowClear();
            MarkerClear();

            //サーバから情報取得し、地図上に表示
            getInformation(userID);
        });

        //イベント登録 ズームが変更されたらイベント発生
        google.maps.event.addListener (map, 'zoom_changed', function() {
            console.log("*********** zoom_changed ***********");
            //先に開いた情報ウィンドウがあればcloseする
            //infoWindowClear();
            MarkerClear();

            //サーバから情報取得し、地図上に表示
            getInformation(userID);
        });
	});
});
