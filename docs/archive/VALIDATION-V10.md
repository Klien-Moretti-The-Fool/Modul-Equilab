# Pengesahan EQUILAB V10

Tarikh: 16 Oktober 2026 (Malaysia). Asas: ZIP V9 panduan dan rujukan.

## Ujian kod dan binaan

- `npm test`: 23 ujian lulus (20 sedia ada dan 3 untuk perpustakaan serta penyunting video).
- Binaan produksi Vite berjaya tanpa dependency baharu.
- Dua belas ID video unik, pautan HTTPS sah, indeks nota yang sah dan medan BM/English lengkap.
- Pautan tersuai lama, keutamaan tetapan baharu, pilihan sembunyi, pemulihan dan penghapusan video berganda disemak.
- Penyunting terminal mengekalkan modul lain, menyediakan sandaran dan menolak input tidak sah tanpa perubahan.

## Paparan dan navigasi pelayar

- 60 paparan kad: 6 modul × 2 bahasa × 5 saiz (1440×900, 1366×681, 768×844, 390×844, 320×844).
- Kad utama, panel tambahan dan paparan dibuka tidak menyebabkan tatal mendatar pada saiz tersebut.
- Pratonton jauh sengaja disekat; ilustrasi modul setempat berjaya digunakan.
- Panel video tersedia pada semua 18 bahagian nota; tiada panel dalam kuiz modul.
- Senarai panduan: 6 kumpulan dan 12 sumber; 2 bahasa pada lebar 1366, 390 dan 320.
- Butang nota berkaitan menuju modul dan indeks nota yang betul. Kembali dari panduan mengekalkan bahagian nota.
- Butang video membuka tab baharu dengan `noopener noreferrer`. Pembukaan tab diuji melalui destinasi YouTube yang dipintas setempat, bukan main balik video sebenar.
- Membuka pautan video tidak mengubah kemajuan. Enam kad pada halaman Modul masih muat pada 1366×681 dalam kedua-dua bahasa.
- Perubahan pautan melalui terminal diuji bersama kad pelayar; sumber tersuai tidak dilabel sebagai Khan Academy.
- Tiada ralat JavaScript semasa semakan tersebut.

## Pemasang

- Naik taraf diuji menggunakan ZIP keluaran V8, V8.1 dan V9 sebenar; ketiga-tiganya lulus.
- Salinan fail lengkap, sandaran, pemasangan berulang dan teks BOM/CRLF.
- `.env`, pautan tersuai lama, tetapan overrides sedia ada, kandungan dan imej modul dikekalkan.
- Fail bersunting sendiri, tetapan JSON tidak sah dan pakej yang berubah ditolak sebelum fail projek ditukar.
- Kegagalan salinan yang disuntik memulihkan fail asal.
- Integriti ZIP disemak sebelum penyerahan.

## Had semakan

Semakan sumber video menggunakan metadata, penerangan dan transkrip yang tersedia. Pengambilan terus halaman YouTube gagal dalam persekitaran semakan; semua video tidak ditonton penuh dan main balik sebenar mengikut lokasi/peranti belum disahkan. Tiada andaian bahawa semua video menyediakan sari kata BM. Video memerlukan internet dan boleh berubah di pihak pemilik.

Akaun Supabase langsung dan kelas sebenar tidak diuji semula kerana kod akaun serta operasi datanya tidak diubah dalam V10. Arahan PowerShell disediakan untuk Windows; pengujian pemasang Node dilakukan pada persekitaran semakan, bukan laptop pengguna.
