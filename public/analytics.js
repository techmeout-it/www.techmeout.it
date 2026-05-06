/* ========================================
   TechMeOut — Analytics Auto-Tracking
   Sends granular events to GA4 (gtag)
   ======================================== */
(function () {
    'use strict';

    // Wait until gtag is available
    function track(eventName, params) {
        if (typeof window.gtag !== 'function') return;
        try {
            window.gtag('event', eventName, params || {});
        } catch (e) {
            /* swallow */
        }
    }

    var SITE_HOST = window.location.hostname;

    function isOutbound(url) {
        try {
            var u = new URL(url, window.location.href);
            return u.hostname && u.hostname !== SITE_HOST;
        } catch (e) {
            return false;
        }
    }

    var DOWNLOAD_RE = /\.(pdf|zip|rar|7z|tar|gz|csv|xlsx?|docx?|pptx?|txt|mp3|mp4|mov|avi|wav|dmg|exe|pkg|apk)(\?|#|$)/i;

    function describeElement(el) {
        if (!el) return '';
        var text = (el.innerText || el.textContent || el.getAttribute('aria-label') || el.getAttribute('title') || '').trim();
        return text.replace(/\s+/g, ' ').slice(0, 120);
    }

    // ===== CLICK TRACKING (delegated) =====
    document.addEventListener('click', function (e) {
        var target = e.target;
        if (!target || !target.closest) return;

        var link = target.closest('a');
        var button = target.closest('button, [role="button"]');
        var path = window.location.pathname;

        if (link) {
            var href = link.getAttribute('href') || '';
            var label = describeElement(link);
            var common = {
                link_url: href,
                link_text: label,
                link_id: link.id || undefined,
                link_classes: link.className || undefined,
                page_path: path,
            };

            // mailto / tel
            if (/^mailto:/i.test(href)) {
                track('contact_click', Object.assign({ contact_method: 'email', contact_value: href.replace(/^mailto:/i, '') }, common));
                return;
            }
            if (/^tel:/i.test(href)) {
                track('contact_click', Object.assign({ contact_method: 'phone', contact_value: href.replace(/^tel:/i, '') }, common));
                return;
            }

            // Anchor link (in-page nav)
            if (href.indexOf('#') === 0) {
                track('anchor_click', Object.assign({ anchor: href }, common));
                return;
            }

            // Download
            if (DOWNLOAD_RE.test(href)) {
                track('file_download', Object.assign({ file_name: href.split('/').pop().split('?')[0], file_extension: (href.match(DOWNLOAD_RE) || [])[1] }, common));
                return;
            }

            // Outbound
            if (isOutbound(href)) {
                track('outbound_click', Object.assign({ outbound: true }, common));
                return;
            }

            // Internal link
            track('internal_link_click', common);
            return;
        }

        if (button) {
            track('button_click', {
                button_text: describeElement(button),
                button_id: button.id || undefined,
                button_classes: button.className || undefined,
                button_type: button.getAttribute('type') || undefined,
                page_path: path,
            });
        }
    }, { passive: true });

    // ===== FORM SUBMISSION TRACKING =====
    document.addEventListener('submit', function (e) {
        var form = e.target;
        if (!form || form.tagName !== 'FORM') return;
        track('form_submit', {
            form_id: form.id || undefined,
            form_name: form.getAttribute('name') || undefined,
            form_action: form.getAttribute('action') || undefined,
            page_path: window.location.pathname,
        });
    }, { passive: true });

    // ===== SCROLL DEPTH TRACKING =====
    var scrollThresholds = [25, 50, 75, 90, 100];
    var firedScroll = {};
    function onScroll() {
        var doc = document.documentElement;
        var body = document.body;
        var scrollTop = window.pageYOffset || doc.scrollTop || body.scrollTop || 0;
        var height = (doc.scrollHeight || body.scrollHeight) - (doc.clientHeight || window.innerHeight);
        if (height <= 0) return;
        var pct = Math.min(100, Math.round((scrollTop / height) * 100));
        for (var i = 0; i < scrollThresholds.length; i++) {
            var t = scrollThresholds[i];
            if (pct >= t && !firedScroll[t]) {
                firedScroll[t] = true;
                track('scroll_depth', { percent_scrolled: t, page_path: window.location.pathname });
            }
        }
    }
    var scrollTimer = null;
    window.addEventListener('scroll', function () {
        if (scrollTimer) return;
        scrollTimer = setTimeout(function () { scrollTimer = null; onScroll(); }, 250);
    }, { passive: true });

    // ===== TIME-ON-PAGE / ENGAGEMENT =====
    var pageStart = Date.now();
    var engagementMarks = [10, 30, 60, 120, 300]; // seconds
    var firedTime = {};
    setInterval(function () {
        var elapsed = Math.round((Date.now() - pageStart) / 1000);
        engagementMarks.forEach(function (m) {
            if (elapsed >= m && !firedTime[m]) {
                firedTime[m] = true;
                track('time_on_page', { seconds: m, page_path: window.location.pathname });
            }
        });
    }, 5000);

    // ===== VISIBILITY (tab focus / blur) =====
    document.addEventListener('visibilitychange', function () {
        track(document.visibilityState === 'visible' ? 'page_visible' : 'page_hidden', {
            page_path: window.location.pathname,
        });
    });

    // ===== JS ERRORS =====
    window.addEventListener('error', function (e) {
        track('js_error', {
            message: (e && e.message) ? String(e.message).slice(0, 150) : 'unknown',
            source: (e && e.filename) ? String(e.filename).slice(0, 150) : undefined,
            lineno: e ? e.lineno : undefined,
            page_path: window.location.pathname,
        });
    });

    window.addEventListener('unhandledrejection', function (e) {
        var reason = e && e.reason;
        var msg = reason && reason.message ? reason.message : String(reason || 'unknown');
        track('js_promise_rejection', {
            message: String(msg).slice(0, 150),
            page_path: window.location.pathname,
        });
    });

    // Expose helper for manual tracking
    window.tmoTrack = track;
})();
