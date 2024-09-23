import { openDB } from 'idb';

import Certificate from '../pages/certifications/Certificate';

const DB_NAME = 'certificates-db';
const STORE_NAME = 'certificates';

async function getDB() {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, {
          keyPath: 'id',
          autoIncrement: true,
        });
        store.createIndex('name', 'name');
      }
    },
  });
}

// Add a certificate
export async function addCertificate(certificate: Certificate): Promise<void> {
  const db = await getDB();
  await db.add(STORE_NAME, certificate);
}

// Fetch all certificates
export async function getAllCertificates(): Promise<Certificate[]> {
  const db = await getDB();
  return db.getAll(STORE_NAME);
}

// Get a specific certificate by id
export async function getCertificate(id: number): Promise<Certificate | undefined> {
  const db = await getDB();
  return db.get(STORE_NAME, id);
}

// Update a certificate
export async function updateCertificate(id: number, certificate: Certificate): Promise<void> {
  const db = await getDB();
  certificate._updatedAt = new Date();
  await db.put(STORE_NAME, { ...certificate, id });
}

// Delete a certificate
export async function deleteCertificate(id: number): Promise<void> {
  const db = await getDB();
  await db.delete(STORE_NAME, id);
}
