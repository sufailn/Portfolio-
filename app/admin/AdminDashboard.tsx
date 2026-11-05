"use client";

import { useEffect, useState } from 'react';
import type { ChangeEvent, FormEvent, ReactNode } from 'react';
import { defaultSiteContent, siteContentSectionNames, type SiteContent } from '@/lib/cms/content';

type PathPart = string | number;

const arrayTemplates: Record<string, unknown> = {
  navLinks: defaultSiteContent.header.navLinks[0],
  socialLinks: defaultSiteContent.header.socialLinks[0],
  timeline: defaultSiteContent.career.timeline[0],
  groups: defaultSiteContent.skills.groups[0],
  skills: defaultSiteContent.skills.groups[0].skills[0],
  items: defaultSiteContent.projects.items[0],
  steps: defaultSiteContent.workflow.steps[0],
  phones: defaultSiteContent.footer.phones[0],
  quickLinks: defaultSiteContent.footer.quickLinks[0],
};

function updateAtPath<T>(value: T, path: PathPart[], replacement: unknown): T {
  if (path.length === 0) {
    return replacement as T;
  }

  const [part, ...remaining] = path;
  if (Array.isArray(value) && typeof part === 'number') {
    const copy = [...value];
    copy[part] = updateAtPath(copy[part], remaining, replacement);
    return copy as T;
  }

  if (typeof value === 'object' && value !== null && typeof part === 'string') {
    const copy = { ...value, [part]: updateAtPath((value as Record<string, unknown>)[part], remaining, replacement) };
    return copy as T;
  }

  return value;
}

function blankLike(value: unknown): unknown {
  if (Array.isArray(value)) {
    return [];
  }
  if (typeof value === 'number') {
    return 0;
  }
  if (typeof value === 'boolean') {
    return false;
  }
  if (typeof value === 'object' && value !== null) {
    return Object.fromEntries(
      Object.entries(value).map(([key, child]) => [key, blankLike(child)])
    );
  }
  return '';
}

function formatLabel(value: string) {
  return value
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replace(/^./, (letter) => letter.toUpperCase());
}

type ContentFieldProps = {
  label: string;
  fieldName: string;
  value: unknown;
  path: PathPart[];
  onChange: (path: PathPart[], value: unknown) => void;
  onUpload: (path: PathPart[], file: File) => void;
  uploadingPath: string | null;
};

