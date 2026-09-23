// Vercel Serverless: نشر بيانات الموقع للجميع بدون ما الادمن يدخل توكن كل مرة.
// التوكن ينحفظ مرة وحدة في Vercel Dashboard > Settings > Environment Variables > GITHUB_TOKEN
// الادمن فقط يدخل PIN (نفس PIN لوحة الادمن) ويضغط نشر.

const OWNER = 'U9955';
const REPO = 'tiger-team-official';
const BRANCH = 'main';
const FILE = 'site-data.json';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
  if (!GITHUB_TOKEN) {
    return res.status(500).json({
      error: 'NOT_CONFIGURED',
      message: 'GITHUB_TOKEN ما مضاف بالسيرفر. ضيفه من Vercel Dashboard.'
    });
  }

  let body = req.body;
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch { body = {}; }
  }
  const { data, pin } = body || {};
  if (!data || (!data.programs && !data.links && !data.profile)) {
    return res.status(400).json({ error: 'بيانات ناقصة' });
  }

  const apiUrl = `https://api.github.com/repos/${OWNER}/${REPO}/contents/${FILE}`;
  const headers = {
    'Authorization': `Bearer ${GITHUB_TOKEN}`,
    'Accept': 'application/vnd.github+json',
    'Content-Type': 'application/json'
  };

  try {
    // 1) اقرأ الملف الحالي حتى تجيب sha + تتأكد من PIN
    const getRes = await fetch(apiUrl + `?ref=${BRANCH}`, { headers });
    if (!getRes.ok) {
      const t = await getRes.text();
      return res.status(502).json({ error: `فشل قراءة GitHub (${getRes.status}): ` + t.slice(0, 200) });
    }
    const current = await getRes.json();
    let currentPin = '';
    try {
      const decoded = Buffer.from(current.content, 'base64').toString('utf8');
      currentPin = (JSON.parse(decoded).profile || {}).pin || '';
    } catch {}

    // اذا اكو PIN محفوظ، لازم الادمن يدزه صح
    if (currentPin && pin !== currentPin) {
      return res.status(401).json({ error: 'PIN غلط! ما تكدر تنشر.' });
    }

    // 2) انشر المحتوى الجديد
    const content = JSON.stringify(data, null, 2);
    const base64 = Buffer.from(content, 'utf8').toString('base64');

    const putRes = await fetch(apiUrl, {
      method: 'PUT',
      headers,
      body: JSON.stringify({
        message: 'Update site data from admin panel 🌍',
        content: base64,
        sha: current.sha,
        branch: BRANCH
      })
    });

    if (!putRes.ok) {
      const t = await putRes.text();
      return res.status(502).json({ error: `فشل النشر (${putRes.status}): ` + t.slice(0, 300) });
    }

    return res.status(200).json({ ok: true, message: 'Published' });
  } catch (e) {
    return res.status(500).json({ error: e.message || 'Server error' });
  }
}
