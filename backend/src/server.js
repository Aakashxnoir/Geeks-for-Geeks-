require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require('path');
const { pathToFileURL } = require('url');

const app = express();

const PORT = process.env.PORT || 4000;
// Frontend runs on :3000 in this repo, while some setups use :5173.
// Allow both during local development.
const FRONTEND_ORIGINS = (process.env.FRONTEND_ORIGIN || 'http://localhost:5173,http://localhost:3000')
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean);

const isAllowedOrigin = (origin) => {
  if (!origin) return true;
  return FRONTEND_ORIGINS.includes(origin);
};

app.use(
  cors({
    origin: (origin, callback) => {
      if (isAllowedOrigin(origin)) return callback(null, true);
      return callback(null, false);
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(morgan('dev'));

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-change-me';
const TOKEN_TTL_SECONDS = Number(process.env.TOKEN_TTL_SECONDS || 60 * 60 * 24); // 24h

// In-memory stores (used when no DB env is configured).
// This keeps the “backend endpoints” real even without a database setup.
const userStore = new Map(); // email -> user
const contactMessages = [];

// Seed a demo user for local testing (matches the old frontend demo flow).
(() => {
  const demoEmail = 'demo@gfg-rit.in';
  const demoPassword = 'Gfg@1234';
  if (userStore.has(demoEmail)) return;
  const passwordHash = bcrypt.hashSync(demoPassword, 10);
  userStore.set(demoEmail, {
    id: 'u-demo',
    email: demoEmail,
    passwordHash,
    name: 'Demo User',
    department: null,
    year: null,
    role: 'student',
    createdAt: new Date().toISOString(),
  });
})();

function signToken(user) {
  return jwt.sign(
    {
      sub: user.id,
      email: user.email,
      role: user.role,
      name: user.name,
    },
    JWT_SECRET,
    { expiresIn: TOKEN_TTL_SECONDS }
  );
}

function requireAuth(req, res, next) {
  const header = req.headers.authorization || '';
  if (!header.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Missing authorization token.' });
  }

  const token = header.slice('Bearer '.length);
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.auth = payload;
    return next();
  } catch {
    return res.status(401).json({ message: 'Invalid or expired token.' });
  }
}

const frontendDataBase = path.resolve(__dirname, '..', '..', 'frontend', 'src', 'utils', 'data');
const moduleCache = {};

async function loadFrontendModule(cacheKey, fileName) {
  if (moduleCache[cacheKey]) return moduleCache[cacheKey];
  const absPath = path.join(frontendDataBase, fileName);
  moduleCache[cacheKey] = import(pathToFileURL(absPath).href);
  return moduleCache[cacheKey];
}

// Simple health check route
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'gfg-rit-backend',
    time: new Date().toISOString(),
  });
});

// --------------------
// Auth
// --------------------
app.post('/api/auth/signup', async (req, res) => {
  try {
    const { email, password, name, department, year, role } = req.body || {};
    if (!email || !password || !name) {
      return res.status(400).json({ message: 'email, password, and name are required.' });
    }
    if (userStore.has(email)) {
      return res.status(409).json({ message: 'User already exists.' });
    }

    const passwordHash = await bcrypt.hash(String(password), 10);
    const user = {
      id: `u-${Math.random().toString(16).slice(2)}-${Date.now()}`,
      email: String(email),
      passwordHash,
      name: String(name),
      department: department ? String(department) : null,
      year: typeof year === 'number' ? year : year ? Number(year) : null,
      role: role ? String(role) : 'student',
      createdAt: new Date().toISOString(),
    };

    userStore.set(user.email, user);
    const token = signToken(user);

    return res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        department: user.department,
        year: user.year,
        role: user.role,
      },
    });
  } catch {
    return res.status(500).json({ message: 'Signup failed.' });
  }
});

app.post('/api/auth/signin', async (req, res) => {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) {
      return res.status(400).json({ message: 'email and password are required.' });
    }

    const user = userStore.get(email);
    if (!user) return res.status(401).json({ message: 'Invalid credentials.' });

    const ok = await bcrypt.compare(String(password), user.passwordHash);
    if (!ok) return res.status(401).json({ message: 'Invalid credentials.' });

    const token = signToken(user);
    return res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        department: user.department,
        year: user.year,
        role: user.role,
      },
    });
  } catch {
    return res.status(500).json({ message: 'Signin failed.' });
  }
});

