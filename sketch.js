let totalTime = 0; // タイマーの総時間（秒）
let startTime = 0; // タイマー開始時刻

// p5.jsのsetup関数：キャンバスの設定
function setup() {
  createCanvas(400, 400);
  angleMode(DEGREES); // 角度モードを度数法に設定

  // ボタンクリックイベントの設定
  let button = select('#startButton'); // p5.jsのselect関数を使用してボタンを選択
  button.mousePressed(startTimer); // mousePressedイベントにstartTimer関数を割り当て
}

// p5.jsのdraw関数：フレームごとの描画
function draw() {
  background(255); // 背景を灰色に設定
  noStroke();

  let currentTime = millis(); // 現在の時間（ミリ秒）
  let elapsed = (currentTime - startTime) / 1000; // 経過時間（秒）
  let remainingTime = totalTime - elapsed; // 残り時間（秒）

  if (remainingTime > 0) {
    fill(255,100,100);
    circle(width / 2, height / 2, 300, 300);
    // 残り時間がある場合、タイマーを描画
    let angle = map(remainingTime, 0, totalTime, 0, 360); // 残り時間に基づいて角度を計算
    fill(100, 100, 255); // 赤色で塗りつぶし
    arc(width / 2, height / 2, 300, 300, -90, angle - 90, PIE); // 円弧を描画

    // 残り時間をテキストで表示
    fill(0);
    textSize(32);
    textAlign(CENTER, CENTER);
    let H = nf(floor(remainingTime / 60), 2);
    let M = nf(floor(remainingTime % 60), 2);
    strH = H > 0 ? H : '00';
    strM = M > 0 ? M : '00';

    fill(255);
    text(strH + ':' + strM, width / 2, height / 2);
  } else {
    // タイマー終了
    stroke(100,100,100);
    noFill();
    circle(width / 2, height / 2, 300, 300);
    noLoop(); // 描画ループを停止
    console.log('タイマー終了');
    fill(0);
    textSize(32);
    textAlign(CENTER, CENTER);
    text('00:00', width / 2, height / 2);
  }

  // // 残り時間をテキストで表示
  // fill(0);
  // textSize(32);
  // textAlign(CENTER, CENTER);
  // let H = nf(floor(remainingTime / 60), 2);
  // let M = nf(floor(remainingTime % 60), 2);
  // strH = H > 0 ? H : '00';
  // strM = M > 0 ? M : '00';
  //
  // fill(255);
  // text(strH + ':' + strM, width / 2, height / 2);
}

// タイマーを開始する関数
function startTimer() {
  let hours = int(select('#hours').value()); // p5.jsのselect関数を使用して入力値を取得
  let minutes = int(select('#minutes').value());
  hours = Number.isNaN(hours) ? 0 : hours; // 数値でない場合は0にする（NaN対策）
  minutes = Number.isNaN(minutes) ? 0 : minutes;
  totalTime = (hours * 60 + minutes) * 60; // 総時間を秒単位で計算
  startTime = millis(); // 開始時刻を更新
  loop(); // 描画ループを再開（タイマー再スタートの場合）
}

// beep sound を鳴らすこと
