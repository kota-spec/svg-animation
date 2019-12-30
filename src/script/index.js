import { TweenLite } from 'gsap';

(() => {
  window.addEventListener('DOMContentLoaded', () => {
    const $$circle = document.getElementById('js-circle');
    const $$start = document.getElementById('js-start');
    const $$stop = document.getElementById('js-stop');
    const $$restart = document.getElementById('js-reStart');

    let isComplete = false; // アニメーションが終わっているか確認

    // svgを元の状態に戻す
    const reAni = () => {
      isComplete = true;

      $$start.classList.remove('disable');

      TweenLite.to($$circle, 1, {
        strokeDasharray: '126 126'
      });
    };

    const ani = TweenLite.to($$circle, 10, {
      onStart: () => {
        // アニメーションが一度終わっているか確認
        if (isComplete) {
          isComplete = !isComplete;
          $$start.classList.add('disable');
        }
      },
      strokeDasharray: '0 126',
      onComplete: () => reAni()
    });

    $$start.addEventListener('click', () => ani.restart());

    $$restart.addEventListener('click', () => {
      ani.play(); // アニメーションを再開
      $$restart.classList.add('disable'); // アニメーションが終わるまで再開を押させない
    });

    $$stop.addEventListener('click', () => {
      ani.pause(); // アニメーションを止める

      // アニメーションが止まっているん場合
      if (ani.paused()) {
        $$restart.classList.remove('disable'); // 再開ボタンを解除
      }
    });
  });
})();
