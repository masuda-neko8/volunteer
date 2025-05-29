//===============================================================
// 全般
//===============================================================

// 実行しているＨＴＭＬのファイル名〔.html除〕取得
const filename = location.pathname.split('/').pop() || "index.html";
//const filename = location.pathname.split('/').pop();
//const filename = location.pathname.split('/').pop().replace('.html', '');

// タイトル設定
const siteTitle = "『マスダ猫っぱち』のブログ";

// メール設定
const siteMail = "dadadaneko@gmail.com";

// トップ画像に重ねるメッセージ
const topMsg = "こんにちはマスダ猫っぱちです！";

// タイトルを設定する関数
function setPageTitle() {
  document.title = siteTitle;
}

// ホームページ名＆リンク表示
function setHomeLink() {
  const home = document.getElementById("home_link");
  home.innerHTML  = '<h1 id="logo"><a href="index.html">' + siteTitle + '</a></h1>';
}

// メール＆リンク表示
function setMailLink() {
  const mail = document.getElementById("mail_link");
  mail.innerHTML  = '<address><a href="mailto:' + siteMail + '">' + siteMail + '</a></address>';
}


// メニュー一覧の定義（ＨＴＭＬ、タイトル名）
const data = [
  { key: 1, html_key: "index.html",		html_name: "ホーム",			html_ename:"Home"},
  { key: 2, html_key: "activity.html",	html_name: "趣味、活動、興味",	html_ename:"Hobbies and Special Skills"},
  { key: 3, html_key: "aboutme.html",	html_name: "自己紹介",			html_ename:"Self-introduction"},
  { key: 4, html_key: "contact.html",	html_name: "連絡先・コンタクト",html_ename:"Contact me"},
  { key: 5, html_key: "myworks.html",	html_name: "オリジナル作品",	html_ename:"My works"},
  { key: 6, html_key: "camp.html",	html_name: "キャンプ・アウトドア",	html_ename:"Camp/Outdoor"},
  { key: 7, html_key: "trickart.html",	html_name: "パズル・トリックアート",	html_ename:"puzzle/trickart"},
  { key: 8, html_key: "other.html",		html_name: "その他",			html_ename:"Others"}
];
// 追加・削除の際は最終行のカンマ（無し）に注意！

// Google翻訳ウィジェット
function googleTranslateElementInit() {
  new google.translate.TranslateElement({
    pageLanguage: 'ja',
    includedLanguages: 'en,ja,zh-CN,zh-TW',
    layout: google.translate.TranslateElement.InlineLayout.SIMPLE
  }, 'google_translate_element');
}

// 指定されたフォルダーの画像を順に全て表示する。
async function checkAndDisplayImages(folderName) {
  const container = document.getElementById("image-container");
  
  container.style.display = "flex";
  container.style.flexDirection = "column";
  container.style.alignItems = "flex-start"; // 任意（左揃え）

for (let i = 1; i <= 100; i++) {
  const fileName = String(i).padStart(3, '0') + ".jpg";
  const imagePath = `${folderName}/${fileName}`;

  const img = new Image();
  img.src = imagePath;
  img.alt = fileName;
  img.style.margin = "10px";
  img.style.maxWidth = "500px";

  // Promiseを使って画像の読み込み結果を確認
  const loaded = await new Promise((resolve) => {
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
  });

  if (!loaded) {
    console.log(`画像が存在しません: ${imagePath}`);
    break;
  }

  // <a>タグで画像を囲んでリンクを付ける
  const link = document.createElement("a");
  link.href = imagePath;
  link.target = "_blank"; // 新しいタブで開く
  link.appendChild(img);

  container.appendChild(link);

  // <hr> を追加
  const hr = document.createElement("hr");
  hr.style.width = "100%";
  hr.style.margin = "5px 0";
  container.appendChild(hr);
  }
}

// 指定したＨＴＭＬのタイトル名を帰す
function getNameByKey(in_key) {
  if (in_key === "index.html") {
    return null;
  }
  const item = data.find(obj => obj.html_key === in_key);
  return item ? item.html_name : null;
}

