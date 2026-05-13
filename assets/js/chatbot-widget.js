/* ============================================================
   UMKM Mulyoagung — AI Chatbot Widget v2
   Cara pakai: <script src="assets/js/chatbot-widget.js"></script>
   Taruh sebelum </body> di semua halaman
   ============================================================ */

(function () {
    'use strict';

    var SYSTEM = 'Kamu adalah asisten virtual UMKM GIS Mulyoagung yang ramah dan helpful. '
        + 'Tugasmu membantu pengguna menemukan info UMKM di Desa Mulyoagung, Dau, Malang, Jawa Timur. '
        + 'Kategori UMKM: Kuliner (warung, cafe), Fashion (butik, konveksi), Jasa (laundry, salon), '
        + 'Otomotif (bengkel, sparepart), Kesehatan (klinik, apotek), Retail (toko kelontong), Elektronik (toko & servis). '
        + 'Fitur website: peta interaktif, filter kategori, tabel data, dashboard statistik area. '
        + 'Panduan: ketik nama UMKM di pencarian, klik tombol kategori untuk filter peta, klik titik di peta untuk detail. '
        + 'Gunakan bahasa Indonesia yang santai. Jawab singkat dan to the point.';

    var STORAGE_KEY = 'umkm_chat_apikey';

    /* ── CSS ── */
    var css = [
        "@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');",
        "#_ucw_fab{position:fixed!important;bottom:24px!important;right:24px!important;z-index:2147483647!important;width:56px!important;height:56px!important;border-radius:50%!important;background:linear-gradient(135deg,#2563eb,#1e40af)!important;border:none!important;cursor:pointer!important;display:flex!important;align-items:center!important;justify-content:center!important;box-shadow:0 6px 20px rgba(37,99,235,.5)!important;transition:transform .2s!important;outline:none!important;padding:0!important;}",
        "#_ucw_fab:hover{transform:scale(1.1)!important;}",
        "#_ucw_badge{position:absolute!important;top:-2px!important;right:-2px!important;width:16px!important;height:16px!important;background:#ef4444!important;border-radius:50%!important;border:2px solid #fff!important;font-size:9px!important;font-weight:700!important;color:#fff!important;display:flex!important;align-items:center!important;justify-content:center!important;font-family:sans-serif!important;}",
        "#_ucw_panel{position:fixed!important;bottom:90px!important;right:24px!important;z-index:2147483646!important;width:355px!important;max-width:calc(100vw - 32px)!important;height:510px!important;max-height:calc(100dvh - 110px)!important;background:#fff!important;border-radius:20px!important;box-shadow:0 20px 60px rgba(0,0,0,.18)!important;display:flex!important;flex-direction:column!important;overflow:hidden!important;font-family:'Plus Jakarta Sans',sans-serif!important;transform-origin:bottom right!important;transition:opacity .22s,transform .28s cubic-bezier(.34,1.56,.64,1)!important;}",
        "#_ucw_panel._cl{opacity:0!important;transform:scale(.92) translateY(12px)!important;pointer-events:none!important;}",
        "#_ucw_panel._op{opacity:1!important;transform:scale(1) translateY(0)!important;}",
        "#_ucw_head{background:linear-gradient(135deg,#1e3a8a,#2563eb)!important;padding:14px 16px!important;display:flex!important;align-items:center!important;gap:10px!important;flex-shrink:0!important;}",
        "._ucw_av{width:36px!important;height:36px!important;border-radius:50%!important;background:rgba(255,255,255,.18)!important;display:flex!important;align-items:center!important;justify-content:center!important;font-size:17px!important;flex-shrink:0!important;border:1.5px solid rgba(255,255,255,.3)!important;}",
        "._ucw_hi{flex:1!important;min-width:0!important;}",
        "._ucw_hn{font-size:13.5px!important;font-weight:700!important;color:#fff!important;}",
        "._ucw_hs{font-size:11px!important;color:rgba(255,255,255,.75)!important;display:flex!important;align-items:center!important;gap:5px!important;margin-top:2px!important;}",
        "._ucw_dot{width:6px!important;height:6px!important;background:#4ade80!important;border-radius:50%!important;animation:_ucw_p 2s infinite!important;}",
        "@keyframes _ucw_p{0%,100%{opacity:1}50%{opacity:.4}}",
        "._ucw_hb{background:rgba(255,255,255,.15)!important;border:none!important;border-radius:7px!important;color:#fff!important;cursor:pointer!important;padding:4px 9px!important;font-size:11px!important;font-weight:600!important;font-family:'Plus Jakarta Sans',sans-serif!important;}",
        "._ucw_hb:hover{background:rgba(255,255,255,.28)!important;}",
        "#_ucw_msgs{flex:1!important;overflow-y:auto!important;padding:14px 12px!important;display:flex!important;flex-direction:column!important;gap:10px!important;background:#f8fafc!important;scroll-behavior:smooth!important;}",
        "#_ucw_msgs::-webkit-scrollbar{width:4px!important;}",
        "#_ucw_msgs::-webkit-scrollbar-thumb{background:#e2e8f0!important;border-radius:99px!important;}",
        "._ucw_row{display:flex!important;gap:7px!important;align-items:flex-end!important;animation:_ucw_i .22s ease!important;}",
        "@keyframes _ucw_i{from{opacity:0;transform:translateY(7px)}to{opacity:1;transform:none}}",
        "._ucw_row._u{flex-direction:row-reverse!important;}",
        "._ucw_rav{width:26px!important;height:26px!important;border-radius:50%!important;display:flex!important;align-items:center!important;justify-content:center!important;font-size:13px!important;flex-shrink:0!important;background:linear-gradient(135deg,#2563eb,#1d4ed8)!important;}",
        "._ucw_row._u ._ucw_rav{background:#374151!important;}",
        "._ucw_bub{max-width:80%!important;padding:9px 13px!important;border-radius:14px!important;font-size:13px!important;line-height:1.55!important;word-break:break-word!important;white-space:pre-wrap!important;}",
        "._ucw_row:not(._u) ._ucw_bub{background:#fff!important;color:#1f2937!important;border-bottom-left-radius:3px!important;box-shadow:0 2px 8px rgba(0,0,0,.07)!important;}",
        "._ucw_row._u ._ucw_bub{background:linear-gradient(135deg,#2563eb,#1d4ed8)!important;color:#fff!important;border-bottom-right-radius:3px!important;}",
        "._ucw_typ{display:flex!important;gap:4px!important;padding:11px 13px!important;background:#fff!important;border-radius:14px!important;border-bottom-left-radius:3px!important;box-shadow:0 2px 8px rgba(0,0,0,.07)!important;width:fit-content!important;}",
        "._ucw_td{width:6px!important;height:6px!important;background:#94a3b8!important;border-radius:50%!important;animation:_ucw_b 1.1s infinite!important;}",
        "._ucw_td:nth-child(2){animation-delay:.15s!important}._ucw_td:nth-child(3){animation-delay:.3s!important}",
        "@keyframes _ucw_b{0%,60%,100%{transform:translateY(0)}30%{transform:translateY(-5px)}}",
        "._ucw_qr{display:flex!important;flex-wrap:wrap!important;gap:5px!important;padding-left:33px!important;}",
        "._ucw_qb{background:#fff!important;border:1.5px solid #e2e8f0!important;border-radius:99px!important;padding:4px 11px!important;font-size:11.5px!important;font-weight:600!important;color:#2563eb!important;cursor:pointer!important;font-family:'Plus Jakarta Sans',sans-serif!important;white-space:nowrap!important;transition:all .15s!important;}",
        "._ucw_qb:hover{background:#2563eb!important;border-color:#2563eb!important;color:#fff!important;}",
        "#_ucw_iw{padding:10px 12px!important;border-top:1px solid #f1f5f9!important;background:#fff!important;display:flex!important;gap:7px!important;align-items:flex-end!important;flex-shrink:0!important;}",
        "#_ucw_inp{flex:1!important;border:1.5px solid #e2e8f0!important;border-radius:11px!important;padding:9px 12px!important;font-size:13px!important;font-family:'Plus Jakarta Sans',sans-serif!important;color:#1f2937!important;resize:none!important;outline:none!important;line-height:1.5!important;max-height:96px!important;background:#f8fafc!important;transition:border-color .15s!important;}",
        "#_ucw_inp:focus{border-color:#2563eb!important;background:#fff!important;}",
        "#_ucw_inp::placeholder{color:#94a3b8!important;}",
        "#_ucw_sb{width:36px!important;height:36px!important;border-radius:9px!important;background:linear-gradient(135deg,#2563eb,#1d4ed8)!important;border:none!important;cursor:pointer!important;display:flex!important;align-items:center!important;justify-content:center!important;flex-shrink:0!important;transition:transform .15s,opacity .15s!important;}",
        "#_ucw_sb:hover{transform:scale(1.08)!important;}#_ucw_sb:disabled{opacity:.45!important;cursor:not-allowed!important;transform:none!important;}",
        "._ucw_ft{text-align:center!important;font-size:10px!important;color:#94a3b8!important;padding:4px 12px 8px!important;background:#fff!important;font-family:'Plus Jakarta Sans',sans-serif!important;flex-shrink:0!important;}",
        "#_ucw_setup{position:absolute!important;inset:0!important;background:#fff!important;z-index:10!important;display:flex!important;flex-direction:column!important;align-items:center!important;justify-content:center!important;padding:28px 24px!important;gap:12px!important;font-family:'Plus Jakarta Sans',sans-serif!important;}",
        "#_ucw_setup._h{display:none!important;}",
        "._ucw_sico{font-size:36px!important;}",
        "._ucw_st{font-size:16px!important;font-weight:700!important;color:#111827!important;text-align:center!important;}",
        "._ucw_sd{font-size:12px!important;color:#6b7280!important;text-align:center!important;line-height:1.6!important;}",
        "._ucw_si{width:100%!important;border:1.5px solid #e2e8f0!important;border-radius:10px!important;padding:10px 13px!important;font-size:13px!important;font-family:'Plus Jakarta Sans',sans-serif!important;color:#1f2937!important;outline:none!important;box-sizing:border-box!important;}",
        "._ucw_si:focus{border-color:#2563eb!important;}",
        "._ucw_sv{width:100%!important;padding:11px!important;background:linear-gradient(135deg,#2563eb,#1d4ed8)!important;color:#fff!important;border:none!important;border-radius:10px!important;font-size:14px!important;font-weight:700!important;cursor:pointer!important;font-family:'Plus Jakarta Sans',sans-serif!important;}",
        "._ucw_sv:hover{opacity:.9!important;}",
        "._ucw_er{font-size:11.5px!important;color:#ef4444!important;display:none!important;}",
        "._ucw_sl{font-size:11px!important;color:#6b7280!important;text-align:center!important;}._ucw_sl a{color:#2563eb!important;}",
        "@media(max-width:480px){#_ucw_panel{right:12px!important;bottom:86px!important;width:calc(100vw - 24px)!important;height:calc(100dvh - 108px)!important;}#_ucw_fab{right:16px!important;bottom:18px!important;}}"
    ].join('');

    var styleEl = document.createElement('style');
    styleEl.textContent = css;
    document.head.appendChild(styleEl);

    /* ── HTML ── */
    var div = document.createElement('div');
    div.innerHTML = '<button id="_ucw_fab" aria-label="Chat UMKM">'
        + '<span id="_ucw_badge">1</span>'
        + '<svg id="_ucw_ic" width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>'
        + '<svg id="_ucw_ix" width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round" style="display:none"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>'
        + '</button>'
        + '<div id="_ucw_panel" class="_cl">'
        +   '<div id="_ucw_head">'
        +     '<div class="_ucw_av">🗺️</div>'
        +     '<div class="_ucw_hi"><div class="_ucw_hn">Asisten UMKM Mulyoagung</div><div class="_ucw_hs"><span class="_ucw_dot"></span>Online · Siap membantu</div></div>'
        +     '<button class="_ucw_hb" id="_ucw_rb">Reset</button>'
        +     '<button class="_ucw_hb" id="_ucw_kb" style="margin-left:4px">🔑</button>'
        +   '</div>'
        +   '<div id="_ucw_setup">'
        +     '<div class="_ucw_sico">🤖</div>'
        +     '<div class="_ucw_st">Masukkan API Key</div>'
        +     '<div class="_ucw_sd">Diperlukan Claude API key dari Anthropic untuk mengaktifkan chatbot. Key disimpan di browser kamu (localStorage).</div>'
        +     '<input class="_ucw_si" id="_ucw_ki" type="password" placeholder="sk-ant-api03-...">'
        +     '<div class="_ucw_er" id="_ucw_er">API key tidak valid. Harus dimulai dengan "sk-ant-"</div>'
        +     '<button class="_ucw_sv" id="_ucw_sv">Aktifkan Chatbot</button>'
        +     '<div class="_ucw_sl">Belum punya? <a href="https://console.anthropic.com" target="_blank">Daftar di console.anthropic.com</a></div>'
        +   '</div>'
        +   '<div id="_ucw_msgs"></div>'
        +   '<div id="_ucw_iw">'
        +     '<textarea id="_ucw_inp" placeholder="Tanya tentang UMKM Mulyoagung..." rows="1" maxlength="500"></textarea>'
        +     '<button id="_ucw_sb"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2" fill="#fff" stroke="none"/></svg></button>'
        +   '</div>'
        +   '<div class="_ucw_ft">Powered by Claude AI · UMKM GIS Mulyoagung</div>'
        + '</div>';
    document.body.appendChild(div);

    /* ── REFS ── */
    var fab    = document.getElementById('_ucw_fab');
    var ic     = document.getElementById('_ucw_ic');
    var ix     = document.getElementById('_ucw_ix');
    var badge  = document.getElementById('_ucw_badge');
    var panel  = document.getElementById('_ucw_panel');
    var setup  = document.getElementById('_ucw_setup');
    var msgs   = document.getElementById('_ucw_msgs');
    var inp    = document.getElementById('_ucw_inp');
    var sb     = document.getElementById('_ucw_sb');
    var rb     = document.getElementById('_ucw_rb');
    var kb     = document.getElementById('_ucw_kb');
    var ki     = document.getElementById('_ucw_ki');
    var sv     = document.getElementById('_ucw_sv');
    var er     = document.getElementById('_ucw_er');

    var isOpen = false, loading = false, history = [], apiKey = '';
    var QUICK  = ['🍔 Info Kuliner', '🗺️ Cara pakai peta', '🏥 UMKM Kesehatan', '📊 Statistik area'];

    function loadKey() { try { apiKey = localStorage.getItem(STORAGE_KEY) || ''; } catch(e) { apiKey=''; } }
    function saveKey(k) { apiKey=k; try { localStorage.setItem(STORAGE_KEY,k); } catch(e){} }
    function hasKey() { return !!(apiKey && apiKey.length > 10); }

    loadKey();

    function hideSetup() { setup.classList.add('_h'); }
    function showSetup() { setup.classList.remove('_h'); }

    /* ── Setup save ── */
    sv.addEventListener('click', function() {
        var k = ki.value.trim();
        if (!k || !k.startsWith('sk-ant-')) { er.style.display='block'; return; }
        er.style.display='none';
        saveKey(k);
        hideSetup();
        greet();
        setTimeout(function(){ inp.focus(); }, 200);
    });
    ki.addEventListener('keydown', function(e){ if(e.key==='Enter') sv.click(); });
    kb.addEventListener('click', function(){ ki.value=apiKey||''; showSetup(); });

    /* ── Helpers ── */
    function scroll() { msgs.scrollTop = msgs.scrollHeight; }

    function addBubble(role, text) {
        var row = document.createElement('div');
        row.className = '_ucw_row' + (role==='user' ? ' _u' : '');
        var av = document.createElement('div');
        av.className = '_ucw_rav';
        av.textContent = role==='user' ? '👤' : '🤖';
        var bub = document.createElement('div');
        bub.className = '_ucw_bub';
        bub.textContent = text;
        row.appendChild(av);
        row.appendChild(bub);
        msgs.appendChild(row);
        scroll();
    }

    function addQuick() {
        var qr = document.createElement('div');
        qr.className = '_ucw_qr';
        QUICK.forEach(function(q) {
            var b = document.createElement('button');
            b.className = '_ucw_qb';
            b.textContent = q;
            b.addEventListener('click', function(){ qr.remove(); send(q); });
            qr.appendChild(b);
        });
        msgs.appendChild(qr);
        scroll();
    }

    function typingOn() {
        var row = document.createElement('div');
        row.className = '_ucw_row'; row.id = '_ucw_t';
        var av = document.createElement('div'); av.className='_ucw_rav'; av.textContent='🤖';
        var t = document.createElement('div'); t.className='_ucw_typ';
        t.innerHTML='<div class="_ucw_td"></div><div class="_ucw_td"></div><div class="_ucw_td"></div>';
        row.appendChild(av); row.appendChild(t);
        msgs.appendChild(row); scroll();
    }

    function typingOff() { var t=document.getElementById('_ucw_t'); if(t) t.remove(); }

    function setLoad(v) { loading=v; sb.disabled=v; inp.disabled=v; }

    /* ── Greeting ── */
    function greet() {
        if (msgs.children.length > 0) return;
        addBubble('bot', 'Halo! 👋 Saya asisten UMKM Mulyoagung.\n\nBisa bantu cari info UMKM, cara pakai peta, atau pertanyaan seputar Desa Mulyoagung. Mau tanya apa?');
        addQuick();
    }

    /* ── Send ── */
    async function send(txt) {
        txt = (txt || inp.value).trim();
        if (!txt || loading) return;
        inp.value = ''; inp.style.height = 'auto';
        badge.style.display = 'none';
        addBubble('user', txt);
        history.push({ role:'user', content:txt });
        setLoad(true); typingOn();
        try {
            var res = await fetch('https://api.anthropic.com/v1/messages', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': apiKey,
                    'anthropic-version': '2023-06-01',
                    'anthropic-dangerous-direct-browser-calls': 'true'
                },
                body: JSON.stringify({
                    model: 'claude-sonnet-4-20250514',
                    max_tokens: 600,
                    system: SYSTEM,
                    messages: history
                })
            });
            var data = await res.json();
            typingOff();
            if (data.error) {
                addBubble('bot', '⚠️ ' + (data.error.message || 'Terjadi kesalahan.'));
                if (data.error.type === 'authentication_error') addBubble('bot', 'API key tidak valid. Klik 🔑 untuk ganti.');
                history.pop();
            } else {
                var reply = (data.content||[]).filter(function(b){return b.type==='text';}).map(function(b){return b.text;}).join('');
                addBubble('bot', reply);
                history.push({ role:'assistant', content:reply });
                if (history.length > 20) history = history.slice(-20);
            }
        } catch(e) {
            typingOff();
            addBubble('bot', '⚠️ Tidak bisa terhubung. Periksa koneksi internet ya!');
            history.pop();
        }
        setLoad(false); scroll();
    }

    /* ── FAB toggle ── */
    fab.addEventListener('click', function() {
        isOpen = !isOpen;
        if (isOpen) {
            panel.classList.remove('_cl'); panel.classList.add('_op');
            ic.style.display='none'; ix.style.display='block';
            badge.style.display='none';
            if (!hasKey()) { showSetup(); }
            else { hideSetup(); greet(); setTimeout(function(){ inp.focus(); }, 300); }
        } else {
            panel.classList.remove('_op'); panel.classList.add('_cl');
            ic.style.display='block'; ix.style.display='none';
        }
    });

    rb.addEventListener('click', function(){ msgs.innerHTML=''; history=[]; greet(); });

    inp.addEventListener('input', function(){ inp.style.height='auto'; inp.style.height=Math.min(inp.scrollHeight,96)+'px'; });
    inp.addEventListener('keydown', function(e){ if(e.key==='Enter'&&!e.shiftKey){ e.preventDefault(); send(); } });
    sb.addEventListener('click', function(){ send(); });
    document.addEventListener('keydown', function(e){ if(e.key==='Escape'&&isOpen) fab.click(); });

})();