module.exports = {
	setInfo:function(id,name,token,avatar,roles){
		window.localStorage.setItem("user_id",id);
		window.localStorage.setItem("user_name",name);
		window.localStorage.setItem("user_token",token);
		window.localStorage.setItem("user_avatar",avatar);
		window.localStorage.setItem("user_rules",roles);
	},
	getInfo:function(){
		return {
			id: window.localStorage.getItem("user_id"),
			name: window.localStorage.getItem("user_name"),
			token: window.localStorage.getItem("user_token"),
			avatar: window.localStorage.getItem("user_avatar"),
			roles: window.localStorage.getItem("user_rules")
		}
	}
}