

var password = passwords[Math.floor(Math.random() * 199)];
password = password.toUpperCase();

var passwordLength = password.length;
var invalidAttempts = 0;
var passwordBlind = "";

var yes = new Audio("sound/yes.wav");
var no = new Audio("sound/no.wav");

for (var i = 0; i < passwordLength; i++) {
	if(password.charAt(i)==" ") passwordBlind = passwordBlind + " ";
	else passwordBlind = passwordBlind + "-"
}

function show_password() {
	document.getElementById("board").innerHTML = passwordBlind;
}

window.onload = start;

var letters = new Array(35);
letters[0] = "A";
letters[1] = "Ą";
letters[2] = "B";
letters[3] = "C";
letters[4] = "Ć";
letters[5] = "D";
letters[6] = "E";
letters[7] = "Ę";
letters[8] = "F";
letters[9] = "G";
letters[10] = "H";
letters[11] = "I";
letters[12] = "J";
letters[13] = "K";
letters[14] = "L";
letters[15] = "Ł";
letters[16] = "M";
letters[17] = "N";
letters[18] = "Ń";
letters[19] = "O";
letters[20] = "Ó";
letters[21] = "P";
letters[22] = "Q";
letters[23] = "R";
letters[24] = "S";
letters[25] = "Ś";
letters[26] = "T";
letters[27] = "U";
letters[28] = "V";
letters[29] = "W";
letters[30] = "X";
letters[31] = "Y";
letters[32] = "Z";
letters[33] = "Ż";
letters[34] = "Ź";

function start() {
	var divContain= "";

	for (var i = 0; i < 35; i++) {
		divContain = divContain + '<div id="let' + i + '" class = "litera" onclick="check(' + i + ');">' + letters[i] + '</div>'
		if((i + 1) % 7 == 0) divContain = divContain + '<div style="clear:both"></div>';
	}

	document.getElementById("alphabet").innerHTML = divContain;

	show_password();
}

String.prototype.setSign = function(position, sign) {
	if(position > this.length - 1) return this.toString();
	else return this.substr(0, position) + sign + this.substr(position+1);
}

function check(nr) {
	var find = false;

	for (var i = 0; i < passwordLength; i++) {
		if(password.charAt(i) == letters[nr]) {
			passwordBlind = passwordBlind.setSign(i, letters[nr]);
			find = true;
		}
	}
	if(find == true) {
		yes.play();
		document.getElementById("let" + nr).style.background = "#003300";
		document.getElementById("let" + nr).style.color = "#00C000";
		document.getElementById("let" + nr).style.border = "3px solid #00C000";
		document.getElementById("let" + nr).style.cursor = "default";

		show_password();
	} else {
		no.play();
		document.getElementById("let" + nr).style.background = "#330000";
		document.getElementById("let" + nr).style.color = "C00000";
		document.getElementById("let" + nr).style.border = "3px solid #C00000";
		document.getElementById("let" + nr).style.cursor = "default";
		document.getElementById("let" + nr).setAttribute("onclick",";");
		invalidAttempts++;
		document.getElementById("gallows").innerHTML = '<img src="img/s' + invalidAttempts + '.jpg" id="gallowsImg" alt="">';
	}
	
	if(password == passwordBlind){
		document.getElementById("alphabet").innerHTML = 'GRAUTLACJE WYGRAŁEŚ!!!<br/><br/><span class="reset" onclick="location.reload();">JESZCZE RAZ?</span>';
	}
	if(invalidAttempts >= 9) {
		document.getElementById("alphabet").innerHTML= 'PRZEGRAŁEŚ!!!<br/><br/><span class="reset" onclick="location.reload();">JESZCZE RAZ?</span>';
	}
}