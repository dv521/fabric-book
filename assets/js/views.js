/* dv面料手记 · 站点浏览量（今日 + 累计）
 * 走自己的 Supabase：RPC hit_page() 一次完成「+1 并返回 {today,total}」。
 * 兼容旧版函数（只返回一个数字 = 累计）。
 * anon 只能执行该函数，读不到任何明细行。失败时整行不显示。
 */
(function () {
  var ENDPOINT = 'https://ekzfvxlqaoylkfpcungh.supabase.co/rest/v1/rpc/hit_page';
  var KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVremZ2eGxxYW95bGtmcGN1bmdoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTMxOTczNTEsImV4cCI6MjEwODc3MzM1MX0.I2KdsLNSNWloF-vOppMyRLaid6PMTO_cLtEuaWlQnq0';

  function fmt(n) { return Number(n).toLocaleString('zh-CN'); }

  function render(data) {
    var box = document.getElementById('dv-views');
    if (!box) return;
    var t = document.getElementById('dv-views-today');
    var n = document.getElementById('dv-views-n');
    var total = null, today = null;
    if (typeof data === 'number') { total = data; }
    else if (data && typeof data === 'object') { total = data.total; today = data.today; }
    if (total === null || total === undefined) return;
    if (n) n.textContent = fmt(total);
    if (today === null || today === undefined) {
      box.innerHTML = '本站累计浏览 <b style="color:#cfe3ef;font-weight:600">' + fmt(total) + '</b> 次';
    } else if (t) {
      t.textContent = fmt(today);
    }
    box.style.display = '';
  }

  function run() {
    try {
      fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'apikey': KEY, 'Authorization': 'Bearer ' + KEY, 'Content-Type': 'application/json' },
        body: JSON.stringify({ p_path: location.pathname })
      }).then(function (r) { return r.ok ? r.json() : null; })
        .then(function (d) { if (d !== null) render(d); })
        .catch(function () {});
    } catch (e) {}
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', run);
  else run();
})();
