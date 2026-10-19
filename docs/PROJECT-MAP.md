# Peta kod EQUILAB

Projek aktif menggunakan satu struktur folder. Sejarah kod seterusnya boleh disimpan melalui commit Git.

| Lokasi | Kegunaan |
| --- | --- |
| src/App.jsx | State aplikasi, akaun, navigasi dan penyelarasan kemajuan |
| src/pages/HomePage.jsx | Halaman utama dan hero |
| src/pages/ProgressPage.jsx | Kemajuan, pencapaian dan sejarah kuiz |
| src/pages/GuidePage.jsx | Panduan, tutorial dan rujukan |
| src/features/modules/ | Nota, penerokaan konsep, kad modul dan panel video |
| src/features/quiz/Quiz.jsx | Kuiz, jawapan dan maklum balas |
| src/features/labs/ | Lima makmal, radas dan aktiviti berpandu |
| src/features/accounts/ | Akaun, pemulihan kata laluan dan kelas |
| src/components/PageHeader.jsx | Tajuk halaman dan butang panduan bersama |
| src/data/ | Kandungan nota, soalan, SKU3073, panduan dan video |
| src/lib/ | Pengiraan kimia, kemajuan, sambungan akaun dan helper |
| src/styles/ | CSS mengikut bahagian |
| public/ | Gambar modul dan tutorial |
| tests/ | Ujian kod |
| docs/archive/ | Dokumen keluaran terdahulu; pemasang lama untuk rujukan sahaja |

## Perubahan kandungan

- Nota dan soalan: src/data/content.js dan src/data/skuTopics.js.
- Video cadangan: src/data/videoLibrary.js.
- Pautan sendiri: src/data/videoOverrides.json.
- Pautan lama dikekalkan: src/data/legacyVideoLinks.js.
- Tukar video melalui terminal seperti biasa: node set-video.mjs buffers "PAUTAN_YOUTUBE".
- Simulasi: src/features/labs/ dan src/features/modules/NoteStudio.jsx.
- Model kimia: src/lib/chemistry.js.

Skrip menyusun kod setempat; kandungan nota, formula, pautan video, gambar dan konfigurasi akaun tidak diganti dengan versi muat turun. Nama komponen video ialah ModuleVideoPanel.jsx supaya berbeza jelas daripada fail pautan lama. Import menggunakan sambungan fail yang nyata.

Dokumen lama dalam arkib menerangkan laluan versi terdahulu. Gunakan peta ini untuk laluan semasa. Pemasang ZIP lama tidak digunakan selepas projek disusun.
