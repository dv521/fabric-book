/* dv面料手记 · 站点累计浏览量
 * 用 不蒜子(busuanzi) 的 sitepv 计数：静态站可用、无需后端、不暴露任何密钥。
 * 加载失败或 6 秒内没取到数，就整块不显示（不留“--”这种半成品）。
 */
(function () {
  var SCRIPT = 'https://busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js';

  function mount() {
    var brand = document.querySelector('.footer-brand') || document.querySelector('footer');
    if (!brand || document.getElementById('dv-views')) return;

    var box = document.createElement('p');
    box.id = 'dv-views';
    box.style.cssText = 'margin:8px 0 0;font-size:12px;line-height:1.6;color:#8fa6b6;letter-spacing:.02em;display:none';
    box.innerHTML = '本站累计浏览 <b id="dv-views-n" style="color:#cfe3ef;font-weight:600">0</b> 次';
    brand.appendChild(box);

    // 不蒜子需要一个隐藏占位容器，且必须在它执行前就存在
    if (!document.getElementById('busuanzi_container_site_pv')) {
      var keep = document.createElement('span');
      keep.id = 'busuanzi_container_site_pv';
      keep.style.display = 'none';
      keep.innerHTML = '<span id="busuanzi_value_site_pv"></span>';
      document.body.appendChild(keep);
    }

    if (typeof bszCaller === 'undefined') {
      var s = document.createElement('script');
      s.src = SCRIPT;
      s.async = true;
      s.onerror = function () { box.remove(); };
      document.body.appendChild(s);
    }

    var tries = 0;
    var timer = setInterval(function () {
      var el = document.getElementById('busuanzi_value_site_pv');
      var v = el && parseInt((el.textContent || '').replace(/[^\d]/g, ''), 10);
      if (v > 0) {
        var n = document.getElementById('dv-views-n');
        if (n) n.textContent = v.toLocaleString('zh-CN');
        box.style.display = 'block';
        clearInterval(timer);
      } else if (++tries > 40) {   // ~6 秒还没数就不显示
        box.remove();
        clearInterval(timer);
      }
    }, 150);

  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount);
  else mount();
})();
