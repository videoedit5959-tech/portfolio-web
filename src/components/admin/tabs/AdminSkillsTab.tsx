import React, { useState } from 'react';
import { SkillData, SkillCategory } from '../../../types/portfolio';
import { Plus, Edit2, Trash2, CheckCircle2, X } from 'lucide-react';
import { IconRenderer } from '../../common/IconRenderer';

interface AdminSkillsTabProps {
  skills: SkillData[];
  onSaveSkill: (skill: SkillData) => void;
  onDeleteSkill: (id: string) => void;
}

export const AdminSkillsTab: React.FC<AdminSkillsTabProps> = ({
  skills,
  onSaveSkill,
  onDeleteSkill,
}) => {
  const [editingSkill, setEditingSkill] = useState<SkillData | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState<Partial<SkillData>>({});

  const openCreate = () => {
    setIsCreating(true);
    setEditingSkill(null);
    setFormData({
      name: '',
      category: 'Frontend',
      level: 85,
      iconName: 'Code',
      displayOrder: skills.length + 1,
      isActive: true,
    });
  };

  const openEdit = (skill: SkillData) => {
    setIsCreating(false);
    setEditingSkill(skill);
    setFormData({ ...skill });
  };

  const closeForm = () => {
    setIsCreating(false);
    setEditingSkill(null);
    setFormData({});
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) return;

    const toSave: SkillData = {
      id: editingSkill ? editingSkill.id : `skill-${Date.now()}`,
      name: formData.name || '',
      category: formData.category || 'Frontend',
      level: Number(formData.level) || 80,
      iconName: formData.iconName || 'Code',
      displayOrder: Number(formData.displayOrder) || 1,
      isActive: formData.isActive !== undefined ? formData.isActive : true,
    };

    onSaveSkill(toSave);
    closeForm();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-zinc-200 dark:border-zinc-800">
        <div>
          <h2 className="text-xl font-bold text-zinc-900 dark:text-white">
            Skills Management
          </h2>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Configure technical stack items, proficiency percentages, and categories.
          </p>
        </div>

        <button
          onClick={openCreate}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 text-xs font-bold hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-colors cursor-pointer shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Add Skill</span>
        </button>
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {skills.map((skill) => (
          <div
            key={skill.id}
            className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-between gap-3 shadow-xs"
          >
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="w-10 h-10 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-cyan-600 dark:text-cyan-400 shrink-0">
                <IconRenderer name={skill.iconName} className="w-5 h-5" />
              </div>
              <div className="truncate">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-sm text-zinc-900 dark:text-white truncate">
                    {skill.name}
                  </h3>
                  {!skill.isActive && (
                    <span className="text-[10px] px-1 rounded bg-zinc-200 dark:bg-zinc-800 text-zinc-500">
                      Hidden
                    </span>
                  )}
                </div>
                <p className="text-xs text-zinc-500 font-mono">
                  {skill.category} • {skill.level}% • #{skill.displayOrder}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1 shrink-0">
              <button
                onClick={() => openEdit(skill)}
                className="p-1.5 rounded-lg text-zinc-500 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => onDeleteSkill(skill.id)}
                className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit / Create Form Modal */}
      {(isCreating || editingSkill) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-200 dark:border-zinc-800">
              <h3 className="text-base font-bold text-zinc-900 dark:text-white">
                {isCreating ? 'Add Technical Skill' : `Edit: ${editingSkill?.name}`}
              </h3>
              <button onClick={closeForm} className="p-1 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                  Skill Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name || ''}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-sm text-zinc-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value as SkillCategory })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-xs text-zinc-900 dark:text-white"
                  >
                    <option value="Frontend">Frontend</option>
                    <option value="Backend">Backend</option>
                    <option value="CMS">CMS</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                    Proficiency % ({formData.level}%)
                  </label>
                  <input
                    type="range"
                    min="30"
                    max="100"
                    value={formData.level || 80}
                    onChange={(e) => setFormData({ ...formData, level: parseInt(e.target.value, 10) })}
                    className="w-full accent-cyan-500 mt-2"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                    Icon Name (Lucide)
                  </label>
                  <input
                    type="text"
                    value={formData.iconName || 'Code'}
                    onChange={(e) => setFormData({ ...formData, iconName: e.target.value })}
                    placeholder="Atom, Server, Database, Globe..."
                    className="w-full px-3 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 font-mono text-zinc-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                    Display Order
                  </label>
                  <input
                    type="number"
                    value={formData.displayOrder || 1}
                    onChange={(e) =>
                      setFormData({ ...formData, displayOrder: parseInt(e.target.value, 10) })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 font-mono text-zinc-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="skill-active"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  className="rounded text-cyan-500"
                />
                <label htmlFor="skill-active" className="text-zinc-700 dark:text-zinc-300 font-medium">
                  Visible on public website
                </label>
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
                  Save Skill
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
