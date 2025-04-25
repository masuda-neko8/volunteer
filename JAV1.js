
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

document.addEventListener('DOMContentLoaded', function() {
    fetch('sample.csv')
        .then(response => response.text())
        .then(data => parseCSV(data));
});

function parseCSV(data) {
    const lines = data.split('\n');
    const tableHeader = document.getElementById('csvHeader');
    const tableBody = document.getElementById('csvBody');

    // ヘッダー行を設定
    const headers = lines[0].split(',');
    headers.forEach(header => {
        const th = document.createElement('th');
        th.textContent = header;
        tableHeader.appendChild(th);
    });

    // データ行を設定
    for (let i = 1; i < lines.length; i++) {
        const row = document.createElement('tr');
        const cells = lines[i].split(',');

        cells.forEach(cell => {
            const td = document.createElement('td');
            td.textContent = cell;
            row.appendChild(td);
        });

        tableBody.appendChild(row);
    }
}

function loadCSVData() {
  const response = await fetch('sample.csv');
  const text = await response.text();
  const data = text.trim().split('\n')
    .map(line => line.split(',').map(x => x.trim()));
  const articles = data.slice(1)
    .map(x => `
      <article>
        <h3>${x[0]}</h3>
        <p>${x[1]}</p>
        <p>${x[3]}</p>
        <img src="${x[2]}" alt="" loading="lazy" width="100%" height="auto">
      </article>
    `)
    .join('');
  document.getElementById('js-csv').innerHTML = articles;
}


