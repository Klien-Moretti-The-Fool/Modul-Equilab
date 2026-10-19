# Semakan EQUILAB V8.1

12 Oktober 2026. Skop: pemilih makmal, gambar kad modul dan animasi bikar homepage.

## Hasil semakan

- Binaan produksi `npm run build` berjaya.
- Semua 20 ujian sedia ada `npm test` lulus.
- Galeri: 16 keadaan paparan, merangkumi BM/English dan 8 saiz skrin. Semua 6 gambar dimuatkan dan memenuhi lebar bingkai; tiada limpahan mendatar.
- Keenam-enam kad lengkap berada dalam skrin pada 1366 × 768, 1440 × 768 dan 1366 × 681, dalam kedua-dua bahasa.
- Kemajuan contoh 75% kekal sama pada badge, nama butang yang boleh dibaca pembaca skrin dan nilai bar kemajuan.
- Pemilih makmal diuji pada lebar 1366, 1024, 390 dan 320 px. Kedudukan CSS ialah `static`; perubahan kedudukan kad sepadan dengan jarak tatal halaman.
- Zarah dan permukaan larutan mempunyai kedudukan yang berubah antara bingkai animasi. `prefers-reduced-motion: reduce` menghentikan animasi berkenaan.
- Halaman utama tiada limpahan mendatar pada telefon 390 dan 320 px. Navigasi daripada kad ke nota asas berfungsi.
- Tiada ralat JavaScript atau console error dalam aliran akhir yang diuji. Paparan desktop dan telefon diperiksa secara visual.
- Pemasang diuji untuk kemas kini V8, sandaran, pemasangan ulangan, CRLF/BOM, penolakan fail tersunting atau pakej rosak, dan pemulihan selepas kegagalan salinan. `.env` serta pautan video tersendiri dikekalkan.

Pelayar ujian ialah Chromium dalam persekitaran Linux. Arahan PowerShell disediakan untuk Windows; ia belum dijalankan pada komputer pengguna. Semakan ini meliputi aliran yang dinyatakan, bukan semua kemungkinan konfigurasi peranti.
