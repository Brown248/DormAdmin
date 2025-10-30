document.addEventListener('DOMContentLoaded', () => {
  const tenantsTableBody = document.querySelector('#tenantsTable tbody');
  const newTenantBtn = document.getElementById('newTenantBtn');
  const tenantModal = document.getElementById('tenantModal');
  const tenantForm = document.getElementById('tenantForm');
  const cancelTenantBtn = document.getElementById('cancelTenantBtn');

  let tenants = [
    { id:1, name:'สมชาย ใจดี', room:'101', phone:'0812345678', start_date:'2025-09-01', payment_status:'paid' },
    { id:2, name:'สายฝน นุ่มนา', room:'202', phone:'0829876543', start_date:'2025-10-01', payment_status:'due' },
  ];

  function renderTenants() {
    tenantsTableBody.innerHTML = '';
    tenants.forEach(t => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${t.name}</td>
        <td>${t.room}</td>
        <td>${t.phone || '-'}</td>
        <td>${t.start_date || '-'}</td>
        <td>${t.payment_status === 'paid' ? 'ชำระแล้ว' : '<span style="color:var(--danger)">ค้างชำระ</span>'}</td>
        <td>
          <button class="btn" data-id="${t.id}" data-action="edit">แก้ไข</button>
          <button class="btn ghost" data-id="${t.id}" data-action="delete">ลบ</button>
        </td>
      `;
      tenantsTableBody.appendChild(tr);
    });
  }

  newTenantBtn.addEventListener('click', () => {
    tenantForm.reset();
    tenantForm.dataset.editId = '';
    tenantModal.classList.remove('hidden');
  });

  cancelTenantBtn.addEventListener('click', () => {
    tenantModal.classList.add('hidden');
  });

  tenantForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const fd = new FormData(tenantForm);
    const payload = {
      name: fd.get('name'),
      room: fd.get('room_number'),
      phone: fd.get('phone'),
      start_date: fd.get('start_date'),
      payment_status: fd.get('payment_status')
    };
    const editId = tenantForm.dataset.editId;
    if (editId) {
      tenants = tenants.map(t => t.id == editId ? {...t, ...payload} : t);
    } else {
      const newId = Math.max(0, ...tenants.map(t => t.id)) + 1;
      tenants.push({ id: newId, ...payload });
    }
    tenantModal.classList.add('hidden');
    renderTenants();
  });

  tenantsTableBody.addEventListener('click', (e) => {
    const btn = e.target.closest('button');
    if (!btn) return;
    const { id, action } = btn.dataset;
    if (action === 'edit') {
      const t = tenants.find(x => x.id == id);
      if (!t) return;
      tenantForm.name.value = t.name;
      tenantForm.room_number.value = t.room;
      tenantForm.phone.value = t.phone;
      tenantForm.start_date.value = t.start_date;
      tenantForm.payment_status.value = t.payment_status;
      tenantForm.dataset.editId = t.id;
      tenantModal.classList.remove('hidden');
    } else if (action === 'delete') {
      if (confirm('ต้องการลบผู้เช่ารายนี้ใช่หรือไม่?')) {
        tenants = tenants.filter(x => x.id != id);
        renderTenants();
      }
    }
  });

  renderTenants();
});
