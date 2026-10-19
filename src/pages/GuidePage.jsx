import { useRef, useState } from "react";
import { ArrowLeft, ArrowRight, BookOpen, FlaskConical, Maximize2, X, CheckCircle2 } from "lucide-react";
import { modules } from "../data/content.js";
import topics from "../data/skuTopics.js";
import { cloud } from "../lib/cloud.js";
import { guideSections, labTutorials, learningReferences, referenceMap } from "../data/guideData.js";
import { VideoReferenceList } from "../features/modules/ModuleVideoPanel.jsx";
import "../styles/guide.css";
function Steps({
  items
}) {
  return <ol className="guide-steps">
    {items.map((item, i) => <li key={i}>
      <span className="guide-step-number" aria-hidden="true">
        {i + 1}
      </span>
      <p>
        {item}
      </p>
    </li>)}
  </ol>;
}
function TutorialImage({
  name,
  lang,
  alt,
  caption
}) {
  const dialog = useRef(null),
    opener = useRef(null),
    t = (ms, en) => lang === 'ms' ? ms : en,
    [zoom, setZoom] = useState(1);
  const src = import.meta.env.BASE_URL + 'guide/' + name + '-' + lang + '.png';
  return <figure className="guide-figure">
    <button ref={opener} className="guide-image-button" onClick={() => {
      setZoom(1);
      dialog.current.showModal();
    }} aria-label={t('Besarkan gambar: ', 'Enlarge image: ') + alt}>
      <img src={src} alt={alt} loading="lazy" />
      <span className="guide-image-zoom">
        <Maximize2 size={17} />
        {t('Besarkan gambar', 'Enlarge image')}
      </span>
    </button>
    <figcaption>
      {caption}
    </figcaption>
    <dialog ref={dialog} className="guide-image-dialog" onClose={() => opener.current?.focus()} onClick={e => {
      if (e.target === dialog.current) dialog.current.close();
    }} aria-label={alt}>
      <div className="guide-dialog-top">
        <b>
          {alt}
        </b>
        <button onClick={() => dialog.current.close()} aria-label={t('Tutup gambar', 'Close image')}>
          <X size={22} />
        </button>
      </div>
      <div className="guide-zoom-controls">
        <button aria-label={t('Kurangkan zoom', 'Zoom out')} disabled={zoom <= 1} onClick={() => setZoom(x => Math.max(1, x - .5))}>−</button>
        <span>{Math.round(zoom * 100)}%</span>
        <button aria-label={t('Tambah zoom', 'Zoom in')} disabled={zoom >= 4} onClick={() => setZoom(x => Math.min(4, x + .5))}>+</button>
        <button onClick={() => setZoom(1)}>
          {t('Muat dalam ruang', 'Fit to view')}
        </button>
      </div>
      <div className="guide-image-pan" tabIndex="0" aria-label={t('Gambar boleh ditatal selepas zoom', 'Image can be scrolled after zoom')}>
        <img src={src} alt={alt} style={{
          width: zoom * 100 + '%'
        }} />
      </div>
      <p>
        {caption}
      </p>
    </dialog>
  </figure>;
}
export default function GuidePage({
  lang,
  nav,
  returnTo = 'home'
}) {
  const t = (ms, en) => lang === 'ms' ? ms : en,
    tr = x => x[lang],
    content = useRef(null);
  const [section, setSection] = useState('start'),
    [lab, setLab] = useState('ionization');
  const current = labTutorials.find(x => x.id === lab),
    title = guideSections.find(([id]) => id === section)[1];
  const change = id => {
    setSection(id);
    requestAnimationFrame(() => {
      content.current?.scrollIntoView({
        block: 'start',
        behavior: 'auto'
      });
      content.current?.focus({
        preventScroll: true
      });
    });
  };
  const noteSteps = [t('Pilih modul dan baca hasil pembelajaran. Mulakan dengan Asas asid dan bes jika anda perlukan ulang kaji.', 'Choose a module and read the learning outcomes. Start with Acid & base foundations if you need a refresher.'), t('Baca tiga bahagian nota. Perhatikan formula, contoh dan idea yang perlu diingat. Tukar bahasa dengan butang MS/EN di atas halaman.', 'Read the three note sections. Notice formulas, examples and key ideas. Switch language with the MS/EN button at the top.'), t('Cuba mini simulasi dan latihan pada nota. Ubah satu nilai, perhatikan hasil dan kaitkan pemerhatian dengan penerangan.', 'Try the note mini simulations and practice. Change one value, observe the result and connect it to the explanation.'), t('Selepas memahami bahagian nota, tekan “Saya faham · Teruskan”. Lengkapkan kuiz modul dan simpan keputusan pada akhir sesi.', 'When you understand a note section, press “Understood · Continue”. Complete the module quiz and save the result at the end.')];
  return <div className="guide-page"><div className="page-top guide-page-top">
      <div className="page-heading">
        <span className="eyebrow">EQUILAB · {t('PUSAT BANTUAN PEMBELAJARAN', 'LEARNING HELP CENTRE')}</span>
        <h1>
          {t('Panduan & rujukan.', 'Guide & references.')}
        </h1>
        <p>
          {t('Langkah yang jelas, tutorial bergambar dan sumber untuk belajar dengan yakin.', 'Clear steps, illustrated tutorials and sources to support your learning.')}
        </p>
      </div>
      <button className="secondary guide-return" onClick={() => nav(returnTo)}>
        <ArrowLeft size={17} />
        {t('Kembali ke halaman', 'Back to page')}
      </button>
    </div>
 <div className="guide-layout"><aside className="guide-menu" aria-label={t('Bahagian panduan', 'Guide sections')}>
        <span className="eyebrow">
          {t('PILIH PANDUAN', 'CHOOSE A GUIDE')}
        </span>
        {guideSections.map(([id, name], i) => <button key={id} className={section === id ? 'active' : ''} aria-current={section === id ? 'page' : undefined} onClick={() => change(id)}>
          <span>0{i + 1}</span>
          {tr(name)}
        </button>)}
        <p>
          {t('Panduan ini mengikut paparan EQUILAB semasa. Nombor pada gambar sepadan dengan langkah penerangan.', 'This guide follows the current EQUILAB interface. Image numbers match the written steps.')}
        </p>
      </aside>
 <section ref={content} tabIndex="-1" className="guide-content" aria-labelledby="guide-section-title"><span className="eyebrow">
          {t('PANDUAN EQUILAB', 'EQUILAB GUIDE')}
        </span><h2 id="guide-section-title">
          {tr(title)}
        </h2>
 {section === 'start' && <>
  <p className="guide-lead">
            {t('EQUILAB membantu pelajar SKU3073 meneroka keseimbangan asid–bes melalui nota, visualisasi, eksperimen dan semakan kefahaman. Pilih laluan mengikut perkara yang anda mahu fahami.', 'EQUILAB helps SKU3073 students explore acid–base equilibrium through notes, visualizations, experiments and knowledge checks. Choose a path based on what you want to understand.')}
          </p>
  <div className="guide-facts">
            <div>
              <b>06</b>
              <span>
                {t('Modul pembelajaran', 'Learning modules')}
              </span>
            </div>
            <div>
              <b>05</b>
              <span>
                {t('Makmal interaktif', 'Interactive labs')}
              </span>
            </div>
            <div>
              <b>MS / EN</b>
              <span>
                {t('Dua bahasa', 'Two languages')}
              </span>
            </div>
          </div>
  <h3>
            {t('Cadangan aliran belajar', 'Suggested learning flow')}
          </h3><Steps items={[t('Baca hasil pembelajaran dan nota untuk membina idea awal.', 'Read learning outcomes and notes to build your initial understanding.'), t('Ramalkan hasil, cuba simulasi dan perhatikan perubahan.', 'Predict an outcome, try the simulation and observe the changes.'), t('Jelaskan pemerhatian menggunakan konsep, kemudian jawab kuiz.', 'Explain observations using the concepts, then complete a quiz.'), t('Semak kemajuan dan kembali ke bahagian yang masih mengelirukan.', 'Review progress and revisit anything that is still unclear.')]} />
  <div className="guide-action-grid">
            {[['modules', BookOpen, t('Belajar melalui nota', 'Learn from notes')], ['labs', FlaskConical, t('Lihat tutorial makmal', 'View lab tutorials')]].map(([id, Icon, label]) => <button className="guide-action-card" key={id} onClick={() => change(id)}>
              <Icon size={25} />
              <b>
                {label}
              </b>
              <ArrowRight size={18} />
            </button>)}
          </div>
  <div className="guide-tip">
            <b>
              {t('Boleh mula sebagai tetamu', 'You can start as a guest')}
            </b>
            <p>
              {t('Modul, makmal dan kuiz boleh digunakan tanpa log masuk. Akaun diperlukan untuk penyimpanan online dan kelas apabila perkhidmatan itu diaktifkan.', 'Modules, labs and quizzes can be used without signing in. Accounts support online saving and classes when those services are enabled.')}
            </p>
          </div>
 </>}
 {section === 'modules' && <>
  <p className="guide-lead">
            {t('Setiap modul mempunyai tiga bahagian nota dan satu kuiz. Eksperimen penuh berada di halaman Makmal; mini simulasi dalam nota membantu anda meneroka konsep ketika membaca.', 'Each module has three note sections and one quiz. Full experiments are on the Lab page; note mini simulations let you explore concepts as you read.')}
          </p><Steps items={noteSteps} />
  <div className="guide-tip">
            <b>
              {t('Apa yang menyimpan kemajuan?', 'What saves progress?')}
            </b>
            <p>
              {t('Butang “Saya faham · Teruskan” menandakan bahagian nota selesai. Pada soalan terakhir kuiz, tekan “Simpan & lihat keputusan”. Membuka nota, menggerakkan pelaras atau menjawab latihan mini sahaja tidak menyiapkan langkah modul.', '“Understood · Continue” marks a note section complete. At the final quiz question, press “Save & view results”. Opening notes, moving sliders or completing mini practice alone does not complete a module step.')}
            </p>
          </div>
  <h3>
            {t('Peta enam modul', 'The six-module map')}
          </h3><div className="guide-module-list">
            {modules.map((m, i) => <article key={m.id}>
              <span className="guide-module-number">0{i + 1}</span>
              <div>
                <h4>
                  {tr(m.title)}
                </h4>
                <p>
                  {tr(m.subtitle)}
                </p>
                <details>
                  <summary>
                    {t('Lihat subtopik dan hasil pembelajaran', 'View topics and learning outcomes')}
                  </summary>
                  <ul>
                    {tr(m.objectives).map(o => <li key={o}>
                      {o}
                    </li>)}
                  </ul>
                  <ul>
                    {topics.filter(x => x.module === m.id).map(x => <li key={x.id}>
                      {tr(x.title)}
                    </li>)}
                  </ul>
                </details>
              </div>
              <button className="secondary" onClick={() => nav('learn/' + m.id)}>
                {t('Buka modul', 'Open module')}
                <ArrowRight size={16} />
              </button>
            </article>)}
          </div>
  <p>
            {t('Kad video muncul selepas penerangan pada bahagian nota yang berkaitan. Tekan “Tonton di YouTube” untuk membuka tab baharu. Video lain berada dalam panel yang boleh dibuka.', 'Video cards follow the explanation in the relevant note section. Press “Watch on YouTube” to open a new tab. Other videos are in an expandable panel.')}
          </p><button className="secondary" onClick={() => change('videos')}>
            {t('Lihat semua video modul', 'View all module videos')}
            <ArrowRight size={16} />
          </button>
 </>}
 {section === 'videos' && <>
  <p className="guide-lead">
            {t('Pilih modul untuk melihat video penerangan dan sumbernya. Setiap modul bermula dengan satu video utama serta satu video tambahan; pautan pilihan pengurus modul boleh menggantikan video utama.', 'Choose a module to see its explanation videos and sources. Each module starts with one main video and one additional video; a module owner’s link can replace the main video.')}
          </p>
  <div className="video-guide-summary">
            <p>
              {t('Baca nota → tonton jika perlu → cuba mini simulasi → jelaskan pemerhatian. Menonton video ialah pilihan dan tidak menambah atau menghalang kemajuan modul.', 'Read the notes → watch if useful → try the mini simulation → explain your observation. Watching is optional and neither adds to nor blocks module progress.')}
            </p>
          </div>
  <ol className="video-guide-points">
            <li>
              {t('Baca “Fokus semasa menonton” pada kad video. Catat satu idea yang menjawab soalan itu.', 'Read “Focus while watching” on the video card. Note one idea that answers that question.')}
            </li>
            <li>
              {t('Tekan “Tonton di YouTube”. Video dibuka dalam tab baharu; kembali ke tab EQUILAB selepas menonton.', 'Press “Watch on YouTube”. The video opens in a new tab; return to the EQUILAB tab afterwards.')}
            </li>
            <li>
              {t('Gunakan “Buka nota berkaitan” di bawah untuk terus ke bahagian nota yang sesuai.', 'Use “Open related notes” below to jump to the relevant note section.')}
            </li>
          </ol>
  <p>
            {t('Video asal menggunakan Bahasa Inggeris. Tajuk, ringkasan dan soalan panduan EQUILAB disediakan dalam BM/English. Contoh angka dalam video boleh berbeza daripada nilai simulasi.', 'Original videos use English. EQUILAB titles, summaries and guiding questions are provided in Malay/English. Numerical examples in the videos may differ from simulation values.')}
          </p>
  <VideoReferenceList modules={modules} lang={lang} nav={nav} />
  <p className="guide-reference-date">
            {t('Pemetaan topik dan sumber video disemak pada 16 Oktober 2026 berdasarkan penerangan dan transkrip yang tersedia.', 'Topic and source mapping checked on 16 October 2026 using available descriptions and transcripts.')}
          </p>
 </>}
 {section === 'labs' && <>
  <p className="guide-lead">
            {t('Pilih tutorial di bawah. Gambar ialah paparan sebenar makmal dalam mod tetamu, selepas langkah contoh dilaksanakan. Tekan gambar untuk membesarkannya.', 'Choose a tutorial below. Images show the actual lab in guest mode after the example steps. Press an image to enlarge it.')}
          </p>
  <div className="guide-lab-picker" role="group" aria-label={t('Pilih tutorial makmal', 'Choose a lab tutorial')}>
            {labTutorials.map(item => <button key={item.id} aria-pressed={lab === item.id} onClick={() => setLab(item.id)}>
              {tr(item.title)}
            </button>)}
          </div>
  <article className="guide-lab-tutorial"><div className="guide-tutorial-heading">
              <div>
                <span className="eyebrow">
                  {t('TUTORIAL BERGAMBAR', 'ILLUSTRATED TUTORIAL')}
                </span>
                <h3>
                  {tr(current.title)}
                </h3>
                <p>
                  {tr(current.aim)}
                </p>
              </div>
              <button className="primary" onClick={() => nav('lab/' + current.id)}>
                {t('Cuba makmal ini', 'Try this lab')}
                <ArrowRight size={16} />
              </button>
            </div>
   <TutorialImage name={current.id} lang={lang} alt={tr(current.title) + t(': kawalan, tindakan radas, bacaan dan penerangan bernombor', ': numbered controls, apparatus actions, readings and explanation')} caption={t('1 Pilih kawalan · 2 Lakukan tindakan · 3 Baca hasil · 4 Jelaskan pemerhatian.', '1 Choose controls · 2 Perform an action · 3 Read the result · 4 Explain the observation.')} />
   <Steps items={current.steps.map(tr)} /><div className="guide-key-idea">
              <CheckCircle2 size={22} />
              <div>
                <b>
                  {t('Konsep yang perlu difahami', 'The idea to understand')}
                </b>
                <p>
                  {tr(current.observe)}
                </p>
              </div>
            </div><p>
              {tr(current.extra)}
            </p><details className="guide-model">
              <summary>
                {t('Andaian model untuk tutorial ini', 'Model assumptions for this tutorial')}
              </summary>
              <p>
                {tr(current.scope)}
              </p>
            </details>
  </article>
  <details className="guide-supplement">
            <summary>
              {t('Cara melengkapkan aktiviti berpandu', 'Completing a guided activity')}
            </summary>
            <TutorialImage name="guided" lang={lang} alt={t('Aktiviti berpandu dengan ramalan, perbandingan dan penjelasan', 'Guided activity with prediction, comparison and explanation')} caption={t('Buka bingkai Aktiviti berpandu di atas ruang eksperimen. Pilih ramalan sebelum menjalankan perbandingan.', 'Open the Guided activity frame above the workbench. Choose a prediction before running the comparison.')} />
            <Steps items={[t('Buka Aktiviti berpandu dan pilih aktiviti jika ada lebih daripada satu. Baca keadaan awal.', 'Open Guided activity and choose an activity if more than one is available. Read the starting conditions.'), t('Pilih ramalan, kemudian tekan “Jalankan perbandingan”. Ramalan salah juga membantu anda menguji idea.', 'Choose a prediction, then press “Run comparison”. An incorrect prediction can still help you test your ideas.'), t('Bandingkan bacaan, pilih sebab yang paling sesuai dan tekan “Semak penjelasan”. Anda boleh membetulkan sebab yang salah.', 'Compare the readings, choose the best reason and press “Check explanation”. You can correct an incorrect reason.'), t('Selepas status Selesai, tutup panduan dan teroka radas. Rekod perbandingan berpandu kekal; kawalan bebas boleh diubah secara berasingan.', 'Once the status is Complete, close the guide and explore the apparatus. The guided comparison record stays fixed; free controls can change independently.')]} />
            <p>
              {t('Aktiviti berpandu dan penerokaan makmal bukan markah kuiz. Gunakan kuiz modul untuk merekodkan semakan kefahaman.', 'Guided activities and lab exploration are not quiz scores. Use module quizzes to record your knowledge checks.')}
            </p>
          </details>
  <details className="guide-supplement">
            <summary>
              {t('Menggunakan makmal pada telefon', 'Using labs on a phone')}
            </summary>
            <div className="guide-mobile-example">
              <TutorialImage name="mobile" lang={lang} alt={t('Paparan telefon: kawalan penimbal dengan bacaan langsung', 'Phone view: buffer controls with live readings')} caption={t('Bacaan kekal tersedia semasa anda mengubah kawalan.', 'Readings remain available while you change the controls.')} />
              <Steps items={[t('Pilih makmal. Tekan “Kawalan eksperimen” untuk memilih bahan atau dos.', 'Choose a lab. Press “Experiment controls” to select species or a dose.'), t('Perhatikan bacaan di atas kawalan selepas setiap tindakan.', 'Watch the readings above the controls after each action.'), t('Tekan “Radas & penerangan” untuk melihat simulasi dan sebab perubahan. Nilai eksperimen yang sama dikekalkan.', 'Press “Apparatus & explanation” to view the simulation and the reason for changes. The same experiment values are retained.')]} />
            </div>
          </details>
 </>}
 {section === 'quiz' && <>
  <p className="guide-lead">
            {t('Kuiz memberi maklum balas segera dan menyimpan keputusan selepas sesi diselesaikan. Kuiz pada halaman Kuiz merangkumi 15 soalan rawak daripada enam modul; kuiz modul mengikut topik modul berkenaan.', 'Quizzes give immediate feedback and save the result when a session is completed. The Quiz page draws 15 random questions across the six modules; module quizzes focus on their own topics.')}
          </p>
  <Steps items={[t('Tekan “Mulakan kuiz”. Baca soalan dan pilih satu jawapan.', 'Press “Start quiz”. Read the question and choose one answer.'), t('Tekan “Semak jawapan”. Baca penerangan walaupun jawapan anda betul.', 'Press “Check answer”. Read the explanation even when your answer is correct.'), t('Tekan “Soalan seterusnya”. Pada soalan terakhir, tekan “Simpan & lihat keputusan”.', 'Press “Next question”. At the last question, press “Save & view results”.'), t('Semak peratus dan bilangan jawapan betul. Buka semakan soalan atau tekan “Cuba semula” untuk sesi baharu.', 'Review the percentage and correct-answer count. Open the question review or press “Try again” for a new session.')]} />
  <div className="guide-tip">
            <b>
              {t('Bezakan latihan dengan kuiz', 'Distinguish practice from quizzes')}
            </b>
            <p>
              {t('Latihan nombor, mini simulasi dan ramalan makmal ialah pengukuhan. Keputusan kuiz sahaja direkod sebagai markah. Percubaan baharu boleh dibuat tanpa had.', 'Numerical practice, mini simulations and lab predictions are reinforcement. Only quiz results are recorded as scores. You can make unlimited new attempts.')}
            </p>
          </div><button className="primary" onClick={() => nav('quiz')}>
            {t('Buka kuiz', 'Open quiz')}
            <ArrowRight size={16} />
          </button>
 </>}
 {section === 'progress' && <>
  <h3>
            {t('Memahami kemajuan', 'Understanding progress')}
          </h3><p>
            {t('Empat langkah bagi setiap modul = tiga bahagian nota + satu kuiz. Setiap langkah menyumbang 25% pada kad modul. Enam modul mempunyai 24 langkah keseluruhan.', 'Four steps per module = three note sections plus one quiz. Each step contributes 25% to its module card. The six modules have 24 steps overall.')}
          </p><Steps items={[t('Pada halaman Kemajuan, lihat peratus siap dan modul yang dicadangkan untuk disambung.', 'On Progress, view the completion percentage and suggested module to continue.'), t('Semak sejarah kuiz: tarikh, modul, peratus markah dan bilangan jawapan betul.', 'Review quiz history: date, module, score percentage and correct-answer count.'), t('Kembali ke nota untuk memperbaiki kefahaman. Anda boleh mengulang kaji walaupun modul sudah selesai.', 'Return to the notes to improve understanding. You can review even after completing a module.')]} />
  <div className="guide-account-grid">
            <article>
              <h3>
                {t('Sebagai tetamu', 'As a guest')}
              </h3>
              <p>
                {t('Rekod disimpan dalam pelayar pada peranti ini. Gunakan pelayar yang sama untuk menyambung. Memadam data pelayar atau menggunakan sesi peribadi boleh menyebabkan rekod tidak kekal.', 'Records are stored in this device’s browser. Use the same browser to continue. Clearing browser data or using a private session may prevent records from persisting.')}
              </p>
            </article>
            <article>
              <h3>
                {t('Dengan akaun online', 'With an online account')}
              </h3>
              <p>
                {t('Apabila perkhidmatan akaun diaktifkan, log masuk untuk menyimpan rekod mengikut pengguna dan mengakses kelas. Rekod tetamu tidak digabungkan secara automatik ke akaun.', 'When accounts are enabled, sign in to save per-user records and access classes. Guest records are not automatically merged into your account.')}
              </p>
            </article>
          </div>
  <h3>
            {t('Daftar atau log masuk', 'Register or sign in')}
          </h3><p>
            {t('Tekan “Log masuk” di bahagian atas. Jika daftar, masukkan nama, e-mel dan kata laluan, kemudian ikut arahan pengesahan e-mel. Gunakan pilihan pemulihan kata laluan jika perlu.', 'Press “Sign in” at the top. When registering, enter your name, email and password, then follow the email-confirmation instructions. Use password recovery if needed.')}
          </p><p className="guide-service-state">
            {cloud ? t('Perkhidmatan akaun dikonfigurasi pada versi ini.', 'Account services are configured on this version.') : t('Versi ini sedang menggunakan akses tetamu; perkhidmatan akaun online belum diaktifkan.', 'This version currently offers guest access; online account services are not enabled.')}
          </p><button className="primary" onClick={() => nav('dashboard')}>
            {t('Lihat kemajuan saya', 'View my progress')}
            <ArrowRight size={16} />
          </button>
 </>}
 {section === 'classes' && <>
  <p className="guide-lead">
            {t('Ruang kelas menghubungkan pembelajaran pelajar dengan pemantauan pensyarah. Ia memerlukan perkhidmatan akaun online dan akaun yang mempunyai peranan sesuai.', 'Classes connect student learning with instructor monitoring. They require online account services and an account with the appropriate role.')}
          </p>
  <div className="guide-account-grid">
            <article>
              <h3>
                {t('Untuk pelajar', 'For students')}
              </h3>
              <Steps items={[t('Log masuk menggunakan akaun pelajar. Buka halaman Kelas.', 'Sign in with your student account. Open Classes.'), t('Dapatkan kod kelas daripada pensyarah, masukkan kod dan tekan “Sertai”.', 'Obtain the class code from your instructor, enter it and press “Join”.'), t('Selepas berjaya, teruskan modul dan kuiz ketika log masuk. Pensyarah kelas boleh melihat nama serta rekod pembelajaran anda.', 'After joining, continue modules and quizzes while signed in. Your class instructor can view your name and learning records.')]} />
            </article>
            <article>
              <h3>
                {t('Untuk pensyarah', 'For instructors')}
              </h3>
              <Steps items={[t('Gunakan akaun yang telah diberikan peranan pensyarah oleh pentadbir. Buka ruang Pensyarah/Kelas.', 'Use an account assigned the instructor role by an administrator. Open the Instructor/Classes space.'), t('Masukkan nama kelas dan tekan “Cipta”. Kongsikan kod penyertaan dengan pelajar.', 'Enter the class name and press “Create”. Share the join code with students.'), t('Pilih “Lihat kemajuan” untuk membaca langkah siap, skor terbaik dan bilangan percubaan. Gunakan “Eksport CSV” apabila laporan tersedia.', 'Select “View progress” to review completed steps, best score and attempt count. Use “Export CSV” when a report is available.')]} />
            </article>
          </div>
  <div className="guide-tip">
            <b>
              {t('Jika kelas belum tersedia', 'If classes are unavailable')}
            </b>
            <p>
              {t('Gunakan modul dan makmal sebagai tetamu dahulu. Pengaktifan perkhidmatan online dan peranan pensyarah diurus oleh pentadbir; pendaftaran biasa menghasilkan akaun pelajar.', 'Use modules and labs as a guest first. Online services and instructor roles are managed by an administrator; normal registration creates a student account.')}
            </p>
          </div><button className="primary" onClick={() => nav('classroom')}>
            {t('Buka ruang kelas', 'Open classes')}
            <ArrowRight size={16} />
          </button>
 </>}
 {section === 'help' && <>
  {[[t('Laptop termati. Bagaimana buka semula projek?', 'My laptop shut down. How do I restart the project?'), <>
            <p>
              {t('Buka folder projek yang mempunyai package.json dalam VS Code. Dalam terminal, jalankan arahan ini; tidak perlu memasang semula ZIP setiap kali.', 'Open the project folder containing package.json in VS Code. Run this command in the terminal; you do not need to reinstall the ZIP each time.')}
            </p>
            <pre>
              <code>npm.cmd run dev</code>
            </pre>
            <p>
              {t('Buka alamat Local yang dipaparkan, termasuk /Equilab/. Terminal mesti terus berjalan.', 'Open the displayed Local URL, including /Equilab/. Keep the terminal running.')}
            </p>
          </>], [t('Chrome tidak membuka localhost.', 'Chrome cannot open localhost.'), <p>
            {t('Pastikan pelayan dalam terminal masih berjalan. Gunakan alamat Local sebenar, kerana port mungkin bukan 5173. Untuk akses melalui pautan online, gunakan pautan yang diberikan pensyarah.', 'Ensure the terminal server is still running. Use the actual Local URL, as the port may not be 5173. For online access, use your instructor’s provided link.')}
          </p>], [t('Terminal menyatakan vite tidak dikenali.', 'The terminal says vite is not recognized.'), <>
            <p>
              {t('Dalam folder yang sama dengan package.json, pasang dependency, kemudian jalankan semula pelayan.', 'In the folder containing package.json, install dependencies and restart the server.')}
            </p>
            <pre>
              <code>
                {'npm.cmd install\nnpm.cmd run dev'}
              </code>
            </pre>
          </>], [t('Paparan lama masih muncul.', 'The old interface is still displayed.'), <p>
            {t('Pastikan tab menggunakan alamat projek yang betul. Tekan Ctrl+Shift+R. Jika ada beberapa terminal pelayan, hentikan pelayan yang tidak digunakan dengan Ctrl+C.', 'Ensure the tab uses the correct project URL. Press Ctrl+Shift+R. If several servers are running, stop unused ones with Ctrl+C.')}
          </p>], [t('Mengapa butang perbandingan berpandu belum boleh ditekan?', 'Why is the guided comparison button disabled?'), <p>
            {t('Pilih ramalan dahulu. Selepas menjalankan perbandingan, pilih sebab sebelum menekan Semak penjelasan. Butang yang memerlukan langkah awal akan diaktifkan selepas langkah itu selesai.', 'Choose a prediction first. After running the comparison, choose a reason before pressing Check explanation. Buttons unlock when their prerequisite step is completed.')}
          </p>], [t('Adakah warna dan bilangan zarah tepat?', 'Are the colours and particle counts exact?'), <p>
            {t('Radas, warna dan sampel zarah ialah ilustrasi. Sampel kecil dibundarkan; rujuk bacaan berangka untuk nilai tepat model. Buka Andaian model untuk mengetahui skop pengiraan.', 'Apparatus, colours and particle samples are illustrative. Small samples are rounded; use the numerical readings for exact model values. Open Model assumptions to understand the calculation scope.')}
          </p>], [t('Mengapa kemajuan belum berubah?', 'Why has my progress not changed?'), <p>
            {t('Tandakan nota melalui Saya faham · Teruskan dan simpan keputusan pada akhir kuiz. Makmal dan latihan mini tidak menambah langkah modul. Jika muncul mesej belum disegerakkan, gunakan pilihan cuba segerak semula.', 'Mark notes with Understood · Continue and save results at the end of a quiz. Labs and mini practice do not add module steps. If a sync warning appears, use the retry-sync option.')}
          </p>], [t('Mengapa gambar atau animasi tidak bergerak?', 'Why is an image or animation not moving?'), <p>
            {t('Pastikan masa model dinamik telah dimulakan atau pengacau dihidupkan. Tetapan pengurangan animasi pada peranti boleh menghentikan gerakan visual; bacaan dan kawalan tetap boleh digunakan.', 'Ensure dynamic model time has started or the stirrer is on. Your device’s reduced-motion setting can stop visual movement; readings and controls remain usable.')}
          </p>], [t('Bagaimana menggunakan video YouTube?', 'How do I use the YouTube videos?'), <p>
            {t('Tekan butang Tonton di YouTube pada kad video. Internet diperlukan untuk menonton. Jika video tidak tersedia, teruskan nota dan mini simulasi; maklumkan kepada pengurus modul supaya pautan dapat diganti. Imej ilustrasi topik digunakan jika pratonton video tidak dapat dimuatkan.', 'Press Watch on YouTube on a video card. Watching requires internet access. If a video is unavailable, continue the notes and mini simulations; tell the module owner so the link can be replaced. A topic illustration appears if the video preview cannot load.')}
          </p>]].map(([q, a]) => <details className="guide-faq" key={q}>
            <summary>
              {q}
            </summary>
            {a}
          </details>)}
 </>}
 {section === 'references' && <>
  <p className="guide-lead">
            {t('Gunakan rujukan mengikut topik yang sedang dipelajari. Pautan membuka sumber asal dalam tab baharu. Tutorial dan gambar makmal di sini disediakan daripada EQUILAB sendiri.', 'Use the references for the topic you are studying. Links open original sources in a new tab. The tutorials and lab images here come from EQUILAB itself.')}
          </p>
  <h3>
            {t('Rujukan buku — format APA 7', 'Book reference — APA 7 format')}
          </h3><div className="guide-citation">
            <p>Flowers, P., Theopold, K., Langley, R., &amp; Robinson, W. R. (2019). <em>Chemistry 2e</em>. OpenStax.</p>
            <a href="https://openstax.org/books/chemistry-2e/pages/1-introduction" target="_blank" rel="noopener noreferrer">https://openstax.org/books/chemistry-2e/pages/1-introduction <ArrowRight size={16} /></a>
          </div>
  <h3>
            {t('Sumber video pembelajaran', 'Learning video sources')}
          </h3><p>
            {t('Senarai video mengikut modul menyertakan tajuk asal, saluran dan pautan sumber. Ringkasan BM/English ialah panduan EQUILAB; bahasa audio video kekal seperti sumber asal.', 'The module video list includes original titles, channels and source links. Malay/English summaries are EQUILAB guidance; video audio remains in the original source language.')}
          </p><button className="secondary" onClick={() => change('videos')}>
            {t('Buka senarai sumber video', 'Open video source list')}
            <ArrowRight size={16} />
          </button>
  <h3>
            {t('Pemetaan rujukan kepada modul', 'References mapped to modules')}
          </h3><div className="guide-reference-map">
            {modules.map(m => <article key={m.id}>
              <h4>
                {tr(m.title)}
              </h4>
              <ul>
                {referenceMap[m.id].map(id => {
                  const r = learningReferences.find(x => x.id === id);
                  return <li key={id}>
                  <a href={r.url} target="_blank" rel="noopener noreferrer">{r.section} · {r.title}<ArrowRight size={14} /></a>
                </li>;
                })}
              </ul>
            </article>)}
          </div>
  <h3>
            {t('Senarai bahagian untuk bacaan lanjut', 'Sections for further reading')}
          </h3><ol className="guide-source-list">
            {learningReferences.map(r => <li key={r.id}>
              <a href={r.url} target="_blank" rel="noopener noreferrer">OpenStax · {r.section} · {r.title}</a>
            </li>)}
          </ol>
  <div className="guide-tip">
            <b>
              {t('Nota kursus SKU3073', 'SKU3073 course notes')}
            </b>
            <p>
              {t('Subtopik nota mempunyai label sumber SKU A atau SKU B serta nombor halaman. Label itu merujuk bahan kursus keseimbangan kimia dan keseimbangan asid–bes; gunakan nota asal yang dibekalkan pensyarah bersama bacaan OpenStax.', 'Note topics include SKU A or SKU B source labels and page numbers. These refer to the course materials on chemical equilibrium and acid–base equilibrium; use your instructor’s original notes alongside the OpenStax readings.')}
            </p>
          </div><p className="guide-reference-date">
            {t('Pautan rujukan disemak pada 14 Oktober 2026.', 'Reference links checked on 14 October 2026.')}
          </p>
 </>}
 <button className="guide-top-link" onClick={() => document.querySelector('.guide-page-top').scrollIntoView({
          block: 'start',
          behavior: 'auto'
        })}>{t('Kembali ke atas panduan', 'Back to the top of the guide')} ↑</button>
 </section></div></div>;
}
