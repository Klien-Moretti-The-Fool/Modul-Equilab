# Pengesahan EQUILAB V9

14 Oktober 2026. Skop perubahan: akses panduan, kandungan panduan dan tutorial bergambar.

- `npm test`: semua 20 ujian sedia ada lulus.
- `npm run build`: binaan produksi Vite berjaya.
- 72 keadaan header: 6 halaman utama × 2 bahasa × 6 saiz skrin. Tepat satu butang panduan di atas pada setiap halaman; tiada limpahan mendatar.
- 48 keadaan panduan: 8 bahagian × 2 bahasa × 3 lebar skrin. Tiada limpahan mendatar.
- Semua enam kad Modul muat pada saiz desktop 1366 × 681, 1366 × 768 dan 1440 × 900 yang diuji; padanan teks BM/English disemak.
- Kesemua tutorial makmal BM/English memuatkan gambar sebenar. Modal pembesaran, zoom, tatal imej, Escape dan pemulangan fokus ke butang asal diuji.
- Butang Cuba makmal ini membuka jenis makmal yang betul. Kembali daripada panduan mengingati langkah nota atau jenis makmal. Sesi kuiz yang sudah disemak kekal apabila pergi ke panduan dan kembali.
- Dua tutorial tambahan: aktiviti berpandu dan kawalan telefon; 14 fail PNG dimuatkan daripada sumber setempat.
- Dua belas pautan bahagian OpenStax serta rujukan buku disemak melalui sumber asal; semua pautan luar dibuka dalam tab baharu dengan `noopener noreferrer`.
- Tiada ralat JavaScript atau console error dalam aliran akhir yang diuji. Paparan diperiksa secara visual.
- Pemasang diuji untuk V8 dan V8.1, pemasangan ulangan, sandaran, fail CRLF/BOM, penolakan suntingan tersendiri, pakej rosak dan pemulihan selepas kegagalan salinan. Fail tetapan serta pautan video tersendiri dikekalkan.

Pengujian UI menggunakan Chromium dalam persekitaran Linux. Arahan PowerShell disediakan tetapi tidak dijalankan pada komputer Windows pengguna. Akaun Supabase sebenar dan kelas sebenar tidak diuji dengan akses langsung; panduan akaun berpandukan fungsi serta kawalan peranan dalam kod.
