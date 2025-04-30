//===============================================================
// 全般
//===============================================================

// 実行しているＨＴＭＬのファイル名〔～.html〕
const filename = window.location.pathname.split('/').pop();

// メニュー一覧の定義（ＨＴＭＬ、タイトル名）
const data = [
  { key: 1, html_key: "index.html", html_name: "ホーム" },
  { key: 2, html_key: "activity.html", html_name: "趣味、活動、興味" },
  { key: 3, html_key: "aboutme.html", html_name: "自己紹介" },
  { key: 4, html_key: "contact", html_name: "連絡先・コンタクト" },
  { key: 5, html_key: "other.html", html_name: "その他" },
  { key: 6, html_key: "test.html", html_name: "甘くて高級な果物(test.html)" }
];

// 指定したＨＴＭＬのタイトル名
function getNameByKey(in_key) {
  const item = data.find(obj => obj.html_key === in_key);
  return item ? item.html_name : null;
}

//メニュー一覧を（output_menu1）に表示する。
function dsipMenuListByKey(in_key) {

  const outputDiv = document.getElementById('output_menu1');



//  data.forEach(item => {
//    if (item.key === key) {
//      result = item.name;
//    }
//  });

  var ret = "";
  data.forEach(item => {
    if (item.html_key == in_key) {
//      document.write(item.html_key," == ",in_key," ",item.html_name," aaaaaa<br>"); 
      ret = "<li><a href=" + item.html_key + "> ⇒<b>" + item.html_name + "</b></a></li>";
    }
  else {
//      document.write(item.html_key," <> ",in_key," ",item.html_name," bbbbbb<br>"); 
      ret = "<li><a href=" + item.html_key + "> ●<b>" + item.html_name + "</b></a></li>";
    }
  outputDiv.innerHTML += ret;
  });


//    if (item.html_key == in_key) {
//     document.write(item.html_key," _ ",in_key,"aaaaaaaaaaaaaaa<br>"); 
//     const line = `<li><a href="${data.html_key}"> ●<b>${data.html_name}</b></a></li>`;
//     }
//    else {
//     document.write(item.html_key," _ ",in_key,"bbbbbbbbbbbbbbb<br>"); 
//     const line = `<li><a href="${data.html_key}"> ■<b>${data.html_name}</b></a></li>`;
//     }
//    else {
//    }
//    outputDiv.innerHTML += line;
//  });

// document.getElementById('output_menu1').innerHTML = '<li><a href="' + menu1e + '">'+ '●' + menu1n + '</a></li>';

}


// 現在日を表示
function getToday() {
	var now = new Date();
	var year = now.getFullYear();
	var mon = now.getMonth()+1; //１を足すこと
	var day = now.getDate();
	var you = now.getDay(); //曜日(0～6=日～土)
	//曜日の選択肢
	var yoube = new Array("Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday");
	//月名の選択肢
	var mone = new Array("January","February","March","April","May","June","July","August","September","October","November","December");
	//曜日の選択肢
	var youbi = new Array("日","月","火","水","木","金","土");
	//出力用
	var s = year + "年" + mon + "月" + day + "日 (" + youbi[you] + ")";
	return s;
}

