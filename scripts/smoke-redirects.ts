import { fetch } from 'undici';

type Case = { url: string; expectLocationStartsWith: string };

const cases: Case[] = [
  { url: 'http://searchloscabos.com/', expectLocationStartsWith: 'https://searchwebservices.tech/' },
  { url: 'https://searchloscabos.com/mobile-apps', expectLocationStartsWith: 'https://searchwebservices.tech/' },
  { url: 'http://www.searchloscabos.com/en/services/seo', expectLocationStartsWith: 'https://searchwebservices.tech/' },
  { url: 'http://searchwebservices.tech/en', expectLocationStartsWith: 'https://searchwebservices.tech/en' },
  { url: 'https://www.searchwebservices.tech/es', expectLocationStartsWith: 'https://searchwebservices.tech/es' },
];

(async () => {
  let failed = 0;
  for (const c of cases) {
    try {
      const res = await fetch(c.url, { redirect: 'manual' });
      const loc = res.headers.get('location') || '';
      const ok = res.status >= 300 && res.status < 400 && loc.startsWith(c.expectLocationStartsWith);
      console.log(`${ok ? 'PASS' : 'FAIL'} ${res.status} ${c.url} -> ${loc}`);
      if (!ok) failed++;
    } catch (e) {
      console.log(`ERROR ${c.url}: ${(e as Error).message}`);
      failed++;
    }
  }
  if (failed) {
    console.error(`\n${failed} redirect checks FAILED`);
    process.exit(1);
  } else {
    console.log('\nAll redirect checks passed.');
  }
})(); 