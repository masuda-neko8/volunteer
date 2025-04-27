const menu1n = 'ホーム';
const menu2n = '自己紹介';
const menu3n = '趣味・活動';
const menu4n = '連絡先';
const menu5n = 'その他';

const menu1e = 'index.html';
const menu2e = 'aboutme.html';
const menu3e = 'activity.html';
const menu4e = 'contact.html';
const menu5e = 'other.html';

document.getElementById('output_menu1').innerHTML = '<li><a href="' + menu1e + '">'+ '●' + menu1n + '</a></li>';
document.getElementById('output_menu2').innerHTML = '<li><a href="' + menu2e + '">'+ '●' + menu2n + '</a></li>';
document.getElementById('output_menu3').innerHTML = '<li><a href="' + menu3e + '">'+ '●' + menu3n + '</a></li>';
document.getElementById('output_menu4').innerHTML = '<li><a href="' + menu4e + '">'+ '●' + menu4n + '</a></li>';
document.getElementById('output_menu5').innerHTML = '<li><a href="' + menu5e + '">'+ '●' + menu5n + '</a></li>';

