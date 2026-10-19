# EQUILAB V8.1 — Kemas paparan

Versi ini meneruskan V8 dengan tiga perubahan:

1. Pemilih lima makmal berada dalam aliran halaman biasa. Apabila ditatal, kad pemilih turut bergerak keluar daripada skrin.
2. Gambar kad modul memenuhi lebar bingkai. Fokus gambar berbeza mengikut modul; peratus kemajuan berada di sudut gambar. Tajuk, huraian ringkas dan butang kekal berasingan daripada gambar supaya mudah dibaca.
3. Bikar halaman utama mempunyai zarah bergerak, permukaan larutan beralun dan pantulan cahaya lembut. Tetapan `prefers-reduced-motion` dihormati.

## Pasang ke projek V8 sedia ada

Simpan ZIP **EquiLab-v8.1-kemas-paparan.zip** dalam **Downloads**. Buka terminal PowerShell dalam projek EQUILAB V8 yang mengandungi `package.json`. Hentikan pelayan lama dengan **Ctrl+C**, kemudian tampal:

```powershell
& {
  $zipEquiLab = Join-Path $env:USERPROFILE 'Downloads\EquiLab-v8.1-kemas-paparan.zip'
  $updateEquiLab = Join-Path $env:TEMP ('EquiLab-v8.1-' + [guid]::NewGuid().ToString('N'))
  Expand-Archive -LiteralPath $zipEquiLab -DestinationPath $updateEquiLab -ErrorAction Stop
  node (Join-Path $updateEquiLab 'EquiLab-v8.1\install.mjs')
  if ($LASTEXITCODE -ne 0) { throw 'Pemasangan dihentikan. Baca mesej terminal.' }
  if (!(Test-Path '.\node_modules\vite\bin\vite.js')) {
    npm.cmd install
    if ($LASTEXITCODE -ne 0) { throw 'Pemasangan dependency gagal.' }
  }
  npm.cmd run dev
}
```

Pemasang menyemak fail dan menyediakan **backup-v8.1-...** sebelum menggantikannya. Ia hanya mengemas kini paparan yang disenaraikan untuk V8.1. Kandungan nota, konfigurasi `.env`, pautan video, pengiraan makmal, aset gambar dan data kemajuan tidak diganti. Suntingan sendiri pada fail yang akan dikemas kini menyebabkan pemasang berhenti sebelum menulis; gunakan projek penuh secara berasingan jika kod asas berbeza.

## Gunakan projek penuh

Ekstrak ZIP dan buka folder **EquiLab-v8.1** dalam VS Code. Pastikan `package.json` berada terus dalam folder yang dibuka.

```powershell
npm.cmd install
npm.cmd run dev
```

Buka alamat **Local** yang Vite paparkan dalam Chrome, termasuk laluan `/Equilab/`. Terminal perlu terus berjalan. Jika paparan lama masih muncul, pastikan alamat projek betul dan tekan **Ctrl+Shift+R**.

Untuk akaun online, gunakan konfigurasi `.env` projek anda sendiri. Mod tetamu boleh digunakan terus. Pemasang V8.1 memerlukan kod asas V8; jika masih menggunakan V7 atau versi lebih lama, gunakan projek penuh ini atau pasang V8 dahulu.

## Maklumat untuk sambungan kerja

Rujuk **docs/PAPARAN-V8.1.md** dan **docs/VALIDATION-V8.1.md**. Panduan makmal serta video terdahulu masih tersedia dalam dokumen V8 dan V7. Dokumen versi terdahulu menerangkan keadaan versi tersebut; pemilih makmal V8.1 kini tidak melekat pada skrin.
