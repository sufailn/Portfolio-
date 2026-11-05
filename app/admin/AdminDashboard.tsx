"use client";

import { useEffect, useRef, useState } from 'react';
import type { ChangeEvent, FormEvent, ReactNode } from 'react';
import {
  BriefcaseBusiness,
  ChevronDown,
  ChevronUp,
  Eye,
  EyeOff,
  FileText,
  FolderKanban,
  GripVertical,
  LayoutDashboard,
  Link2,
  Mail,
  Plus,
  Sparkles,
  Trash2,
  Workflow,
  Wrench,
} from 'lucide-react';
import { defaultSiteContent, siteContentSectionNames, type SiteContent } from '@/lib/cms/content';

type PathPart = string | number;

const arrayTemplates: Record<string, unknown> = {
  navLinks: defaultSiteContent.header.navLinks[0],
  socialLinks: defaultSiteContent.header.socialLinks[0],
  tech: '',
  timeline: defaultSiteContent.career.timeline[0],
  groups: defaultSiteContent.skills.groups[0],
  skills: defaultSiteContent.skills.groups[0].skills[0],
  items: defaultSiteContent.projects.items[0],
  steps: defaultSiteContent.workflow.steps[0],
  phones: defaultSiteContent.footer.phones[0],
  quickLinks: defaultSiteContent.footer.quickLinks[0],
};

