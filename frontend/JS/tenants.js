// 🔹 tenants.js
// จัดการข้อมูลผู้เช่า

// ข้อมูลตัวอย่างผู้เช่า
const tenantsData = [
  {name:'สุภัทรา ใจดี', dorm:'A', room:'A1', phone:'081-234-5678', start:'01/06/2024', end:'01/06/2025', paid:true},
  {name:'เอกชัย สายทอง', dorm:'B', room:'B5', phone:'089-555-8822', start:'01/07/2024', end:'01/07/2025', paid:false},
  {name:'มยุรี นิ่มนวล', dorm:'A', room:'A2', phone:'086-998-1122', start:'15/08/2024', end:'15/08/2025', paid:true}
];

// 🔹 ฟังก์ชันโหลดผู้เช่าตามหอ
function loadTenants() {
  const dorm = document.getElementById('dormSelect').value; // ดึงหอที่เลือก
  const tbody = document.getElementById('tenantsTable');
  tbody.innerHTML = ''; // ล้างข้อมูลเดิม

  // กรองข้อมูลตามหอ ถ้าเลือก 'all' แสดงทั้งหมด
  const filtered = dorm === 'all' ? tenantsData : tenantsData.filter(t => t.dorm === dorm);

  // เติมข้อมูลในตาราง
  filtered.forEach(t => {
    const statusBadge = t.paid ? 'bg-success' : 'bg-danger';
    const statusText = t.paid ? 'จ่ายแล้ว' : 'ค้างชำระ';

    tbody.innerHTML += `
      <tr>
        <td>${t.name}</td>
        <td>${t.room}</td>
        <td>${t.phone}</td>
        <td>${t.start}</td>
        <td>${t.end}</td>
        <td><span class="badge ${statusBadge}">${statusText}</span></td>
        <td>
          <button class="btn btn-warning btn-sm"><i class="fa-solid fa-pen"></i></button>
          <button class="btn btn-danger btn-sm"><i class="fa-solid fa-trash"></i></button>
        </td>
      </tr>
    `;
  });
}

// เรียกใช้ตอนโหลดหน้า
loadTenants();
