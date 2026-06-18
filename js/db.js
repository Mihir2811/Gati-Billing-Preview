/* Gati Billing — static demo "backend"
   Everything that would normally be a Django view/model is simulated here
   using localStorage (persists) and sessionStorage (guest invoices only). */

(function (global) {
  const KEYS = {
    users: 'gati_users',
    session: 'gati_session',
    businesses: 'gati_businesses',
    customers: 'gati_customers',
    invoices: 'gati_invoices',
    counters: 'gati_counters',
  };

  function get(key, fallback) {
    try {
      const v = localStorage.getItem(key);
      return v ? JSON.parse(v) : fallback;
    } catch (e) {
      return fallback;
    }
  }
  function set(key, val) {
    localStorage.setItem(key, JSON.stringify(val));
  }
  function nextId(counterKey) {
    const c = get(KEYS.counters, {});
    c[counterKey] = (c[counterKey] || 0) + 1;
    set(KEYS.counters, c);
    return c[counterKey];
  }

  const DemoDB = {
    STATUS_CHOICES: ['Draft', 'Sent', 'Pending', 'Paid', 'Unpaid', 'Overdue', 'Cancelled'],

    /* ---------------- auth ---------------- */
    getUsers() { return get(KEYS.users, []); },
    signup(username, password) {
      username = (username || '').trim();
      if (!username || !password) return { ok: false, error: 'Username and password are required.' };
      const users = this.getUsers();
      if (users.find((u) => u.username.toLowerCase() === username.toLowerCase())) {
        return { ok: false, error: 'That username is already taken.' };
      }
      users.push({ username, password });
      set(KEYS.users, users);
      set(KEYS.session, { username });
      return { ok: true };
    },
    login(username, password) {
      username = (username || '').trim();
      const users = this.getUsers();
      const u = users.find((u) => u.username.toLowerCase() === username.toLowerCase() && u.password === password);
      if (!u) return { ok: false, error: 'Invalid username or password.' };
      set(KEYS.session, { username: u.username });
      return { ok: true };
    },
    logout() { localStorage.removeItem(KEYS.session); },
    currentUser() { return get(KEYS.session, null); },
    requireAuth() {
      const s = this.currentUser();
      if (!s) { window.location.href = 'login.html'; }
      return s;
    },

    /* ---------------- businesses ---------------- */
    listBusinesses() {
      const s = this.currentUser(); if (!s) return [];
      return get(KEYS.businesses, []).filter((b) => b.owner === s.username);
    },
    getBusiness(id) { return get(KEYS.businesses, []).find((b) => String(b.id) === String(id)); },
    saveBusiness(data) {
      const s = this.currentUser(); if (!s) return null;
      const all = get(KEYS.businesses, []);
      if (data.id) {
        const idx = all.findIndex((b) => String(b.id) === String(data.id));
        if (idx > -1) { all[idx] = Object.assign({}, all[idx], data); }
      } else {
        data.id = 'biz_' + nextId('business');
        data.owner = s.username;
        all.push(data);
      }
      set(KEYS.businesses, all);
      return data;
    },
    deleteBusiness(id) {
      const all = get(KEYS.businesses, []).filter((b) => String(b.id) !== String(id));
      set(KEYS.businesses, all);
    },
    blockingInvoicesForBusiness(id) {
      return this.listInvoices().filter((inv) => String(inv.business_id) === String(id));
    },

    /* ---------------- customers ---------------- */
    listCustomers() {
      const s = this.currentUser(); if (!s) return [];
      return get(KEYS.customers, []).filter((c) => c.owner === s.username);
    },
    getCustomer(id) { return get(KEYS.customers, []).find((c) => String(c.id) === String(id)); },
    saveCustomer(data) {
      const s = this.currentUser(); if (!s) return null;
      const all = get(KEYS.customers, []);
      if (data.id) {
        const idx = all.findIndex((c) => String(c.id) === String(data.id));
        if (idx > -1) { all[idx] = Object.assign({}, all[idx], data); }
      } else {
        data.id = 'cust_' + nextId('customer');
        data.owner = s.username;
        all.push(data);
      }
      set(KEYS.customers, all);
      return data;
    },
    deleteCustomer(id) {
      const all = get(KEYS.customers, []).filter((c) => String(c.id) !== String(id));
      set(KEYS.customers, all);
    },
    blockingInvoicesForCustomer(id) {
      return this.listInvoices().filter((inv) => String(inv.customer_id) === String(id));
    },

    /* ---------------- invoices ---------------- */
    listInvoices() {
      const s = this.currentUser(); if (!s) return [];
      return get(KEYS.invoices, []).filter((i) => i.owner === s.username)
        .sort((a, b) => (b.created_at || 0) - (a.created_at || 0));
    },
    getInvoice(id) { return get(KEYS.invoices, []).find((i) => String(i.id) === String(id)); },
    saveInvoice(data) {
      const s = this.currentUser(); if (!s) return null;
      const all = get(KEYS.invoices, []);
      data.id = 'inv_' + nextId('invoice');
      data.owner = s.username;
      data.created_at = Date.now();
      const n = nextId('invoice_number_' + s.username);
      data.invoice_number = 'INV-' + String(n).padStart(4, '0');
      data.invoice_status = data.invoice_status || 'Draft';
      all.push(data);
      set(KEYS.invoices, all);
      return data;
    },
    updateInvoiceStatus(id, status) {
      const all = get(KEYS.invoices, []);
      const idx = all.findIndex((i) => String(i.id) === String(id));
      if (idx > -1) { all[idx].invoice_status = status; set(KEYS.invoices, all); }
    },
    deleteInvoice(id) {
      const all = get(KEYS.invoices, []).filter((i) => String(i.id) !== String(id));
      set(KEYS.invoices, all);
    },
  };

  global.DemoDB = DemoDB;
})(window);
