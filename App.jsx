import { useEffect, useMemo, useState } from "react";

const DEFAULT_FAVICON =
  "https://claremont.edu/wp-content/uploads/2021/12/TCCstudents309-1200x675.jpeg";

const DEFAULT_UPDATES = [
  {
    id: 1,
    title: "CAS Community Dinner",
    date: "April 26, 2026",
    category: "Upcoming Event",
    description:
      "Join us for an evening of food, conversation, and community as CAS brings students together across campus.",
    image: DEFAULT_FAVICON,
    featured: true,
  },
  {
    id: 2,
    title: "African Student Leadership Mixer",
    date: "May 2, 2026",
    category: "Campus Update",
    description:
      "CAS leadership will host a mixer focused on mentorship, student connection, and planning for the semester ahead.",
    image: DEFAULT_FAVICON,
    featured: false,
  },
];

const DEFAULT_TEAM = [
  { id: 1, role: "President", name: "Floribert Rugambage", image: "" },
  { id: 2, role: "Treasurer", name: "Thwahir Malafu", image: "" },
  { id: 3, role: "Event Personnel", name: "Heena Suleman", image: "" },
  { id: 4, role: "Event Personnel", name: "Roystone Varuma", image: "" },
];

const FAVICON_URL = DEFAULT_FAVICON;
const DEFAULT_HERO_IMAGE = DEFAULT_FAVICON;
const JOIN_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLScPj1yNR0EQy58R9Bd1YhZrry13sQjT1fpcWuW0ytDxmRiYxg/viewform?usp=publish-editor";

