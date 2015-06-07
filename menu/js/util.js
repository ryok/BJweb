/*
 *	現在のページのURLからGETパラメータを取得する処理
*/

get_url_vars =  function() {
	var vars = new Object, params;
	var temp_params = window.location.search.substring(1).split('&');
	for(var i = 0; i <temp_params.length; i++) {
		params = temp_params[i].split('=');
		vars[params[0]] = params[1];
	}
	return vars;
}
