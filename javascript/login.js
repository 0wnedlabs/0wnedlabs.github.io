function Login(){
	var user=document.login.user.value;
	var username=user.toLowerCase();
	var password=document.login.password.value;
	password=password.toLowerCase();
	if (user=="admin" && password=="admin") {
	    alert("flag{javascript_sucks}");
	} else { 
	    alert("0wnedlab : Error, Try again. You can do it ! :D"); 
	}
}