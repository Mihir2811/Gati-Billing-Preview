/* Shared helpers used across pages: query params, money formatting,
   file->base64, and the dynamic line-items table used on both
   create_invoice.html and guest_invoice.html. */

function qs(name) {
  return new URLSearchParams(window.location.search).get(name);
}

function money(n) {
  n = parseFloat(n) || 0;
  return n.toFixed(2);
}

function escapeHtml(str) {
  if (str === undefined || str === null) return '';
  return String(str)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function fileToBase64(file) {
  return new Promise(function (resolve, reject) {
    if (!file) { resolve(null); return; }
    const reader = new FileReader();
    reader.onload = function () { resolve(reader.result); };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function newItemRow() {
  const tr = document.createElement('tr');
  tr.className = 'item-row border-b border-govborder';
  tr.innerHTML =
    '<td class="px-4 py-3 align-top"><div class="gov-field"><input type="text" class="item-desc" placeholder="e.g. Web design services" required></div></td>' +
    '<td class="px-4 py-3 align-top"><div class="gov-field"><input type="number" min="0" step="1" value="1" class="item-qty" required></div></td>' +
    '<td class="px-4 py-3 align-top"><div class="gov-field"><input type="number" min="0" step="0.01" value="0.00" class="item-cost" required></div></td>' +
    '<td class="px-4 py-3 text-right align-top"><input type="text" readonly class="row-total w-full text-right bg-govbg border border-govborder px-3 py-2 text-govblack text-base rounded-none" value="0.00"></td>' +
    '<td class="px-4 py-3 align-top text-center"><button type="button" class="remove-row text-govwarn underline text-sm font-semibold mt-2 hover:decoration-2">Remove</button></td>';
  return tr;
}

function initLineItems(opts) {
  opts = opts || {};
  const tbody = document.getElementById('item-table-body');
  const addBtn = document.getElementById('add-item-btn');
  const subtotalDisplay = document.getElementById('subtotal-display');
  const finalTotalDisplay = document.getElementById('final-total-display');
  const deliveryInput = opts.deliveryInputId ? document.getElementById(opts.deliveryInputId) : null;

  function recalc() {
    let subtotal = 0;
    tbody.querySelectorAll('.item-row').forEach(function (row) {
      const qty = parseFloat(row.querySelector('.item-qty').value) || 0;
      const cost = parseFloat(row.querySelector('.item-cost').value) || 0;
      const total = qty * cost;
      row.querySelector('.row-total').value = money(total);
      subtotal += total;
    });
    const delivery = deliveryInput ? (parseFloat(deliveryInput.value) || 0) : 0;
    if (subtotalDisplay) subtotalDisplay.textContent = money(subtotal);
    if (finalTotalDisplay) finalTotalDisplay.textContent = money(subtotal + delivery);
    return { subtotal: subtotal, total: subtotal + delivery };
  }

  if (addBtn) {
    addBtn.addEventListener('click', function () {
      tbody.appendChild(newItemRow());
      recalc();
    });
  }

  tbody.addEventListener('input', function (e) {
    if (e.target.classList.contains('item-qty') || e.target.classList.contains('item-cost')) recalc();
  });

  tbody.addEventListener('click', function (e) {
    if (e.target.classList.contains('remove-row')) {
      const rows = tbody.querySelectorAll('.item-row');
      if (rows.length > 1) { e.target.closest('tr').remove(); recalc(); }
      else { alert('An invoice needs at least one line item.'); }
    }
  });

  if (deliveryInput) deliveryInput.addEventListener('input', recalc);

  recalc();

  return {
    recalc: recalc,
    collectItems: function () {
      const items = [];
      tbody.querySelectorAll('.item-row').forEach(function (row) {
        items.push({
          description: row.querySelector('.item-desc').value,
          quantity: parseFloat(row.querySelector('.item-qty').value) || 0,
          unit_cost: parseFloat(row.querySelector('.item-cost').value) || 0,
        });
      });
      return items;
    },
  };
}

function attachBusinessAutofill(selectId, fieldIds) {
  const sel = document.getElementById(selectId);
  if (!sel) return;
  sel.addEventListener('change', function () {
    const biz = DemoDB.getBusiness(this.value);
    if (!biz) return;
    if (fieldIds.upi_id) document.getElementById(fieldIds.upi_id).value = biz.upi_id || '';
    if (fieldIds.bank_name) document.getElementById(fieldIds.bank_name).value = biz.bank_name || '';
    if (fieldIds.account_name) document.getElementById(fieldIds.account_name).value = biz.account_name || '';
    if (fieldIds.account_number) document.getElementById(fieldIds.account_number).value = biz.account_number || '';
    if (fieldIds.ifsc_code) document.getElementById(fieldIds.ifsc_code).value = biz.ifsc_code || '';
  });
}
