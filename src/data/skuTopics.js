export default [{
  "id": "conjugates",
  "module": "foundations",
  "step": 1,
  "title": {
    "ms": "Pasangan konjugat dan cas",
    "en": "Conjugate pairs and charge"
  },
  "source": "SKU B · 21–24",
  "goal": {
    "ms": "Kenal pasti dua pasangan konjugat dalam satu tindak balas.",
    "en": "Identify both conjugate pairs in a reaction."
  },
  "notes": {
    "ms": ["Asid kehilangan satu H⁺ lalu menghasilkan bes konjugat. Bes menerima satu H⁺ lalu menghasilkan asid konjugat.", "Bilangan atom H berbeza satu dan cas berbeza satu unit. Spesies yang bersebelahan dalam persamaan tidak semestinya pasangan konjugat.", "H₂PO₄⁻ dan HCO₃⁻ bersifat amfiprotik: kedua-duanya boleh memberi atau menerima proton."],
    "en": ["An acid loses one H⁺ to form its conjugate base; a base gains one H⁺ to form its conjugate acid.", "Partners differ by one hydrogen and one unit of charge. Neighbouring species in an equation are not necessarily partners.", "H₂PO₄⁻ and HCO₃⁻ are amphiprotic: each can donate or accept a proton."]
  },
  "formula": "H₂PO₄⁻ + CO₃²⁻ ⇌ HPO₄²⁻ + HCO₃⁻",
  "example": {
    "ms": "Jejak proton daripada H₂PO₄⁻ kepada CO₃²⁻.",
    "en": "Track the proton from H₂PO₄⁻ to CO₃²⁻."
  },
  "worked": {
    "ms": ["H₂PO₄⁻ → HPO₄²⁻ + H⁺: penderma ialah asid.", "CO₃²⁻ + H⁺ → HCO₃⁻: penerima ialah bes.", "Pasangan: H₂PO₄⁻/HPO₄²⁻ dan HCO₃⁻/CO₃²⁻. Jumlah cas kedua-dua belah = −3."],
    "en": ["H₂PO₄⁻ → HPO₄²⁻ + H⁺: the donor is the acid.", "CO₃²⁻ + H⁺ → HCO₃⁻: the acceptor is the base.", "Pairs: H₂PO₄⁻/HPO₄²⁻ and HCO₃⁻/CO₃²⁻. Total charge on each side is −3."]
  },
  "tip": {
    "ms": "Buang H⁺: cas turun satu. Tambah H⁺: cas naik satu.",
    "en": "Remove H⁺: charge falls by one. Add H⁺: charge rises by one."
  },
  "practice": {
    "prompt": {
      "ms": "Apakah cas bes konjugat HPO₄²⁻? Masukkan nombor bercas.",
      "en": "What is the charge of the conjugate base of HPO₄²⁻? Enter a signed number."
    },
    "answer": -3,
    "unit": "",
    "tolerance": 0,
    "explanation": {
      "ms": "HPO₄²⁻ kehilangan H⁺ menjadi PO₄³⁻.",
      "en": "HPO₄²⁻ loses H⁺ to become PO₄³⁻."
    }
  },
  "tool": "conjugate"
}, {
  "id": "direction",
  "module": "foundations",
  "step": 1,
  "title": {
    "ms": "Arah tindak balas asid–bes",
    "en": "Acid–base reaction direction"
  },
  "source": "SKU B · 25–27",
  "goal": {
    "ms": "Gunakan kekuatan relatif untuk meramal kedudukan keseimbangan.",
    "en": "Use relative strength to predict equilibrium preference."
  },
  "notes": {
    "ms": ["Keseimbangan pemindahan proton memihak kepada pasangan asid dan bes yang lebih lemah.", "Bagi HA + B ⇌ A⁻ + BH⁺, K = Ka(HA)/Ka(BH⁺). Nilai pKa mesti merujuk pelarut dan keadaan yang sepadan.", "K menentukan kecenderungan keseimbangan; arah bersih campuran sebenar tetap memerlukan perbandingan Q dengan K."],
    "en": ["Proton-transfer equilibrium favours the weaker acid and weaker base pair.", "For HA + B ⇌ A⁻ + BH⁺, K = Ka(HA)/Ka(BH⁺). Compare pKa values in the same solvent and conditions.", "K describes equilibrium preference; the actual net direction still requires comparing Q with K."]
  },
  "formula": "K = 10^[pKa(BH⁺) − pKa(HA)]",
  "example": {
    "ms": "HA mempunyai pKa 4 dan BH⁺ mempunyai pKa 9.",
    "en": "HA has pKa 4 and BH⁺ has pKa 9."
  },
  "worked": {
    "ms": ["K = 10^(9 − 4) = 100000.", "Produk diutamakan pada keseimbangan. BH⁺ ialah asid lebih lemah.", "Jika Q = 1, Q < K dan tindak balas bersih ke kanan."],
    "en": ["K = 10^(9 − 4) = 100000.", "Products are favoured at equilibrium. BH⁺ is the weaker acid.", "If Q = 1, Q < K and the net reaction proceeds right."]
  },
  "tip": {
    "ms": "Lebih kecil pKa → asid lebih kuat; jangan keliru dengan bes konjugatnya.",
    "en": "Smaller pKa → stronger acid; its conjugate base is weaker."
  },
  "practice": {
    "prompt": {
      "ms": "Jika pKa(HA) = 5 dan pKa(BH⁺) = 8, hitung K.",
      "en": "If pKa(HA) = 5 and pKa(BH⁺) = 8, calculate K."
    },
    "answer": 1000,
    "unit": "",
    "tolerance": 1,
    "explanation": {
      "ms": "K = 10^(8 − 5) = 1000.",
      "en": "K = 10^(8 − 5) = 1000."
    }
  },
  "tool": "direction"
}, {
  "id": "leveling",
  "module": "foundations",
  "step": 1,
  "title": {
    "ms": "Pelarut dan kesan perataan",
    "en": "Solvent and the leveling effect"
  },
  "source": "SKU B · 4 (tajuk); OpenStax 14.3",
  "goal": {
    "ms": "Bezakan kekuatan intrinsik daripada pemerhatian dalam air.",
    "en": "Distinguish acid strength from its observation in water."
  },
  "notes": {
    "ms": ["Dalam air, asid yang lebih kuat daripada H₃O⁺ bertindak balas dengan air sehingga menghasilkan H₃O⁺. Ini ialah kesan perataan pelarut.", "Oleh itu HCl dan HBr pada kepekatan sama memberikan pH hampir sama dalam model ideal; bacaan itu tidak membuktikan kekuatan mereka sama dalam semua pelarut.", "Bes yang lebih kuat daripada OH⁻ pula bertindak balas dengan air untuk menghasilkan OH⁻."],
    "en": ["In water, acids stronger than H₃O⁺ react with the solvent to yield H₃O⁺: the solvent leveling effect.", "Thus equal concentrations of HCl and HBr give similar ideal pH values; this does not mean equal strength in every solvent.", "Bases stronger than OH⁻ likewise react with water to yield OH⁻."]
  },
  "formula": "HCl + H₂O → H₃O⁺ + Cl⁻",
  "example": {
    "ms": "Bandingkan HCl 0.010 M dengan HBr 0.010 M pada 25 °C.",
    "en": "Compare 0.010 M HCl and 0.010 M HBr at 25 °C."
  },
  "worked": {
    "ms": ["Kedua-duanya membekalkan [H₃O⁺] ≈ 0.010 M.", "pH ≈ −log(0.010) = 2.00 bagi kedua-duanya.", "Gunakan pelarut berbeza untuk membezakan kekuatan yang diratakan oleh air."],
    "en": ["Both supply [H₃O⁺] ≈ 0.010 M.", "pH ≈ −log(0.010) = 2.00 for each.", "A different solvent can distinguish strengths leveled by water."]
  },
  "tip": {
    "ms": "Kesan perataan berkaitan pelarut, bukan semua asid menjadi asid kuat.",
    "en": "Leveling is a solvent effect; it does not turn every acid into a strong acid."
  },
  "practice": {
    "prompt": {
      "ms": "Apakah pH anggaran HCl 0.001 M pada 25 °C?",
      "en": "What is the approximate pH of 0.001 M HCl at 25 °C?"
    },
    "answer": 3,
    "unit": "pH",
    "tolerance": 0.01,
    "explanation": {
      "ms": "pH = −log(10⁻³) = 3.00.",
      "en": "pH = −log(10⁻³) = 3.00."
    }
  },
  "tool": null
}, {
  "id": "water",
  "module": "foundations",
  "step": 2,
  "title": {
    "ms": "Air, Kw dan keadaan neutral",
    "en": "Water, Kw and neutrality"
  },
  "source": "SKU B · 12–15",
  "goal": {
    "ms": "Hubungkan kedua-dua kepekatan ion dalam air.",
    "en": "Relate the two ion concentrations in water."
  },
  "notes": {
    "ms": ["Autoionisasi menghasilkan H₃O⁺ dan OH⁻ serentak. Dalam air tulen, kedua-duanya sama.", "Pada 25 °C, Kw = 1.0 × 10⁻¹⁴. Larutan berasid mempunyai [H₃O⁺] > [OH⁻]; berbes mempunyai [OH⁻] > [H₃O⁺].", "Neutral bermaksud dua kepekatan sama. pH neutral = pKw/2, dan tidak semestinya 7 pada suhu lain."],
    "en": ["Autoionization creates H₃O⁺ and OH⁻ together; their concentrations are equal in pure water.", "At 25 °C, Kw = 1.0 × 10⁻¹⁴. Acidic solutions have [H₃O⁺] > [OH⁻]; basic solutions have the reverse.", "Neutral means equal concentrations. Neutral pH = pKw/2, and need not be 7 at another temperature."]
  },
  "formula": "Kw = [H₃O⁺][OH⁻]",
  "example": {
    "ms": "Diberi [H₃O⁺] = 3.0 × 10⁻⁴ M pada 25 °C.",
    "en": "Given [H₃O⁺] = 3.0 × 10⁻⁴ M at 25 °C."
  },
  "worked": {
    "ms": ["[OH⁻] = Kw/[H₃O⁺].", "[OH⁻] = 10⁻¹⁴/(3.0 × 10⁻⁴) = 3.33 × 10⁻¹¹ M.", "[H₃O⁺] lebih besar, maka larutan berasid."],
    "en": ["[OH⁻] = Kw/[H₃O⁺].", "[OH⁻] = 10⁻¹⁴/(3.0 × 10⁻⁴) = 3.33 × 10⁻¹¹ M.", "[H₃O⁺] is larger, so the solution is acidic."]
  },
  "tip": {
    "ms": "Jangan gunakan Kw = 10⁻¹⁴ pada semua suhu.",
    "en": "Do not use Kw = 10⁻¹⁴ at every temperature."
  },
  "practice": {
    "prompt": {
      "ms": "Jika [OH⁻] = 2.0e-5 M pada 25 °C, cari [H₃O⁺].",
      "en": "If [OH⁻] = 2.0e-5 M at 25 °C, find [H₃O⁺]."
    },
    "answer": 5e-10,
    "unit": "M",
    "tolerance": 1e-11,
    "explanation": {
      "ms": "10⁻¹⁴/(2.0 × 10⁻⁵) = 5.0 × 10⁻¹⁰ M.",
      "en": "10⁻¹⁴/(2.0 × 10⁻⁵) = 5.0 × 10⁻¹⁰ M."
    }
  },
  "tool": "ph"
}, {
  "id": "dynamic",
  "module": "equilibrium",
  "step": 0,
  "title": {
    "ms": "Kadar, kepekatan dan kedudukan",
    "en": "Rates, concentrations and position"
  },
  "source": "SKU A · 3–6",
  "goal": {
    "ms": "Bezakan kadar sama daripada kepekatan sama.",
    "en": "Distinguish equal rates from equal concentrations."
  },
  "notes": {
    "ms": ["Keseimbangan dinamik memerlukan kadar hadapan dan songsang sama, bukan sifar. Kepekatan makroskopik kekal tetap.", "K yang besar menunjukkan produk diutamakan pada keseimbangan, bukan tindak balas lebih cepat.", "Bagi model satu langkah A ⇌ B dengan kedua-dua arah tertib pertama sahaja, Kc = kf/kr. Jangan anggap pekali stoikiometri sentiasa tertib tindak balas."],
    "en": ["Dynamic equilibrium has equal nonzero forward and reverse rates. Macroscopic concentrations remain constant.", "A large K indicates product-favoured equilibrium, not a faster reaction.", "Only for the first-order, single-step A ⇌ B model does Kc = kf/kr directly apply. Stoichiometric coefficients are not generally reaction orders."]
  },
  "formula": "vf = kf[A]; vr = kr[B]",
  "example": {
    "ms": "Model A ⇌ B: kf = 0.08 s⁻¹, kr = 0.04 s⁻¹, [A]+[B] = 1 M.",
    "en": "A ⇌ B model: kf = 0.08 s⁻¹, kr = 0.04 s⁻¹, [A]+[B] = 1 M."
  },
  "worked": {
    "ms": ["Pada keseimbangan, 0.08[A] = 0.04[B], maka [B] = 2[A].", "[A] = 1/3 M dan [B] = 2/3 M.", "Kedua-dua kadar = 0.0267 M s⁻¹ walaupun kepekatan berbeza."],
    "en": ["At equilibrium, 0.08[A] = 0.04[B], so [B] = 2[A].", "[A] = 1/3 M and [B] = 2/3 M.", "Both rates = 0.0267 M s⁻¹ even though concentrations differ."]
  },
  "tip": {
    "ms": "Baca graf kadar dan graf kepekatan secara berasingan.",
    "en": "Read rate and concentration graphs separately."
  },
  "practice": {
    "prompt": {
      "ms": "Untuk model yang sama, kf = 0.12 dan kr = 0.03. Cari Kc.",
      "en": "For the same model, kf = 0.12 and kr = 0.03. Find Kc."
    },
    "answer": 4,
    "unit": "",
    "tolerance": 0.01,
    "explanation": {
      "ms": "Kc = 0.12/0.03 = 4.",
      "en": "Kc = 0.12/0.03 = 4."
    }
  },
  "tool": null
}, {
  "id": "qk",
  "module": "equilibrium",
  "step": 1,
  "title": {
    "ms": "Bina Q dan banding dengan K",
    "en": "Build Q and compare with K"
  },
  "source": "SKU A · 7–10, 15–16, 20–22",
  "goal": {
    "ms": "Bina ungkapan dengan pekali dan keadaan fizikal yang betul.",
    "en": "Build expressions using coefficients and phases correctly."
  },
  "notes": {
    "ms": ["Seimbangkan persamaan dahulu. Kepekatan produk berada di pengangka; reaktan di penyebut; pekali menjadi kuasa.", "Q menggunakan keadaan semasa; K menggunakan keadaan keseimbangan pada suhu tertentu.", "Pepejal tulen dan cecair tulen tidak dimasukkan dalam ungkapan aktiviti. Bagi CaCO₃(s) ⇌ CaO(s) + CO₂(g), Kp = PCO₂."],
    "en": ["Balance first. Products go in the numerator, reactants in the denominator, and coefficients become powers.", "Q uses current conditions; K uses equilibrium conditions at a specified temperature.", "Omit pure solids and liquids from the activity expression. For CaCO₃(s) ⇌ CaO(s) + CO₂(g), Kp = PCO₂."]
  },
  "formula": "Qc = [NO₂]²/[N₂O₄]",
  "example": {
    "ms": "[NO₂] = 0.55 M, [N₂O₄] = 0.12 M; Kc = 0.21.",
    "en": "[NO₂] = 0.55 M, [N₂O₄] = 0.12 M; Kc = 0.21."
  },
  "worked": {
    "ms": ["Qc = 0.55²/0.12 = 2.52.", "Q > K, maka tindak balas bersih ke kiri.", "NO₂ digunakan dan N₂O₄ terbentuk sehingga Q = K."],
    "en": ["Qc = 0.55²/0.12 = 2.52.", "Q > K, so the net reaction proceeds left.", "NO₂ is consumed and N₂O₄ forms until Q = K."]
  },
  "tip": {
    "ms": "Q < K: ke kanan. Q > K: ke kiri. Q = K: tiada perubahan bersih.",
    "en": "Q < K: right. Q > K: left. Q = K: no net change."
  },
  "practice": {
    "prompt": {
      "ms": "Bagi N₂O₄ ⇌ 2NO₂, [NO₂] = 0.20 M dan [N₂O₄] = 0.10 M. Cari Qc.",
      "en": "For N₂O₄ ⇌ 2NO₂, [NO₂] = 0.20 M and [N₂O₄] = 0.10 M. Find Qc."
    },
    "answer": 0.4,
    "unit": "",
    "tolerance": 0.005,
    "explanation": {
      "ms": "Qc = 0.20²/0.10 = 0.40.",
      "en": "Qc = 0.20²/0.10 = 0.40."
    }
  },
  "tool": "qk"
}, {
  "id": "transform",
  "module": "equilibrium",
  "step": 1,
  "title": {
    "ms": "Ubah persamaan, ubah K",
    "en": "Transform an equation and K"
  },
  "source": "SKU A · 11–14, 18",
  "goal": {
    "ms": "Hitung K bagi persamaan yang diterbalikkan atau digandakan.",
    "en": "Calculate K for reversed or scaled equations."
  },
  "notes": {
    "ms": ["Terbalikkan persamaan: K baharu = 1/K.", "Darab semua pekali dengan n: K baharu = Kⁿ.", "Tambah persamaan tindak balas: darab pemalarnya. Pastikan spesies perantaraan dibatalkan."],
    "en": ["Reverse the equation: new K = 1/K.", "Multiply all coefficients by n: new K = Kⁿ.", "Add reaction equations: multiply their constants. Cancel intermediate species."]
  },
  "formula": "Kreverse = 1/K; Kscaled = Kⁿ; Koverall = K₁K₂",
  "example": {
    "ms": "A ⇌ B, K₁ = 4; B ⇌ C, K₂ = 3. Cari K bagi 2C ⇌ 2A.",
    "en": "A ⇌ B, K₁ = 4; B ⇌ C, K₂ = 3. Find K for 2C ⇌ 2A."
  },
  "worked": {
    "ms": ["Tambah: A ⇌ C, K = 4 × 3 = 12.", "Terbalikkan: C ⇌ A, K = 1/12.", "Gandakan: 2C ⇌ 2A, K = (1/12)² = 0.00694."],
    "en": ["Add: A ⇌ C, K = 4 × 3 = 12.", "Reverse: C ⇌ A, K = 1/12.", "Double: 2C ⇌ 2A, K = (1/12)² = 0.00694."]
  },
  "tip": {
    "ms": "Gandaan pekali tidak bermaksud darab K dengan nombor itu.",
    "en": "Scaling coefficients does not mean multiplying K by that number."
  },
  "practice": {
    "prompt": {
      "ms": "Jika A ⇌ B mempunyai K = 4, cari K bagi 2B ⇌ 2A.",
      "en": "If A ⇌ B has K = 4, find K for 2B ⇌ 2A."
    },
    "answer": 0.0625,
    "unit": "",
    "tolerance": 0.0001,
    "explanation": {
      "ms": "(1/4)² = 1/16 = 0.0625.",
      "en": "(1/4)² = 1/16 = 0.0625."
    }
  },
  "tool": null
}, {
  "id": "kp",
  "module": "equilibrium",
  "step": 1,
  "title": {
    "ms": "Hubungan Kp dan Kc",
    "en": "Relating Kp and Kc"
  },
  "source": "SKU A · 17–19",
  "goal": {
    "ms": "Kira perubahan mol gas dan gunakan suhu Kelvin.",
    "en": "Calculate the gas mole change and use kelvin."
  },
  "notes": {
    "ms": ["Kp menggunakan tekanan separa gas; Kc menggunakan kepekatan.", "Δn ialah jumlah pekali gas produk ditolak jumlah pekali gas reaktan. Jangan kira pepejal atau cecair.", "Dalam bentuk pengiraan buku teks, gunakan Kp = Kc(RT)^Δn dan unit R yang sepadan dengan tekanan."],
    "en": ["Kp uses partial gas pressures; Kc uses concentrations.", "Δn is the sum of gaseous product coefficients minus gaseous reactant coefficients. Exclude solids and liquids.", "In the textbook calculation convention, Kp = Kc(RT)^Δn. Match R to the pressure units."]
  },
  "formula": "Kp = Kc(RT)^Δn; R = 0.082057 L atm mol⁻¹ K⁻¹",
  "example": {
    "ms": "N₂O₄(g) ⇌ 2NO₂(g), Kc = 0.20, T = 300 K.",
    "en": "N₂O₄(g) ⇌ 2NO₂(g), Kc = 0.20, T = 300 K."
  },
  "worked": {
    "ms": ["Δn = 2 − 1 = 1.", "Kp = 0.20 × (0.082057 × 300)¹.", "Kp ≈ 4.92 mengikut konvensyen unit yang digunakan."],
    "en": ["Δn = 2 − 1 = 1.", "Kp = 0.20 × (0.082057 × 300)¹.", "Kp ≈ 4.92 in this unit convention."]
  },
  "tip": {
    "ms": "Jika Δn = 0, Kp dan Kc sama dalam konvensyen ini.",
    "en": "If Δn = 0, Kp and Kc match in this convention."
  },
  "practice": {
    "prompt": {
      "ms": "Cari Δn untuk N₂(g) + 3H₂(g) ⇌ 2NH₃(g).",
      "en": "Find Δn for N₂(g) + 3H₂(g) ⇌ 2NH₃(g)."
    },
    "answer": -2,
    "unit": "",
    "tolerance": 0,
    "explanation": {
      "ms": "Δn = 2 − (1 + 3) = −2.",
      "en": "Δn = 2 − (1 + 3) = −2."
    }
  },
  "tool": "kp"
}, {
  "id": "ice",
  "module": "equilibrium",
  "step": 1,
  "title": {
    "ms": "Jadual ICE dan semakan andaian",
    "en": "ICE tables and assumption checks"
  },
  "source": "SKU A · 23–33",
  "goal": {
    "ms": "Selesaikan kepekatan keseimbangan dan semak semula K.",
    "en": "Solve equilibrium concentrations and verify K."
  },
  "notes": {
    "ms": ["Tukar mol kepada molariti sebelum membina ICE: awal, perubahan, keseimbangan.", "Tanda dan gandaan x mengikut arah tindak balas serta pekali stoikiometri.", "Anggaran C − x ≈ C hanya diterima apabila perubahan kecil; semak 100x/C ≤ 5% sebagai panduan biasa. Jika gagal, selesaikan kuadratik."],
    "en": ["Convert moles to molarity before building initial, change and equilibrium rows.", "Signs and multiples of x follow reaction direction and stoichiometry.", "Use C − x ≈ C only for a small change; check 100x/C ≤ 5% as a common guideline. Otherwise solve the quadratic."]
  },
  "formula": "2HI ⇌ H₂ + I₂; Kc = [H₂][I₂]/[HI]²",
  "example": {
    "ms": "Awal [HI] = 0.100 M, produk = 0; pada keseimbangan [HI] = 0.078 M.",
    "en": "Initially [HI] = 0.100 M and products = 0; equilibrium [HI] = 0.078 M."
  },
  "worked": {
    "ms": ["ICE: HI: 0.100, −2x, 0.100−2x; H₂ dan I₂: 0, +x, x.", "0.100 − 2x = 0.078 → x = 0.011 M.", "Kc = 0.011²/0.078² = 0.0199 ≈ 0.020."],
    "en": ["ICE: HI: 0.100, −2x, 0.100−2x; H₂ and I₂: 0, +x, x.", "0.100 − 2x = 0.078 → x = 0.011 M.", "Kc = 0.011²/0.078² = 0.0199 ≈ 0.020."]
  },
  "tip": {
    "ms": "Gantikan jawapan akhir ke dalam K, dan pastikan tiada kepekatan negatif.",
    "en": "Substitute your answer back into K and reject negative concentrations."
  },
  "practice": {
    "prompt": {
      "ms": "Jika [HI] awal = 0.20 M dan akhir = 0.12 M, berapakah [H₂] jika produk awal sifar?",
      "en": "If initial [HI] = 0.20 M and final [HI] = 0.12 M, find [H₂] when products start at zero."
    },
    "answer": 0.04,
    "unit": "M",
    "tolerance": 0.0005,
    "explanation": {
      "ms": "2x = 0.08, maka x = 0.040 M.",
      "en": "2x = 0.08, so x = 0.040 M."
    }
  },
  "tool": "ice"
}, {
  "id": "stress",
  "module": "equilibrium",
  "step": 2,
  "title": {
    "ms": "Gangguan: Q berubah atau K berubah?",
    "en": "Disturbances: Q or K?"
  },
  "source": "SKU A · 34–45",
  "goal": {
    "ms": "Bezakan kesan kepekatan, tekanan, suhu dan mangkin.",
    "en": "Distinguish concentration, pressure, temperature and catalyst effects."
  },
  "notes": {
    "ms": ["Pada suhu tetap, penambahan reaktan atau produk mengubah Q tetapi tidak mengubah K. Sistem bergerak sehingga Q kembali sama dengan K.", "Pemampatan memihak bahagian dengan mol gas lebih sedikit; jika jumlah mol gas sama, tiada peralihan bagi model gas ideal.", "Gas lengai pada isi padu tetap tidak mengubah tekanan separa reaktan. Mangkin mempercepat pencapaian keseimbangan tanpa mengubah K.", "Suhu mengubah K. Pemanasan memihak arah endotermik; bagi tindak balas endotermik, K meningkat apabila suhu meningkat."],
    "en": ["At fixed temperature, adding reactant or product changes Q, not K. The system evolves until Q equals K again.", "Compression favours fewer gas moles; equal gas mole counts give no shift in the ideal model.", "An inert gas at fixed volume leaves reactant partial pressures unchanged. A catalyst speeds equilibrium attainment without changing K.", "Temperature changes K. Heating favours the endothermic direction; K rises with temperature for an endothermic reaction."]
  },
  "formula": "N₂O₄(g) + haba / heat ⇌ 2NO₂(g)",
  "example": {
    "ms": "Keseimbangan asal Q = K = 4. Isipadu bekas tiba-tiba dibahagi dua pada suhu tetap.",
    "en": "Initially Q = K = 4. The container volume is suddenly halved at fixed temperature."
  },
  "worked": {
    "ms": ["Kedua-dua kepekatan gas berganda.", "Q baharu = (2[NO₂])²/(2[N₂O₄]) = 2Q = 8.", "Q > K: peralihan ke N₂O₄. K kekal 4."],
    "en": ["Both gas concentrations double.", "New Q = (2[NO₂])²/(2[N₂O₄]) = 2Q = 8.", "Q > K: shift toward N₂O₄. K stays 4."]
  },
  "tip": {
    "ms": "Tekanan jumlah meningkat tidak semestinya menyebabkan peralihan; nyatakan cara tekanan diubah.",
    "en": "A rise in total pressure does not always shift equilibrium; specify how it changes."
  },
  "practice": {
    "prompt": {
      "ms": "K = 4 pada suhu tetap. Selepas mangkin ditambah, berapakah K?",
      "en": "K = 4 at fixed temperature. What is K after adding a catalyst?"
    },
    "answer": 4,
    "unit": "",
    "tolerance": 0,
    "explanation": {
      "ms": "Mangkin tidak mengubah pemalar keseimbangan.",
      "en": "A catalyst does not change the equilibrium constant."
    }
  },
  "tool": null
}, {
  "id": "vanthoff",
  "module": "equilibrium",
  "step": 2,
  "title": {
    "ms": "Suhu dan persamaan van’t Hoff",
    "en": "Temperature and van’t Hoff"
  },
  "source": "SKU A · 44, 49–52 · Pengayaan / Extension",
  "goal": {
    "ms": "Anggarkan perubahan K apabila suhu berubah.",
    "en": "Estimate K when temperature changes."
  },
  "notes": {
    "ms": ["Persamaan ini menghubungkan dua nilai K dengan dua suhu, dengan andaian ΔH° hampir tetap dalam julat suhu itu.", "Gunakan Kelvin dan ΔH° dalam J mol⁻¹ jika R = 8.314 J mol⁻¹ K⁻¹.", "Proses Haber bersifat eksotermik: suhu rendah memihak hasil ammonia tetapi mengurangkan kadar; keadaan industri mengimbangkan kadar dan hasil."],
    "en": ["This equation relates two K values at two temperatures, assuming nearly constant ΔH° over that interval.", "Use kelvin and ΔH° in J mol⁻¹ when R = 8.314 J mol⁻¹ K⁻¹.", "The exothermic Haber process favours ammonia at lower temperature, but lower temperature slows reaction; industrial conditions balance rate and yield."]
  },
  "formula": "ln(K₂/K₁) = −(ΔH°/R)(1/T₂ − 1/T₁)",
  "example": {
    "ms": "K₁ = 1.00 pada 300 K, ΔH° = +20.0 kJ mol⁻¹. Cari K₂ pada 330 K.",
    "en": "K₁ = 1.00 at 300 K and ΔH° = +20.0 kJ mol⁻¹. Find K₂ at 330 K."
  },
  "worked": {
    "ms": ["Tukar ΔH° = 20000 J mol⁻¹.", "ln(K₂/1) = −20000/8.314 × (1/330 − 1/300) = 0.729.", "K₂ = exp(0.729) ≈ 2.07; pemanasan menaikkan K bagi contoh endotermik ini."],
    "en": ["Convert ΔH° = 20000 J mol⁻¹.", "ln(K₂/1) = −20000/8.314 × (1/330 − 1/300) = 0.729.", "K₂ = exp(0.729) ≈ 2.07; heating raises K for this endothermic example."]
  },
  "tip": {
    "ms": "Persamaan van’t Hoff menggunakan ΔH°, bukan tenaga pengaktifan Ea.",
    "en": "Van’t Hoff uses ΔH°, not activation energy Ea."
  },
  "practice": {
    "prompt": {
      "ms": "Jika ln(K₂/K₁) = 0.693147 dan K₁ = 3, cari K₂.",
      "en": "If ln(K₂/K₁) = 0.693147 and K₁ = 3, find K₂."
    },
    "answer": 6,
    "unit": "",
    "tolerance": 0.01,
    "explanation": {
      "ms": "K₂ = 3e^0.693147 ≈ 6.00.",
      "en": "K₂ = 3e^0.693147 ≈ 6.00."
    }
  },
  "tool": "vanthoff"
}, {
  "id": "structure",
  "module": "ionization",
  "step": 0,
  "title": {
    "ms": "Struktur molekul dan kekuatan asid",
    "en": "Molecular structure and acidity"
  },
  "source": "SKU B · 10–11, 43–44",
  "goal": {
    "ms": "Terangkan trend kekuatan menggunakan ikatan dan keelektronegatifan.",
    "en": "Explain strength trends using bonds and electronegativity."
  },
  "notes": {
    "ms": ["Bagi hidrida bukan logam merentasi kala yang sama, keelektronegatifan yang meningkat lazimnya meningkatkan keasidan.", "Menuruni kumpulan halogen, ikatan H–X semakin lemah; trend kekuatan ialah HF < HCl < HBr < HI. Air meratakan pemerhatian bagi tiga asid kuat terakhir.", "Bagi asid okso dengan atom pusat sama, lebih banyak atom O lazimnya menstabilkan bes konjugat dan meningkatkan keasidan. Bagi bilangan O sama, pertimbangkan keelektronegatifan atom pusat."],
    "en": ["For nonmetal hydrides across the same period, increasing electronegativity generally increases acidity.", "Down the halogens the H–X bond weakens: HF < HCl < HBr < HI. Water levels the observed behaviour of the last three strong acids.", "For oxoacids with the same central atom, more O atoms generally stabilize the conjugate base and increase acidity. For equal O counts, consider central-atom electronegativity."]
  },
  "formula": "HClO < HClO₂ < HClO₃ < HClO₄",
  "example": {
    "ms": "Bandingkan HClO dan HClO₄.",
    "en": "Compare HClO and HClO₄."
  },
  "worked": {
    "ms": ["Atom pusat sama: Cl.", "HClO₄ mempunyai lebih banyak atom oksigen.", "Bes konjugat ClO₄⁻ lebih distabilkan; HClO₄ lebih kuat."],
    "en": ["The central atom is Cl in both.", "HClO₄ has more oxygen atoms.", "Its ClO₄⁻ conjugate base is more stabilized; HClO₄ is stronger."]
  },
  "tip": {
    "ms": "Jangan gunakan keelektronegatifan sahaja untuk trend menuruni kumpulan.",
    "en": "Do not use electronegativity alone to explain down-group trends."
  },
  "practice": {
    "prompt": {
      "ms": "Antara 1: HClO dan 2: HClO₄, pilih nombor asid lebih kuat.",
      "en": "Between 1: HClO and 2: HClO₄, enter the number of the stronger acid."
    },
    "answer": 2,
    "unit": "",
    "tolerance": 0,
    "explanation": {
      "ms": "HClO₄ lebih kuat; atom O tambahan menstabilkan bes konjugat.",
      "en": "HClO₄ is stronger; extra O atoms stabilize its conjugate base."
    }
  },
  "tool": "structure"
}, {
  "id": "polyprotic",
  "module": "ionization",
  "step": 1,
  "title": {
    "ms": "Pengionan asid poliprotik",
    "en": "Polyprotic acid ionization"
  },
  "source": "SKU B · 32, 34–36",
  "goal": {
    "ms": "Bezakan tahap pengionan dan pemalar setiap tahap.",
    "en": "Distinguish successive ionizations and their constants."
  },
  "notes": {
    "ms": ["Asid poliprotik mempunyai lebih daripada satu proton yang boleh diionkan. Tidak semua atom H dalam formula semestinya proton berasid.", "Bagi asid fosforik: H₃PO₄ → H₂PO₄⁻ → HPO₄²⁻ → PO₄³⁻, dengan setiap tahap menghasilkan satu H₃O⁺.", "Ka₁ > Ka₂ > Ka₃. Jika Ka₁ jauh lebih besar daripada Ka₂, tahap pertama lazimnya menguasai pH; semak syarat sebelum membuat anggaran."],
    "en": ["A polyprotic acid has more than one ionizable proton. Not every H in its formula is necessarily acidic.", "Phosphoric acid follows H₃PO₄ → H₂PO₄⁻ → HPO₄²⁻ → PO₄³⁻, each step producing one H₃O⁺.", "Ka₁ > Ka₂ > Ka₃. When Ka₁ greatly exceeds Ka₂, the first step often dominates pH; check conditions before approximating."]
  },
  "formula": "H₂A + H₂O ⇌ HA⁻ + H₃O⁺; HA⁻ + H₂O ⇌ A²⁻ + H₃O⁺",
  "example": {
    "ms": "H₂Asc 0.050 M, Ka₁ = 1.0e-5 dan Ka₂ = 5.0e-12.",
    "en": "0.050 M H₂Asc with Ka₁ = 1.0e-5 and Ka₂ = 5.0e-12."
  },
  "worked": {
    "ms": ["Tahap pertama: [H₃O⁺] ≈ √(1.0e-5 × 0.050) = 7.07e-4 M. Semakan = 1.41%.", "pH ≈ 3.15. [HAsc⁻] ≈ 7.07e-4 M dan [H₂Asc] ≈ 0.0493 M.", "Tahap kedua: Ka₂ = [H₃O⁺][Asc²⁻]/[HAsc⁻], maka [Asc²⁻] ≈ 5.0e-12 M.", "Dalam ICE tahap kedua, [H₃O⁺] meningkat sebanyak y, bukan berkurang."],
    "en": ["First step: [H₃O⁺] ≈ √(1.0e-5 × 0.050) = 7.07e-4 M. Check = 1.41%.", "pH ≈ 3.15. [HAsc⁻] ≈ 7.07e-4 M and [H₂Asc] ≈ 0.0493 M.", "Second step: Ka₂ = [H₃O⁺][Asc²⁻]/[HAsc⁻], so [Asc²⁻] ≈ 5.0e-12 M.", "In the second ICE table, [H₃O⁺] increases by y; it does not decrease."]
  },
  "tip": {
    "ms": "Jangan darab [asid lemah] dengan bilangan H untuk mendapatkan [H₃O⁺].",
    "en": "Do not multiply weak-acid concentration by its H count to obtain [H₃O⁺]."
  },
  "practice": {
    "prompt": {
      "ms": "Berapa tahap pengionan bagi H₃PO₄?",
      "en": "How many ionization steps does H₃PO₄ have?"
    },
    "answer": 3,
    "unit": "",
    "tolerance": 0,
    "explanation": {
      "ms": "Tiga proton boleh diionkan secara bertahap.",
      "en": "Three protons can ionize successively."
    }
  },
  "tool": "polyprotic"
}, {
  "id": "dilution",
  "module": "ionization",
  "step": 2,
  "title": {
    "ms": "Pencairan: peratus dan kepekatan",
    "en": "Dilution: percentage versus concentration"
  },
  "source": "SKU B · 32–33",
  "goal": {
    "ms": "Bandingkan peratus pengionan dengan jumlah ion per isi padu.",
    "en": "Compare ionization percentage with ions per unit volume."
  },
  "notes": {
    "ms": ["Untuk asid lemah monoprotik, α = x/C dan peratus = 100α.", "Pencairan meningkatkan pecahan yang mengion tetapi menurunkan [H₃O⁺]. Oleh itu pH meningkat.", "Ka tidak berubah dengan pencairan pada suhu tetap dalam model ideal. Peta zarah mesti menunjukkan ion yang sedikit, bukan mendakwa pengionan sifar."],
    "en": ["For a weak monoprotic acid, α = x/C and percentage = 100α.", "Dilution raises the ionized fraction but lowers [H₃O⁺], so pH increases.", "Ka is unchanged by dilution at fixed temperature in the ideal model. A particle view must not imply zero ionization simply because ions are sparse."]
  },
  "formula": "α ≈ √(Ka/C), apabila / when x ≪ C",
  "example": {
    "ms": "Bandingkan asid asetik 0.10 M dan 0.010 M, Ka = 1.8e-5.",
    "en": "Compare 0.10 M and 0.010 M acetic acid with Ka = 1.8e-5."
  },
  "worked": {
    "ms": ["0.10 M: x ≈ 0.00133 M, pengionan ≈ 1.33%, pH ≈ 2.88.", "0.010 M: x ≈ 0.000415 M, pengionan ≈ 4.15%, pH ≈ 3.38.", "Peratus meningkat tetapi kepekatan ion berkurang."],
    "en": ["0.10 M: x ≈ 0.00133 M, ionization ≈ 1.33%, pH ≈ 2.88.", "0.010 M: x ≈ 0.000415 M, ionization ≈ 4.15%, pH ≈ 3.38.", "The percentage rises while the ion concentration falls."]
  },
  "tip": {
    "ms": "Peratus mengion dan kepekatan ion ialah dua ukuran berbeza.",
    "en": "Ionization percentage and ion concentration are different measures."
  },
  "practice": {
    "prompt": {
      "ms": "Jika x = 0.002 M dan C = 0.10 M, cari peratus pengionan.",
      "en": "If x = 0.002 M and C = 0.10 M, find percent ionization."
    },
    "answer": 2,
    "unit": "%",
    "tolerance": 0.01,
    "explanation": {
      "ms": "100 × 0.002/0.10 = 2%.",
      "en": "100 × 0.002/0.10 = 2%."
    }
  },
  "tool": null
}, {
  "id": "ph",
  "module": "calculations",
  "step": 0,
  "title": {
    "ms": "Penukaran pH, pOH dan kepekatan",
    "en": "Convert pH, pOH and concentration"
  },
  "source": "SKU B · 16–20",
  "goal": {
    "ms": "Lakukan penukaran dua hala menggunakan logaritma.",
    "en": "Use logarithms for two-way conversion."
  },
  "notes": {
    "ms": ["pH = −log[H₃O⁺]; songsangnya [H₃O⁺] = 10⁻ᵖᴴ. Begitu juga pOH dan OH⁻.", "Pada 25 °C, pH + pOH = 14.00. Perubahan satu unit pH bersamaan faktor 10 dalam kepekatan ion.", "Skala 0–14 ialah julat lazim larutan cair, bukan had mutlak. Model kepekatan boleh memberi pH negatif; larutan pekat memerlukan pertimbangan aktiviti."],
    "en": ["pH = −log[H₃O⁺]; inversely [H₃O⁺] = 10⁻ᵖᴴ. The same applies to pOH and OH⁻.", "At 25 °C, pH + pOH = 14.00. One pH unit corresponds to a factor of 10 in ion concentration.", "0–14 is a common dilute-solution range, not an absolute limit. Concentration models can give negative pH; concentrated solutions require activity corrections."]
  },
  "formula": "[H₃O⁺] = 10^(−pH); [OH⁻] = 10^(−pOH)",
  "example": {
    "ms": "pH = 3.40 pada 25 °C.",
    "en": "pH = 3.40 at 25 °C."
  },
  "worked": {
    "ms": ["[H₃O⁺] = 10⁻³·⁴⁰ = 3.98e-4 M.", "pOH = 14 − 3.40 = 10.60.", "[OH⁻] = 10⁻¹⁰·⁶⁰ = 2.51e-11 M."],
    "en": ["[H₃O⁺] = 10⁻³·⁴⁰ = 3.98e-4 M.", "pOH = 14 − 3.40 = 10.60.", "[OH⁻] = 10⁻¹⁰·⁶⁰ = 2.51e-11 M."]
  },
  "tip": {
    "ms": "Bagi Ca(OH)₂ yang terlarut lengkap, [OH⁻] ≈ 2C; semak stoikiometri dahulu.",
    "en": "For fully dissolved Ca(OH)₂, [OH⁻] ≈ 2C; check stoichiometry first."
  },
  "practice": {
    "prompt": {
      "ms": "Cari pH bagi [OH⁻] = 0.0020 M pada 25 °C.",
      "en": "Find pH for [OH⁻] = 0.0020 M at 25 °C."
    },
    "answer": 11.30103,
    "unit": "pH",
    "tolerance": 0.02,
    "explanation": {
      "ms": "pOH = 2.699; pH = 14 − 2.699 = 11.301.",
      "en": "pOH = 2.699; pH = 14 − 2.699 = 11.301."
    }
  },
  "tool": "ph"
}, {
  "id": "weakacid",
  "module": "calculations",
  "step": 1,
  "title": {
    "ms": "ICE: pH asid lemah",
    "en": "ICE: weak-acid pH"
  },
  "source": "SKU B · 28–31",
  "goal": {
    "ms": "Selesaikan x dengan anggaran atau kuadratik.",
    "en": "Solve x by approximation or quadratic."
  },
  "notes": {
    "ms": ["Untuk HA + H₂O ⇌ H₃O⁺ + A⁻, jika sumbangan air kecil: kepekatan keseimbangan ialah C−x, x, x.", "Ka = x²/(C−x). Anggaran √(KaC) perlu disemak dengan 100x/C.", "Jika semakan melebihi 5%, gunakan akar positif kuadratik. Model kalkulator turut memasukkan autoionisasi air."],
    "en": ["For HA + H₂O ⇌ H₃O⁺ + A⁻, neglecting water contributions gives equilibrium concentrations C−x, x, x.", "Ka = x²/(C−x). Check the √(KaC) approximation using 100x/C.", "If the check exceeds 5%, use the positive quadratic root. The calculator also includes water autoionization."]
  },
  "formula": "x = 2KaC / [√(Ka² + 4KaC) + Ka]",
  "example": {
    "ms": "HA 0.010 M, Ka = 1.0e-3.",
    "en": "0.010 M HA with Ka = 1.0e-3."
  },
  "worked": {
    "ms": ["Anggaran x = √(1e-3 × 0.010) = 0.00316 M.", "Semakan = 31.6%; anggaran tidak sesuai.", "Kuadratik memberi x = 0.00270 M dan pH = 2.57."],
    "en": ["Approximation: x = √(1e-3 × 0.010) = 0.00316 M.", "Check = 31.6%; the approximation is unsuitable.", "The quadratic gives x = 0.00270 M and pH = 2.57."]
  },
  "tip": {
    "ms": "“Asid lemah” tidak menjamin x boleh diabaikan.",
    "en": "“Weak acid” does not guarantee that x is negligible."
  },
  "practice": {
    "prompt": {
      "ms": "Anggaran x = 0.002 M untuk C = 0.020 M. Berapa peratus semakan?",
      "en": "Estimated x = 0.002 M for C = 0.020 M. What is the percentage check?"
    },
    "answer": 10,
    "unit": "%",
    "tolerance": 0.01,
    "explanation": {
      "ms": "100x/C = 10%, melebihi panduan 5%.",
      "en": "100x/C = 10%, exceeding the 5% guideline."
    }
  },
  "tool": "weak"
}, {
  "id": "kafromph",
  "module": "calculations",
  "step": 1,
  "title": {
    "ms": "Cari Ka daripada pH",
    "en": "Find Ka from pH"
  },
  "source": "SKU B · 28–29",
  "goal": {
    "ms": "Gunakan data pH untuk menentukan pemalar asid.",
    "en": "Determine an acid constant from measured pH."
  },
  "notes": {
    "ms": ["Diberi kepekatan awal dan pH, cari [H₃O⁺] dahulu.", "Apabila sumbangan air boleh diabaikan, x = [H₃O⁺] ≈ [A⁻] dan [HA] = C−x.", "Gunakan penyebut C−x untuk jawapan lebih tepat; jangan terus menggantikan C tanpa semakan."],
    "en": ["Given initial concentration and pH, first calculate [H₃O⁺].", "When water is negligible, x = [H₃O⁺] ≈ [A⁻] and [HA] = C−x.", "Use C−x for a more accurate denominator; do not replace it with C without checking."]
  },
  "formula": "Ka = x²/(C−x); x ≈ 10^(−pH)",
  "example": {
    "ms": "Asid monoprotik 0.12 M mempunyai pH 2.62.",
    "en": "A 0.12 M monoprotic acid has pH 2.62."
  },
  "worked": {
    "ms": ["x = 10⁻²·⁶² = 0.002399 M.", "[HA] = 0.12 − 0.002399 = 0.117601 M.", "Ka = 0.002399²/0.117601 ≈ 4.89e-5. Anggaran penyebut 0.12 memberi 4.80e-5."],
    "en": ["x = 10⁻²·⁶² = 0.002399 M.", "[HA] = 0.12 − 0.002399 = 0.117601 M.", "Ka = 0.002399²/0.117601 ≈ 4.89e-5. Approximating the denominator as 0.12 gives 4.80e-5."]
  },
  "tip": {
    "ms": "Nilai Ka mesti positif dan berkaitan suhu yang dinyatakan.",
    "en": "Ka must be positive and associated with the stated temperature."
  },
  "practice": {
    "prompt": {
      "ms": "HA 0.10 M mempunyai pH 3.00. Cari Ka menggunakan C−x.",
      "en": "0.10 M HA has pH 3.00. Find Ka using C−x."
    },
    "answer": 1.01010101010101e-05,
    "unit": "",
    "tolerance": 2e-07,
    "explanation": {
      "ms": "x = 0.001 M; Ka = 10⁻⁶/0.099 = 1.01e-5.",
      "en": "x = 0.001 M; Ka = 10⁻⁶/0.099 = 1.01e-5."
    }
  },
  "tool": null
}, {
  "id": "weakbase",
  "module": "calculations",
  "step": 1,
  "title": {
    "ms": "ICE: pH bes lemah",
    "en": "ICE: weak-base pH"
  },
  "source": "SKU B · 37–40",
  "goal": {
    "ms": "Bezakan pengiraan Kb daripada Ka.",
    "en": "Distinguish Kb calculations from Ka calculations."
  },
  "notes": {
    "ms": ["B + H₂O ⇌ BH⁺ + OH⁻. Gunakan Kb = [BH⁺][OH⁻]/[B].", "ICE menghasilkan C−x, x, x apabila autoionisasi air diabaikan. Di sini x ialah [OH⁻], bukan [H₃O⁺].", "Cari pOH = −log x dahulu, kemudian pH = 14−pOH pada 25 °C."],
    "en": ["B + H₂O ⇌ BH⁺ + OH⁻. Use Kb = [BH⁺][OH⁻]/[B].", "ICE gives C−x, x, x when water autoionization is negligible. Here x is [OH⁻], not [H₃O⁺].", "Find pOH = −log x first, then pH = 14−pOH at 25 °C."]
  },
  "formula": "Kb = x²/(C−x); pH = 14 + log₁₀x",
  "example": {
    "ms": "NH₃ 0.10 M dengan Kb = 1.8e-5.",
    "en": "0.10 M NH₃ with Kb = 1.8e-5."
  },
  "worked": {
    "ms": ["x kuadratik = 0.001333 M; semakan = 1.33%.", "pOH = 2.875.", "pH = 11.125 ≈ 11.12."],
    "en": ["Quadratic x = 0.001333 M; check = 1.33%.", "pOH = 2.875.", "pH = 11.125 ≈ 11.12."]
  },
  "tip": {
    "ms": "Bes lemah menghasilkan OH⁻ melalui tindak balas dengan air walaupun formula tiada OH.",
    "en": "A weak base produces OH⁻ by reacting with water even without OH in its formula."
  },
  "practice": {
    "prompt": {
      "ms": "Jika bes lemah memberikan [OH⁻] = 4.0e-4 M, cari pH pada 25 °C.",
      "en": "A weak base gives [OH⁻] = 4.0e-4 M. Find pH at 25 °C."
    },
    "answer": 10.60206,
    "unit": "pH",
    "tolerance": 0.02,
    "explanation": {
      "ms": "pOH = 3.39794; pH = 10.60206.",
      "en": "pOH = 3.39794; pH = 10.60206."
    }
  },
  "tool": "weak"
}, {
  "id": "salts",
  "module": "calculations",
  "step": 2,
  "title": {
    "ms": "Hidrolisis garam",
    "en": "Salt hydrolysis"
  },
  "source": "SKU B · 41–42, 47–49",
  "goal": {
    "ms": "Kelaskan larutan garam dan hitung pH.",
    "en": "Classify salt solutions and calculate pH."
  },
  "notes": {
    "ms": ["NaCl: kedua-dua ion hampir tidak menghidrolisis; larutan neutral dalam model ideal.", "CH₃COONa: CH₃COO⁻ ialah bes konjugat asid lemah, lalu menghasilkan OH⁻. NH₄Cl: NH₄⁺ ialah asid konjugat bes lemah, lalu menghasilkan H₃O⁺.", "Bagi garam dengan kedua-dua ion aktif, bandingkan Ka kation dan Kb anion sebagai panduan; pengiraan penuh turut bergantung pada stoikiometri.", "Ion amfiprotik seperti HCO₃⁻ boleh mengion dalam dua arah. Bandingkan Ka tahap pendermaan dengan Kb = Kw/Ka tahap asid konjugat."],
    "en": ["NaCl: neither ion hydrolyses appreciably; the ideal solution is neutral.", "CH₃COONa: CH₃COO⁻ is a weak-acid conjugate base and produces OH⁻. NH₄Cl: NH₄⁺ is a weak-base conjugate acid and produces H₃O⁺.", "For salts with two active ions, compare cation Ka and anion Kb as a guide; full calculations also depend on stoichiometry.", "Amphiprotic ions such as HCO₃⁻ react both ways. Compare their donor-step Ka with Kb = Kw/Ka of the conjugate acid."]
  },
  "formula": "CH₃COO⁻ + H₂O ⇌ CH₃COOH + OH⁻; Kb = Kw/Ka",
  "example": {
    "ms": "CH₃COONa 0.25 M, Ka(CH₃COOH) = 1.8e-5.",
    "en": "0.25 M CH₃COONa; Ka(CH₃COOH) = 1.8e-5."
  },
  "worked": {
    "ms": ["Kb = 10⁻¹⁴/(1.8e-5) = 5.56e-10.", "[OH⁻] ≈ √(5.56e-10 × 0.25) = 1.18e-5 M.", "pOH ≈ 4.93 dan pH ≈ 9.07. Na⁺ ialah ion pengiring."],
    "en": ["Kb = 10⁻¹⁴/(1.8e-5) = 5.56e-10.", "[OH⁻] ≈ √(5.56e-10 × 0.25) = 1.18e-5 M.", "pOH ≈ 4.93 and pH ≈ 9.07. Na⁺ is a spectator."]
  },
  "tip": {
    "ms": "Garam tidak semestinya neutral. Asal ion dan tindak balasnya dengan air menentukan sifatnya.",
    "en": "Salts are not always neutral; the ions and their water reactions matter."
  },
  "practice": {
    "prompt": {
      "ms": "Ka(CH₃COOH) = 2.0e-5. Cari Kb(CH₃COO⁻) pada 25 °C.",
      "en": "Ka(CH₃COOH) = 2.0e-5. Find Kb(CH₃COO⁻) at 25 °C."
    },
    "answer": 5e-10,
    "unit": "",
    "tolerance": 1e-11,
    "explanation": {
      "ms": "Kb = 10⁻¹⁴/(2e-5) = 5e-10.",
      "en": "Kb = 10⁻¹⁴/(2e-5) = 5e-10."
    }
  },
  "tool": "salts"
}, {
  "id": "metals",
  "module": "calculations",
  "step": 2,
  "title": {
    "ms": "Ion logam terhidrat",
    "en": "Hydrated metal ions"
  },
  "source": "SKU B · 45–49",
  "goal": {
    "ms": "Terangkan keasidan kation logam melalui air terikat.",
    "en": "Explain metal-cation acidity through coordinated water."
  },
  "notes": {
    "ms": ["Kation kecil bercas tinggi menarik ketumpatan elektron daripada molekul air yang terikat padanya.", "Ikatan O–H dalam air terikat menjadi lebih mudah melepaskan proton kepada air sekeliling.", "Bagi Al(NO₃)₃ atau Cr(NO₃)₃, kation terhidrat menyumbang keasidan; NO₃⁻ ialah ion pengiring."],
    "en": ["Small, highly charged cations draw electron density from coordinated water.", "An O–H bond in coordinated water can then donate a proton more readily to surrounding water.", "For Al(NO₃)₃ or Cr(NO₃)₃, the hydrated cation contributes acidity; NO₃⁻ is the spectator."]
  },
  "formula": "[Al(H₂O)₆]³⁺ + H₂O ⇌ [Al(H₂O)₅OH]²⁺ + H₃O⁺",
  "example": {
    "ms": "Semak pemuliharaan cas dalam persamaan hidrolisis Al³⁺.",
    "en": "Check charge conservation in hydrated Al³⁺ hydrolysis."
  },
  "worked": {
    "ms": ["Cas reaktan = +3.", "Cas produk = +2 + +1 = +3.", "Proton berasal daripada air terikat; bukan atom H dalam ion Al³⁺ bebas."],
    "en": ["Reactant charge = +3.", "Product charge = +2 + +1 = +3.", "The proton comes from coordinated water, not from a free Al³⁺ ion."]
  },
  "tip": {
    "ms": "Kation yang sama boleh menerima pasangan elektron (Lewis) dan menjadikan air terikat lebih berasid.",
    "en": "A cation may accept electron pairs (Lewis) and make its coordinated water more acidic."
  },
  "practice": {
    "prompt": {
      "ms": "Apakah cas [Al(H₂O)₅OH] selepas satu proton dilepaskan daripada [Al(H₂O)₆]³⁺?",
      "en": "What is the charge of [Al(H₂O)₅OH] after [Al(H₂O)₆]³⁺ loses one proton?"
    },
    "answer": 2,
    "unit": "",
    "tolerance": 0,
    "explanation": {
      "ms": "Cas turun daripada +3 kepada +2.",
      "en": "Charge falls from +3 to +2."
    }
  },
  "tool": null
}, {
  "id": "commonion",
  "module": "buffers",
  "step": 0,
  "title": {
    "ms": "Kesan ion sepunya",
    "en": "The common-ion effect"
  },
  "source": "Pengayaan / Extension · OpenStax 14.6",
  "goal": {
    "ms": "Hubungkan ion sepunya dengan peralihan keseimbangan.",
    "en": "Relate a common ion to an equilibrium shift."
  },
  "notes": {
    "ms": ["Menambah A⁻ kepada HA ⇌ H⁺ + A⁻ meningkatkan Q buat sementara dan menekan pengionan HA.", "Penimbal memerlukan kedua-dua komponen dalam jumlah ketara. HCl + NaCl bukan penimbal biasa kerana tiada pasangan asid lemah/bes konjugat yang mencukupi.", "Penimbal boleh dibentuk melalui peneutralan separa asid lemah dengan bes kuat."],
    "en": ["Adding A⁻ to HA ⇌ H⁺ + A⁻ temporarily raises Q and suppresses HA ionization.", "A buffer needs appreciable amounts of both partners. HCl + NaCl is not a conventional buffer because it lacks an appreciable weak-acid/conjugate-base pair.", "Partial neutralization of a weak acid with strong base can prepare a buffer."]
  },
  "formula": "HA + OH⁻ → A⁻ + H₂O",
  "example": {
    "ms": "20 mmol HA dicampurkan dengan 8 mmol NaOH.",
    "en": "Mix 20 mmol HA with 8 mmol NaOH."
  },
  "worked": {
    "ms": ["OH⁻ habis bertindak balas: 8 mmol HA digunakan.", "Baki HA = 12 mmol; A⁻ terhasil = 8 mmol.", "Kedua-dua komponen hadir; campuran boleh bertindak sebagai penimbal."],
    "en": ["OH⁻ is consumed, using 8 mmol HA.", "Remaining HA = 12 mmol; A⁻ formed = 8 mmol.", "Both partners remain; the mixture can act as a buffer."]
  },
  "tip": {
    "ms": "Selesaikan stoikiometri dahulu, kemudian keseimbangan.",
    "en": "Solve stoichiometry first, then equilibrium."
  },
  "practice": {
    "prompt": {
      "ms": "15 mmol HA + 5 mmol OH⁻: berapa mmol HA berbaki?",
      "en": "15 mmol HA + 5 mmol OH⁻: how many mmol HA remain?"
    },
    "answer": 10,
    "unit": "mmol",
    "tolerance": 0.01,
    "explanation": {
      "ms": "15 − 5 = 10 mmol HA.",
      "en": "15 − 5 = 10 mmol HA."
    }
  },
  "tool": null
}, {
  "id": "bufferwork",
  "module": "buffers",
  "step": 1,
  "title": {
    "ms": "Pengiraan selepas penambahan",
    "en": "Calculate after an addition"
  },
  "source": "Pengayaan / Extension · nota penimbal sedia ada",
  "goal": {
    "ms": "Gunakan nisbah selepas tindak balas.",
    "en": "Use the ratio after reaction."
  },
  "notes": {
    "ms": ["Henderson–Hasselbalch ialah anggaran menggunakan nisbah bes konjugat/asid.", "Mol boleh menggantikan kepekatan dalam nisbah apabila kedua-dua komponen berada dalam isi padu yang sama.", "Selepas HCl ditambah, A⁻ berkurang dan HA bertambah. Selepas NaOH ditambah, HA berkurang dan A⁻ bertambah."],
    "en": ["Henderson–Hasselbalch approximates pH from the conjugate-base/acid ratio.", "Amounts may replace concentrations in the ratio when both species occupy the same volume.", "Added HCl consumes A⁻ and forms HA; added NaOH consumes HA and forms A⁻."]
  },
  "formula": "pH ≈ pKa + log(nA⁻/nHA)",
  "example": {
    "ms": "10 mmol HA + 10 mmol A⁻; pKa = 4.745. Tambah 2 mmol HCl.",
    "en": "10 mmol HA + 10 mmol A⁻; pKa = 4.745. Add 2 mmol HCl."
  },
  "worked": {
    "ms": ["A⁻ + H⁺ → HA.", "A⁻ baharu = 8 mmol, HA baharu = 12 mmol.", "pH ≈ 4.745 + log(8/12) = 4.569."],
    "en": ["A⁻ + H⁺ → HA.", "New A⁻ = 8 mmol; new HA = 12 mmol.", "pH ≈ 4.745 + log(8/12) = 4.569."]
  },
  "tip": {
    "ms": "Jika satu komponen habis, hentikan penggunaan persamaan nisbah penimbal.",
    "en": "If a partner is exhausted, stop using the buffer ratio equation."
  },
  "practice": {
    "prompt": {
      "ms": "Penimbal pKa = 5 dan [A⁻]/[HA] = 10. Cari pH.",
      "en": "A buffer has pKa = 5 and [A⁻]/[HA] = 10. Find pH."
    },
    "answer": 6,
    "unit": "pH",
    "tolerance": 0.01,
    "explanation": {
      "ms": "5 + log(10) = 6.",
      "en": "5 + log(10) = 6."
    }
  },
  "tool": null
}, {
  "id": "capacity",
  "module": "buffers",
  "step": 2,
  "title": {
    "ms": "Kapasiti, julat dan pencairan",
    "en": "Capacity, range and dilution"
  },
  "source": "Pengayaan / Extension · nota penimbal sedia ada",
  "goal": {
    "ms": "Bezakan pH penimbal dengan kapasiti penimbal.",
    "en": "Distinguish buffer pH from buffer capacity."
  },
  "notes": {
    "ms": ["Julat praktikal lazim ialah pKa ± 1, bersamaan nisbah 0.1–10.", "Pada nisbah dan isi padu sama, jumlah komponen lebih besar memberi kapasiti lebih besar.", "Pencairan sederhana mengekalkan nisbah hampir sama tetapi mengurangkan kapasiti per unit isi padu. Pada pencairan sangat besar, andaian penimbal boleh gagal."],
    "en": ["A typical useful range is pKa ± 1, corresponding to ratios 0.1–10.", "At the same ratio and volume, larger component amounts give greater capacity.", "Moderate dilution approximately preserves the ratio but lowers capacity per unit volume. At extreme dilution the buffer assumptions may fail."]
  },
  "formula": "0.1 ≤ [A⁻]/[HA] ≤ 10",
  "example": {
    "ms": "Bandingkan 100 mL penimbal 0.10/0.10 M dengan 0.010/0.010 M.",
    "en": "Compare 100 mL buffers at 0.10/0.10 M and 0.010/0.010 M."
  },
  "worked": {
    "ms": ["Nisbah kedua-duanya 1, jadi pH ≈ pKa.", "Yang pertama mempunyai 10 mmol setiap komponen; yang kedua 1 mmol.", "Tambah 2 mmol HCl: komponen bes penimbal kedua habis, tetapi penimbal pertama masih mempunyai kedua-duanya."],
    "en": ["Both ratios are 1, so pH ≈ pKa.", "The first has 10 mmol of each partner; the second has 1 mmol.", "Add 2 mmol HCl: the second buffer exhausts its base partner, but the first retains both."]
  },
  "tip": {
    "ms": "pH sama tidak bermaksud kapasiti sama.",
    "en": "Equal pH does not mean equal capacity."
  },
  "practice": {
    "prompt": {
      "ms": "Jika pKa = 4.75, apakah had atas julat lazim penimbal?",
      "en": "If pKa = 4.75, what is the upper end of the typical buffer range?"
    },
    "answer": 5.75,
    "unit": "pH",
    "tolerance": 0.01,
    "explanation": {
      "ms": "4.75 + 1 = 5.75.",
      "en": "4.75 + 1 = 5.75."
    }
  },
  "tool": null
}, {
  "id": "titrationcalc",
  "module": "titration",
  "step": 0,
  "title": {
    "ms": "Peneutralan dan isipadu keseluruhan",
    "en": "Neutralization and total volume"
  },
  "source": "Pengayaan / Extension · nota titrasi sedia ada",
  "goal": {
    "ms": "Gunakan mol lebihan dan isi padu campuran untuk pH.",
    "en": "Use excess moles and mixture volume for pH."
  },
  "notes": {
    "ms": ["Titik kesetaraan ialah nisbah stoikiometri, manakala titik akhir ialah isyarat eksperimen.", "Sebelum atau selepas kesetaraan asid kuat–bes kuat, kira mol ion yang berlebihan.", "Bahagikan mol lebihan dengan jumlah isi padu analit dan titran, bukan isi padu asal sahaja."],
    "en": ["Equivalence is a stoichiometric ratio; the endpoint is an experimental signal.", "Before or after strong-acid/strong-base equivalence, calculate excess ion moles.", "Divide excess moles by the combined analyte and titrant volume, not just the original volume."]
  },
  "formula": "[H₃O⁺] ≈ (nacid − nbase)/Vtotal",
  "example": {
    "ms": "25 mL HCl 0.100 M + 10 mL NaOH 0.100 M.",
    "en": "25 mL 0.100 M HCl + 10 mL 0.100 M NaOH."
  },
  "worked": {
    "ms": ["H⁺ asal = 2.50 mmol; OH⁻ = 1.00 mmol.", "Lebihan H⁺ = 1.50 mmol dalam 35.0 mL.", "[H₃O⁺] = 0.04286 M; pH = 1.368."],
    "en": ["Initial H⁺ = 2.50 mmol; OH⁻ = 1.00 mmol.", "Excess H⁺ = 1.50 mmol in 35.0 mL.", "[H₃O⁺] = 0.04286 M; pH = 1.368."]
  },
  "tip": {
    "ms": "Jangan gunakan CₐVₐ=CᵦVᵦ untuk semua stoikiometri tanpa memeriksa nisbah.",
    "en": "Do not use CₐVₐ=CᵦVᵦ for every stoichiometry without checking the ratio."
  },
  "practice": {
    "prompt": {
      "ms": "20 mL HCl 0.10 M memerlukan berapa mL NaOH 0.20 M pada kesetaraan?",
      "en": "How many mL of 0.20 M NaOH neutralize 20 mL of 0.10 M HCl?"
    },
    "answer": 10,
    "unit": "mL",
    "tolerance": 0.01,
    "explanation": {
      "ms": "2 mmol HCl / 0.20 mmol per mL = 10 mL.",
      "en": "2 mmol HCl / 0.20 mmol per mL = 10 mL."
    }
  },
  "tool": null
}, {
  "id": "curves",
  "module": "titration",
  "step": 1,
  "title": {
    "ms": "Empat pilihan arah titrasi",
    "en": "Four titration directions"
  },
  "source": "Pengayaan / Extension · nota titrasi sedia ada",
  "goal": {
    "ms": "Tentukan spesies yang mengawal pH pada setiap tahap.",
    "en": "Identify which species controls pH at each stage."
  },
  "notes": {
    "ms": ["Pilihan simulasi: asid kuat dititrat bes kuat; bes kuat dititrat asid kuat; asid lemah dititrat bes kuat; bes lemah dititrat asid kuat.", "Ini bukan empat gabungan termasuk asid lemah–bes lemah. Titrasi kedua-duanya lemah tidak dimodelkan.", "Pada kesetaraan: kuat–kuat pH ≈ 7; asid lemah–bes kuat pH > 7; bes lemah–asid kuat pH < 7 pada 25 °C."],
    "en": ["Simulation choices: strong acid titrated by strong base; strong base by strong acid; weak acid by strong base; weak base by strong acid.", "These are not four combinations including weak acid–weak base. That combination is not modeled.", "At equivalence: strong–strong pH ≈ 7; weak acid–strong base pH > 7; weak base–strong acid pH < 7 at 25 °C."]
  },
  "formula": "Awal / Initial → Penimbal / Buffer → Kesetaraan / Equivalence → Lebihan / Excess",
  "example": {
    "ms": "25 mL CH₃COOH 0.100 M dititrat NaOH 0.100 M.",
    "en": "25 mL 0.100 M CH₃COOH titrated with 0.100 M NaOH."
  },
  "worked": {
    "ms": ["0 mL: asid lemah mengawal pH ≈ 2.88.", "12.5 mL: nisbah HA/A⁻ ≈ 1, pH ≈ pKa = 4.745.", "25 mL: [A⁻] ≈ 0.050 M; hidrolisis memberi pH ≈ 8.72.", "30 mL: lebihan OH⁻ ≈ 0.0005/0.055 = 0.00909 M; pH ≈ 11.96."],
    "en": ["0 mL: weak acid controls pH ≈ 2.88.", "12.5 mL: HA/A⁻ ratio ≈ 1, pH ≈ pKa = 4.745.", "25 mL: [A⁻] ≈ 0.050 M; hydrolysis gives pH ≈ 8.72.", "30 mL: excess OH⁻ ≈ 0.0005/0.055 = 0.00909 M; pH ≈ 11.96."]
  },
  "tip": {
    "ms": "Pada kesetaraan asid lemah, gunakan hidrolisis; bukan Henderson–Hasselbalch.",
    "en": "At weak-acid equivalence use hydrolysis, not Henderson–Hasselbalch."
  },
  "practice": {
    "prompt": {
      "ms": "Jika isipadu kesetaraan ialah 30 mL, berapakah isipadu separuh kesetaraan?",
      "en": "If equivalence is at 30 mL, what is the half-equivalence volume?"
    },
    "answer": 15,
    "unit": "mL",
    "tolerance": 0.01,
    "explanation": {
      "ms": "30/2 = 15 mL.",
      "en": "30/2 = 15 mL."
    }
  },
  "tool": null
}, {
  "id": "indicator",
  "module": "titration",
  "step": 2,
  "title": {
    "ms": "Memilih penunjuk",
    "en": "Choose an indicator"
  },
  "source": "Pengayaan / Extension · OpenStax 14.7",
  "goal": {
    "ms": "Padankan julat perubahan warna dengan bahagian curam lengkung.",
    "en": "Match an indicator range to the steep part of the curve."
  },
  "notes": {
    "ms": ["Penunjuk ialah pasangan asid–bes yang mempunyai warna berbeza. Julat perubahan warnanya perlu berada dalam perubahan pH yang curam berhampiran kesetaraan.", "Julat lazim: metil jingga 3.1–4.4; bromotimol biru 6.0–7.6; fenolftalein 8.2–10.0.", "Untuk asid lemah–bes kuat, fenolftalein lazimnya lebih sesuai berbanding metil jingga; kesesuaian sebenar bergantung pada lengkung dan kepekatan."],
    "en": ["An indicator is an acid–base pair with different colours. Its transition range should fall within the steep pH change near equivalence.", "Typical ranges: methyl orange 3.1–4.4; bromothymol blue 6.0–7.6; phenolphthalein 8.2–10.0.", "For weak acid–strong base, phenolphthalein is often more suitable than methyl orange; suitability depends on the actual curve and concentration."]
  },
  "formula": "HIn ⇌ H⁺ + In⁻",
  "example": {
    "ms": "Lengkung mempunyai perubahan curam sekitar pH 8–10.",
    "en": "A curve has a steep transition around pH 8–10."
  },
  "worked": {
    "ms": ["Bandingkan julat penunjuk dengan bahagian curam.", "Fenolftalein (8.2–10.0) bertindih dengan kawasan tersebut.", "Titik akhir ialah perubahan warna yang diperhatikan; ia bukan definisi titik kesetaraan."],
    "en": ["Compare indicator ranges with the steep region.", "Phenolphthalein (8.2–10.0) overlaps this region.", "The endpoint is the observed colour signal; it is not the definition of equivalence."]
  },
  "tip": {
    "ms": "Jangan pilih penunjuk berdasarkan warna kegemaran atau pH awal.",
    "en": "Do not choose by favourite colour or initial pH."
  },
  "practice": {
    "prompt": {
      "ms": "Untuk julat curam 8–10, pilih 1: metil jingga atau 2: fenolftalein.",
      "en": "For a steep range of 8–10, choose 1: methyl orange or 2: phenolphthalein."
    },
    "answer": 2,
    "unit": "",
    "tolerance": 0,
    "explanation": {
      "ms": "Julat fenolftalein bertindih dengan perubahan curam.",
      "en": "Phenolphthalein overlaps the steep transition."
    }
  },
  "tool": null
}];
