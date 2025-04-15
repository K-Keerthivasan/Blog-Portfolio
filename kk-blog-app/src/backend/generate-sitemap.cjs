const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const { SitemapStream, streamToPromise } = require('sitemap');
const { createWriteStream } = require('fs');
const path = require('path');
const serviceAccount = require('./firebase-service-account.json'); // ✅ works in CommonJS

// Initialize Firebase Admin
initializeApp({
    credential: cert(serviceAccount)
});

const db = getFirestore();
const hostname = 'https://blog.kkvasan.ca'; // <-- no trailing slash here

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
    console.log('✅ Sitemap generated successfully!');
}

generateSitemap().catch(console.error);
