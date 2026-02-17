const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const { SitemapStream, streamToPromise } = require('sitemap');
const { createWriteStream, readFileSync } = require('fs');
const path = require('path');

const parseServiceAccount = () => {
    const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT_PATH;

    if (serviceAccountPath) {
        const raw = readFileSync(serviceAccountPath, 'utf-8');
        return JSON.parse(raw);
    }

    const projectId = process.env.FIREBASE_PROJECT_ID;
    const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
    const privateKey = process.env.FIREBASE_PRIVATE_KEY;

    if (!projectId || !clientEmail || !privateKey) {
        throw new Error(
            'Missing Firebase Admin credentials. Set FIREBASE_SERVICE_ACCOUNT_PATH or FIREBASE_PROJECT_ID/FIREBASE_CLIENT_EMAIL/FIREBASE_PRIVATE_KEY.'
        );
    }

    return {
        project_id: projectId,
        client_email: clientEmail,
        private_key: privateKey.replace(/\\n/g, '\n'),
    };
};

initializeApp({
    credential: cert(parseServiceAccount())
});

const db = getFirestore();
const hostname = 'https://blog.kkvasan.ca';

const collections = [
    'editing_collection',
    'game_dev_collection',
    'hacking_collection',
    'visual_effects_collection',
    'web_dev_collection'
];

async function generateSitemap() {
    const sitemap = new SitemapStream({ hostname });
    const writeStream = createWriteStream(path.resolve(__dirname, 'sitemap.xml'));
    sitemap.pipe(writeStream);

    for (const collection of collections) {
        const snapshot = await db.collection(collection).get();

        snapshot.forEach((doc) => {
            const data = doc.data();
            console.log(`[${collection}] slug: ${data.slug}`);

            if (!data.slug) return;

            sitemap.write({
                url: `/blog/${data.slug}`,
                changefreq: 'weekly',
                priority: 0.8,
                lastmod: data.updatedAt?.toDate?.() || new Date()
            });
        });
    }

    sitemap.end();
    await streamToPromise(sitemap);
    console.log('Sitemap generated successfully!');
}

generateSitemap().catch(console.error);