app.get('/api/auth/me', requireAuth, (req, res) => {
  const email = req.auth?.email;
  if (!email || !userStore.has(email)) return res.status(401).json({ message: 'Unauthorized.' });
  const user = userStore.get(email);
  return res.json({
    isAuthenticated: true,
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      department: user.department,
      year: user.year,
      role: user.role,
    },
  });
});

app.post('/api/auth/logout', (_req, res) => {
  // JWT is stateless; frontend just removes the token.
  return res.json({ ok: true });
});

// --------------------
// Events
// --------------------
app.get('/api/events/upcoming', async (_req, res) => {
  const mod = await loadFrontendModule('eventsMock', 'eventsMockData.js');
  return res.json({ events: mod.UPCOMING_EVENTS });
});

app.get('/api/events/past', async (_req, res) => {
  const mod = await loadFrontendModule('eventsMock', 'eventsMockData.js');
  return res.json({ events: mod.PAST_EVENTS });
});

app.get('/api/events/:id', async (req, res) => {
  const { id } = req.params;
  const mod = await loadFrontendModule('eventsMock', 'eventsMockData.js');
  const event = mod.getEventById(id);
  if (!event) return res.status(404).json({ message: 'Event not found.' });

  const isUpcoming = (mod.UPCOMING_EVENTS || []).some((e) => e.id === id);
  return res.json({ event, isUpcoming });
});

// --------------------
// Resources
// --------------------
app.get('/api/resources', async (_req, res) => {
  const mod = await loadFrontendModule('resourcesData', 'resourcesData.js');
  return res.json({ resources: mod.RESOURCES, categories: mod.RESOURCE_CATEGORIES });
});

// --------------------
// Club Info
// --------------------
app.get('/api/club-info', async (_req, res) => {
  const mod = await loadFrontendModule('clubInfo', 'clubInfoData.js');
  return res.json({
    team: mod.CLUB_TEAM,
    objectives: mod.CLUB_OBJECTIVES,
    stats: mod.CLUB_STATS,
    activities: mod.CLUB_ACTIVITIES,
  });
});

// --------------------
// Notifications (demo)
// --------------------
app.get('/api/notifications', async (_req, res) => {
  return res.json({
    notifications: [
      { id: 1, title: 'System Optimized', message: 'GFG X RIT navigation is synced across pages.', time: 'Just now', read: false },
      { id: 2, title: 'Event Reminder', message: 'Upcoming workshop schedule is now visible in the Events page.', time: '2h ago', read: false },
      { id: 3, title: 'New Resources', message: 'Fresh DSA tracks are ready in the Resources vault.', time: '1d ago', read: true },
    ],
  });
});

// --------------------
// Contact (data + message submission)
// --------------------
app.get('/api/contact', async (_req, res) => {
  const mod = await loadFrontendModule('contactData', 'contactData.js');
  return res.json({
    contactStats: mod.CONTACT_STATS,
    teamContacts: mod.TEAM_CONTACTS,
    clubEmail: mod.CLUB_EMAIL,
    socialCards: mod.SOCIAL_CARDS,
    faqItems: mod.FAQ_ITEMS,
    subjectOptions: mod.SUBJECT_OPTIONS,
    mapEmbedUrl: mod.MAP_EMBED_URL,
    chatbotKnowledge: mod.CHATBOT_KNOWLEDGE,
  });
});

app.post('/api/contact/messages', (req, res) => {
  const body = req.body || {};
  contactMessages.push({
    ...body,
    createdAt: new Date().toISOString(),
  });
  return res.json({ ok: true });
});

// --------------------
// Placeholder routes (not required yet)
// --------------------
app.use('/api/community', (req, res) => res.status(501).json({ message: 'Community routes not implemented yet.' }));
app.use('/api/notifications', (req, res) => res.status(501).json({ message: 'Notifications routes not implemented yet.' }));

// Fallback
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found.' });
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Backend server running on http://localhost:${PORT}`);
});

