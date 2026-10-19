# Konteks pembangunan panduan V9

Permintaan pengguna: butang Guide & references pada bahagian atas setiap halaman utama, sejajar dengan homepage Modul; panduan lengkap, rujukan dan gambar tutorial penggunaan makmal.

## Peta kod

- `PageHeader.jsx`: tajuk halaman dan butang panduan yang dikongsi. Homepage menggunakan butang yang sama di atas hero; nota menggunakan bar breadcrumb.
- `GuidePage.jsx`: lapan bahagian BM/English, navigasi panduan, kembali ke halaman asal, modal gambar dengan zoom 100–400%, arahan pelajar/pensyarah dan FAQ.
- `guideData.js`: langkah tutorial lima makmal, andaian model dan pemetaan 12 bahagian OpenStax kepada enam modul.
- `guide.css`: gaya panduan dan header responsif. Gaya kad Modul V8.1 dikekalkan.
- `public/guide/*.png`: 14 gambar tutorial sebenar dalam mod tetamu, tanpa nama, e-mel atau laporan kelas sebenar. Nombor ditambah pada DOM sebelum tangkapan, bukan imej rekaan antaramuka.
- `App.jsx`: akses panduan, laluan `lab/ionization`, `lab/titration`, `lab/buffer`, `lab/dynamic` dan `lab/lechatelier`, serta alamat kembali ke langkah nota.
- `LabWorkbench.jsx`: memberitahu halaman induk jenis makmal yang dipilih. Tidak mengubah model pengiraan.
- `Accounts.jsx`: hanya header kelas menggunakan komponen panduan yang dikongsi; operasi akaun dan kelas dikekalkan.

## Sumber rujukan

Flowers, P., Theopold, K., Langley, R., & Robinson, W. R. (2019). *Chemistry 2e*. OpenStax. https://openstax.org/books/chemistry-2e/pages/1-introduction

Bahagian 13.1–13.4, 14.1–14.7 dan 15.2 disemak melalui laman OpenStax pada 14 Oktober 2026. URL bahagian berada dalam `guideData.js`. Hanya pautan, metadata buku dan pemetaan topik digunakan; tiada imej buku disalin. Gambar panduan berasal daripada aplikasi EQUILAB.

Label rujukan dalaman SKU A/B dalam subtopik merujuk nota kursus sedia ada. Maklumat penulis/tahun dokumen kuliah tidak direka. Nota kuliah asal tidak disertakan dalam sumber projek ini.

## Ketepatan panduan

Empat langkah setiap modul: 3 bahagian nota + 1 kuiz. Eksperimen dan latihan mini bukan markah kuiz. Tetamu menyimpan rekod pada pelayar; akaun online memerlukan perkhidmatan aktif. Rekod tetamu tidak digabungkan secara automatik. Peranan pensyarah diberikan oleh pentadbir, bukan pilihan daftar biasa.

Contoh tutorial menggunakan model sedia ada: CH₃COOH 0.10 → 0.010 M; titrasi asid lemah pada 25 mL; penimbal ditambah 1 mmol NaOH; A ⇌ B pada 80 s; sistem gas dipanaskan. Model gas ialah ilustrasi berasingan daripada model asid–bes akueus.
