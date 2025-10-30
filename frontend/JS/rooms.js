document.addEventListener('DOMContentLoaded', () => {
  const roomsTableBody = document.querySelector('#roomsTable tbody');
  const newRoomBtn = document.getElementById('newRoomBtn');
  const roomModal = document.getElementById('roomModal');
  const roomForm = document.getElementById('roomForm');
  const cancelRoomBtn = document.getElementById('cancelRoomBtn');
  const roomModalTitle = document.getElementById('roomModalTitle');

  //ข้อมูลจำลอง
  let rooms = [
    { id: 1, number: '101', type: 'single', price: 3500, status: 'ไม่ว่าง' },
    { id: 2, number: '102', type: 'double', price: 5000, status: 'ว่าง' },
    { id: 3, number: '201', type: 'studio', price: 7000, status: 'ไม่ว่าง' },
  ];

  function renderRooms() {
    roomsTableBody.innerHTML = '';
    rooms.forEach(r => {const tr = document.createElement('tr');
      tr.innerHTML = `
      <td>${r.number}</td>
      <td>${r.type}</td>
        <td>${r.price}</td>
        <td>${r.status}</td>
        <td>
          <button class="btn" data-id="${r.id}" data-action="edit">แก้ไข</button>
          <button class="btn ghost" data-id="${r.id}" data-action="delete">ลบ</button>
        </td>`;
      roomsTableBody.appendChild(tr);
    });
  }

  //สำหรับสร้างห้องใหม่
  newRoomBtn.addEventListener('click', () => {
    roomModalTitle.textContent = 'ห้องใหม่';
    roomForm.reset();
    roomForm.dataset.editId = '';
    roomModal.classList.remove('hidden');
  });

  cancelRoomBtn.addEventListener('click', () => {
    roomModal.classList.add('hidden');
  });

  // ส่งฟอร์ม
  roomForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(roomForm);
    const payload = {
      number: formData.get('room_number'),
      type: formData.get('type'),
      price: Number(formData.get('price')),
      status: 'available'
    };

    const editId = roomForm.dataset.editId;
    if (editId) {

      rooms = rooms.map(r => r.id == editId ? {...r, ...payload} : r);
    } else {

      const newId = Math.max(0, ...rooms.map(r => r.id)) + 1;
      rooms.push({ id: newId, ...payload });
    }
    roomModal.classList.add('hidden');
    renderRooms();
  });

  roomsTableBody.addEventListener('click', (e) => {
    const btn = e.target.closest('button');
    if (!btn) return;
    const id = btn.dataset.id;
    const action = btn.dataset.action;
    if (action === 'edit') {
      const room = rooms.find(r => r.id == id);
      if (!room) return;
      roomModalTitle.textContent = 'แก้ไขห้อง';
      roomForm.room_number.value = room.number;
      roomForm.type.value = room.type;
      roomForm.price.value = room.price;
      roomForm.dataset.editId = room.id;
      roomModal.classList.remove('hidden');
    } else if (action === 'delete') {
      if (confirm('ต้องการลบห้องนี้ใช่หรือไม่?')) {
        rooms = rooms.filter(r => r.id != id);
        renderRooms();
      }
    }
  });

  renderRooms();
});
