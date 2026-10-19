# EQUILAB V10 — Video YouTube dalam enam modul

V10 meneruskan V9: kad video penerangan, panel video tambahan dan senarai sumber video dalam **Panduan & rujukan → Video YouTube**. Terdapat **6 video utama + 6 video tambahan**. Video asal berbahasa Inggeris; tajuk pembelajaran, ringkasan dan soalan pemerhatian disediakan dalam BM/English.

## Pasang ke projek sedia ada dalam VS Code

Simpan **EquiLab-v10-video-youtube.zip** dalam **Downloads**. Buka terminal PowerShell pada folder projek EQUILAB yang mengandungi `package.json`. Hentikan pelayan dengan **Ctrl+C**, kemudian tampal keseluruhan arahan:

```powershell
& {
  $zipEquiLab = Join-Path $env:USERPROFILE 'Downloads\EquiLab-v10-video-youtube.zip'
  $updateEquiLab = Join-Path $env:TEMP ('EquiLab-v10-' + [guid]::NewGuid().ToString('N'))
  Expand-Archive -LiteralPath $zipEquiLab -DestinationPath $updateEquiLab -ErrorAction Stop
  node (Join-Path $updateEquiLab 'EquiLab-v10\install.mjs')
  if ($LASTEXITCODE -ne 0) { throw 'Pemasangan dihentikan. Baca mesej terminal.' }
  if (!(Test-Path '.\node_modules\vite\bin\vite.js')) {
    npm.cmd install
    if ($LASTEXITCODE -ne 0) { throw 'Pemasangan dependency gagal.' }
  }
  npm.cmd run dev
}
```

Buka alamat **Local** yang dipaparkan dalam terminal, termasuk `/Equilab/`. Port boleh berubah. Tekan **Ctrl+Shift+R** jika tab lama masih muncul. Terminal mesti terus berjalan.

Pemasang menyokong asas V8, V8.1 dan V9 yang dikenal pasti, menyemak fail sebelum perubahan dan membuat sandaran `backup-v10-...`. Fail kod dengan suntingan berbeza dihentikan untuk mengelakkan suntingan sendiri ditimpa. Ia mengekalkan `.env`, kandungan kimia, data kemajuan, gambar modul dan pautan tersuai lama dalam `moduleVideos.js`. Tetapan baharu `videoOverrides.json` juga dikekalkan jika sudah wujud.

Untuk menggunakan projek penuh, ekstrak ZIP dan buka folder **EquiLab-v10** yang mempunyai `package.json`. Jalankan `npm.cmd install`, kemudian `npm.cmd run dev`. Gunakan `.env` projek sendiri jika mahu mengaktifkan akaun online. Akses tetamu boleh digunakan tanpa `.env`.

## Di manakah video muncul?

Kad terbuka pada bahagian nota yang paling berkaitan. Video lain berada dalam panel yang boleh dibuka, termasuk pada bahagian yang tidak mempunyai video khusus. Gunakan pintasan **Video penerangan modul** pada sebelah nota untuk terus ke panel video.

| Modul | Kad video utama | Video tambahan |
| --- | --- | --- |
| Asas asid dan bes | Pasangan konjugat — nota 2 | Air dan Kw — nota 3 |
| Keseimbangan dinamik | Kadar sama, tindak balas berterusan — nota 1 | Le Chatelier — nota 3 |
| Pengionan dan kekuatan | Kekuatan berbanding kepekatan — nota 1 | Peratus pengionan — nota 2 |
| Ka, Kb dan pH | Jadual ICE asid lemah — nota 2 | Kb dan pH bes lemah — nota 3 |
| Larutan penimbal | Dua komponen penimbal — nota 1 | Henderson–Hasselbalch — nota 2 |
| Titrasi asid–bes | Asid lemah–bes kuat — nota 2 | Asid kuat–bes kuat — nota 1 |

Video dibuka dalam tab YouTube baharu. Nota dan mini simulasi boleh diteruskan tanpa menonton; kemajuan menggunakan butang nota dan keputusan kuiz seperti sebelumnya. Tiada autoplay atau pemain video tertanam. Pratonton memerlukan internet; ilustrasi modul setempat muncul jika imej YouTube gagal dimuatkan. Internet diperlukan untuk menonton video YouTube.

## Tukar video dengan satu arahan terminal

Buka video YouTube, tekan **Share/Kongsi → Copy/Salin**, kemudian gunakan arahan berikut dalam terminal projek. Gantikan kandungan dalam tanda petikan dengan pautan pilihan anda:

```powershell
node set-video.mjs buffers "PAUTAN_YOUTUBE_ANDA"
```

Contoh sebenar, untuk menukar video utama penimbal kepada video Henderson–Hasselbalch:

```powershell
node set-video.mjs buffers "https://www.youtube.com/watch?v=7QgtdYiWH50"
```

| Modul | ID dalam arahan |
| --- | --- |
| Asas asid dan bes | `foundations` |
| Keseimbangan dinamik | `equilibrium` |
| Pengionan dan kekuatan | `ionization` |
| Ka, Kb dan pengiraan pH | `calculations` |
| Larutan penimbal | `buffers` |
| Titrasi asid–bes | `titration` |

Pautan `https://youtu.be/...`, pautan `watch`, `shorts` atau `embed` satu video diterima dan ditukar kepada URL biasa. Tanda petikan diperlukan, terutama jika pautan mengandungi `&`. Parameter perkongsian dan masa mula tidak digunakan. Pautan playlist sahaja tidak diterima.

Tetapan disimpan dalam **src/redesign/videoOverrides.json** dengan sandaran fail sebelumnya. Pautan lain tidak ditukar. Muat semula halaman selepas mengubah tetapan; jika pelayan telah dihentikan, jalankan `npm.cmd run dev` semula.

```powershell
# Kembali kepada video utama cadangan EQUILAB
node set-video.mjs buffers --default

# Buang tetapan baharu dan gunakan pilihan asal projek
# Pautan tersuai lama dalam moduleVideos.js digunakan jika ada
node set-video.mjs buffers --reset

# Sembunyikan video utama sahaja; video tambahan masih tersedia
node set-video.mjs buffers --clear
```

Anda juga boleh menyunting `videoOverrides.json` secara manual. Gunakan ID modul sebagai nama medan dan URL dalam tanda petikan. `{}` bermaksud gunakan pilihan asal. Nilai `null` menyembunyikan video utama. Pautan tersuai dipaparkan sebagai **Video pilihan untuk modul ini**; nama saluran atau bahasa tidak diteka.

## Sambung kerja dan semakan

- `docs/VIDEOS-V10.md`: senarai pautan, fokus dan tempat tetapan.
- `docs/VALIDATION-V10.md`: hasil semakan serta had pengujian.
- `README-V9.md` dan dokumen V9: panduan bergambar dan akaun.

Untuk menjalankan semula selepas laptop ditutup: buka projek yang sama dan jalankan **`npm.cmd run dev`** sahaja. Untuk menyemak kod: `npm.cmd test` dan `npm.cmd run build`.
