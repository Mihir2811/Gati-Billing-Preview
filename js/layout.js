/* Shared header / footer (mirrors base.html) injected on every "app" page. */

const HEADER_HTML = `
<header class="bg-govblue border-b-[5px] border-govblack">
  <div class="max-w-6xl mx-auto px-6 h-[60px] flex items-center justify-between flex-wrap gap-2">
    <a href="index.html" class="text-white font-bold text-lg no-underline hover:underline">Gati Billing</a>
    <nav class="flex items-center gap-5 text-sm flex-wrap justify-end" id="nav-links"></nav>
  </div>
</header>
<div class="bg-[#d2e2f1] border-b border-govborder">
  <div class="max-w-6xl mx-auto px-6 py-2 text-sm text-govblack">
    <strong class="font-bold">Beta</strong> &mdash; This is a new service.
    <a href="#" onclick="alert('This is a static demo build. Contact the owner to leave feedback on the live application.'); return false;" class="text-govblue underline ml-1">Give feedback</a> to help us improve it.
  </div>
</div>`;

const FOOTER_HTML = `
<footer class="bg-govblack border-t-[4px] border-[#f3f2f1] mt-auto">
  <div class="max-w-6xl mx-auto px-6 py-8 flex items-center justify-between flex-wrap gap-4">
    <div>
      <p class="text-white font-bold text-sm mb-1">Gati Billing</p>
      <p class="text-govgray text-xs">Static demo build &mdash; data is stored only in this browser (localStorage).</p>
    </div>
    <div class="flex items-center gap-3 text-xs text-govgray">
      <span>Built by Mihir Panchal</span>
      <a href="https://github.com/Mihir2811" target="_blank" rel="noopener noreferrer" class="text-govgray hover:text-white underline">GitHub</a>
      <a href="https://www.linkedin.com/in/mihirpanchal28/" target="_blank" rel="noopener noreferrer" class="text-govgray hover:text-white underline">LinkedIn</a>
    </div>
  </div>
</footer>`;

function renderHeaderNav() {
  const session = DemoDB.currentUser();
  const nav = document.getElementById('nav-links');
  if (!nav) return;
  if (session) {
    nav.innerHTML =
      '<a href="invoices.html" class="text-white underline hover:no-underline">My Invoices</a>' +
      '<a href="create_invoice.html" class="text-white underline hover:no-underline">New Invoice</a>' +
      '<a href="business_profiles.html" class="text-white underline hover:no-underline">Business Profiles</a>' +
      '<a href="customer_profiles.html" class="text-white underline hover:no-underline">Customer Profiles</a>' +
      '<span class="text-white opacity-40">|</span>' +
      '<span class="text-white text-sm">' + session.username + '</span>' +
      '<button type="button" id="logout-btn" class="text-white underline hover:no-underline bg-transparent border-0 cursor-pointer text-sm">Sign out</button>';
    document.getElementById('logout-btn').addEventListener('click', function () {
      DemoDB.logout();
      window.location.href = 'index.html';
    });
  } else {
    nav.innerHTML =
      '<a href="login.html" class="text-white underline hover:no-underline">Sign in</a>' +
      '<a href="signup.html" class="text-white font-bold underline hover:no-underline">Create account</a>';
  }
}

function renderLayout(opts) {
  opts = opts || {};
  const headerEl = document.getElementById('site-header');
  const footerEl = document.getElementById('site-footer');
  if (headerEl) headerEl.innerHTML = HEADER_HTML;
  if (footerEl) footerEl.innerHTML = FOOTER_HTML;
  renderHeaderNav();
  if (opts.requireAuth && !DemoDB.currentUser()) {
    window.location.href = 'login.html';
    return false;
  }
  return true;
}
