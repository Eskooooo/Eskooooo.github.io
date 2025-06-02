document.getElementById('start-button').addEventListener('click', function () {
  document.getElementById('start-container').style.display = 'none';
  document.getElementById('animation-container').style.display = 'block';
});

$(document).ready(function () {
  const startBtn = $('#start-button');
  const animationContainer = $('#animation-container');
  const cake = $('#cake');
  const candle = $('#candle');
const wishText1 = 'Happy Birthday To You 🎂\nขอให้วันนี้มีแต่รอยยิ้ม ความสุข และเสียงหัวเราะ\nสมหวังทุกเรื่องที่ตั้งใจ มีพลังดี ๆ ล้อมรอบเธอเสมอ\nสุขสันต์วันเกิดนะครับ พี่เมย์ 🎉';
const wishText2 = 'Happy Birthday To You 🎂\nWishing you a day filled with smiles, laughter, and pure happiness.\nMay all your dreams come true and positive energy surround you always.\nHave a wonderful birthday, P\'Meiji! 🎉';



  const wishElement = $('#wish');

  // ซ่อนเค้กก่อน
  cake.hide();
  // แสดงปุ่มหลังโหลดเสร็จ
  startBtn.show();

  // เล่นเพลง
  const music = new Audio('your-birthday-song.mp3');
  music.loop = true;

  // ลูกโป่งลอย
  function spawnBalloon(x, y) {
    const balloon = $('<div class="balloon"></div>').css({
      left: x,
      top: y,
    });
    $('body').append(balloon);
    balloon.animate({ top: '-100px', opacity: 0 }, 2000, () => balloon.remove());
  }

  // เอฟเฟกต์พิมพ์คำอวยพรทีละตัว
 function typeWish(text, element, index = 0) {
  if (index < text.length) {
    const char = text[index] === '\n' ? '<br><br>' : text[index];
    element.append(char);
    setTimeout(() => typeWish(text, element, index + 1), 100);
  }
}


  // เริ่ม Countdown
  function startCountdown() {
    let count = 9;
    animationContainer.show().css({
      fontSize: '60px',
      textAlign: 'center',
      color: '#fff',
      position: 'absolute',
      top: '40%',
      left: '0',
      right: '0',
      zIndex: 999,
    });

    const interval = setInterval(() => {
      animationContainer.text(count);
      count--;
      if (count < 0) {
        clearInterval(interval);
        animationContainer.hide();
        cake.fadeIn(1000, function () {
          document.getElementById('bizcocho_1').beginElement();

          // รอให้ animation svg เค้กเสร็จก่อน 2.5 วินาที แล้วจุดเทียน
          setTimeout(() => {
            candle.show().addClass('animate-in');
          }, 2500);

          // เริ่มพิมพ์คำอวยพรทันทีหรือรอก็ได้
          typeWish(wishText1, wishElement);
        //   typeWish(wishText2, wishElement);

        });
      }
    }, 1000);
  }

  // เมื่อคลิกปุ่ม
  startBtn.click(() => {
    startBtn.hide();
    music.play();
    startCountdown();
  });

  // เมื่อคลิกหน้าจอให้ลูกโป่งลอยขึ้น
  $(document).click((e) => {
    spawnBalloon(e.pageX, e.pageY);
  });
});
