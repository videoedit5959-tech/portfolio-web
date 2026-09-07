import React, { useState } from 'react';
import { ExperienceData } from '../../../types/portfolio';
import { Plus, Edit2, Trash2, X, Briefcase } from 'lucide-react';

interface AdminExperienceTabProps {
  experience: ExperienceData[];
  onSaveExperience: (item: ExperienceData) => void;
  onDeleteExperience: (id: string) => void;
}

export const AdminExperienceTab: React.FC<AdminExperienceTabProps> = ({
  experience,
  onSaveExperience,
  onDeleteExperience,
}) => {
  const [editingItem, setEditingItem] = useState<ExperienceData | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState<Partial<ExperienceData>>({});
  const [techInput, setTechInput] = useState('');

  const openCreate = () => {
    setIsCreating(true);
    setEditingItem(null);
    setFormData({
      companyOrContext: '',
      position: '',
      period: 'Recent',
      isCurrent: true,
      description: '',
      technologies: [],
      displayOrder: experience.length + 1,
      type: 'Hands-on Project Development',
    });
    setTechInput('');
  };

  const openEdit = (item: ExperienceData) => {
    setIsCreating(false);
    setEditingItem(item);
    setFormData({ ...item });
    setTechInput(item.technologies?.join(', ') || '');
  };

  const closeForm = () => {
    setIsCreating(false);
    setEditingItem(null);
    setFormData({});
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.position || !formData.companyOrContext) return;

    const parsedTech = techInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const toSave: ExperienceData = {
      id: editingItem ? editingItem.id : `exp-${Date.now()}`,
      position: formData.position || '',
      companyOrContext: formData.companyOrContext || '',
      period: formData.period || '',
      isCurrent: !!formData.isCurrent,
      description: formData.description || '',
      technologies: parsedTech,
      displayOrder: Number(formData.displayOrder) || 1,
      type: formData.type || 'Hands-on Project Development',
    };

    onSaveExperience(toSave);
    closeForm();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-zinc-200 dark:border-zinc-800">
        <div>
          <h2 className="text-xl font-bold text-zinc-900 dark:text-white">
            Experience & Learning Milestones
          </h2>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Manage project engineering milestones, learning pathways, or client engagements honestly.
          </p>
        </div>

        <button
          onClick={openCreate}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 text-xs font-bold hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-colors cursor-pointer shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Add Milestone</span>
        </button>
      </div>

      {/* List */}
      <div className="space-y-4">
        {experience.map((item) => (
          <div
            key={item.id}
            className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row sm:items-start justify-between gap-4 shadow-xs"
          >
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200">
                  {item.type}
                </span>
                <span className="text-xs font-mono text-zinc-400">
                  {item.period}
                </span>
              </div>

              <h3 className="font-bold text-base text-zinc-900 dark:text-white">
                {item.position}
              </h3>
              <p className="text-xs font-semibold text-cyan-600 dark:text-cyan-400">
                {item.companyOrContext}
              </p>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 max-w-2xl leading-relaxed">
                {item.description}
              </p>

              <div className="flex flex-wrap gap-1 pt-1">
                {item.technologies.map((t) => (
                  <span
                    key={t}
                    className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-1 shrink-0 self-end sm:self-start">
              <button
                onClick={() => openEdit(item)}
                className="p-1.5 rounded-lg text-zinc-500 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => onDeleteExperience(item.id)}
                className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40 cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Form Modal */}
      {(isCreating || editingItem) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <div className="w-full max-w-lg bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-200 dark:border-zinc-800">
              <h3 className="text-base font-bold text-zinc-900 dark:text-white">
                {isCreating ? 'Add Experience Item' : `Edit: ${editingItem?.position}`}
              </h3>
              <button onClick={closeForm} className="p-1 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                    Position / Role Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.position || ''}
                    onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-sm text-zinc-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                    Company or Context *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.companyOrContext || ''}
                    onChange={(e) => setFormData({ ...formData, companyOrContext: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-sm text-zinc-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                    Timeline Period
                  </label>
                  <input
                    type="text"
                    value={formData.period || ''}
                    onChange={(e) => setFormData({ ...formData, period: e.target.value })}
                    placeholder="e.g. 2025 - Present"
                    className="w-full px-3 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                    Category Type
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        type: e.target.value as ExperienceData['type'],
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-xs text-zinc-900 dark:text-white"
                  >
                    <option value="Hands-on Project Development">Hands-on Project Development</option>
                    <option value="Continuous Learning">Continuous Learning</option>
                    <option value="Freelance / Collaboration">Freelance / Collaboration</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                  Description of Responsibilities & Outputs
                </label>
                <textarea
                  rows={3}
                  required
                  value={formData.description || ''}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-xs text-zinc-900 dark:text-white leading-relaxed"
                />
              </div>

              <div>
                <label className="block font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                  Technologies Utilized (comma-separated)
                </label>
                <input
                  type="text"
                  value={techInput}
                  onChange={(e) => setTechInput(e.target.value)}
                  placeholder="React.js, Node.js, Express.js..."
                  className="w-full px-3 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 font-mono text-zinc-900 dark:text-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-zinc-200 dark:border-zinc-800">
                <button
                  type="button"
                  onClick={closeForm}
                  className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg text-xs font-semibold bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 shadow-xs"
                >
                  Save Milestone
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