// 指定したＨＴＭＬのタイトル名を表示
function dispNameByKey(in_key) {
  if (in_key === "index.html") {
    return null;
  }
  document.getElementById('output_title').innerHTML = "<h2>" + getNameByKey(in_key) + "</h2>";
  return null;
}

// メニュー一覧表示【横並び】
function dispMenu(in_key,place) {
  const menuList = document.getElementById(place);
//  const menuList = document.getElementById("menu_list");
  menuList.innerHTML = ""; // 初期化

  // 横並びにするためのスタイル
  menuList.style.display = "flex";
  menuList.style.gap = "10px";
  menuList.style.flexWrap = "wrap";

  data.forEach(item => {
    const link = document.createElement("a");
    link.href = item.html_key;
    link.textContent = "[" + item.html_name + "]";

    // 共通のスタイル
    link.style.textDecoration = "none";
    link.style.color = "#fff";

    // 選択中ページなら太字にする
    if (item.html_key === in_key) {
      link.style.fontWeight = "bold";
      link.style.color = "black";
      link.style.backgroundColor = "lightskyblue";
    }

    menuList.appendChild(link);
  });
}

//メニュー一覧を（output_menu1）に表示する。
function dispMenuListByKey(in_key) {
  const outputDiv = document.getElementById('output_menu1');
  outputDiv.innerHTML = ""; // 初期化

  data.forEach(item => {
    const isActive = item.html_key === in_key;
    const label = isActive
      ? `⇒<b><span style='color:lightskyblue;'>${item.html_name}</span></b>`
      : `●<b>${item.html_name}</b>`;
    const line = `<li><a href="${item.html_key}">${label}</a></li>`;
    outputDiv.innerHTML += line;
  });
}


// フッター表示
function dispFooter() {
  const footer = document.getElementById("footer_disp");
  footer.style.textAlign = "center";  // ← JSで再指定
  footer.innerHTML  = getToday() + '<br>';
  footer.innerHTML  += '<small>Copyright&copy; <a href="index.html">『マスダ猫っぱち』のブログ</a> All Rights Reserved.</small>';
//  footer.innerHTML  += '<br><footer>';
//  footer.innerHTML  += '<small>Copyright&copy; <a href="index.html">『マスダ猫っぱち』のブログ</a> All Rights Reserved.</small>';
//  footer.innerHTML  += '</footer>';
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

function showHourlyImage(text) {
    const now = new Date();
    let hour = now.getHours();
    const hourStr = hour.toString().padStart(2, '0');
    const filename = hourStr + '.jpg';

    const wrapper = document.getElementById('image-Container');
    wrapper.innerHTML = ""; // 前の画像を消す

    const container = document.createElement("div");
    container.className = "image-text-container";

    const img = new Image();
    img.src = 'images/' + filename;

    const textOverlay = document.createElement("div");
    textOverlay.className = "text-overlay";
    textOverlay.innerText = text;

    img.onload = function() {
        container.appendChild(img);
        container.appendChild(textOverlay);
        wrapper.appendChild(container);
    };

    img.onerror = function() {
        const fallback = new Image();
        fallback.src = 'images/notfound.jpg';
        container.appendChild(fallback);
        textOverlay.innerText = "画像が見つかりません";
        container.appendChild(textOverlay);
        wrapper.appendChild(container);
    };
}

// 時刻に基づいて画像を表示する関数
function showHourlyImage2() {
    const now = new Date();           // 現在時刻を取得
    let hour = now.getHours();        // 0〜23 の整数を取得

    // 2桁表記（例: 03, 09, 15）
    const hourStr = hour.toString().padStart(2, '0');
    const filename = hourStr + '.jpg';

    // 画像を作成して表示
    const img = new Image();
    img.src = 'images/' + filename; // 画像は同じフォルダにあると想定

    img.onload = function() {
      document.getElementById('image-Container').appendChild(img);
      document.getElementById('text-over-image').innerHTML = "aaaaaa";
    };

    img.onerror = function() {
      // エラー時は notfound.jpg を表示
      const fallback = new Image();
      fallback.src = 'images/notfound.jpg';
      document.getElementById('image-Container').appendChild(fallback);
    };
}

