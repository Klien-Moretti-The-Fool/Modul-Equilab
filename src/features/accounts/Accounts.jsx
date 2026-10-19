import { completedNotes } from "../../lib/learningProgress.js";
import PageHeader from "../../components/PageHeader.jsx";
import { useEffect, useState } from "react";
import { cloud, checked } from "../../lib/cloud.js";
export function Account({
  lang,
  user,
  onClose,
  onDemo
}) {
  const t = (a, b) => lang === 'ms' ? a : b;
  const [mode, setMode] = useState('login'),
    [error, setError] = useState(''),
    [message, setMessage] = useState(''),
    [busy, setBusy] = useState(false);
  async function submit(e) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    setError('');
    setMessage('');
    setBusy(true);
    try {
      const email = f.get('email'),
        password = f.get('password');
      if (mode === 'register') {
        await checked(cloud.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: f.get('name')
            },
            emailRedirectTo: window.location.origin + import.meta.env.BASE_URL
          }
        }));
        setMessage(t('Semak e-mel untuk pengesahan akaun, kemudian log masuk.', 'Check your email to confirm your account, then sign in.'));
      } else if (mode === 'reset') {
        await checked(cloud.auth.resetPasswordForEmail(email, {
          redirectTo: window.location.origin + import.meta.env.BASE_URL
        }));
        setMessage(t('Jika alamat berdaftar, pautan pemulihan akan dihantar.', 'If registered, a recovery link will be sent.'));
      } else {
        await checked(cloud.auth.signInWithPassword({
          email,
          password
        }));
        onClose();
      }
    } catch (e) {
      setError(e.message);
    } finally {
      setBusy(false);
    }
  }
  return <div className="modal-backdrop" onClick={onClose}>
    <section className="modal" role="dialog" aria-modal="true" aria-labelledby="account-title" onClick={e => e.stopPropagation()}><button className="close" aria-label={t('Tutup', 'Close')} onClick={onClose}>×</button><span className="eyebrow">EQUILAB · {t('Akaun', 'Account')}</span><h2 id="account-title">
        {t('Ruang pembelajaran anda', 'Your learning space')}
      </h2>
 {!cloud ? <>
        <div className="callout amber">
          <b>
            {t('Pratonton tanpa akaun', 'Preview without an account')}
          </b>
          <p>
            {t('Sambungan akaun online belum dikonfigurasi. Anda boleh belajar sebagai tetamu; kemajuan disimpan pada pelayar ini sahaja.', 'Online accounts are not configured yet. You can study as a guest; progress is stored only in this browser.')}
          </p>
        </div>
        <button className="primary" onClick={() => {
          onDemo();
          onClose();
        }}>{t('Teruskan sebagai tetamu', 'Continue as guest')} →</button>
      </> : user ? <>
        <p>
          {user.email}
        </p>
        <button className="secondary" onClick={async () => {
          await cloud.auth.signOut();
          onClose();
        }}>
          {t('Log keluar', 'Sign out')}
        </button>
      </> : <>
        <div className="segmented">
          {[['login', 'Log masuk', 'Sign in'], ['register', 'Daftar', 'Register']].map(([id, a, b]) => <button key={id} className={mode === id ? 'active' : ''} onClick={() => {
            setMode(id);
            setError('');
            setMessage('');
          }}>
            {t(a, b)}
          </button>)}
        </div>
        <form onSubmit={submit}>
          {mode === 'register' && <label>
            {t('Nama penuh', 'Full name')}
            <input name="name" autoComplete="name" required maxLength="80" />
          </label>}
          <label>
            {t('E-mel', 'Email')}
            <input type="email" name="email" autoComplete="email" required />
          </label>
          {mode !== 'reset' && <label>
            {t('Kata laluan', 'Password')}
            <input type="password" name="password" autoComplete={mode === 'register' ? 'new-password' : 'current-password'} minLength={8} required />
          </label>}
          <button className="primary" disabled={busy}>
            {busy ? t('Sila tunggu…', 'Please wait…') : mode === 'reset' ? t('Hantar pautan pemulihan', 'Send recovery link') : mode === 'register' ? t('Cipta akaun pelajar', 'Create student account') : t('Log masuk', 'Sign in')}
          </button>
        </form>
        <button className="text-button" onClick={() => setMode('reset')}>
          {t('Lupa kata laluan?', 'Forgot password?')}
        </button>
        <p className="small">
          {t('Akaun pensyarah diaktifkan oleh pentadbir projek.', 'Instructor accounts are enabled by the project administrator.')}
        </p>
      </>}
 {error && <p role="alert" className="error">
        {error}
      </p>}{message && <p role="status" className="success">
        {message}
      </p>}</section>
  </div>;
}
export function PasswordRecovery({
  lang,
  onDone
}) {
  const [error, setError] = useState(''),
    [busy, setBusy] = useState(false);
  return <div className="modal-backdrop">
    <section className="modal">
      <h2>
        {lang === 'ms' ? 'Tetapkan kata laluan baharu' : 'Set a new password'}
      </h2>
      <form onSubmit={async e => {
        e.preventDefault();
        const f = new FormData(e.currentTarget);
        if (f.get('password') !== f.get('confirm')) {
          setError(lang === 'ms' ? 'Kata laluan tidak sepadan.' : 'Passwords do not match.');
          return;
        }
        setBusy(true);
        try {
          await checked(cloud.auth.updateUser({
            password: f.get('password')
          }));
          onDone();
        } catch (e) {
          setError(e.message);
        } finally {
          setBusy(false);
        }
      }}>
        <label>
          {lang === 'ms' ? 'Kata laluan baharu' : 'New password'}
          <input name="password" type="password" minLength={8} autoComplete="new-password" required />
        </label>
        <label>
          {lang === 'ms' ? 'Ulang kata laluan' : 'Repeat password'}
          <input name="confirm" type="password" minLength={8} autoComplete="new-password" required />
        </label>
        <button className="primary" disabled={busy}>
          {lang === 'ms' ? 'Simpan' : 'Save'}
        </button>
      </form>
      {error && <p className="error">
        {error}
      </p>}
    </section>
  </div>;
}
export function Classroom({
  lang,
  user,
  profile,
  onLogin,
  modules,
  onGuide
}) {
  const t = (a, b) => lang === 'ms' ? a : b;
  const [classes, setClasses] = useState([]),
    [selected, setSelected] = useState(null),
    [rows, setRows] = useState([]),
    [error, setError] = useState(''),
    [busy, setBusy] = useState(false),
    [message, setMessage] = useState('');
  const instructor = profile?.role === 'instructor';
  async function refresh() {
    if (!cloud || !user) return;
    try {
      setClasses(await checked(cloud.from('classes').select('*').order('created_at', {
        ascending: false
      })));
    } catch (e) {
      setError(e.message);
    }
  }
  useEffect(() => {
    setClasses([]);
    setRows([]);
    setSelected(null);
    refresh();
  }, [user?.id, profile?.role]);
  async function submit(e) {
    e.preventDefault();
    setBusy(true);
    setError('');
    setMessage('');
    const f = new FormData(e.currentTarget);
    try {
      if (instructor) {
        await checked(cloud.from('classes').insert({
          name: f.get('name'),
          instructor_id: user.id
        }));
      } else {
        await checked(cloud.rpc('join_class', {
          join_code: f.get('code').trim().toUpperCase()
        }));
        setMessage(t('Berjaya menyertai kelas.', 'Joined class successfully.'));
      }
      await refresh();
    } catch (e) {
      setError(e.message);
    } finally {
      setBusy(false);
    }
  }
  async function openClass(c) {
    setSelected(c);
    setRows([]);
    setError('');
    setBusy(true);
    try {
      setRows(await checked(cloud.rpc('class_report', {
        target_class: c.id
      })));
    } catch (e) {
      setError(e.message);
    } finally {
      setBusy(false);
    }
  }
  function download() {
    const esc = x => '"' + String(x ?? '').replace(/^[=+\-@\t\r]/, "'$&").replaceAll('"', '""') + '"';
    const csv = [['Student', 'Module', 'Completed steps', 'Best score (%)', 'Attempts', 'Updated'], ...rows.map(r => [r.full_name, modules.find(m => m.id === r.module_id)?.title[lang] || r.module_id || '—', completedNotes(r.payload?.steps), r.payload?.best ?? '', r.payload?.attempts?.length || 0, r.updated_at || ''])].map(r => r.map(esc).join(',')).join('\r\n');
    const url = URL.createObjectURL(new Blob(['\ufeff' + csv], {
      type: 'text/csv;charset=utf-8'
    }));
    const a = document.createElement('a');
    a.href = url;
    a.download = 'equilab-class-progress.csv';
    a.click();
    URL.revokeObjectURL(url);
  }
  return <><PageHeader lang={lang} onGuide={onGuide} eyebrow={t('BELAJAR BERSAMA', 'LEARN TOGETHER')} title={instructor ? t('Ruang pensyarah', 'Instructor workspace') : t('Kelas saya', 'My classes')} description={t('Hubungkan pembelajaran kendiri dengan bimbingan pensyarah.', 'Connect independent learning with instructor guidance.')} />
 {!cloud || !user ? <div className="empty-state">
      <span className="empty-icon">⌘</span>
      <h2>
        {t('Pemantauan kelas secara online', 'Online class monitoring')}
      </h2>
      <p>
        {!cloud ? t('Ruang kelas sudah disediakan dalam kod. Konfigurasi akaun dan pangkalan data diperlukan untuk mencipta kelas serta memantau pelajar sebenar.', 'The classroom interface is included. Account and database configuration is required to create classes and monitor real students.') : t('Log masuk untuk menyertai kelas dan menyimpan kemajuan merentas peranti.', 'Sign in to join a class and save progress across devices.')}
      </p>
      <button className="primary" onClick={onLogin}>
        {t('Akaun & akses', 'Account & access')}
      </button>
    </div> : <><div className="panel">
        <h2>
          {instructor ? t('Cipta kelas', 'Create a class') : t('Sertai kelas', 'Join a class')}
        </h2>
        <form className="inline-form" onSubmit={submit}>
          {instructor ? <input aria-label={t('Nama kelas', 'Class name')} name="name" placeholder="SKU3073 · Kumpulan A" maxLength={80} required /> : <input aria-label={t('Kod kelas', 'Class code')} name="code" placeholder={t('Kod daripada pensyarah', 'Code from your instructor')} required maxLength={16} />}
          <button className="primary" disabled={busy}>
            {instructor ? t('Cipta', 'Create') : t('Sertai', 'Join')}
          </button>
        </form>
        {message && <p className="success">
          {message}
        </p>}
      </div>
 <div className="module-grid">
        {classes.map(c => <article className="panel" key={c.id}>
          <span className="eyebrow">SKU3073</span>
          <h3>
            {c.name}
          </h3>
          {instructor && <>
            <p>{t('Kod penyertaan', 'Join code')}: <code>
                {c.code}
              </code></p>
            <button className="secondary" onClick={() => openClass(c)}>{t('Lihat kemajuan', 'View progress')} →</button>
          </>}
          {!instructor && <span className="status">
            {t('Telah menyertai', 'Joined')}
          </span>}
        </article>)}
      </div>{classes.length === 0 && <p>
        {t('Belum ada kelas.', 'No classes yet.')}
      </p>}
 {instructor && selected && <div className="panel">
        <div className="section-header">
          <h2>
            {selected.name}
          </h2>
          <button className="secondary" disabled={!rows.length} onClick={download}>
            {t('Eksport CSV', 'Export CSV')}
          </button>
        </div>
        {busy ? <p>
          {t('Memuatkan…', 'Loading…')}
        </p> : <div className="table-scroll">
          <table>
            <thead>
              <tr>
                {[t('Pelajar', 'Student'), t('Modul', 'Module'), t('Langkah', 'Steps'), t('Skor terbaik', 'Best score'), t('Percubaan', 'Attempts')].map(x => <th key={x}>
                  {x}
                </th>)}
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => <tr key={i}>
                <td>
                  {r.full_name}
                </td>
                <td>
                  {modules.find(m => m.id === r.module_id)?.title[lang] || '—'}
                </td>
                <td>{completedNotes(r.payload?.steps)}/4</td>
                <td>
                  {r.payload?.best == null ? '—' : r.payload.best + '%'}
                </td>
                <td>
                  {r.payload?.attempts?.length || 0}
                </td>
              </tr>)}
            </tbody>
          </table>
          {rows.length === 0 && <p>
            {t('Belum ada pelajar dalam kelas ini.', 'No students in this class yet.')}
          </p>}
        </div>}
        <p className="small">
          {t('Rekod ini untuk pemantauan pembelajaran kendiri, bukan peperiksaan terkawal.', 'These records support self-directed learning, not proctored examinations.')}
        </p>
      </div>}</>}{error && <p role="alert" className="error">
      {error}
    </p>}</>;
}