function ContentField({
  label,
  fieldName,
  value,
  path,
  onChange,
  onUpload,
  uploadingPath,
}: ContentFieldProps) {
  if (Array.isArray(value)) {
    return (
      <fieldset className="space-y-3 rounded-xl border border-white/10 bg-white/[0.03] p-4">
        <legend className="px-2 text-sm font-semibold text-white">{label}</legend>
        {value.map((item, index) => (
          <div key={index} className="relative rounded-lg border border-white/10 p-3 pr-12">
            <ContentField
              label={`${label} ${index + 1}`}
              fieldName={fieldName}
              value={item}
              path={[...path, index]}
              onChange={onChange}
              onUpload={onUpload}
              uploadingPath={uploadingPath}
            />
            <button
              type="button"
              onClick={() => onChange(path, value.filter((_, itemIndex) => itemIndex !== index))}
              className="absolute right-3 top-3 rounded px-2 py-1 text-xs text-red-300 hover:bg-red-400/10"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => {
            const template = value[0] ?? arrayTemplates[String(path[path.length - 1])];
            onChange(path, [...value, blankLike(template)]);
          }}
          className="rounded border border-white/20 px-3 py-2 text-sm text-white/80 hover:bg-white/10"
        >
          + Add {label.replace(/s$/, '')}
        </button>
      </fieldset>
    );
  }

  if (typeof value === 'object' && value !== null) {
    return (
      <fieldset className="space-y-4 rounded-xl border border-white/10 p-4">
        <legend className="px-2 text-sm font-semibold text-white">{label}</legend>
        {Object.entries(value).map(([key, child]) => (
          <ContentField
            key={key}
            label={formatLabel(key)}
            fieldName={key}
            value={child}
            path={[...path, key]}
            onChange={onChange}
            onUpload={onUpload}
            uploadingPath={uploadingPath}
          />
        ))}
      </fieldset>
    );
  }

  if (typeof value === 'boolean') {
    return (
      <label className="flex items-center justify-between gap-4 rounded-lg border border-white/10 px-4 py-3 text-sm text-white/90">
        <span>{label}</span>
        <input
          type="checkbox"
          checked={value}
          onChange={(event) => onChange(path, event.target.checked)}
          className="h-4 w-4 accent-cyan-400"
        />
      </label>
    );
  }

  if (typeof value === 'number') {
    return (
      <label className="block space-y-1.5 text-sm text-white/80">
        <span>{label}</span>
        <input
          type="number"
          value={value}
          min={fieldName === 'level' ? 0 : undefined}
          max={fieldName === 'level' ? 100 : undefined}
          onChange={(event) => onChange(path, Number(event.target.value) || 0)}
          className="w-full rounded-lg border border-white/15 bg-black/40 px-3 py-2 text-white outline-none focus:border-cyan-400"
        />
      </label>
    );
  }

  if (typeof value === 'string') {
    if (fieldName === 'type' || fieldName === 'icon') {
      const options = fieldName === 'type'
        ? ['work', 'education']
        : path[0] === 'skills'
          ? ['Globe', 'Server', 'Database', 'Code2', 'Layers', 'Briefcase', 'GraduationCap']
          : ['Workflow', 'Palette', 'Code', 'Monitor'];
      return (
        <label className="block space-y-1.5 text-sm text-white/80">
          <span>{label}</span>
          <select
            value={value}
            onChange={(event) => onChange(path, event.target.value)}
            className="w-full rounded-lg border border-white/15 bg-[#11151c] px-3 py-2 text-white outline-none focus:border-cyan-400"
          >
            {options.map((option) => <option key={option} value={option}>{option}</option>)}
          </select>
        </label>
      );
    }

    const isLongText = /description|greeting|credential|heading|title|organization|location|name|period|label/i.test(fieldName)
      && (value.length > 80 || /description|greeting/i.test(fieldName));
    const filePath = path.join('.');
    const canUpload = /image|cvUrl/i.test(fieldName);
    return (
      <label className="block space-y-1.5 text-sm text-white/80">
        <span>{label}</span>
        {isLongText ? (
          <textarea
            value={value}
            onChange={(event) => onChange(path, event.target.value)}
            rows={3}
            className="w-full rounded-lg border border-white/15 bg-black/40 px-3 py-2 text-white outline-none focus:border-cyan-400"
          />
        ) : (
          <input
            type="text"
            value={value}
            onChange={(event) => onChange(path, event.target.value)}
            className="w-full rounded-lg border border-white/15 bg-black/40 px-3 py-2 text-white outline-none focus:border-cyan-400"
          />
        )}
        {canUpload && (
          <span className="flex flex-wrap items-center gap-3 pt-1 text-xs text-white/60">
            <input
              type="file"
              accept={fieldName.toLowerCase().includes('cv') ? 'application/pdf' : 'image/jpeg,image/png,image/webp,image/gif'}
              disabled={uploadingPath === filePath}
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                const file = event.target.files?.[0];
                if (file) onUpload(path, file);
                event.target.value = '';
              }}
              className="max-w-full file:mr-3 file:rounded file:border-0 file:bg-white/10 file:px-3 file:py-1.5 file:text-white"
            />
            {uploadingPath === filePath ? 'Uploading…' : 'Upload to Vercel Blob'}
          </span>
        )}
      </label>
    );
  }

  return null;
}

const sectionLabels: Record<(typeof siteContentSectionNames)[number], string> = {
  header: 'Header & Navigation',
  hero: 'Hero',
  career: 'Career',
  skills: 'Skills',
  projects: 'Projects',
  workflow: 'Workflow',
  contact: 'Contact',
  footer: 'Footer',
};

