// 🔹 rooms.js
// จัดการข้อมูลห้องพักบนหน้าห้องพัก

// ข้อมูลตัวอย่างของห้องพัก
const roomsData = [
  {dorm:'A', room:'A1', price:3500, status:'occupied'},
  {dorm:'A', room:'A2', price:3600, status:'vacant'},
  {dorm:'B', room:'B1', price:3200, status:'occupied'},
  {dorm:'B', room:'B2', price:3300, status:'maintenance'},
];

// 🔹 ฟังก์ชันโหลดห้องตามหอ
function loadRooms() {
  const dorm = document.getElementById('dormSelect').value; // ดึงค่าหอที่เลือก
  const tbody = document.getElementById('roomsTable');
  tbody.innerHTML = ''; // ล้างข้อมูลเดิม

  // กรองข้อมูลตามหอ ถ้าเลือก 'all' แสดงทั้งหมด
  const filtered = dorm === 'all' ? roomsData : roomsData.filter(r => r.dorm === dorm);

  // เติมข้อมูลในตาราง
  filtered.forEach(room => {
    let badgeClass = '';
    let statusText = '';
    if(room.status === 'occupied'){badgeClass='bg-success'; statusText='มีผู้เช่า';}
    else if(room.status === 'vacant'){badgeClass='bg-secondary'; statusText='ว่าง';}
    else if(room.status === 'maintenance'){badgeClass='bg-warning'; statusText='ซ่อมบำรุง';}

    tbody.innerHTML += `
      <tr>
        <td>${room.dorm}</td>
        <td>${room.room}</td>
        <td>฿ ${room.price}</td>
        <td><span class="badge ${badgeClass}">${statusText}</span></td>
        <td>
          <button class="btn btn-warning btn-sm"><i class="fa-solid fa-pen"></i></button>
          <button class="btn btn-danger btn-sm"><i class="fa-solid fa-trash"></i></button>
        </td>
      </tr>
    `;
  });
}

// เรียกใช้ตอนโหลดหน้า
loadRooms();
