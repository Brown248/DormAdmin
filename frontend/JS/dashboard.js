document.addEventListener('DOMContentLoaded', () => {
  const totalRoomsEl = document.getElementById('totalRooms');
  const occupiedRoomsEl = document.getElementById('occupiedRooms');
  const availableRoomsEl = document.getElementById('availableRooms');
  const overdueTenantsEl = document.getElementById('overdueTenants');
  const recentTenantsTableBody = document.querySelector('#recentTenantsTable tbody');
  const refreshBtn = document.getElementById('refreshBtn');
  const searchInput = document.getElementById('searchInput');

  //ข้อมูลจำลอง
  const demoData = {
    totalRooms: 40,
    occupiedRooms: 32,
    availableRooms: 8,
    overdueTenants: 3,
    recentTenants: [
      { name: 'สมชาย ใจดี', room: '101', start_date: '2025-09-01', payment: 'ชำระแล้ว' },
      { name: 'สายฝน นุ่มนา', room: '202', start_date: '2025-10-01', payment: 'ค้างชำระ' },
      { name: 'ชาญชัย เก่งงาน', room: '305', start_date: '2025-08-15', payment: 'ชำระแล้ว' },
    ]
  };

  function renderKpis(data) {
    totalRoomsEl.textContent = data.totalRooms;
    occupiedRoomsEl.textContent = data.occupiedRooms;
    availableRoomsEl.textContent = data.availableRooms;
    overdueTenantsEl.textContent = data.overdueTenants;
  }

  function renderRecentTenants(list) {
    recentTenantsTableBody.innerHTML = ''; 
    list.forEach(t => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${t.name}</td>
        <td>${t.room}</td>
        <td>${t.start_date}</td>
        <td>${t.payment}</td>
      `;
      recentTenantsTableBody.appendChild(tr);
    });
  }

  // เรียกแสดงผลตัวอย่างใช้ demoData
  function loadDashboard() {
    renderKpis(demoData);
    renderRecentTenants(demoData.recentTenants);
  }

  refreshBtn.addEventListener('click', () => {
    loadDashboard();
  });

  //ค้นหาในตาราง
  searchInput.addEventListener('input', (e) => {
    const q = e.target.value.trim().toLowerCase();
    if (!q) {
      renderRecentTenants(demoData.recentTenants);
      return;
    }
    const filtered = demoData.recentTenants.filter(t =>
      t.name.toLowerCase().includes(q) || t.room.toLowerCase().includes(q)
    );
    renderRecentTenants(filtered);
  });

  loadDashboard();
});
