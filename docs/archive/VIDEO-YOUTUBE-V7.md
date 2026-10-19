# Butang video YouTube untuk enam modul

Satu video pilihan boleh dipasang bagi setiap modul. Pelajar menekan **Tonton penerangan di YouTube** di bahagian navigasi nota; video dibuka dalam tab baharu. Nota kekal terbuka dalam tab asal. Pada telefon, butang berada di atas nota, selepas senarai langkah.

## Cara paling mudah dalam VS Code

1. Buka `src/redesign/moduleVideos.js`.
2. Tampal pautan video antara tanda petik bagi modul berkenaan.
3. Simpan fail. Jika `npm.cmd run dev` sedang berjalan, Vite mengemas kini paparan.

```js
export const moduleVideos = {
  foundations: '',
  equilibrium: '',
  ionization: '',
  calculations: '',
  buffers: '',
  titration: '',
};
```

Gunakan pautan video sebenar daripada butang Share YouTube: `https://youtu.be/` diikuti ID video, atau `https://www.youtube.com/watch?v=` diikuti ID video. Pautan Shorts dan embed juga diterima. Pautan carian, halaman saluran dan senarai main sahaja tidak diterima. Jangan tampal kod HTML iframe. Butang hanya muncul untuk pautan video HTTPS yang sah. Fail asal sengaja belum memilih video; pautan kosong tidak menghasilkan butang yang tidak berfungsi.

## Pilihan menggunakan terminal

Dari folder projek yang mempunyai `package.json`, jalankan:

```powershell
node .\set-video.mjs foundations "PAUTAN_VIDEO_YOUTUBE_SEBENAR"
```

Gantikan teks dalam tanda petik dengan pautan sebenar. Kod modul ialah `foundations`, `equilibrium`, `ionization`, `calculations`, `buffers` dan `titration`. Skrip menyemak pautan dan membuat sandaran fail konfigurasi. Untuk membuang video, gunakan `node .\set-video.mjs foundations --clear`.

## Kandungan yang sesuai dicari

| Modul | Fokus video yang dicadangkan | Apa yang pelajar perlu perhatikan |
|---|---|---|
| Acid & base foundations | Arrhenius, Brønsted–Lowry, Lewis; conjugate pairs | Proton dan pasangan elektron ialah perkara berbeza; pasangan konjugat berbeza satu H⁺. |
| Dynamic equilibrium | Particle animation; equal rates; Le Chatelier | Tindak balas masih berjalan pada keseimbangan. Kepekatan tidak semestinya sama. |
| Ionization & strength | Strong vs weak acids; dilution | Bezakan kepekatan dengan kekuatan; pencairan menaikkan peratus pengionan asid lemah. |
| Ka, Kb & pH calculations | Worked ICE table; pH and pOH; salt hydrolysis | Tunjukkan unit, semakan anggaran 5% dan sebab garam boleh bersifat asid atau bes. |
| Buffer solutions | HA/A⁻ response to added acid or base | Tunjukkan komponen yang digunakan serta had kapasiti penimbal. |
| Acid–base titration | Four titration curves; half-equivalence; indicators | Bezakan titik kesetaraan daripada titik akhir penunjuk; pH kesetaraan tidak sentiasa 7. |

Utamakan video ringkas yang menerangkan satu konsep dengan visual jelas. Semak keseluruhan video sebelum digunakan: ketepatan kimia, bahasa/subtitel, saiz tulisan dan kesesuaian dengan nota. Video sendiri boleh digunakan untuk suara/penerangan mengikut silibus; video YouTube sedia ada membantu bagi animasi yang sudah berkualiti. Butang pautan membolehkan kedua-duanya digunakan tanpa membesarkan pakej projek. Video memerlukan internet dan ketersediaannya bergantung kepada pemilik YouTube.

Pautan dalam fail ini ialah konfigurasi bersama bagi semua pelajar selepas projek dibina semula/dihoskan. Ia bukan tetapan akaun atau markah pelajar.