export default function AdminDashboard() {
  const [content, setContent] = useState<SiteContent>(defaultSiteContent);
  const [activeSection, setActiveSection] = useState<keyof SiteContent>('hero');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signedIn, setSignedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingPath, setUploadingPath] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  async function loadContent() {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('/api/admin/content', { cache: 'no-store' });
      if (response.status === 401) {
        setSignedIn(false);
        return;
      }
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Unable to load content.');
      setContent(result);
      setSignedIn(true);
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : 'Unable to load content.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadContent();
  }, []);

  async function signIn(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    setMessage('');
    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Sign in failed.');
      setPassword('');
      await loadContent();
    } catch (loginError) {
      setError(loginError instanceof Error ? loginError.message : 'Sign in failed.');
    }
  }

  async function saveContent() {
    setSaving(true);
    setError('');
    setMessage('');
    try {
      const response = await fetch('/api/admin/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(content),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Unable to save content.');
      setMessage('Changes saved. Refresh the portfolio to see the updates.');
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : 'Unable to save content.');
    } finally {
      setSaving(false);
    }
  }

  async function uploadMedia(path: PathPart[], file: File) {
    const pathId = path.join('.');
    setUploadingPath(pathId);
    setError('');
    setMessage('');
    try {
      const formData = new FormData();
      formData.set('file', file);
      const response = await fetch('/api/admin/upload', { method: 'POST', body: formData });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Upload failed.');
      setContent((current) => updateAtPath(current, path, result.url));
      setMessage('Upload complete. Save changes to publish this file.');
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : 'Upload failed.');
    } finally {
      setUploadingPath(null);
    }
  }

  async function signOut() {
    await fetch('/api/admin/logout', { method: 'POST' });
    setSignedIn(false);
    setMessage('');
  }

  if (loading) {
    return <main className="min-h-screen bg-[#07090d] px-4 py-20 text-center text-white/70">Loading admin…</main>;
  }

  if (!signedIn) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#07090d] px-4 py-16 text-white">
        <form onSubmit={signIn} className="w-full max-w-md space-y-5 rounded-2xl border border-white/10 bg-white/[0.04] p-8 shadow-2xl">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Portfolio CMS</p>
            <h1 className="mt-3 text-3xl font-semibold">Admin sign in</h1>
            <p className="mt-2 text-sm text-white/60">Sign in to edit every portfolio section and manage projects.</p>
          </div>
          {error && <p role="alert" className="rounded-lg border border-red-400/30 bg-red-400/10 p-3 text-sm text-red-200">{error}</p>}
          <label className="block space-y-2 text-sm">
            <span>Admin email</span>
            <input
              autoComplete="username"
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded-lg border border-white/15 bg-black/40 px-3 py-2.5 outline-none focus:border-cyan-400"
            />
          </label>
          <label className="block space-y-2 text-sm">
            <span>Password</span>
            <input
              autoComplete="current-password"
              type="password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-lg border border-white/15 bg-black/40 px-3 py-2.5 outline-none focus:border-cyan-400"
            />
          </label>
          <button type="submit" className="w-full rounded-lg bg-cyan-300 px-4 py-3 font-semibold text-black hover:bg-cyan-200">
            Sign in
          </button>
          <a href="/" className="block text-center text-sm text-white/60 hover:text-white">← Back to portfolio</a>
        </form>
      </main>
    );
  }

  const selectedData = content[activeSection];
  const fieldEditor: ReactNode = (
    <ContentField
      label={sectionLabels[activeSection]}
      fieldName={activeSection}
      value={selectedData}
      path={[activeSection]}
      onChange={(path, value) => setContent((current) => updateAtPath(current, path, value))}
      onUpload={uploadMedia}
      uploadingPath={uploadingPath}
    />
  );

  return (
    <main className="min-h-screen bg-[#07090d] px-4 py-8 text-white sm:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-cyan-300">Custom Portfolio CMS</p>
            <h1 className="mt-2 text-3xl font-semibold">Manage your website</h1>
            <p className="mt-1 text-sm text-white/60">Edit text, add or remove items, toggle sections, and upload media.</p>
          </div>
          <div className="flex gap-3">
            <a href="/" target="_blank" rel="noreferrer" className="rounded-lg border border-white/20 px-4 py-2 text-sm hover:bg-white/10">View site</a>
            <button type="button" onClick={signOut} className="rounded-lg border border-white/20 px-4 py-2 text-sm hover:bg-white/10">Sign out</button>
          </div>
        </header>

        <div className="grid gap-6 lg:grid-cols-[220px_minmax(0,1fr)]">
          <nav aria-label="Content sections" className="flex gap-2 overflow-x-auto lg:flex-col lg:overflow-visible">
            {siteContentSectionNames.map((section) => (
              <button
                key={section}
                type="button"
                onClick={() => setActiveSection(section)}
                className={`shrink-0 rounded-lg px-4 py-3 text-left text-sm transition-colors ${
                  activeSection === section ? 'bg-cyan-300 font-semibold text-black' : 'bg-white/5 text-white/75 hover:bg-white/10'
                }`}
              >
                {sectionLabels[section]}
              </button>
            ))}
          </nav>

          <section className="min-w-0 space-y-5">
            {error && <p role="alert" className="rounded-lg border border-red-400/30 bg-red-400/10 p-3 text-sm text-red-200">{error}</p>}
            {message && <p role="status" className="rounded-lg border border-green-400/30 bg-green-400/10 p-3 text-sm text-green-200">{message}</p>}
            {fieldEditor}
            <div className="sticky bottom-4 flex justify-end">
              <button
                type="button"
                onClick={saveContent}
                disabled={saving || uploadingPath !== null}
                className="rounded-lg bg-cyan-300 px-6 py-3 font-semibold text-black shadow-lg hover:bg-cyan-200 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {saving ? 'Saving…' : 'Save changes'}
              </button>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
