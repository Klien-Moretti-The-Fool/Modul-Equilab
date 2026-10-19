# EquiLab — E-Modul Interaktif SKU3073

Versi reka bentuk semula EquiLab untuk pembelajaran keseimbangan asid–bes. Projek ini dibina dengan React, Vite dan Tailwind CSS.

## Fungsi utama

- Antara muka cerah dan responsif untuk komputer serta telefon.
- Pilihan bahasa Bahasa Melayu / English.
- Enam modul berperingkat: asas asid–bes, keseimbangan dinamik, pengionan, pengiraan Ka/Kb dan pH, larutan penimbal, serta titrasi.
- Aliran pembelajaran **Ramalkan → Teroka → Jelaskan**.
- Nota tiga bahagian, contoh, formula, semakan miskonsepsi dan kuiz modul.
- Lima makmal interaktif: pengionan, titrasi, penimbal, keseimbangan dinamik dan Le Chatelier.
- Dashboard pelajar dengan kemajuan, sejarah percubaan kuiz dan status modul.
- Mod tetamu yang menyimpan kemajuan pada pelayar.
- Ruang kelas pelajar dan pensyarah. Fungsi online menggunakan Supabase apabila konfigurasi disediakan.
- Export laporan kemajuan kelas dalam CSV untuk pensyarah.

## Buka dalam VS Code

1. Extract ZIP dan buka folder `EquiLab` dalam VS Code.
2. Pastikan Node.js 20 atau lebih baharu telah dipasang.
3. Buka terminal dalam folder projek dan jalankan:

```bash
npm ci
npm run dev
```

4. Buka alamat yang dipaparkan oleh Vite. Untuk GitHub Pages, alamat aplikasi menggunakan laluan `/Equilab/`.

## Ujian dan build

```bash
npm test
npm run build
```

## Aktifkan akaun dan pemantauan kelas online

1. Cipta projek di Supabase.
2. Buka SQL Editor dan jalankan kandungan `supabase/schema.sql`.
3. Salin `.env.example` kepada `.env.local`.
4. Isi URL projek dan public anon/publishable key:

```env
VITE_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
VITE_SUPABASE_ANON_KEY=YOUR_PUBLIC_ANON_OR_PUBLISHABLE_KEY
```

5. Jalankan semula `npm run dev`.
6. Daftar akaun pelajar. Untuk akaun pensyarah, sahkan e-mel dahulu, kemudian jalankan arahan promosi yang terdapat di bahagian akhir `supabase/schema.sql` dengan alamat e-mel pensyarah.
7. Pensyarah boleh mencipta kelas dan memberi kod penyertaan. Pelajar memasukkan kod tersebut dalam **Kelas**.

GitHub Actions menggunakan repository variables berikut jika sambungan Supabase mahu digunakan pada GitHub Pages:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

Jika variables tersebut belum disediakan, laman masih boleh dibuka dalam mod tetamu.

## Struktur penting

- `src/redesign/App.jsx` — laluan halaman, dashboard, modul dan kuiz.
- `src/redesign/content.js` — kandungan dwibahasa modul serta soalan.
- `src/redesign/Lab.jsx` — makmal dan visual interaktif.
- `src/redesign/chemistry.js` — pengiraan pH, titrasi, penimbal dan keseimbangan.
- `src/redesign/Accounts.jsx` — login, daftar, kelas pelajar dan laporan pensyarah.
- `src/redesign/cloud.js` — penyegerakan Supabase.
- `src/redesign/styles.css` — sistem visual dan responsif.
- `supabase/schema.sql` — jadual, RLS dan fungsi kelas.
- `tests/chemistry.test.js` — ujian formula dan struktur kandungan.

## Nota kandungan

Simulasi menggunakan model ideal pada 25 °C dan aktiviti dianggarkan dengan kepekatan. Simulasi Le Chatelier ialah model kualitatif sistem gas, manakala visual zarah ialah representasi pedagogi. Kandungan perlu melalui semakan pakar kimia serta pedagogi sebelum digunakan sebagai versi kajian rintis FYP.

<!-- EQUILAB-ORGANIZED -->
## Mula di sini

Pasang dependency dengan `npm.cmd install` untuk kali pertama. Jalankan `npm.cmd run dev` dan buka alamat Local yang dipaparkan. Selepas laptop ditutup, jalankan semula arahan dev dalam folder yang sama.

Peta fail: [docs/PROJECT-MAP.md](docs/PROJECT-MAP.md). Ujian: `npm.cmd test`. Binaan: `npm.cmd run build`.
