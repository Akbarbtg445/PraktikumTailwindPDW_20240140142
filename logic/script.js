const alatOutdoor = [
    { id: 1, nama: "Tenda Baseway Pavilo", keterangan:"Double layer, Kapasitas 4 orang, Frame Aloy", harga: 35000, img: "https://akbarbtg445.github.io/Alat-yang-disewakan/Tenda%20Pavilo.png" },
    { id: 2, nama: "Tenda WildShell JayaDipa",keterangan:"Double layer, Kapasitas 4 orang, Frame Aloy", harga: 35000, img: "https://akbarbtg445.github.io/Alat-yang-disewakan/tenda%20wild%20shel.png" },
    { id: 3, nama: "Tenda",keterangan:"Tenda Single layer, Kapasitas 4 orang, Frame Aloy", harga: 20000, img: "https://akbarbtg445.github.io/Alat-yang-disewakan/tenda%20single%20layer.jpg" },
    { id: 4, nama: "Cerier Consina Terabi", keterangan:"Kapasitas 60Liter, Include Raincover",harga: 20000, img: "https://akbarbtg445.github.io/Alat-yang-disewakan/terabi.jpg" },
    { id: 5, nama: "Cerier Antarestar Ranger", keterangan:"Kapasitas 65Liter, Include Raincover",harga: 20000, img: "https://akbarbtg445.github.io/Alat-yang-disewakan/Antarestar1.png" },
    { id: 6, nama: "Cerier CO-TREX TENGGARONG", keterangan:"Kapasitas 60Liter, Include Raincover",harga: 20000, img: "https://akbarbtg445.github.io/Alat-yang-disewakan/Syaratketentuan.png" },
    { id: 7, nama: "Irco Polar Series", keterangan:"Ada yang include bantal ada yang tidak",harga: 10000, img: "https://akbarbtg445.github.io/Alat-yang-disewakan/sb.jpg" },
    { id: 8, nama: "Matras Outdoor", keterangan:"Warna Hitam / Warna Biru",harga: 5000, img: "https://akbarbtg445.github.io/Alat-yang-disewakan/matras.jpg" },
    { id: 9, nama: "Trecking Pole Naturhike", keterangan:"Panjang 100 cm/ Panjang 135cm Warna Biru",harga: 10000, img: "https://akbarbtg445.github.io/Alat-yang-disewakan/treking%20pole.jpg" },
    { id: 10, nama: "Coking Set", keterangan:"Isi 2 Set Panci,Include Wadah",harga: 10000, img: "https://akbarbtg445.github.io/Alat-yang-disewakan/cokingset%201jpg.jpg" },
    { id: 11, nama: "Kompor Portable", keterangan:"Include Wadah",harga: 10000, img: "https://akbarbtg445.github.io/Alat-yang-disewakan/kompor%20portable.jpg" },
    { id: 12, nama: "Gas Kaleng", keterangan:"Menyediakan Isi ulang Gas, Jika mau isi ulang gas kaleng bekas kaleng jgn dibuang",harga: 10000, img: "https://akbarbtg445.github.io/Alat-yang-disewakan/gas.jpg" },
    { id: 13, nama: "Kursi Outdoor Speed", keterangan:"Warna Coklat List Orange Ukuran XXL",harga: 15000, img: "https://akbarbtg445.github.io/Alat-yang-disewakan/arival.jpg" },
    { id: 14, nama: "Kursi Outdoor Speed", keterangan:"Warna Coklat Ukuran XXL",harga: 15000, img: "https://akbarbtg445.github.io/Alat-yang-disewakan/coklat.jpg" },
    { id: 15, nama: "Meja Outdoor Speed", keterangan:"Warna Coklat Ukuran XXL",harga: 10000, img: "https://akbarbtg445.github.io/Alat-yang-disewakan/meja%20speed.jpg" }
    // Catatan: Id 5 namanya sama dengan Id 3, bisa Anda ubah jika perlu
];

