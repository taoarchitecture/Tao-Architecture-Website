import { projectDetails } from '../client/src/data/projects';

const API_BASE = 'https://tao-architecture-api.vercel.app/api';
const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkB0YW8uY29tIiwiaWF0IjoxNzg3NzMyNjA5LCJleHAiOjE3ODc4MTkwMDl9.zXFIlBqSXcTRimyq5cnyhWNCkpKQvCZyyeJFoyyU5zg';

async function updateVrindavan() {
  const dbSlug = 'Unveiling Vrindavan: Where Nature and Luxury Embrace in Architectural Splendor';
  const localSlugKey = 'vrindavan';
  
  const res = await fetch(`${API_BASE}/projects/slug/${encodeURIComponent(dbSlug)}`);
  if (!res.ok) {
    console.error(`Failed to get project: ${res.status}`);
    return;
  }
  const project = await res.json();
  const id = project.id;
  
  const details = projectDetails[localSlugKey as keyof typeof projectDetails];
  
  const galleryJson = JSON.stringify(
    details.gallery.map((g: any) => ({ url: g.src, caption: g.title || '' }))
  );

  const putRes = await fetch(`${API_BASE}/projects/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${TOKEN}`
    },
    body: JSON.stringify({ gallery: galleryJson, slug: 'vrindavan' }) // Also fix the slug!
  });

  if (putRes.ok) {
    console.log(`Successfully patched API for vrindavan`);
  } else {
    console.error(`Failed to patch API for vrindavan: ${putRes.status} ${await putRes.text()}`);
  }
}

updateVrindavan();
