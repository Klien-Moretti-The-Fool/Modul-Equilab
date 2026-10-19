# Konteks paparan V8.1

Permintaan pengguna: pemilih lab tidak melekat semasa ditatal; gambar setiap kad modul lebih besar dan kemas; bikar homepage bergerak.

## Perubahan kod

- `lab-workbench.css`: keluarkan `position: sticky` pada `.lab-selector`; laraskan jarak scroll tajuk untuk navigasi utama sahaja. Bar navigasi utama tidak diubah. Kad pemilih bergerak bersama halaman.
- `module-gallery.css`: imej memenuhi bingkai dengan `object-fit: cover` dan titik fokus setiap modul. Susunan kekal 3 × 2 pada desktop, 2 lajur pada tablet dan 1 lajur pada telefon. Header lebih padat pada skrin desktop rendah.
- `IllustratedModuleCard.jsx`: pindahkan nilai kemajuan ke sudut gambar, kekalkan bar dan nilai ARIA. Logik peratus dan callback membuka modul tidak berubah.
- `Lab.jsx` serta `home-beaker.css`: animasi zarah, permukaan dan cahaya. Bikar besar pada homepage beranimasi secara lalai; prop `animated={false}` boleh menghentikannya. Ilustrasi kecil kekal statik secara lalai. Gunakan tetapan pengurangan animasi peranti jika diperlukan.

Animasi homepage ialah ilustrasi; ia tidak menukar bacaan pengionan, pemalar atau kiraan kemajuan. Semua model kimia V8 dan nota V7 dikekalkan. Gambar asal tidak disunting atau dijana semula.
