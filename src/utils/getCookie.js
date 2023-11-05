//查询名字为findCookieName的cookie值
function getCookie(cookieName) {
	//获取所有的Cookie,在strCookie是一个包含所有cookie的字符串。
	var strCookie = document.cookie;
	//以;为分隔符将所有的cookie进行分割。将获得的所有cookie切割成数组
	var arrCookie = strCookie.split("; ");
	//通过for循环进行遍历arrCookie数组。
	for(var i = 0; i < arrCookie.length; i++){
	       //通过=进行分割，将本次循环的cookie分割为名字（等于号前），值（等于号后面）
	        var arr = arrCookie[i].split("=");
	        //将本次循环的cookie名字与需要查找的cookie进行比较
	        if(cookieName == arr[0]){
	            //返回指定cookie的值
	            return arr[1];
	        }
	}
	//未查找到指定的cookie返回空。
	    return "";
}