// Tampilkan Katalog (Tanpa tombol per item)
if (document.getElementById('katalogList')) {
    const list = document.getElementById('katalogList');
    alatOutdoor.forEach(item => {
        list.innerHTML += `
            <div class="item">
                <img src="${item.img}">
                <h2>${item.nama}</h2>
                <h4>${item.keterangan}</h4>
                <p>Rp ${item.harga.toLocaleString()}/hari</p>
                <div class="counter-container">
                    <button class="btn-qty" onclick="changeQty(${item.id}, -1)">-</button>
                    <span id="qty-${item.id}" class="qty-val">0</span>
                    <button class="btn-qty" onclick="changeQty(${item.id}, 1)">+</button>
                </div>
            </div>
        `;
    });
}

function changeQty(id, delta) {
    const qtyElement = document.getElementById(`qty-${id}`);
    let currentQty = parseInt(qtyElement.innerText);
    currentQty += delta;
    if (currentQty < 0) currentQty = 0;
    qtyElement.innerText = currentQty;
}

// FUNGSI UTAMA: Ambil semua data (termasuk No HP dan Tanggal) dan simpan
function prosesSewaSemua() {
    const nama = document.getElementById('namaPenyewa').value;
    const hp = document.getElementById('hpPenyewa').value; 
    const tanggal = document.getElementById('tglSewa').value; // 👇 Mengambil input Tanggal
    const alamat = document.getElementById('alamatPenyewa').value;
    
    // Validasi: Pastikan semua kolom terisi, termasuk tanggal
    if (!nama || !hp || !tanggal || !alamat) {
        return alert("Harap isi Nama, Nomor HP, Tanggal Sewa, dan Alamat lengkap!");
    }

    let itemTerpilih = [];
    alatOutdoor.forEach(item => {
        const qty = parseInt(document.getElementById(`qty-${item.id}`).innerText);
        if (qty > 0) {
            itemTerpilih.push(`${item.nama} (${qty}x)`);
        }
    });

    if (itemTerpilih.length === 0) {
        return alert("Pilih minimal 1 alat terlebih dahulu!");
    }

    const dataSewa = JSON.parse(localStorage.getItem('sewaData')) || [];
    
    dataSewa.push({
        id: Date.now(),
        penyewa: nama,
        nomorHp: hp, 
        tanggal: tanggal, // 👇 Menyimpan data Tanggal ke object
        alamat: alamat,
        alat: itemTerpilih.join(", "),
        status: "Booking"
    });

    localStorage.setItem('sewaData', JSON.stringify(dataSewa));
    
    alert("Pesanan berhasil diproses!");
    window.location.href = "boking.html"; 
}

// Load Tabel di boking.html (Menampilkan No HP dan Kolom Tanggal)
if (document.getElementById('bookingTable')) {
    const table = document.getElementById('bookingTable');
    const dataSewa = JSON.parse(localStorage.getItem('sewaData')) || [];

    dataSewa.forEach((item) => {
        table.innerHTML += `
            <tr>
                <td>
                    <strong>${item.penyewa}</strong><br>
                    <span style="color: #2d6a4f; font-size: 0.85rem; font-weight: bold;">📱 ${item.nomorHp}</span><br>
                    <small style="color: #666;">📍 ${item.alamat}</small>
                </td>
                <td>${item.alat}</td>
                
                <!-- 👇 TAMBAHAN KOLOM TANGGAL (Agar tidak bergeser) -->
                <td><strong>${item.tanggal}</strong></td> 

                <td><span class="status">${item.status}</span></td>
                <td><button class="btn-hapus" onclick="hapusSewa(${item.id})">Hapus</button></td>
            </tr>
        `;
    });
}

function hapusSewa(id) {
    let dataSewa = JSON.parse(localStorage.getItem('sewaData')) || [];
    dataSewa = dataSewa.filter(item => item.id !== id);
    localStorage.setItem('sewaData', JSON.stringify(dataSewa));
    location.reload();
}