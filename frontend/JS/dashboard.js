// ฟังก์ชันโหลดข้อมูล Dashboard จาก Backend
async function loadDashboard() {
  const dorm = document.getElementById("dormSelect").value; // ดึงค่าหอจาก dropdown

  try {
    // เรียก API ฝั่ง backend พร้อมส่งชื่อหอ
    const res = await fetch(`http://127.0.0.1:8000/dashboard/summary?dorm=${dorm}`);
    const data = await res.json();

    // อัปเดตการ์ดสถิติ
    document.getElementById("totalRooms").textContent = data.total_rooms;
    document.getElementById("occupiedRooms").textContent = data.occupied_rooms;
    document.getElementById("vacantRooms").textContent = data.vacant_rooms;
    document.getElementById("overdueRooms").textContent = data.overdue_rooms;

    // อัปเดตตารางค้างชำระ
    const table = document.getElementById("overdueTable");
    table.innerHTML = ""; // ล้างของเก่าออกก่อน

    if (data.overdue_list.length === 0) {
      // ถ้าไม่มีข้อมูล
      table.innerHTML = `<tr><td colspan="5" class="text-center text-muted">ไม่มีห้องค้างชำระ</td></tr>`;
    } else {
      // สร้างแถวใหม่ตามข้อมูล
      data.overdue_list.forEach((r) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${r.room_number}</td>
          <td>${r.tenant_name}</td>
          <td>${r.phone}</td>
          <td>฿ ${r.amount}</td>
          <td>${r.building}</td>
        `;
        table.appendChild(row);
      });
    }
  } catch (err) {
    console.error("โหลดข้อมูล Dashboard ล้มเหลว:", err);
  }
}

// โหลดข้อมูลครั้งแรกเมื่อเปิดหน้า
document.addEventListener("DOMContentLoaded", () => {
  loadDashboard();

  // เมื่อเปลี่ยน dropdown จะโหลดข้อมูลใหม่ทันที
  document.getElementById("dormSelect").addEventListener("change", loadDashboard);
});