function safeRead(key, fallback) {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function themeClasses(theme) {
  return theme === "dark"
    ? {
        page: "bg-[#12100d] text-stone-200",
        topBar: "border-amber-200/10 bg-[#12100d]/85",
        header: "border-amber-200/10 bg-[#12100d]/80",
        card: "border-amber-200/10 bg-[#1a1713]/60 text-stone-200",
        softCard: "border-amber-200/10 bg-[#1a1713]/50 text-stone-200",
        input: "border-amber-200/10 bg-[#1a1713]/50 text-stone-200 placeholder:text-stone-400",
        muted: "text-stone-300",
        subtle: "text-stone-400",
        faint: "text-stone-500",
        footer: "border-amber-200/10 bg-[#12100d]/90 text-stone-400",
        avatar: "bg-[#262019]/60 text-stone-400",
      }
    : {
        page: "bg-stone-50 text-stone-800",
        topBar: "border-stone-200/60 bg-stone-50/90",
        header: "border-stone-200/60 bg-stone-50/90",
        card: "border-stone-200/60 bg-stone-50 text-stone-800",
        softCard: "border-stone-200/60 bg-stone-50 text-stone-800",
        input: "border-stone-200/60 bg-stone-50 text-stone-800 placeholder:text-stone-400",
        muted: "text-stone-600",
        subtle: "text-stone-500",
        faint: "text-stone-400",
        footer: "border-stone-200/60 bg-stone-50 text-stone-500",
        avatar: "bg-stone-100 text-stone-400",
      };
}

function TopBar({
  setView,
  setActiveSection,
  studentLoggedIn,
  adminLoggedIn,
  theme,
  setTheme,
}) {
  const t = themeClasses(theme);

  return (
    <header className={`sticky top-0 z-50 border-b backdrop-blur ${t.topBar}`}>
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={() => {
            setView("website");
            setActiveSection("home");
          }}
          className="flex items-center gap-3"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-500/20 text-lg font-bold text-emerald-300 ring-1 ring-emerald-400/30">
            CAS
          </div>
          <div className="text-left">
            <p className="text-xs uppercase tracking-[0.28em] text-emerald-300">
              CMC African Students
            </p>
            <p className={`text-sm ${t.muted}`}>Portal Access</p>
          </div>
        </button>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => setTheme((prev) => (prev === "dark" ? "light" : "dark"))}
            className={`rounded-xl px-3 py-1.5 text-xs font-medium transition ${
              theme === "dark"
                ? "border border-white/15 bg-stone-100/60 text-white"
                : "border border-stone-300/70 bg-white text-stone-900"
            }`}
          >
            {theme === "dark" ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </button>
          <button
            type="button"
            onClick={() => setView("website")}
            className={`rounded-2xl px-4 py-2 text-sm font-semibold ${
              theme === "dark"
                ? "border border-white/15 bg-stone-100/60 text-white"
                : "border border-stone-300/70 bg-white text-stone-900"
            }`}
          >
            Website
          </button>
          <a
            href={JOIN_FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={theme === "dark"
              ? "inline-flex items-center gap-2 rounded-2xl border border-emerald-300/25 bg-gradient-to-r from-emerald-400/20 via-emerald-300/10 to-amber-300/10 px-4 py-2 text-sm font-semibold text-white shadow-[0_0_0_1px_rgba(52,211,153,0.12)] transition duration-300 hover:-translate-y-0.5 hover:border-emerald-300/40 hover:shadow-[0_10px_30px_rgba(16,185,129,0.18)]"
              : "inline-flex items-center gap-2 rounded-2xl border border-emerald-300/40 bg-gradient-to-r from-emerald-50 via-white to-amber-50 px-4 py-2 text-sm font-semibold text-stone-900 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-emerald-400/60 hover:shadow-[0_10px_30px_rgba(16,185,129,0.12)]"}
          >
            Join Us
            <span aria-hidden="true">→</span>
          </a>
          <button
            type="button"
            onClick={() => setView("admin")}
            className={`rounded-2xl px-4 py-2 text-sm font-semibold ${
              adminLoggedIn
                ? "bg-amber-300 text-stone-950"
                : theme === "dark"
                ? "border border-white/15 bg-stone-100/60 text-white"
                : "border border-stone-300/70 bg-white text-stone-900"
            }`}
          >
            Admin Portal
          </button>
        </div>
      </div>
    </header>
  );
}

function SectionTitle({ eyebrow, title, copy, theme }) {
  const t = themeClasses(theme);

  return (
    <div className="max-w-3xl">
      <p className="text-sm font-semibold uppercase tracking-[0.28em] text-emerald-300 transition duration-300 hover:text-emerald-200">
        {eyebrow}
      </p>
      <h2 className="mt-3 text-4xl font-bold text-slate-100 transition duration-300 hover:-translate-y-0.5 hover:text-emerald-100 md:text-5xl dark:text-slate-100">
        <span className={theme === "light" ? "text-stone-900 hover:text-emerald-700" : ""}>
          {title}
        </span>
      </h2>
      {copy ? <p className={`mt-5 text-lg leading-8 ${t.muted}`}>{copy}</p> : null}
    </div>
  );
}

function InputField({ label, value, onChange, placeholder, type = "text", theme }) {
  const t = themeClasses(theme);

  return (
    <label className="block">
      <span className={`mb-2 block text-sm font-medium ${theme === "dark" ? "text-white/80" : "text-stone-700"}`}>
        {label}
      </span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full rounded-2xl border px-4 py-3 outline-none ${t.input}`}
      />
    </label>
  );
}

function ImageUploadField({ label, onChange, theme, preview }) {
  const t = themeClasses(theme);

  const handleFile = (file) => {
    if (!file || !file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        onChange(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <label className="block">
      <span className={`mb-2 block text-sm font-medium ${theme === "dark" ? "text-white/80" : "text-stone-700"}`}>
        {label}
      </span>
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          const file = e.dataTransfer.files?.[0];
          handleFile(file);
        }}
        className={`relative flex min-h-[140px] w-full flex-col items-center justify-center rounded-2xl border border-dashed px-4 py-6 text-center transition ${t.input}`}
      >
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleFile(e.target.files?.[0])}
          className="absolute inset-0 cursor-pointer opacity-0"
        />
        {preview ? (
          <div className="w-full">
            <img
              src={preview}
              alt="Upload preview"
              className="mx-auto mb-3 h-24 w-24 rounded-xl object-cover"
            />
            <p className={`text-sm ${t.muted}`}>
              Drag and drop a new image, or click to replace it.
            </p>
          </div>
        ) : (
          <div>
            <p className="text-base font-medium text-emerald-300">
              Drag and drop image here
            </p>
            <p className={`mt-2 text-sm ${t.muted}`}>
              or click to upload from your device
            </p>
          </div>
        )}
      </div>
    </label>
  );
}

function TextAreaField({ label, value, onChange, placeholder, theme }) {
  const t = themeClasses(theme);

  return (
    <label className="block">
      <span className={`mb-2 block text-sm font-medium ${theme === "dark" ? "text-white/80" : "text-stone-700"}`}>
        {label}
      </span>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={5}
        className={`w-full rounded-2xl border px-4 py-3 outline-none ${t.input}`}
      />
    </label>
  );
}

function SelectField({ label, value, onChange, options, theme }) {
  const t = themeClasses(theme);

  return (
    <label className="block">
      <span className={`mb-2 block text-sm font-medium ${theme === "dark" ? "text-white/80" : "text-stone-700"}`}>
        {label}
      </span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full rounded-2xl border px-4 py-3 outline-none ${t.input}`}
      >
        {options.map((option) => (
          <option key={option} value={option} className={theme === "dark" ? "bg-stone-950 text-white" : "bg-white text-stone-900"}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

function PortalFeature({ title, text, theme }) {
  const t = themeClasses(theme);

  return (
    <div className={`rounded-[1.6rem] border p-5 transition duration-300 hover:-translate-y-1 hover:border-emerald-300/30 hover:bg-white/10 ${t.card}`}>
      <h3 className={theme === "dark" ? "text-xl font-semibold text-slate-100 transition duration-300 hover:text-emerald-100" : "text-xl font-semibold text-stone-900 transition duration-300 hover:text-emerald-700"}>
        {title}
      </h3>
      <p className={`mt-2 ${t.muted}`}>{text}</p>
    </div>
  );
}

function StatCard({ title, text, theme }) {
  const t = themeClasses(theme);

  return (
    <div className={`rounded-[1.6rem] border p-5 backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-emerald-300/30 hover:bg-white/10 ${t.card}`}>
      <p className={theme === "dark" ? "text-xl font-bold text-slate-100 transition duration-300 hover:text-emerald-100" : "text-xl font-bold text-stone-900 transition duration-300 hover:text-emerald-700"}>
        {title}
      </p>
      <p className={`mt-2 text-sm ${t.muted}`}>{text}</p>
    </div>
  );
}

function RoleCard({ role, name, image, theme }) {
  const t = themeClasses(theme);

  return (
    <div className={`rounded-[2rem] border p-8 text-center transition duration-300 hover:-translate-y-1 hover:border-emerald-300/30 hover:bg-white/10 ${t.card}`}>
      {image ? (
        <img
          src={image}
          alt={name}
          className="mx-auto mb-5 h-24 w-24 rounded-full object-cover"
        />
      ) : (
        <div className={`mx-auto mb-5 flex h-24 w-24 items-center justify-center rounded-full text-xs uppercase tracking-[0.2em] ${t.avatar}`}>
          CAS
        </div>
      )}
      <h3 className={theme === "dark" ? "text-2xl font-semibold text-slate-100 transition duration-300 hover:text-emerald-100" : "text-2xl font-semibold text-stone-900 transition duration-300 hover:text-emerald-700"}>
        {role}
      </h3>
      <p className={`mt-3 text-lg ${t.muted}`}>{name}</p>
    </div>
  );
}

export default function CASWebsite() {
  const [theme, setTheme] = useState(() => safeRead("cas_theme", "dark"));
  const [activeSection, setActiveSection] = useState("home");
  const [view, setView] = useState("website");
  const [studentLoggedIn, setStudentLoggedIn] = useState(false);
  const [adminLoggedIn, setAdminLoggedIn] = useState(false);
  const [studentForm, setStudentForm] = useState({ email: "", password: "" });
  const [adminForm, setAdminForm] = useState({ email: "", password: "" });
  const [newUpdate, setNewUpdate] = useState({
    title: "",
    date: "",
    category: "Upcoming Event",
    description: "",
    image: "",
  });
  const [newTeamMember, setNewTeamMember] = useState({
    role: "",
    name: "",
    image: "",
  });
  const [publishMessage, setPublishMessage] = useState("");
  const [showContactInfo, setShowContactInfo] = useState(false);
  const [updates, setUpdates] = useState(() => safeRead("cas_updates", DEFAULT_UPDATES));
  const [teamMembers, setTeamMembers] = useState(() =>
    safeRead("cas_team_members", DEFAULT_TEAM)
  );
  const [heroImages, setHeroImages] = useState(() =>
    safeRead("cas_hero_images", [DEFAULT_HERO_IMAGE])
  );
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);
  const [favicon, setFavicon] = useState(() =>
    safeRead("cas_favicon", DEFAULT_FAVICON)
  );

  const t = themeClasses(theme);

  const navItems = [
    { label: "Home", id: "home" },
    { label: "About", id: "about" },
    { label: "Programs", id: "programs" },
    { label: "Leadership", id: "leadership" },
    { label: "Updates", id: "updates" },
    { label: "Join", id: "join" },
  ];

  const programs = [
    {
      title: "Community Building",
      description:
        "We create belonging through mentoring, shared meals, and spaces where African students can build friendships and support one another.",
    },
    {
      title: "Cultural Celebration",
      description:
        "We highlight African art, culture, and history through social events, collaborations, and campus-wide programming.",
    },
    {
      title: "Academic & Professional Growth",
      description:
        "We connect students with African intellectuals, professionals, workshops, and opportunities that expand learning beyond the classroom.",
    },
    {
      title: "Current Events Awareness",
      description:
        "We encourage student presentations and conversations that engage with contemporary issues affecting the African continent and its diaspora.",
    },
  ];

  const featuredUpdate = useMemo(
    () => updates.find((item) => item.featured) || updates[0],
    [updates]
  );

  useEffect(() => {
    if (view !== "website") return;
    const target = document.getElementById(activeSection);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [activeSection, view]);

  useEffect(() => {
    try {
      window.localStorage.setItem("cas_updates", JSON.stringify(updates));
    } catch {}
  }, [updates]);

  useEffect(() => {
    try {
      window.localStorage.setItem("cas_team_members", JSON.stringify(teamMembers));
    } catch {}
  }, [teamMembers]);

  useEffect(() => {
    try {
      window.localStorage.setItem("cas_hero_images", JSON.stringify(heroImages));
    } catch {}
  }, [heroImages]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroIndex((prev) =>
        heroImages.length > 1 ? (prev + 1) % heroImages.length : prev
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [heroImages]);

  useEffect(() => {
    try {
      window.localStorage.setItem("cas_theme", JSON.stringify(theme));
    } catch {}
  }, [theme]);

  useEffect(() => {
    try {
      window.localStorage.setItem("cas_favicon", JSON.stringify(favicon));
    } catch {}
  }, [favicon]);

  useEffect(() => {
    if (typeof document === "undefined") return;
    const existing = document.querySelector("link[rel='icon']");
    const faviconEl = existing || document.createElement("link");
    faviconEl.setAttribute("rel", "icon");
    faviconEl.setAttribute("type", "image/png");
    faviconEl.setAttribute("sizes", "32x32");
    faviconEl.setAttribute("href", favicon);
    if (!existing) document.head.appendChild(faviconEl);
  }, [favicon]);

  const handleStudentLogin = (e) => {
    e.preventDefault();
    if (studentForm.email && studentForm.password) {
      setStudentLoggedIn(true);
    }
  };

  const handleAdminLogin = (e) => {
    e.preventDefault();
    if (adminForm.email && adminForm.password) {
      setAdminLoggedIn(true);
      setPublishMessage("");
    }
  };

  const handlePublishUpdate = (e) => {
    e.preventDefault();
    if (!newUpdate.title || !newUpdate.date || !newUpdate.description) {
      setPublishMessage("Please fill in the title, date, and description before publishing.");
      return;
    }

    const createdUpdate = {
      id: Date.now(),
      title: newUpdate.title,
      date: newUpdate.date,
      category: newUpdate.category,
      description: newUpdate.description,
      image: newUpdate.image || DEFAULT_UPDATES[0].image,
      featured: true,
    };

    setUpdates((prev) => [
      createdUpdate,
      ...prev.map((item) => ({ ...item, featured: false })),
    ]);
    setPublishMessage("Update published successfully. It now appears on the website.");
    setShowContactInfo(false);
    setNewUpdate({
      title: "",
      date: "",
      category: "Upcoming Event",
      description: "",
      image: "",
    });
    setView("website");
    setActiveSection("updates");
  };

  const handleAddTeamMember = (e) => {
    e.preventDefault();
    if (!newTeamMember.role || !newTeamMember.name) {
      setPublishMessage("Please fill in both the team role and the team member name.");
      return;
    }

    const createdMember = {
      id: Date.now(),
      role: newTeamMember.role,
      name: newTeamMember.name,
      image: newTeamMember.image,
    };

    setTeamMembers((prev) => [...prev, createdMember]);
    setNewTeamMember({ role: "", name: "", image: "" });
    setPublishMessage(
      "Team member saved successfully. The leadership section has been updated."
    );
  };

  const handleTeamMemberChange = (id, field, value) => {
    setTeamMembers((prev) =>
      prev.map((member) => (member.id === id ? { ...member, [field]: value } : member))
    );
    setPublishMessage("Leadership information updated successfully.");
  };

  const handleRemoveTeamMember = (id) => {
    setTeamMembers((prev) => prev.filter((member) => member.id !== id));
    setPublishMessage("Team member removed from the leadership section.");
  };

  const NavButton = ({ item }) => (
    <button
      type="button"
      onClick={() => {
        setView("website");
        setActiveSection(item.id);
      }}
      className={`text-sm transition ${
        activeSection === item.id
          ? theme === "dark"
            ? "text-white"
            : "text-stone-900"
          : theme === "dark"
          ? "text-white/70 hover:text-white"
          : "text-stone-600 hover:text-stone-900"
      }`}
    >
      {item.label}
    </button>
  );

  const adminPanel = (
    <div className={`min-h-screen ${t.page}`}>
      <TopBar
        setView={setView}
        setActiveSection={setActiveSection}
        studentLoggedIn={studentLoggedIn}
        adminLoggedIn={adminLoggedIn}
        theme={theme}
        setTheme={setTheme}
      />
      <div className="mx-auto grid min-h-[calc(100vh-80px)] max-w-7xl gap-10 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
        <div className="flex flex-col justify-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-300">
            Admin Portal
          </p>
          <h1 className={theme === "dark" ? "mt-4 text-4xl font-bold leading-tight text-slate-100 transition duration-300 hover:-translate-y-0.5 hover:text-emerald-100 sm:text-5xl" : "mt-4 text-4xl font-bold leading-tight text-stone-900 transition duration-300 hover:-translate-y-0.5 hover:text-emerald-700 sm:text-5xl"}>
            Publish new content in the same style as the website.
          </h1>
          <p className={`mt-6 max-w-2xl text-lg leading-8 ${t.muted}`}>
            This admin experience is designed so new updates, events, photos, and announcements automatically appear on the website with the same design language and visual identity.
          </p>
          <div className="mt-8 space-y-4">
            <PortalFeature
              title="Add updates fast"
              text="Create upcoming events, campus updates, and announcements from one dashboard."
              theme={theme}
            />
            <PortalFeature
              title="Keep the same design"
              text="New content inherits the same cards, spacing, and visual style as the main website."
              theme={theme}
            />
            <PortalFeature
              title="Team manager"
              text="Edit leadership roles, names, and image links directly from the admin portal."
              theme={theme}
            />
            <PortalFeature
              title="Hero image control"
              text="Replace the first landing-page image so the homepage can stay fresh and visually current."
              theme={theme}
            />
          </div>
        </div>

        <div className={`rounded-[2rem] border p-6 shadow-2xl backdrop-blur sm:p-8 ${t.card}`}>
          {!adminLoggedIn ? (
            <>
              <h2 className={theme === "dark" ? "text-3xl font-bold text-slate-100 transition duration-300 hover:text-emerald-100" : "text-3xl font-bold text-stone-900 transition duration-300 hover:text-emerald-700"}>
                Admin Login
              </h2>
              <p className={`mt-3 ${t.muted}`}>
                Front-end admin dashboard preview for Floribert. Real secure login can be connected before launch.
              </p>
              <form onSubmit={handleAdminLogin} className="mt-8 space-y-5">
                <InputField
                  label="Admin Email"
                  type="email"
                  value={adminForm.email}
                  onChange={(value) => setAdminForm({ ...adminForm, email: value })}
                  placeholder="frugambage24@cmc.edu"
                  theme={theme}
                />
                <InputField
                  label="Password"
                  type="password"
                  value={adminForm.password}
                  onChange={(value) => setAdminForm({ ...adminForm, password: value })}
                  placeholder="Enter password"
                  theme={theme}
                />
                <button
                  type="submit"
                  className="w-full rounded-2xl bg-amber-300 px-5 py-3 font-semibold text-stone-950 transition hover:scale-[1.01]"
                >
                  Enter Admin Portal
                </button>
              </form>
            </>
          ) : (
            <>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.22em] text-amber-300">
                    Dashboard
                  </p>
                  <h2 className={theme === "dark" ? "mt-2 text-3xl font-bold text-white" : "mt-2 text-3xl font-bold text-stone-900"}>
                    Content Manager
                  </h2>
                  <p className={`mt-2 ${t.muted}`}>
                    Add a new update and it will instantly appear in the website’s Updates section.
                  </p>
                  <p className={`mt-2 text-sm ${t.faint}`}>
                    Published updates are saved in this browser and remain visible after refresh until an admin changes or resets them.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setAdminLoggedIn(false)}
                  className={theme === "dark" ? "rounded-xl border border-white/15 px-4 py-2 text-sm text-white/80" : "rounded-xl border border-stone-300/70 px-4 py-2 text-sm text-stone-700"}
                >
                  Log out
                </button>
              </div>

              {publishMessage ? (
                <div className="mt-6 rounded-2xl border border-emerald-400/30 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-700">
                  {publishMessage}
                </div>
              ) : null}

              <form onSubmit={handlePublishUpdate} className="mt-8 space-y-5">
                <InputField
                  label="Update Title"
                  value={newUpdate.title}
                  onChange={(value) => setNewUpdate({ ...newUpdate, title: value })}
                  placeholder="Example: CAS Spring Networking Night"
                  theme={theme}
                />
                <div className="grid gap-5 md:grid-cols-2">
                  <InputField
                    label="Date"
                    value={newUpdate.date}
                    onChange={(value) => setNewUpdate({ ...newUpdate, date: value })}
                    placeholder="May 10, 2026"
                    theme={theme}
                  />
                  <SelectField
                    label="Category"
                    value={newUpdate.category}
                    onChange={(value) => setNewUpdate({ ...newUpdate, category: value })}
                    options={[
                      "Upcoming Event",
                      "Campus Update",
                      "Leadership Update",
                      "Photo Story",
                    ]}
                    theme={theme}
                  />
                </div>
                <ImageUploadField
                  label="Event Image"
                  onChange={(value) => setNewUpdate({ ...newUpdate, image: value })}
                  preview={newUpdate.image}
                  theme={theme}
                />
                <TextAreaField
                  label="Description"
                  value={newUpdate.description}
                  onChange={(value) => setNewUpdate({ ...newUpdate, description: value })}
                  placeholder="Write the new update or event details here"
                  theme={theme}
                />
                <button
                  type="submit"
                  className="w-full rounded-2xl bg-emerald-400 px-5 py-3 font-semibold text-stone-950 transition hover:scale-[1.01]"
                >
                  Publish Update to Website
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setUpdates(DEFAULT_UPDATES);
                    setPublishMessage("Updates reset to the original website content.");
                  }}
                  className={theme === "dark" ? "w-full rounded-2xl border border-white/15 bg-stone-100/60 px-5 py-3 font-semibold text-white transition hover:bg-white/10" : "w-full rounded-2xl border border-stone-300/70 bg-stone-100 px-4 py-2 font-semibold text-stone-900 transition hover:bg-stone-100"}
                >
                  Reset Updates
                </button>
              </form>

              <div className={theme === "dark" ? "mt-10 border-t border-white/10 pt-8" : "mt-10 border-t border-stone-300/70 pt-8"}>
                <div>
                  <p className="text-sm uppercase tracking-[0.22em] text-amber-300">
                    Homepage Media
                  </p>
                  <h3 className={theme === "dark" ? "mt-2 text-2xl font-bold text-slate-100" : "mt-2 text-2xl font-bold text-stone-900"}>
                    Change the first landing-page image
                  </h3>
                  <p className={`mt-2 ${t.subtle}`}>
                    Upload a new hero image and it will appear at the top of the public homepage immediately.
                  </p>
                </div>

                <div className={`mt-6 rounded-[1.8rem] border p-5 ${t.card}`}>
                  <ImageUploadField
                    label="Add Homepage Image"
                    onChange={(value) => {
                      setHeroImages((prev) => [...prev, value]);
                      setPublishMessage("New image added to homepage carousel.");
                    }}
                    preview={heroImages[currentHeroIndex]}
                    theme={theme}
                  />

                  <button
                    type="button"
                    onClick={() => {
                      setHeroImages([DEFAULT_HERO_IMAGE]);
                      setPublishMessage("Homepage images reset.");
                    }}
                    className="mt-4 w-full rounded-2xl border px-4 py-2"
                  >
                    Reset Images
                  </button>

                  <div className="mt-6">
                    <ImageUploadField
                      label="Upload Favicon"
                      onChange={(value) => {
                        setFavicon(value);
                        setPublishMessage("Favicon updated successfully.");
                      }}
                      preview={favicon}
                      theme={theme}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setHeroImages([DEFAULT_HERO_IMAGE]);
                      setPublishMessage("Homepage image reset to the default image.");
                    }}
                    className={theme === "dark" ? "mt-4 w-full rounded-2xl border border-white/15 bg-stone-100/60 px-5 py-3 font-semibold text-white transition hover:bg-white/10" : "mt-4 w-full rounded-2xl border border-stone-300/70 bg-stone-100 px-4 py-2 font-semibold text-stone-900 transition hover:bg-stone-100"}
                  >
                    Reset Homepage Image
                  </button>
                </div>

                <div className={theme === "dark" ? "mt-10 border-t border-white/10 pt-8" : "mt-10 border-t border-stone-300/70 pt-8"}>
                  <div>
                    <p className="text-sm uppercase tracking-[0.22em] text-amber-300">
                      Leadership Manager
                    </p>
                    <h3 className={theme === "dark" ? "mt-2 text-2xl font-bold text-slate-100" : "mt-2 text-2xl font-bold text-stone-900"}>
                      Edit the CAS team and image links
                    </h3>
                    <p className={`mt-2 ${t.subtle}`}>
                      Add new team members, update roles, and upload images that will appear in the public leadership section.
                    </p>
                  </div>

                  <div className="mt-6 space-y-4">
                    {teamMembers.map((member) => (
                      <div
                        key={member.id}
                        className={theme === "dark" ? "rounded-[1.6rem] border border-white/10 bg-black/20 p-5" : "rounded-[1.6rem] border border-stone-300/70 bg-stone-50 p-5"}
                      >
                        <div className="grid gap-4 md:grid-cols-3">
                          <InputField
                            label="Role"
                            value={member.role}
                            onChange={(value) =>
                              handleTeamMemberChange(member.id, "role", value)
                            }
                            placeholder="Role"
                            theme={theme}
                          />
                          <InputField
                            label="Name"
                            value={member.name}
                            onChange={(value) =>
                              handleTeamMemberChange(member.id, "name", value)
                            }
                            placeholder="Name"
                            theme={theme}
                          />
                          <ImageUploadField
                            label="Profile Image"
                            onChange={(value) =>
                              handleTeamMemberChange(member.id, "image", value)
                            }
                            preview={member.image}
                            theme={theme}
                          />
                        </div>
                        <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                          <div className="flex items-center gap-4">
                            {member.image ? (
                              <img
                                src={member.image}
                                alt={member.name}
                                className="h-14 w-14 rounded-full object-cover"
                              />
                            ) : (
                              <div className={theme === "dark" ? "flex h-14 w-14 items-center justify-center rounded-full bg-white/10 text-xs text-white/50" : "flex h-14 w-14 items-center justify-center rounded-full bg-stone-200 text-xs text-stone-500"}>
                                No Photo
                              </div>
                            )}
                            <div>
                              <p className={theme === "dark" ? "font-semibold text-white" : "font-semibold text-stone-900"}>
                                {member.name}
                              </p>
                              <p className={`text-sm ${t.faint}`}>{member.role}</p>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleRemoveTeamMember(member.id)}
                            className="rounded-2xl border border-red-300/20 bg-red-400/10 px-4 py-2 text-sm font-semibold text-red-700 transition hover:bg-red-400/20"
                          >
                            Remove Member
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <form
                    onSubmit={handleAddTeamMember}
                    className={`mt-6 rounded-[1.8rem] border p-5 ${t.card}`}
                  >
                    <h4 className={theme === "dark" ? "text-xl font-semibold text-slate-100" : "text-xl font-semibold text-stone-900"}>
                      Add New Team Member
                    </h4>
                    <div className="mt-4 grid gap-4 md:grid-cols-3">
                      <InputField
                        label="Role"
                        value={newTeamMember.role}
                        onChange={(value) =>
                          setNewTeamMember({ ...newTeamMember, role: value })
                        }
                        placeholder="Example: Secretary"
                        theme={theme}
                      />
                      <InputField
                        label="Name"
                        value={newTeamMember.name}
                        onChange={(value) =>
                          setNewTeamMember({ ...newTeamMember, name: value })
                        }
                        placeholder="Full name"
                        theme={theme}
                      />
                      <ImageUploadField
                        label="Profile Image"
                        onChange={(value) =>
                          setNewTeamMember({ ...newTeamMember, image: value })
                        }
                        preview={newTeamMember.image}
                        theme={theme}
                      />
                    </div>
                    <button
                      type="submit"
                      className="mt-5 w-full rounded-2xl bg-amber-300 px-5 py-3 font-semibold text-stone-950 transition hover:scale-[1.01]"
                    >
                      Save Team Member
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setTeamMembers(DEFAULT_TEAM);
                        setPublishMessage("Leadership section reset to the original team.");
                      }}
                      className={theme === "dark" ? "mt-3 w-full rounded-2xl border border-white/15 bg-stone-100/60 px-5 py-3 font-semibold text-white transition hover:bg-white/10" : "mt-3 w-full rounded-2xl border border-stone-300/70 bg-stone-100 px-4 py-2 font-semibold text-stone-900 transition hover:bg-stone-100"}
                    >
                      Reset Leadership Team
                    </button>
                  </form>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );

  if (view === "admin") return adminPanel;

  return (
    <div className={`min-h-screen scroll-smooth ${t.page}`}>
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,180,80,0.06),transparent_40%)]" />
      <header className={`sticky top-0 z-50 border-b backdrop-blur ${t.header}`}>
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <button
            type="button"
            onClick={() => {
              setView("website");
              setActiveSection("home");
            }}
            className="flex items-center gap-3 text-left"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-500/20 text-lg font-bold text-emerald-300 ring-1 ring-emerald-400/30">
              CAS
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-emerald-300">
                Claremont McKenna College
              </p>
              <h1 className={theme === "dark" ? "text-lg font-semibold text-white" : "text-lg font-semibold text-stone-900"}>
                CMC African Students
              </h1>
            </div>
          </button>

          <nav className="hidden items-center gap-6 lg:flex">
            {navItems.map((item) => (
              <NavButton key={item.id} item={item} />
            ))}
          </nav>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => setTheme((prev) => (prev === "dark" ? "light" : "dark"))}
              className={`rounded-xl px-3 py-1.5 text-xs font-medium transition ${
                theme === "dark"
                  ? "border border-white/15 bg-stone-100/60 text-white"
                  : "border border-stone-300/70 bg-white text-stone-900"
              }`}
            >
              {theme === "dark" ? "☀️ Light Mode" : "🌙 Dark Mode"}
            </button>
            <a
              href={JOIN_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={theme === "dark"
                ? "inline-flex items-center gap-2 rounded-2xl border border-emerald-300/25 bg-gradient-to-r from-emerald-400/20 via-emerald-300/10 to-amber-300/10 px-5 py-3 font-semibold text-white shadow-[0_0_0_1px_rgba(52,211,153,0.12)] transition duration-300 hover:-translate-y-0.5 hover:border-emerald-300/40 hover:shadow-[0_12px_35px_rgba(16,185,129,0.18)]"
                : "inline-flex items-center gap-2 rounded-2xl border border-emerald-300/40 bg-gradient-to-r from-emerald-50 via-white to-amber-50 px-5 py-3 font-semibold text-stone-900 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-emerald-400/60 hover:shadow-[0_12px_35px_rgba(16,185,129,0.12)]"}
            >
              Join Us
              <span aria-hidden="true">→</span>
            </a>
            <button
              type="button"
              onClick={() => setView("admin")}
              className="rounded-2xl bg-emerald-400 px-4 py-2 text-sm font-semibold text-stone-950"
            >
              Admin Portal
            </button>
          </div>
        </div>
      </header>

      <main id="home">
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/12 via-transparent to-amber-300/8" />
          <div className="mx-auto grid max-w-7xl gap-12 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-2 lg:px-8 lg:py-24">
            <div className="relative z-10 flex flex-col justify-center">
              <p className="text-sm font-semibold uppercase tracking-[0.34em] text-emerald-300">
                Culture • Community • Leadership
              </p>
              <h2 className={theme === "dark" ? "mt-5 text-4xl font-bold leading-tight text-slate-100 transition duration-300 hover:-translate-y-0.5 hover:text-emerald-100 sm:text-5xl md:text-6xl" : "mt-5 text-4xl font-bold leading-tight text-stone-900 transition duration-300 hover:-translate-y-0.5 hover:text-emerald-700 sm:text-5xl md:text-6xl"}>
                A modern digital home for African students at CMC.
              </h2>
              <p className={`mt-6 max-w-2xl text-lg leading-8 ${t.muted}`}>
                CAS brings together students of African heritage through connection, cultural celebration, professional growth, and meaningful campus dialogue.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
                <button
                  type="button"
                  onClick={() => setActiveSection("updates")}
                  className="rounded-2xl bg-stone-100 px-4 py-2 font-semibold text-stone-950"
                >
                  See Latest Updates
                </button>
                <a
                  href={JOIN_FORM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={theme === "dark"
                    ? "inline-flex items-center gap-2 rounded-2xl border border-emerald-300/25 bg-gradient-to-r from-emerald-400/20 via-emerald-300/10 to-amber-300/10 px-5 py-3 font-semibold text-white shadow-[0_0_0_1px_rgba(52,211,153,0.12)] transition duration-300 hover:-translate-y-0.5 hover:border-emerald-300/40 hover:shadow-[0_12px_35px_rgba(16,185,129,0.18)]"
                    : "inline-flex items-center gap-2 rounded-2xl border border-emerald-300/40 bg-gradient-to-r from-emerald-50 via-white to-amber-50 px-5 py-3 font-semibold text-stone-900 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-emerald-400/60 hover:shadow-[0_12px_35px_rgba(16,185,129,0.12)]"}
                >
                  Join Us
                  <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>

            <div className="relative z-10">
              <div className="relative h-[260px] w-full overflow-hidden rounded-[2rem] shadow-2xl sm:h-[340px] lg:h-[430px]">
                {heroImages.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt="CAS visual"
                    className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
                      index === currentHeroIndex ? "opacity-100" : "opacity-0"
                    }`}
                  />
                ))}
              </div>
              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                <StatCard
                  title="Community"
                  text="A welcoming student network rooted in belonging and support."
                  theme={theme}
                />
                <StatCard
                  title="Events"
                  text="A place to discover upcoming activities, dinners, and cultural programming."
                  theme={theme}
                />
                <StatCard
                  title="Updates"
                  text="Fresh content can be published through the admin portal and reflected instantly."
                  theme={theme}
                />
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <SectionTitle
                eyebrow="About CAS"
                title="Building an intellectually engaging and supportive African student community."
                copy="CAS supports students of African heritage at Claremont McKenna College by creating a space to share experiences, address challenges, and foster cultural, political, and social awareness of the African continent."
                theme={theme}
              />
              <div className={`mt-6 rounded-[1.5rem] border p-5 ${t.card}`}>
                <h3 className={theme === "dark" ? "text-xl font-semibold text-slate-100 transition duration-300 hover:text-emerald-100" : "text-xl font-semibold text-stone-900 transition duration-300 hover:text-emerald-700"}>
                  CMC Mission and Values
                </h3>
                <p className={`mt-3 ${t.muted}`}>
                  Claremont McKenna College is committed to preparing students for thoughtful, productive lives and responsible leadership in business, government, and the professions. This page helps visitors connect CAS to the broader values and mission of CMC.
                </p>
                <ul className={`mt-4 space-y-2 text-sm ${t.subtle}`}>
                  <li>• Explore CMC’s educational mission and institutional values</li>
                  <li>• Understand the college context in which CAS serves students</li>
                  <li>• Learn more about the spirit of leadership, service, and engagement at CMC</li>
                </ul>
                <a
                  href="https://www.cmc.edu/about/mission-and-motto"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-block text-emerald-300 underline"
                >
                  Visit the CMC mission page
                </a>
              </div>
            </div>
            <div className={`rounded-[2rem] border p-8 ${t.card}`}>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-amber-300">
                Who can join?
              </p>
              <h3 className={theme === "dark" ? "mt-4 text-3xl font-bold text-white" : "mt-4 text-3xl font-bold text-stone-900"}>
                Open to all CMC students
              </h3>
              <p className={`mt-4 leading-8 ${t.muted}`}>
                CAS especially welcomes students who are passionate about African culture, art, politics, and issues affecting the continent.
              </p>
            </div>
          </div>
        </section>

        <section id="programs" className={theme === "dark" ? "bg-white/[0.03] py-14 sm:py-20" : "bg-stone-200/60 py-14 sm:py-20"}>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionTitle
              eyebrow="Programs"
              title="Experiences that bring the CAS community to life."
              copy="From mentoring and shared meals to cultural events and professional exposure, CAS is designed to create both belonging and momentum."
              theme={theme}
            />
            <div className="mt-12 grid gap-6 md:grid-cols-2">
              {programs.map((program) => (
                <div
                  key={program.title}
                  className={`rounded-[2rem] border p-8 shadow-xl ${t.softCard}`}
                >
                  <h3 className={theme === "dark" ? "text-2xl font-semibold text-white" : "text-2xl font-semibold text-stone-900"}>
                    {program.title}
                  </h3>
                  <p className={`mt-4 leading-8 ${t.muted}`}>{program.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="leadership" className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
          <SectionTitle
            eyebrow="Leadership"
            title="Meet the team behind CAS."
            copy="A clear and simple leadership section that keeps the focus on people and roles."
            theme={theme}
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {teamMembers.map((member) => (
              <RoleCard
                key={member.id}
                role={member.role}
                name={member.name}
                image={member.image}
                theme={theme}
              />
            ))}
          </div>
        </section>

        <section id="updates" className={theme === "dark" ? "bg-white/[0.03] py-14 sm:py-20" : "bg-stone-200/60 py-14 sm:py-20"}>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionTitle
              eyebrow="Live Updates"
              title="Website content that can keep growing through the admin portal."
              copy="Step softly into the rhythm of our community, where each update carries a new story, a new gathering, and a new spark waiting to be discovered."
              theme={theme}
            />
            <div className="mt-12 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
              <div className={`overflow-hidden rounded-[2rem] border shadow-2xl ${t.softCard}`}>
                <img
                  src={featuredUpdate?.image}
                  alt={featuredUpdate?.title}
                  className="h-[220px] w-full object-cover sm:h-[320px]"
                />
                <div className="p-8">
                  <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-300">
                    {featuredUpdate?.category}
                  </p>
                  <h3 className={theme === "dark" ? "mt-3 text-2xl font-bold text-slate-100 transition duration-300 hover:text-emerald-100 sm:text-3xl" : "mt-3 text-2xl font-bold text-stone-900 transition duration-300 hover:text-emerald-700 sm:text-3xl"}>
                    {featuredUpdate?.title}
                  </h3>
                  <p className={`mt-3 text-sm ${t.faint}`}>{featuredUpdate?.date}</p>
                  <p className={`mt-5 text-lg leading-8 ${t.muted}`}>
                    {featuredUpdate?.description}
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                {updates.slice(0, 4).map((item) => (
                  <div
                    key={item.id}
                    className={`rounded-[1.7rem] border p-6 ${t.card}`}
                  >
                    <p className="text-xs uppercase tracking-[0.22em] text-amber-300">
                      {item.category}
                    </p>
                    <h4 className={theme === "dark" ? "mt-2 text-2xl font-semibold text-slate-100 transition duration-300 hover:text-emerald-100" : "mt-2 text-2xl font-semibold text-stone-900 transition duration-300 hover:text-emerald-700"}>
                      {item.title}
                    </h4>
                    <p className={`mt-2 text-sm ${t.faint}`}>{item.date}</p>
                    <p className={`mt-3 ${t.muted}`}>{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="join" className="mx-auto max-w-5xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
          <div className="overflow-hidden rounded-[2.5rem] border border-emerald-400/20 bg-gradient-to-r from-emerald-500/20 via-stone-900/30 to-amber-400/10 p-8 shadow-2xl sm:p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-emerald-300">
              Join CAS
            </p>
            <h2 className={theme === "dark" ? "mt-4 text-3xl font-bold text-white sm:text-4xl" : "mt-4 text-3xl font-bold text-stone-900 sm:text-4xl"}>
              Be part of a stronger African student community at CMC.
            </h2>
            <p className={`mt-5 max-w-2xl text-lg leading-8 ${t.muted}`}>
              Whether you want community, conversation, leadership, or opportunities to celebrate and represent Africa on campus, CAS is a place to belong.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
              <button
                type="button"
                onClick={() => setShowContactInfo((prev) => !prev)}
                className="rounded-2xl bg-stone-100 px-4 py-2 font-semibold text-stone-950"
              >
                Contact the Club
              </button>
              <a
                href={JOIN_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={theme === "dark"
                  ? "inline-flex items-center gap-2 rounded-2xl border border-emerald-300/25 bg-gradient-to-r from-emerald-400/20 via-emerald-300/10 to-amber-300/10 px-5 py-3 font-semibold text-white shadow-[0_0_0_1px_rgba(52,211,153,0.12)] transition duration-300 hover:-translate-y-0.5 hover:border-emerald-300/40 hover:shadow-[0_12px_35px_rgba(16,185,129,0.18)]"
                  : "inline-flex items-center gap-2 rounded-2xl border border-emerald-300/40 bg-gradient-to-r from-emerald-50 via-white to-amber-50 px-5 py-3 font-semibold text-stone-900 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-emerald-400/60 hover:shadow-[0_12px_35px_rgba(16,185,129,0.12)]"}
              >
                Join Us
                <span aria-hidden="true">→</span>
              </a>
            </div>
            {showContactInfo ? (
              <div className={`mt-6 rounded-[2rem] border p-6 ${t.card}`}>
                <h3 className={theme === "dark" ? "text-2xl font-semibold text-slate-100 transition duration-300 hover:text-emerald-100" : "text-2xl font-semibold text-stone-900 transition duration-300 hover:text-emerald-700"}>
                  Contact Information
                </h3>
                <p className={`mt-3 ${t.muted}`}>Email: frugambage24@cmc.edu</p>
                <p className={`mt-2 ${t.muted}`}>President: Floribert Rugambage</p>
                <p className={`mt-2 ${t.muted}`}>Organization: CMC African Students</p>
                <a
                  href="mailto:frugambage24@cmc.edu?subject=CAS%20Inquiry&body=Hello%20CAS%20Team,%0A%0AI%20would%20like%20to%20learn%20more%20about..."
                  className="mt-4 inline-block text-emerald-300 underline"
                >
                  Send an email now
                </a>
              </div>
            ) : null}
          </div>
        </section>
      </main>

      <footer className={`border-t ${t.footer}`}>
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-8 text-sm sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div>
            <p className={theme === "dark" ? "font-medium text-white/80" : "font-medium text-stone-900"}>
              CMC African Students
            </p>
            <p className="mt-1">
              Cultivating community, cultural awareness, and student leadership at Claremont McKenna College.
            </p>
          </div>
          <div className="text-left lg:text-right">
            <p>© 2026 CMC African Students. All rights reserved.</p>
            <p className="mt-1">
              Designed for a professional web presence and deployment on a custom domain.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
