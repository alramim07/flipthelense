import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, '../../data');
const STORE_FILE = path.join(DATA_DIR, 'local_db.json');

// Ensure data folder exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initial default state
const initialData = {
  analytics: [
    {
      id: 'hit_sample_1',
      path: '/',
      referrer: 'https://google.com',
      device: 'Desktop',
      timestamp: new Date(Date.now() - 3600000 * 2).toISOString(),
      userAgent: 'Mozilla/5.0'
    },
    {
      id: 'hit_sample_2',
      path: '/portfolio',
      referrer: 'Direct',
      device: 'Desktop',
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      userAgent: 'Mozilla/5.0'
    }
  ],
  inquiries: [
    {
      _id: 'inq_1',
      name: 'Samira Ahmed',
      email: 'samira@creativestudio.com',
      serviceType: 'Cinematic Wedding Film',
      packageChosen: 'Diamond Package ($850)',
      createdAt: new Date().toLocaleDateString('en-US', { hour: '2-digit', minute: '2-digit' }),
      status: 'New Inquiry',
      notes: 'Need 4K grading and cinematic pacing for our destination wedding in Sylhet.'
    },
    {
      _id: 'inq_2',
      name: 'Marcus Vance',
      email: 'marcus@creator.io',
      serviceType: 'YouTube Retention & VFX',
      packageChosen: 'Pro Creator ($450)',
      createdAt: 'Yesterday, 4:30 PM',
      status: 'In Progress',
      notes: 'Weekly 15-minute tech review edits with dynamic motion graphics.'
    }
  ],
  portfolio: [
    {
      _id: 'port_1',
      title: 'Cinematic Mountain Odyssey',
      category: 'Commercial',
      duration: '02:45',
      views: '124K',
      image: 'https://images.unsplash.com/photo-1518173946687-a4c8a383392e?auto=format&fit=crop&w=800&q=80'
    },
    {
      _id: 'port_2',
      title: 'Neon Tokyo Urban Rush',
      category: 'Music Video',
      duration: '03:12',
      views: '280K',
      image: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80'
    },
    {
      _id: 'port_3',
      title: 'Zara & Farhan Luxury Reception',
      category: 'Wedding',
      duration: '05:30',
      views: '89K',
      image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80'
    }
  ],
  settings: {
    siteName: 'FlipTheLense',
    tagline: 'From Raw Footage To A Compelling Final Video',
    phone: '+880 1885 000118',
    email: 'flipthelense@gmail.com',
    address: 'Shyamoli, Mohammadpur, Dhaka 1207',
    licenceNo: 'TRAD/DNCC/008721/2025',
    expCounter: '4.5+',
    projectsCounter: '523+',
    satisfactionCounter: '99%'
  }
};

export function getLocalStore() {
  try {
    if (!fs.existsSync(STORE_FILE)) {
      fs.writeFileSync(STORE_FILE, JSON.stringify(initialData, null, 2));
      return initialData;
    }
    const content = fs.readFileSync(STORE_FILE, 'utf-8');
    return JSON.parse(content);
  } catch (err) {
    return initialData;
  }
}

export function saveLocalStore(data) {
  try {
    fs.writeFileSync(STORE_FILE, JSON.stringify(data, null, 2));
  } catch (err) {
    console.error('Error saving local store:', err);
  }
}
