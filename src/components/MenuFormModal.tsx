import React, { useState, useEffect } from 'react';
import { Menu, MenuIngredient, RecipeType, CATEGORIES, UNITS } from '../types';
import { X, Plus, Trash2, Tag, Upload, Image as ImageIcon, Link as LinkIcon, BookOpen, AlertCircle } from 'lucide-react';

interface MenuFormModalProps {
  menuToEdit?: Menu;
  onClose: () => void;
  onSave: (menuData: Omit<Menu, 'id' | 'createdAt'>) => void;
}

export const MenuFormModal: React.FC<MenuFormModalProps> = ({ menuToEdit, onClose, onSave }) => {
  // 1. Core Field States
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [recipeType, setRecipeType] = useState<RecipeType>('written');
  const [recipeText, setRecipeText] = useState('');
  const [recipeUrl, setRecipeUrl] = useState('');
  const [dateLastMade, setDateLastMade] = useState('');
  const [notes, setNotes] = useState('');

  // 2. Ingredients List Builder
  const [ingredients, setIngredients] = useState<MenuIngredient[]>([
    { name: '', quantity: null, unit: 'piece' }
  ]);

  // 3. Image Selection States
  const [imageType, setImageType] = useState<'upload' | 'url'>('upload');
  const [customFileBase64, setCustomFileBase64] = useState<string | null>(null);
  const [customImageUrl, setCustomImageUrl] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // 4. Populate edit mode if editing
  useEffect(() => {
    if (menuToEdit) {
      setName(menuToEdit.name);
      setDescription(menuToEdit.description || '');
      setCategory(menuToEdit.category);
      setRecipeType(menuToEdit.recipeType);
      setRecipeText(menuToEdit.recipeText || '');
      setRecipeUrl(menuToEdit.recipeUrl || '');
      setDateLastMade(menuToEdit.dateLastMade || '');
      setNotes(menuToEdit.notes || '');
      
      if (menuToEdit.ingredients && menuToEdit.ingredients.length > 0) {
        setIngredients([...menuToEdit.ingredients]);
      } else {
        setIngredients([{ name: '', quantity: null, unit: 'piece' }]);
      }

      const imageUrl = menuToEdit.imageUrls?.[0] || '';
      
      // Determine what image type it is
      if (imageUrl.startsWith('data:image')) {
        setImageType('upload');
        setCustomFileBase64(imageUrl);
      } else if (imageUrl) {
        setImageType('url');
        setCustomImageUrl(imageUrl);
      } else {
        setImageType('upload');
        setCustomFileBase64(null);
        setCustomImageUrl('');
      }
    }
  }, [menuToEdit]);

  // Handle ingredient builders
  const handleAddIngredientRow = () => {
    setIngredients([...ingredients, { name: '', quantity: null, unit: 'piece' }]);
  };

  const handleRemoveIngredientRow = (index: number) => {
    const updated = ingredients.filter((_, idx) => idx !== index);
    setIngredients(updated.length > 0 ? updated : [{ name: '', quantity: null, unit: 'piece' }]);
  };

  const handleIngredientChange = (index: number, field: keyof MenuIngredient, value: any) => {
    const updated = ingredients.map((ing, idx) => {
      if (idx === index) {
        if (field === 'quantity') {
          const num = value === '' ? null : Number(value);
          return { ...ing, [field]: isNaN(num as number) ? null : num };
        }
        return { ...ing, [field]: value };
      }
      return ing;
    });
    setIngredients(updated);
  };

  // Convert uploaded image file to lightweight Base64
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      // Small basic compression can be handled on backend, but Base64 dataURL works instantly
      setCustomFileBase64(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  // Basic Form validation
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};

    if (!name.trim()) {
      newErrors.name = 'Dish Name is required.';
    }

    if (recipeType === 'link' && !recipeUrl.trim()) {
      newErrors.recipeUrl = 'Recipe Link URL is required.';
    } else if (recipeType === 'link' && recipeUrl.trim() && !recipeUrl.startsWith('http')) {
      newErrors.recipeUrl = 'Please enter a valid URL (starting with http:// or https://).';
    }

    // Filter out blank ingredients
    const cleanIngredients = ingredients.filter(ing => !!ing.name.trim());
    if (cleanIngredients.length === 0) {
      newErrors.ingredients = 'Please write down at least one ingredient name.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      // scroll to errors
      return;
    }

    // Determine finalized image URLs array
    let finalImageUrl = '';
    if (imageType === 'upload' && customFileBase64) {
      finalImageUrl = customFileBase64;
    } else if (imageType === 'url' && customImageUrl.trim()) {
      finalImageUrl = customImageUrl.trim();
    }

    onSave({
      name: name.trim(),
      description: description.trim() || undefined,
      category,
      recipeType,
      recipeText: recipeType === 'written' ? recipeText.trim() : undefined,
      recipeUrl: recipeType === 'link' ? recipeUrl.trim() : undefined,
      dateLastMade: dateLastMade || undefined,
      cookCount: menuToEdit?.cookCount,
      notes: notes.trim() || undefined,
      ingredients: cleanIngredients,
      imageUrls: finalImageUrl ? [finalImageUrl] : []
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-4xl rounded-3xl bg-white shadow-2xl overflow-hidden my-6 flex flex-col max-h-[92vh]" id="menu-form-panel">
        
        {/* Sticky Header info */}
        <div className="flex items-center justify-between border-b border-earth-sand px-6 py-4.5 bg-earth-cream">
          <div>
            <span className="text-xs font-semibold text-earth-clay tracking-wider uppercase">Menu Library Builder</span>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-earth-olive">
              {menuToEdit ? `Edit Dish: ${menuToEdit.name}` : 'Create New Menu Entry'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-earth-charcoal border border-earth-sand hover:bg-earth-sand transition"
            id="close-form-modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Scrollable Form Fields */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Left Column: Core Fields */}
            <div className="space-y-6">
              
              {/* Dish Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-earth-charcoal tracking-wide uppercase flex items-center gap-1.5">
                  <span>Dish Name *</span>
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (errors.name) setErrors({ ...errors, name: '' });
                  }}
                  placeholder="e.g., Spicy Szechuan Noodles"
                  className={`w-full rounded-xl border px-4 py-3 text-sm focus:ring-1 focus:ring-earth-sage focus:border-earth-sage transition bg-earth-cream/40 ${
                    errors.name ? 'border-red-400 bg-red-50/20' : 'border-earth-sand'
                  }`}
                  id="form-dish-name"
                  required
                />
                {errors.name && (
                  <p className="text-xs text-red-600 flex items-center gap-1">
                    <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                    <span>{errors.name}</span>
                  </p>
                )}
              </div>

              {/* Tag Category and Date last made */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-earth-charcoal tracking-wide uppercase flex items-center gap-1.5">
                    <Tag className="h-3.5 w-3.5 text-earth-sage" />
                    <span>Cuisine/Category</span>
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full rounded-xl border border-earth-sand px-4 py-3 text-sm focus:ring-1 focus:ring-earth-sage focus:border-earth-sage transition bg-white"
                  >
                    {CATEGORIES.map(cat => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-earth-charcoal tracking-wide uppercase">
                    <span>Date Last Made</span>
                  </label>
                  <input
                    type="date"
                    value={dateLastMade}
                    onChange={(e) => setDateLastMade(e.target.value)}
                    className="w-full rounded-xl border border-earth-sand px-4 py-3 text-sm focus:ring-1 focus:ring-earth-sage focus:border-earth-sage transition bg-white"
                  />
                </div>
              </div>

              {/* Short Description */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-earth-charcoal tracking-wide uppercase">
                  <span>Short Description</span>
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Tell a brief backstory or details about the texture and sensory tastes..."
                  rows={2}
                  className="w-full rounded-xl border border-earth-sand px-4 py-3 text-sm focus:ring-1 focus:ring-earth-sage focus:border-earth-sage transition bg-earth-cream/40"
                />
              </div>

              {/* Chef Notes */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-earth-charcoal tracking-wide uppercase">
                  <span>Chef Tips & Personal Notes</span>
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Any secret substitutions, temperature controls, or side-dish parings?"
                  rows={2}
                  className="w-full rounded-xl border border-earth-sand px-4 py-3 text-sm focus:ring-1 focus:ring-earth-sage focus:border-earth-sage transition bg-earth-cream/40"
                />
              </div>

              {/* Cover Image Selector */}
              <div className="space-y-3 pt-2">
                <label className="text-xs font-bold text-earth-charcoal tracking-wide uppercase block">
                  <span>Cover Photo Setup</span>
                </label>
                <div className="flex border-b border-earth-sand text-xs font-semibold">
                  <button
                    type="button"
                    onClick={() => setImageType('upload')}
                    className={`flex-1 pb-2 border-b-2 text-center transition ${
                      imageType === 'upload' ? 'border-earth-olive text-earth-olive font-bold' : 'border-transparent text-earth-warm-gray'
                    }`}
                  >
                    Upload File
                  </button>
                  <button
                    type="button"
                    onClick={() => setImageType('url')}
                    className={`flex-1 pb-2 border-b-2 text-center transition ${
                      imageType === 'url' ? 'border-earth-olive text-earth-olive font-bold' : 'border-transparent text-earth-warm-gray'
                    }`}
                  >
                    Web URL Image
                  </button>
                </div>

                {imageType === 'upload' && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-center w-full">
                      <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed border-earth-sand rounded-xl cursor-pointer hover:bg-earth-sand/30 transition">
                        <div className="flex flex-col items-center justify-center pt-3 pb-3">
                          <Upload className="w-6 h-6 text-earth-sage mb-1" />
                          <p className="text-xs text-earth-charcoal font-medium">Select photo from device</p>
                          <p className="text-[10px] text-earth-warm-gray">JPG, PNG, WebP</p>
                        </div>
                        <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                      </label>
                    </div>
                    {customFileBase64 && (
                      <div className="flex items-center gap-3 p-2 bg-earth-sage-light/40 border border-earth-sand rounded-xl text-xs">
                        <img src={customFileBase64} alt="Preview" className="h-10 w-10 object-cover rounded-lg border border-earth-sand" />
                        <span className="truncate flex-1 font-medium text-earth-charcoal">Custom upload ready!</span>
                        <button type="button" onClick={() => setCustomFileBase64(null)} className="text-red-500 hover:text-red-700">
                          Clear
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {imageType === 'url' && (
                  <div className="space-y-2">
                    <input
                      type="url"
                      value={customImageUrl}
                      onChange={(e) => setCustomImageUrl(e.target.value)}
                      placeholder="Paste Unsplash or static image URL..."
                      className="w-full rounded-xl border border-earth-sand px-4 py-2.5 text-xs focus:ring-1 focus:ring-earth-sage focus:border-earth-sage transition bg-white"
                    />
                    {customImageUrl.trim() && (
                      <div className="aspect-video w-full rounded-xl overflow-hidden bg-earth-sand border border-earth-sand max-h-24">
                        <img src={customImageUrl} alt="Web preview" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      </div>
                    )}
                  </div>
                )}
              </div>

            </div>

            {/* Right Column: Recipe instructions and ingredients */}
            <div className="space-y-6">
              
              {/* Recipe Type / Toggle and content */}
              <div className="space-y-3">
                <label className="text-xs font-bold text-earth-charcoal tracking-wide uppercase flex items-center gap-1.5">
                  <span>Recipe Guidelines *</span>
                </label>
                <div className="flex rounded-xl bg-earth-cream p-1 border border-earth-sand">
                  <button
                    type="button"
                    onClick={() => {
                      setRecipeType('written');
                      if (errors.recipeUrl) setErrors({ ...errors, recipeUrl: '' });
                    }}
                    className={`flex-1 flex items-center justify-center gap-2 py-2 text-xs font-medium rounded-lg transition ${
                      recipeType === 'written' ? 'bg-white text-earth-olive font-bold shadow-xs' : 'text-earth-warm-gray hover:text-earth-charcoal'
                    }`}
                  >
                    <BookOpen className="h-4 w-4" />
                    <span>Written instructions</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setRecipeType('link')}
                    className={`flex-1 flex items-center justify-center gap-2 py-2 text-xs font-medium rounded-lg transition ${
                      recipeType === 'link' ? 'bg-white text-earth-olive font-bold shadow-xs' : 'text-earth-warm-gray hover:text-earth-charcoal'
                    }`}
                  >
                    <LinkIcon className="h-4 w-4" />
                    <span>Link to Recipe URL</span>
                  </button>
                </div>

                {recipeType === 'written' ? (
                  <div className="space-y-1">
                    <textarea
                      value={recipeText}
                      onChange={(e) => setRecipeText(e.target.value)}
                      placeholder={`1. Chop onions and garlic...\n2. Heat oil in a heavy-bottomed pan...\n3. Simmer sauce for 35 mins...`}
                      rows={6}
                      className="w-full rounded-xl border border-earth-sand px-4 py-3 text-sm focus:ring-1 focus:ring-earth-sage focus:border-earth-sage transition bg-white"
                    />
                  </div>
                ) : (
                  <div className="space-y-1.5">
                    <input
                      type="url"
                      value={recipeUrl}
                      onChange={(e) => {
                        setRecipeUrl(e.target.value);
                        if (errors.recipeUrl) setErrors({ ...errors, recipeUrl: '' });
                      }}
                      placeholder="https://www.seriouseats.com/my-recipe..."
                      className={`w-full rounded-xl border px-4 py-3 text-sm focus:ring-1 focus:ring-earth-sage focus:border-earth-sage transition bg-white ${
                        errors.recipeUrl ? 'border-red-400 bg-red-50/20' : 'border-earth-sand'
                      }`}
                    />
                    {errors.recipeUrl && (
                      <p className="text-xs text-red-600 flex items-center gap-1">
                        <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                        <span>{errors.recipeUrl}</span>
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* Ingredients List Row Builder */}
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-earth-sand pb-2">
                  <label className="text-xs font-bold text-earth-charcoal tracking-wide uppercase">
                    <span>Menu Ingredients *</span>
                  </label>
                  <button
                    type="button"
                    onClick={handleAddIngredientRow}
                    className="inline-flex items-center gap-1 text-xs font-bold text-earth-clay hover:text-earth-clay-dark"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    <span>Add Item</span>
                  </button>
                </div>

                {errors.ingredients && (
                  <p className="text-xs text-red-600 flex items-center gap-1 mb-2">
                    <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                    <span>{errors.ingredients}</span>
                  </p>
                )}

                <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                  {ingredients.map((ing, idx) => (
                    <div key={idx} className="flex gap-2 items-center">
                      {/* Name */}
                      <input
                        type="text"
                        value={ing.name}
                        onChange={(e) => {
                          handleIngredientChange(idx, 'name', e.target.value);
                          if (errors.ingredients) setErrors({ ...errors, ingredients: '' });
                        }}
                        placeholder="Garlic cloves, Olive oil, Rice..."
                        className="flex-3 rounded-xl border border-earth-sand px-3 py-2 text-xs focus:ring-1 focus:ring-earth-sage focus:border-earth-sage transition bg-white"
                        required
                      />

                      {/* Quantity */}
                      <input
                        type="number"
                        step="any"
                        placeholder="Qty"
                        value={ing.quantity === null ? '' : ing.quantity}
                        onChange={(e) => handleIngredientChange(idx, 'quantity', e.target.value)}
                        className="flex-1 w-16 text-center rounded-xl border border-earth-sand px-2 py-2 text-xs focus:ring-1 focus:ring-earth-sage focus:border-earth-sage transition bg-white"
                      />

                      {/* Unit */}
                      <select
                        value={ing.unit}
                        onChange={(e) => handleIngredientChange(idx, 'unit', e.target.value)}
                        className="flex-2 rounded-xl border border-earth-sand px-2 py-2 text-xs focus:ring-1 focus:ring-earth-sage focus:border-earth-sage transition bg-white"
                      >
                        {UNITS.map(unit => (
                          <option key={unit} value={unit}>
                            {unit}
                          </option>
                        ))}
                      </select>

                      {/* Delete */}
                      <button
                        type="button"
                        onClick={() => handleRemoveIngredientRow(idx)}
                        className="text-earth-warm-gray hover:text-red-500 p-1.5 transition shrink-0"
                        title="Delete ingredient row"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>

          {/* Stick Footer buttons */}
          <div className="flex items-center justify-end gap-3 pt-6 border-t border-earth-sand">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-earth-sand hover:bg-earth-sand px-5 py-2.5 text-sm font-semibold text-earth-charcoal transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-xl bg-earth-olive hover:bg-earth-olive-light px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition"
              id="submit-menu-form"
            >
              Save Menu Entry
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
