# EQUILAB V7 — Nota dan penerokaan interaktif

## Pasang ke dalam projek sedia ada

Hentikan server Vite dengan Ctrl+C. Muat turun ZIP V7. Buka terminal PowerShell dalam projek sedia ada yang mengandungi `package.json`, kemudian tampal:

```powershell
& {
$ErrorActionPreference = "Stop"
$paket = Get-ChildItem -LiteralPath "$env:USERPROFILE\Downloads" -Filter "EquiLab-v7-nota-interaktif*.zip" -File | Sort-Object LastWriteTime -Descending | Select-Object -First 1
if (-not $paket) { throw "ZIP V7 tiada dalam Downloads. Muat turun dahulu." }
$dest = Join-Path $env:TEMP ("EquiLab-v7-" + [guid]::NewGuid().ToString())
Expand-Archive -LiteralPath $paket.FullName -DestinationPath $dest
node (Join-Path $dest "EquiLab-v7\install.mjs")
if ($LASTEXITCODE -ne 0) { throw "Kemas kini dihentikan. Baca mesej pemasang di atas." }
npm.cmd install
if ($LASTEXITCODE -ne 0) { throw "Pemasangan dependencies gagal." }
npm.cmd run dev
}
```

Jika fail ZIP disimpan di tempat lain, ubah folder carian `Downloads` dalam arahan. Pemasang menyokong sumber V5/V6 asal dan pemasangan V7 berulang. Ia menyemak fail sebelum perubahan, membuat sandaran dan memulihkan fail jika operasi salinan gagal. Fail yang sudah disunting sendiri ditolak sebelum pemasangan; gunakan salinan projek lengkap dalam ZIP untuk mencuba V7 secara berasingan atau gabungkan perubahan tersuai dahulu. Gambar modul dan pautan video yang sudah ada dikekalkan.

Pemasang tidak menukar `.env`, konfigurasi pangkalan data, `package.json`, kandungan nota SKU atau simpanan pelayar. Kemajuan kini dikira daripada **3 bahagian nota + 1 kuiz** bagi setiap modul; 24 langkah keseluruhan. ID kuiz lama 4 dikekalkan. Langkah makmal lama 3 kekal dalam rekod tetapi tidak lagi dikira; kuiz dan markah lama dikekalkan. Penyempurnaan nota lama tidak membuktikan nota V7 sudah dibaca.

## Jalankan sebagai projek baharu

ZIP juga mengandungi projek penuh. Extract ZIP, buka folder **EquiLab-v7** dalam VS Code, buka terminal dan jalankan:

```powershell
npm.cmd install
npm.cmd run dev
```

Buka alamat **Local** yang Vite paparkan dalam Chrome. Konfigurasi asas projek menggunakan `/Equilab/`; buka pautan yang dipaparkan, termasuk laluan itu. Jangan buka `index.html` terus melalui `file://`. Jika port 5173 sudah digunakan, Vite boleh menggunakan port lain. Tukar tetapan base hanya jika keperluan hos berbeza.

## Perubahan yang disediakan

- Halaman Modul: tajuk lebih besar, panduan di atas, enam kad dalam dua baris pada desktop 1366 × 768 dan 1440 × 768, tanpa masa/tahap kesukaran. Pada telefon, kad menegak dengan teks yang jelas. Zum pelayar atau skrin rendah mungkin memerlukan tatal.
- Nota: ruang bacaan lebih luas, bingkai berkontras, formula, contoh dan idea penting yang jelas. Nota tambahan boleh dibuka secara bertahap; 26 subtopik dikekalkan.
- Fon disertakan dalam projek supaya paparan tidak bergantung pada muat turun Google Fonts. Lesen fon berada dalam `src/assets/fonts`.
- Foundations: animasi studio teori, pemindahan proton, perbandingan pKa dan autoionisasi air/Kw.
- Equilibrium: graf kadar yang boleh dimainkan, rajah Q/K, jadual ICE dan perubahan zarah ketika pemanasan/pemampatan/mangkin.
- Ionization/calculations: bikar zarah, pH, pengionan, pencairan, ICE, garam dan kawalan asid/bes lemah.
- Buffers: komponen HA/A⁻, penambahan asid/bes, graf perbandingan air dan had kapasiti.
- Titration: buret beranimasi, empat lengkung, separuh kesetaraan dan kesetaraan.
- Langkah aktiviti makmal dikeluarkan daripada modul. Halaman Makmal utama kekal untuk eksperimen penuh.
- Jadual ICE muat dalam ruang nota tanpa tatal mendatar. Input tidak sah dalam penerokaan tambahan memaparkan mesej.
- Butang video YouTube muncul selepas pautan dikonfigurasi. Baca `docs/VIDEO-YOUTUBE-V7.md`.

## Semakan untuk chat baharu

Baca `README-V7.md`, `docs/VIDEO-YOUTUBE-V7.md` dan `docs/VALIDATION-V7.md` sebelum menyunting. `src/App.jsx` memuatkan `src/redesign/App.jsx`. Komponen nota utama ialah `NoteStudio.jsx`; CSS nota ialah `learning-notes.css`; kemajuan empat langkah ialah `learningProgress.js`. Makmal penuh berada dalam `Lab.jsx` dan komponen berpandunya. Rajah zarah merupakan representasi dan model pH adalah ideal pada 25 °C. Jangan menukar ID kuiz lama tanpa migrasi rekod.
