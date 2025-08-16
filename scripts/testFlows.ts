/*
  Simple E2E API exercise against local Next server
  Run: npx ts-node scripts/testFlows.ts (or ts-node/register via tsconfig)
*/
import fetch from 'node-fetch';

const BASE = 'http://localhost:3000';
const USER_ID = '550e8400-e29b-41d4-a716-446655440001';

async function createCancellation(variant: 'A' | 'B') {
  const res = await fetch(`${BASE}/api/cancellations`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user_id: USER_ID, downsell_variant: variant })
  });
  const json = await res.json() as { error?: string; cancellation: { id: string } };
  if (!res.ok) throw new Error(`POST /cancellations ${res.status}: ${json?.error}`);
  return json.cancellation;
}

async function updateCancellation(id: string, updates: Record<string, unknown>) {
  const res = await fetch(`${BASE}/api/cancellations`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, ...updates })
  });
  const json = await res.json() as { error?: string; cancellation: Record<string, unknown> };
  if (!res.ok) throw new Error(`PATCH /cancellations ${res.status}: ${json?.error}`);
  return json.cancellation;
}

async function runVariantA() {
  console.log('\n--- Variant A (no downsell)');
  const { id } = await createCancellation('A');
  console.log('Created cancellation:', id);
  await updateCancellation(id, {
    roles_applied: 3,
    companies_emailed: 2,
    companies_interviewed: 1,
    found_job_with_migrate_mate: true
  });
  console.log('Updated survey + found_job');
  await updateCancellation(id, { feedback: 'Great tool, would love faster matching.' });
  console.log('Updated feedback');
  await updateCancellation(id, { has_immigration_lawyer: true, visa_type: 'H1B' });
  console.log('Updated visa');
}

async function runVariantBAccept() {
  console.log('\n--- Variant B (downsell accepted)');
  const { id } = await createCancellation('B');
  console.log('Created cancellation:', id);
  await updateCancellation(id, { accepted_downsell: true });
  console.log('Marked accepted_downsell = true');
}

async function runVariantBDecline() {
  console.log('\n--- Variant B (downsell declined -> reason)');
  const { id } = await createCancellation('B');
  console.log('Created cancellation:', id);
  await updateCancellation(id, { roles_applied: 0, companies_emailed: 0, companies_interviewed: 0 });
  console.log('Updated survey');
  await updateCancellation(id, { reason: 'Too expensive', feedback: '20' });
  console.log('Updated reason + follow-up');
}

(async () => {
  try {
    await runVariantA();
    await runVariantBAccept();
    await runVariantBDecline();
    console.log('\nAll API checks passed.');
  } catch (e) {
    console.error('Test failed:', e);
    process.exit(1);
  }
})();