const blankProject: SiteContent['projects']['items'][number] = {
  title: '',
  description: '',
  image: '',
  tech: [],
  link: '',
  visible: true,
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

function changedContentPaths(before: unknown, after: unknown, path: string[] = []): string[] {
  if (Object.is(before, after)) return [];

  if (Array.isArray(before) || Array.isArray(after)) {
    if (!Array.isArray(before) || !Array.isArray(after)) {
      return [path.join('.') || 'site content'];
    }
    const changed: string[] = [];
    for (let index = 0; index < Math.max(before.length, after.length); index += 1) {
      changed.push(...changedContentPaths(before[index], after[index], [...path, String(index)]));
    }
    return changed;
  }

  if (
    typeof before !== 'object'
    || before === null
    || typeof after !== 'object'
    || after === null
  ) {
    return [path.join('.') || 'site content'];
  }

  const beforeRecord = before as Record<string, unknown>;
  const afterRecord = after as Record<string, unknown>;
  const keys = Object.keys(beforeRecord).concat(Object.keys(afterRecord));
  return keys
    .filter((key, index) => keys.indexOf(key) === index)
    .flatMap((key) => changedContentPaths(beforeRecord[key], afterRecord[key], [...path, key]));
}

function valueAtPath(value: unknown, path: string[]): unknown {
  return path.reduce<unknown>((current, part) => {
    if (Array.isArray(current)) return current[Number(part)];
    if (typeof current === 'object' && current !== null) {
      return (current as Record<string, unknown>)[part];
    }
    return undefined;
  }, value);
}

function formatPreviewValue(value: unknown): string {
  if (value === undefined) return 'Removed';
  if (typeof value === 'string') return value || '(empty)';
  const formatted = JSON.stringify(value);
  return formatted.length > 360 ? `${formatted.slice(0, 360)}…` : formatted;
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

type ProjectListEditorProps = {
  items: SiteContent['projects']['items'];
  path: PathPart[];
  onChange: (path: PathPart[], value: unknown) => void;
  onUpload: (path: PathPart[], file: File) => void;
  uploadingPath: string | null;
};

function ProjectListEditor({ items, path, onChange, onUpload, uploadingPath }: ProjectListEditorProps) {
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [expandedProject, setExpandedProject] = useState<number | null>(null);

  function moveProject(from: number, to: number) {
    if (to < 0 || to >= items.length || from === to) return;
    const reordered = [...items];
    const [project] = reordered.splice(from, 1);
    reordered.splice(to, 0, project);
    onChange(path, reordered);
  }

  return (
    <div className="space-y-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold">Your projects</h2>
          <p className="mt-1 text-sm text-white/55">Drag projects to reorder them. Hidden projects stay saved as drafts.</p>
        </div>
        <button
          type="button"
          onClick={() => {
            setExpandedProject(items.length);
            onChange(path, [...items, { ...blankProject }]);
          }}
          className="inline-flex items-center gap-2 rounded-lg bg-cyan-300 px-4 py-2.5 text-sm font-semibold text-black hover:bg-cyan-200"
        >
          <Plus className="h-4 w-4" />
          Add project
        </button>
      </div>

      {items.length === 0 && (
        <div className="rounded-xl border border-dashed border-white/20 px-4 py-10 text-center text-sm text-white/60">
          No projects yet. Add your first project above.
        </div>
      )}

      <div className="space-y-3">
      {items.map((project, index) => (
        <article
          key={`${project.title}-${index}`}
          onDragOver={(event) => event.preventDefault()}
          onDrop={(event) => {
            event.preventDefault();
            if (draggedIndex !== null) moveProject(draggedIndex, index);
            setDraggedIndex(null);
          }}
          className={`rounded-xl border bg-black/20 transition-colors ${
            draggedIndex === index ? 'border-cyan-300/70 opacity-60' : 'border-white/10'
          }`}
        >
          <div className="flex flex-wrap items-center gap-2 p-3 sm:p-4">
            <button
              type="button"
              draggable
              onDragStart={(event) => {
                event.dataTransfer.effectAllowed = 'move';
                setDraggedIndex(index);
              }}
              onDragEnd={() => setDraggedIndex(null)}
              aria-label={`Drag to reorder ${project.title || `project ${index + 1}`}`}
              title="Drag to reorder"
              className="cursor-grab touch-none rounded-lg p-2 text-white/50 hover:bg-white/10 hover:text-white active:cursor-grabbing"
            >
              <GripVertical className="h-5 w-5" />
            </button>
            <div className="min-w-0 flex-1">
              <p className="truncate font-medium">{project.title || `Untitled project ${index + 1}`}</p>
              <p className="text-xs text-white/50">{project.tech.length ? project.tech.join(' · ') : 'Add project details'}</p>
            </div>
            <span className={`rounded-full px-2.5 py-1 text-xs ${project.visible === false ? 'bg-white/10 text-white/50' : 'bg-emerald-400/10 text-emerald-200'}`}>
              {project.visible === false ? 'Hidden' : 'Live'}
            </span>
            <button
              type="button"
              onClick={() => onChange([...path, index, 'visible'], project.visible === false)}
              aria-label={project.visible === false ? 'Show project' : 'Hide project'}
              title={project.visible === false ? 'Show project' : 'Hide project'}
              className="rounded-lg p-2 text-white/65 hover:bg-white/10 hover:text-white"
            >
              {project.visible === false ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
            </button>
            <button
              type="button"
              onClick={() => moveProject(index, index - 1)}
              disabled={index === 0}
              aria-label="Move project up"
              className="rounded-lg p-2 text-white/65 hover:bg-white/10 hover:text-white disabled:opacity-25"
            >
              <ChevronUp className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => moveProject(index, index + 1)}
              disabled={index === items.length - 1}
              aria-label="Move project down"
              className="rounded-lg p-2 text-white/65 hover:bg-white/10 hover:text-white disabled:opacity-25"
            >
              <ChevronDown className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => onChange(path, items.filter((_, itemIndex) => itemIndex !== index))}
              aria-label={`Delete ${project.title || `project ${index + 1}`}`}
              className="rounded-lg p-2 text-red-300 hover:bg-red-400/10"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
          <details
            open={expandedProject === index}
            onToggle={(event) => {
              if (event.currentTarget.open) setExpandedProject(index);
              else if (expandedProject === index) setExpandedProject(null);
            }}
            className="border-t border-white/10"
          >
            <summary className="cursor-pointer px-4 py-3 text-sm text-cyan-200/90 hover:bg-white/[0.03]">
              Edit project details
            </summary>
            <div className="space-y-4 p-3 sm:p-4">
              <ContentField
                label="Project title"
                fieldName="title"
                value={project.title}
                path={[...path, index, 'title']}
                onChange={onChange}
                onUpload={onUpload}
                uploadingPath={uploadingPath}
              />
              <ContentField label="Description" fieldName="description" value={project.description} path={[...path, index, 'description']} onChange={onChange} onUpload={onUpload} uploadingPath={uploadingPath} />
              <ContentField label="Project image" fieldName="image" value={project.image} path={[...path, index, 'image']} onChange={onChange} onUpload={onUpload} uploadingPath={uploadingPath} />
              <ContentField label="Technology tags" fieldName="tech" value={project.tech} path={[...path, index, 'tech']} onChange={onChange} onUpload={onUpload} uploadingPath={uploadingPath} />
              <ContentField label="Project URL" fieldName="link" value={project.link} path={[...path, index, 'link']} onChange={onChange} onUpload={onUpload} uploadingPath={uploadingPath} />
            </div>
          </details>
        </article>
      ))}
      </div>
    </div>
  );
}

function ContentField({
  label,
  fieldName,
  value,
  path,
  onChange,
  onUpload,
  uploadingPath,
}: ContentFieldProps) {
  if (path.length === 2 && path[0] === 'projects' && path[1] === 'items' && Array.isArray(value)) {
    return (
      <ProjectListEditor
        items={value as SiteContent['projects']['items']}
        path={path}
        onChange={onChange}
        onUpload={onUpload}
        uploadingPath={uploadingPath}
      />
    );
  }

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
      <fieldset className="space-y-4 rounded-2xl border border-white/10 bg-white/[0.025] p-4 sm:p-5">
        <legend className="px-2 text-sm font-semibold text-white">{label}</legend>
        <div className="grid gap-4 md:grid-cols-2">
        {Object.entries(value)
          .filter(([key]) => !(
            (key === 'enabled' && path.length === 1)
            || (
              key === 'endDate'
              && path[0] === 'career'
              && path[1] === 'timeline'
              && (value as { isCurrent?: boolean }).isCurrent
            )
          ))
          .map(([key, child]) => (
            <div key={key} className={Array.isArray(child) ? 'md:col-span-2' : ''}>
              <ContentField
                label={formatLabel(key)}
                fieldName={key}
                value={child}
                path={[...path, key]}
                onChange={onChange}
                onUpload={onUpload}
                uploadingPath={uploadingPath}
              />
            </div>
          ))}
        </div>
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
    if (fieldName === 'startDate' || fieldName === 'endDate') {
      return (
        <label className="block space-y-1.5 text-sm text-white/80">
          <span>{label}</span>
          <input
            type="date"
            value={value}
            onChange={(event) => onChange(path, event.target.value)}
            className="w-full rounded-lg border border-white/15 bg-[#11151c] px-3 py-2 text-white outline-none focus:border-cyan-400"
          />
        </label>
      );
    }

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

const sectionDescriptions: Record<(typeof siteContentSectionNames)[number], string> = {
  header: 'Set your brand, navigation, social links, and CV download.',
  hero: 'Edit your introduction, animated headline, and first-screen links.',
  career: 'Manage experience and education. Choose dates from the calendar.',
  skills: 'Organize skill groups and update proficiency levels.',
  projects: 'Add projects, reorder them, and hide drafts without deleting them.',
  workflow: 'Describe the steps in your development process.',
  contact: 'Update your contact details and message form.',
  footer: 'Edit your profile details, phone numbers, links, and socials.',
};

const sectionIcons: Record<keyof SiteContent, typeof LayoutDashboard> = {
  header: LayoutDashboard,
  hero: Sparkles,
  career: BriefcaseBusiness,
  skills: Wrench,
  projects: FolderKanban,
  workflow: Workflow,
  contact: Mail,
  footer: Link2,
};

export default function AdminDashboard() {
  const [content, setContent] = useState<SiteContent>(defaultSiteContent);
  const [activeSection, setActiveSection] = useState<keyof SiteContent>('projects');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signedIn, setSignedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingPath, setUploadingPath] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [dirty, setDirty] = useState(false);
  const [aiInstruction, setAiInstruction] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState('');
  const [aiProposal, setAiProposal] = useState<SiteContent | null>(null);
  const [aiProposalBase, setAiProposalBase] = useState<SiteContent | null>(null);
  const contentRef = useRef(content);
  contentRef.current = content;

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
      setDirty(false);
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
      setDirty(false);
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
      setDirty(true);
      setMessage('Upload complete. Save changes to publish this file.');
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : 'Upload failed.');
    } finally {
      setUploadingPath(null);
    }
  }

  async function requestAiEdit() {
    const baseContent = content;
    setAiLoading(true);
    setAiError('');
    setAiProposal(null);
    setAiProposalBase(null);
    try {
      const response = await fetch('/api/admin/content-assist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ instruction: aiInstruction, content: baseContent }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Could not generate an edit proposal.');
      if (JSON.stringify(contentRef.current) !== JSON.stringify(baseContent)) {
        throw new Error('Your content changed while AI was working. Generate a new proposal to include the latest edits.');
      }
      setAiProposal(result.content as SiteContent);
      setAiProposalBase(baseContent);
    } catch (requestError) {
      setAiError(requestError instanceof Error ? requestError.message : 'Could not generate an edit proposal.');
    } finally {
      setAiLoading(false);
    }
  }

  function applyAiProposal() {
    if (!aiProposal || !aiProposalBase) return;
    if (JSON.stringify(content) !== JSON.stringify(aiProposalBase)) {
      setAiError('Your content changed after this preview was created. Generate a new proposal before applying it.');
      setAiProposal(null);
      setAiProposalBase(null);
      return;
    }
    setContent(aiProposal);
    contentRef.current = aiProposal;
    setDirty(true);
    const changedSection = siteContentSectionNames.find(
      (section) => section === aiChangedPaths[0]?.split('.')[0]
    );
    if (changedSection) setActiveSection(changedSection);
    setAiProposal(null);
    setAiProposalBase(null);
    setMessage('AI changes applied to the editor. Save changes to publish them.');
    setAiError('');
  }

  function changeContent(path: PathPart[], value: unknown) {
    setContent((current) => updateAtPath(current, path, value));
    setDirty(true);
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
  const aiChangedPaths = aiProposal ? changedContentPaths(content, aiProposal) : [];
  const fieldEditor: ReactNode = (
    <ContentField
      label={sectionLabels[activeSection]}
      fieldName={activeSection}
      value={selectedData}
      path={[activeSection]}
      onChange={changeContent}
      onUpload={uploadMedia}
      uploadingPath={uploadingPath}
    />
  );

  return (
    <main className="min-h-screen bg-[#07090d] px-4 py-8 text-white sm:px-8">
      <div className="mx-auto max-w-[1500px]">
        <header className="sticky top-0 z-30 -mx-4 mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-white/10 bg-[#07090d]/95 px-4 py-4 backdrop-blur sm:-mx-8 sm:px-8">
          <div className="min-w-[220px]">
            <p className="text-xs font-medium uppercase tracking-[0.24em] text-cyan-300">Portfolio Studio</p>
            <h1 className="mt-1 text-2xl font-semibold tracking-tight">Your website</h1>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={saveContent}
              disabled={saving || uploadingPath !== null}
              className="rounded-lg bg-cyan-300 px-5 py-2.5 text-sm font-semibold text-black shadow-[0_8px_24px_rgba(103,232,249,0.12)] transition hover:bg-cyan-200 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {saving ? 'Saving…' : dirty ? 'Save changes · Unsaved' : 'Save changes'}
            </button>
            <a href="/" target="_blank" rel="noreferrer" className="rounded-lg border border-white/20 px-4 py-2 text-sm hover:bg-white/10">View site</a>
            <button type="button" onClick={signOut} className="rounded-lg border border-white/20 px-4 py-2 text-sm hover:bg-white/10">Sign out</button>
          </div>
        </header>

        <div className="grid items-start gap-6 lg:grid-cols-[250px_minmax(0,1fr)] xl:gap-8">
          <aside className="lg:sticky lg:top-28">
          <div className="mb-3 hidden px-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/35 lg:block">Edit content</div>
          <nav aria-label="Content sections" className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:rounded-2xl lg:border lg:border-white/[0.07] lg:bg-white/[0.02] lg:p-2 lg:pb-2">
            {siteContentSectionNames.map((section) => (
              <button
                key={section}
                type="button"
                onClick={() => setActiveSection(section)}
                className={`flex shrink-0 items-center gap-3 rounded-xl px-3.5 py-3 text-left text-sm transition-colors ${
                  activeSection === section ? 'bg-white/[0.09] font-medium text-white shadow-inner' : 'text-white/55 hover:bg-white/[0.05] hover:text-white/90'
                }`}
              >
                {(() => {
                  const Icon = sectionIcons[section];
                  return <Icon className={`h-4 w-4 shrink-0 ${activeSection === section ? 'text-cyan-200' : 'text-white/35'}`} />;
                })()}
                <span className="flex-1">{sectionLabels[section]}</span>
                <span className={`h-1.5 w-1.5 rounded-full ${
                  content[section].enabled ? 'bg-emerald-300' : 'bg-white/20'
                }`} aria-label={content[section].enabled ? 'Section enabled' : 'Section hidden'} />
              </button>
            ))}
          </nav>
          <div className="mt-4 hidden rounded-2xl border border-white/[0.07] bg-white/[0.02] p-4 lg:block">
            <div className="flex items-center gap-2 text-sm text-white/75">
              <FileText className="h-4 w-4 text-cyan-200/80" />
              <span>{content.projects.items.filter((project) => project.visible !== false).length} live projects</span>
            </div>
            <p className="mt-2 text-xs leading-5 text-white/40">Your edits stay here until you save them.</p>
          </div>
          </aside>

          <section className="min-w-0 space-y-5">
            {error && <p role="alert" className="rounded-lg border border-red-400/30 bg-red-400/10 p-3 text-sm text-red-200">{error}</p>}
            {message && <p role="status" className="rounded-lg border border-green-400/30 bg-green-400/10 p-3 text-sm text-green-200">{message}</p>}
            <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/[0.08] bg-gradient-to-br from-white/[0.045] to-transparent p-5 sm:p-6">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-cyan-200/75">Website section</p>
                <h2 className="mt-2 text-2xl font-semibold tracking-tight">{sectionLabels[activeSection]}</h2>
                <p className="mt-1 max-w-2xl text-sm leading-6 text-white/50">{sectionDescriptions[activeSection]}</p>
              </div>
              <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-white/10 bg-black/20 px-3.5 py-2.5 text-sm text-white/75">
                <span>{content[activeSection].enabled ? 'Visible on site' : 'Hidden from site'}</span>
                <input
                  type="checkbox"
                  checked={content[activeSection].enabled}
                  onChange={(event) => {
                    changeContent([activeSection, 'enabled'], event.target.checked);
                  }}
                  className="h-4 w-4 accent-cyan-300"
                />
              </label>
            </div>
            <div className="space-y-4 rounded-2xl border border-violet-300/15 bg-violet-300/[0.05] p-5 sm:p-6">
              <div className="flex items-start gap-3">
                <span className="rounded-xl bg-violet-300/10 p-2.5 text-violet-200">
                  <Sparkles className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-semibold">Ask AI to edit your website</h3>
                  <p className="mt-1 text-sm leading-6 text-white/55">
                    Describe what to add or change in any section. Gemini will prepare a preview; nothing changes until you apply it.
                  </p>
                  <p className="mt-1 text-xs leading-5 text-white/40">
                    Your instruction and current portfolio content are sent to Gemini to prepare the preview.
                  </p>
                  <p className="mt-1 text-xs leading-5 text-white/40">
                    No app-level text limit. Gemini’s own context and response limits still apply to very large requests.
                  </p>
                </div>
              </div>
              <label className="block space-y-2 text-sm text-white/75">
                <span className="sr-only">Describe a website edit</span>
                <textarea
                  value={aiInstruction}
                  onChange={(event) => setAiInstruction(event.target.value)}
                  rows={3}
                  placeholder="For example: Add a new project called …, update my hero headline to …, or add a skill group for …"
                  className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none placeholder:text-white/35 focus:border-violet-300/50"
                />
              </label>
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={requestAiEdit}
                  disabled={aiLoading || aiInstruction.trim().length < 3}
                  className="inline-flex items-center gap-2 rounded-lg bg-violet-300 px-4 py-2.5 text-sm font-semibold text-[#171022] transition hover:bg-violet-200 disabled:cursor-not-allowed disabled:opacity-45"
                >
                  <Sparkles className="h-4 w-4" />
                  {aiLoading ? 'Preparing preview…' : 'Generate preview'}
                </button>
                <span className="text-xs text-white/40">Your current edits are included. Review, apply, then save to publish.</span>
              </div>
              {aiError && <p role="alert" className="text-sm text-red-200">{aiError}</p>}
              {aiProposal && (
                <div className="space-y-3 rounded-xl border border-white/10 bg-black/25 p-4">
                  <div>
                    <p className="font-medium text-white">Preview of proposed changes</p>
                    {aiChangedPaths.length > 0 ? (
                      <>
                        <ul className="mt-3 space-y-2">
                          {aiChangedPaths.slice(0, 8).map((path) => (
                            <li key={path} className="rounded-lg bg-white/[0.05] px-3 py-2">
                              <p className="text-xs font-medium text-cyan-100/80">{path.split('.').map(formatLabel).join(' · ')}</p>
                              <p className="mt-1 whitespace-pre-wrap break-words text-sm text-white/75">
                                {formatPreviewValue(valueAtPath(aiProposal, path.split('.')))}
                              </p>
                            </li>
                          ))}
                          {aiChangedPaths.length > 8 && (
                            <li className="px-2 py-1 text-xs text-white/45">and {aiChangedPaths.length - 8} more</li>
                          )}
                        </ul>
                        <p className="mt-2 text-xs text-white/45">Review the affected section below before applying.</p>
                      </>
                    ) : (
                      <p className="mt-1 text-sm text-white/55">No changes were proposed. Try a more specific instruction.</p>
                    )}
                  </div>
                  {JSON.stringify(content) !== JSON.stringify(aiProposalBase) && (
                    <p role="alert" className="text-sm text-amber-200">Your content changed after this preview. Generate a new preview before applying.</p>
                  )}
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={applyAiProposal}
                      disabled={aiChangedPaths.length === 0 || JSON.stringify(content) !== JSON.stringify(aiProposalBase)}
                      className="rounded-lg bg-cyan-300 px-4 py-2 text-sm font-semibold text-black hover:bg-cyan-200 disabled:cursor-not-allowed disabled:opacity-45"
                    >
                      Apply preview
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setAiProposal(null);
                        setAiProposalBase(null);
                      }}
                      className="rounded-lg border border-white/15 px-4 py-2 text-sm text-white/75 hover:bg-white/[0.06]"
                    >
                      Discard
                    </button>
                  </div>
                </div>
              )}
            </div>
            {fieldEditor}
          </section>
        </div>
      </div>
    </main>
  );
}
