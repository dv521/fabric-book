/* dv面料手记 · 站点累计浏览量
 * 走自己的 Supabase：RPC hit_page() 一次完成「+1 并返回总数」。
 * anon key 只能执行这个函数，读不到任何明细行。
 * 函数还没建好、或网络不通时，整行不显示（不留假数字）。
 */
(function () {
  var ENDPOINT = 'https://ekzfvxlqaoylkfpcungh.supabase.co/rest/v1/rpc/hit_page';
  var KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVremZ2eGxxYW95bGtmcGN1bmdoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTMxOTczNTEsImV4cCI6MjEwODc3MzM1MX0.I2KdsLNSNWloF-vOppMyRLaid6PMTO_cLtEuaWlQnq0';

  function show(n) {
    var box = document.getElementById('dv-views');
    var num = document.getElementById('dv-views-n');
    if (!box || !num || !n) return;
    num.textContent = Number(n).toLocaleString('zh-CN');
    box.style.display = '';
  }

  function run() {
    try {
      fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'apikey': KEY, 'Authorization': 'Bearer ' + KEY, 'Content-Type': 'application/json' },
        body: JSON.stringify({ p_path: location.pathname })
      }).then(function (r) { return r.ok ? r.json() : null; })
        .then(function (n) { if (typeof n === 'number') show(n); })
        .catch(function () {});
    } catch (e) {}
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', run);
  else run();
})();
