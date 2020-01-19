import { TweenMax } from 'gsap';
import { makeArray } from './_make-array';

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

      TweenMax.to($$circle, 1, {
        strokeDasharray: '126 126'
      });
    };

    const ani = TweenMax.to($$circle, 10, {
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

    const $$unkos = makeArray(document.querySelectorAll('.js-unko'));

    const getRandom = num => {
      return Math.floor(Math.random() * (num * 2)) - num;
    };

    console.log(getRandom(30));

    $$unkos.forEach(el => {
      TweenMax.to(el, 1, {
        x: getRandom(100),
        y: getRandom(100),
        yoyo: true,
        repeat: -1
      });
    });
  });
})();
