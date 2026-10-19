# Video pembelajaran EQUILAB V10

Sumber: Khan Academy dan Khan Academy Organic Chemistry. Ringkasan serta soalan pemerhatian ialah penulisan EQUILAB, bukan salinan transkrip. Video tidak dimuat turun atau disalin ke ZIP. Tiada andaian bahawa sari kata BM tersedia. Bahagian video dalam panduan menyertakan tajuk asal, saluran dan pautan ke sumber.

| Modul | Peranan | Tajuk asal | Pautan |
| --- | --- | --- | --- |
| Foundations | Utama | Conjugate acid–base pairs | https://www.youtube.com/watch?v=4441EyWBPt8 |
| Foundations | Tambahan | Autoionization of water | https://www.youtube.com/watch?v=vt6WjF1O_08 |
| Equilibrium | Utama | Dynamic equilibrium | https://www.youtube.com/watch?v=zaHM74k9Z1w |
| Equilibrium | Tambahan | Le Chatelier's principle | https://www.youtube.com/watch?v=4-fEvpVNTlE |
| Ionization | Utama | Weak acid equilibria | https://www.youtube.com/watch?v=nJLNlB-7Rhk |
| Ionization | Tambahan | Worked example: Finding the percent ionization of a weak acid | https://www.youtube.com/watch?v=_jEe0Tkyn3w |
| Calculations | Utama | Weak acid equilibrium | https://www.youtube.com/watch?v=icNOBmKjDLo |
| Calculations | Tambahan | Weak base equilibrium | https://www.youtube.com/watch?v=xGE3sEz6U9Y |
| Buffers | Utama | Properties of buffers | https://www.youtube.com/watch?v=tZH6zvQ8Wl8 |
| Buffers | Tambahan | Henderson–Hasselbalch equation | https://www.youtube.com/watch?v=7QgtdYiWH50 |
| Titration | Utama | Weak acid–strong base titrations | https://www.youtube.com/watch?v=sZW1qoQl3ng |
| Titration | Tambahan | Strong acid–strong base titrations | https://www.youtube.com/watch?v=qkh0SMozSBQ |

Pemetaan diperiksa pada **16 Oktober 2026 (Malaysia)** melalui metadata sumber, penerangan dan transkrip yang tersedia. Semakan ini bukan tontonan penuh setiap video. Pengambilan terus halaman YouTube oleh alat semakan tidak berjaya; kebolehcapaian main balik bagi setiap lokasi/peranti belum disahkan. Pautan boleh berubah atau ditarik balik oleh pemilik sumber.

## Peta kod

- `src/redesign/videoLibrary.js`: 12 sumber, penempatan nota, tajuk BM/English, ringkasan dan soalan pemerhatian. Elemen pertama setiap modul ialah video utama. `step` ialah indeks nota 0, 1 atau 2.
- `src/redesign/ModuleVideos.jsx`: kad dua lajur pada ruang besar, susunan menegak pada ruang kecil, panel tambahan dan senarai sumber.
- `src/redesign/module-videos.css`: rupa kad, warna dan paparan responsif.
- `src/redesign/videoOverrides.json`: hanya pautan pilihan sendiri. Penyuntingan melalui `set-video.mjs`.
- `src/redesign/moduleVideos.js`: pautan lama dikekalkan. Jangan padam jika projek mempunyai pautan tersuai terdahulu.
- `src/redesign/App.jsx`: kad selepas penerangan dan sebelum `NoteStudio`; untuk pengenalan teori, panel video selepas `TheoryExplorer`.
- `src/redesign/GuidePage.jsx`: bahagian Video YouTube, FAQ dan pautan sumber.

Keutamaan video utama: tetapan `videoOverrides.json` jika ada → pautan lama bukan kosong → video cadangan. Nilai `null` atau kosong yang ditetapkan secara jelas pada overrides menyembunyikan video utama. Video tambahan kekal. Pautan tersuai tidak dipaparkan sebagai video Khan Academy dan bahasa tidak diteka. Jika pautan utama sama dengan video tambahan, hanya satu salinan ditunjukkan.

Untuk menukar atau menambah video tambahan, sunting entri modul dalam `videoLibrary.js` dan pastikan tajuk, saluran, ringkasan serta fokus menggambarkan video sebenar. Kekalkan satu video utama dan paling banyak dua video tambahan bagi setiap modul supaya nota tidak terlalu panjang.

## Perkara yang tidak mengubah kemajuan

Membuka kad, panel atau pautan video tidak menandakan nota selesai dan tidak mengubah skor. Kemajuan kekal pada 3 nota + 1 kuiz setiap modul. Butang YouTube membuka tab baharu dengan `noopener noreferrer`. Tiada pemain iframe, autoplay, arahan meminta login atau mod pembangun dalam aliran video pelajar.
