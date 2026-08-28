"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ImagePlus, Trash2, Calendar, FileText } from "lucide-react";
import { Memory } from "@/lib/db/dexie";
import { memoryStorage, compressImage } from "@/lib/family/memoryStorage";

interface AddMemoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  existingMemory?: Memory | null;
}

export function AddMemoryModal({ isOpen, onClose, existingMemory }: AddMemoryModalProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [description, setDescription] = useState("");
  const [photoBlob, setPhotoBlob] = useState<Blob | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  
  const [isSaving, setIsSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showToast, setShowToast] = useState(false);

  // Initialize form if editing
  useEffect(() => {
    if (isOpen && existingMemory) {
      setTitle(existingMemory.title);
      setYear(existingMemory.year);
      setDescription(existingMemory.description || "");
      setPhotoBlob(existingMemory.photoBlob);
      if (existingMemory.photoBlob) {
        setPhotoPreview(URL.createObjectURL(existingMemory.photoBlob));
      } else {
        setPhotoPreview(null);
      }
      setShowDeleteConfirm(false);
      setErrorMsg("");
      setShowToast(false);
    } else if (isOpen) {
      // Reset form
      setTitle("");
      setYear(new Date().getFullYear().toString());
      setDescription("");
      setPhotoBlob(null);
      setPhotoPreview(null);
      setShowDeleteConfirm(false);
      setErrorMsg("");
      setShowToast(false);
    }
    
    return () => {
      if (photoPreview) URL.revokeObjectURL(photoPreview);
    };
  }, [isOpen, existingMemory]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setErrorMsg("Please select a valid image file.");
      return;
    }

    const MAX_SIZE = 5 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      setErrorMsg("This photo is a little too large. Please choose a photo under 5 MB.");
      return;
    }

    setErrorMsg("");
    
    try {
      const compressed = await compressImage(file);
      setPhotoBlob(compressed);
      
      if (photoPreview) URL.revokeObjectURL(photoPreview);
      setPhotoPreview(URL.createObjectURL(compressed));
    } catch (err) {
      console.error(err);
      setErrorMsg("Something went wrong while processing the image. Please try another one.");
    }
  };

  const removePhoto = () => {
    setPhotoBlob(null);
    if (photoPreview) {
      URL.revokeObjectURL(photoPreview);
      setPhotoPreview(null);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSave = async () => {
    if (!title.trim()) {
      setErrorMsg("Please enter a title for this memory.");
      return;
    }
    if (!year.trim()) {
      setErrorMsg("Please enter the year.");
      return;
    }

    setIsSaving(true);
    setErrorMsg("");

    try {
      if (existingMemory?.id) {
        await memoryStorage.updateMemory(existingMemory.id, {
          title: title.trim(),
          year: year.trim(),
          description: description.trim(),
          photoBlob,
        });
      } else {
        await memoryStorage.addMemory({
          title: title.trim(),
          year: year.trim(),
          description: description.trim(),
          photoBlob,
          personIds: [],
        });
      }

      setShowToast(true);
      setTimeout(() => {
        setIsSaving(false);
        onClose();
      }, 1000);
      
    } catch (err) {
      console.error(err);
      setErrorMsg("Could not save memory. Please try again.");
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!existingMemory?.id) return;
    setIsSaving(true);
    try {
      await memoryStorage.deleteMemory(existingMemory.id);
      setIsSaving(false);
      onClose();
    } catch (err) {
      console.error(err);
      setErrorMsg("Could not remove memory.");
      setIsSaving(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-end justify-center md:items-center">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        />

        <motion.div 
          initial={{ opacity: 0, y: "100%", scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: "100%", scale: 0.98 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="relative w-full max-w-xl bg-smriti-bg md:rounded-[32px] rounded-t-[32px] rounded-b-none p-6 md:p-8 shadow-2xl flex flex-col max-h-[90vh] overflow-y-auto"
        >
          <div className="flex items-center justify-between mb-6 border-b border-smriti-border/50 pb-4">
            <div>
              <h2 className="text-2xl font-bold text-smriti-text">
                {existingMemory ? "Edit Memory" : "Add a new memory"}
              </h2>
              <p className="text-sm font-medium text-smriti-muted mt-1">
                {existingMemory ? "Update this memory's details." : "Preserve a special moment."}
              </p>
            </div>
            <button 
              onClick={onClose}
              className="p-3 bg-smriti-surface border border-smriti-border rounded-full hover:bg-smriti-primary/10 transition-colors touch-target shrink-0"
              aria-label="Close modal"
            >
              <X className="w-6 h-6 text-smriti-text" />
            </button>
          </div>

          {showToast && (
            <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-smriti-primary text-white font-bold px-6 py-3 rounded-full shadow-lg flex items-center gap-2 z-50 animate-bounce">
              ✓ {title.trim()} saved
            </div>
          )}

          {errorMsg && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-2xl mb-6 font-medium text-center">
              {errorMsg}
            </div>
          )}

          <div className="flex-1 overflow-y-auto pr-2 pb-4 flex flex-col gap-6">
            
            {/* PHOTO SECTION */}
            <div className="flex flex-col">
              <input 
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
              />
              
              <div className="mb-4">
                {photoPreview ? (
                  <div className="relative w-full h-48 md:h-64 rounded-[24px] overflow-hidden border-2 border-smriti-border shadow-sm">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full h-48 md:h-64 rounded-[24px] bg-smriti-surface border-2 border-dashed border-smriti-border flex flex-col items-center justify-center cursor-pointer hover:border-smriti-primary/50 transition-colors"
                  >
                     <ImagePlus className="w-12 h-12 text-smriti-primary/40 mb-3" />
                     <span className="text-smriti-text font-bold text-lg">Add a photo</span>
                     <span className="text-smriti-muted text-sm mt-1">Optional, but recommended</span>
                  </div>
                )}
              </div>

              {photoPreview && (
                <div className="flex gap-3 justify-center">
                  <button 
                    onClick={() => fileInputRef.current?.click()}
                    className="px-6 py-3 bg-smriti-surface border border-smriti-border rounded-full font-bold text-smriti-text hover:bg-smriti-primary/10 transition-colors touch-target flex items-center gap-2"
                  >
                    <ImagePlus className="w-5 h-5" />
                    Change photo
                  </button>
                  <button 
                    onClick={removePhoto}
                    className="p-3 bg-smriti-surface border border-smriti-border rounded-full font-bold text-red-500 hover:bg-red-50 transition-colors touch-target"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>

            {/* DETAILS SECTION */}
            <div>
              <label htmlFor="memory-title" className="block text-lg font-bold text-smriti-text mb-2">
                Memory Title
              </label>
              <input 
                id="memory-title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="E.g., Diwali at home"
                className="w-full p-4 md:p-5 bg-smriti-surface border-2 border-smriti-border rounded-2xl text-xl text-smriti-text focus:border-smriti-primary focus:ring-4 focus:ring-smriti-primary/10 outline-none transition-all touch-target"
              />
            </div>

            <div>
              <label htmlFor="memory-year" className="block text-lg font-bold text-smriti-text mb-2">
                Year
              </label>
              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-smriti-muted" />
                <input 
                  id="memory-year"
                  type="number"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  placeholder="2023"
                  className="w-full p-4 pl-14 md:p-5 md:pl-16 bg-smriti-surface border-2 border-smriti-border rounded-2xl text-xl text-smriti-text focus:border-smriti-primary focus:ring-4 focus:ring-smriti-primary/10 outline-none transition-all touch-target"
                />
              </div>
            </div>

            <div>
              <label htmlFor="memory-desc" className="block text-lg font-bold text-smriti-text mb-2">
                Description (Optional)
              </label>
              <div className="relative">
                <FileText className="absolute left-4 top-5 w-6 h-6 text-smriti-muted" />
                <textarea 
                  id="memory-desc"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="A few words about this memory..."
                  rows={3}
                  className="w-full p-4 pl-14 md:p-5 md:pl-16 bg-smriti-surface border-2 border-smriti-border rounded-2xl text-lg text-smriti-text focus:border-smriti-primary focus:ring-4 focus:ring-smriti-primary/10 outline-none transition-all touch-target resize-none"
                />
              </div>
            </div>

            {/* DELETE SECTION (IF EDITING) */}
            {existingMemory && (
              <div className="pt-4 border-t border-smriti-border/50">
                {!showDeleteConfirm ? (
                  <button 
                    onClick={() => setShowDeleteConfirm(true)}
                    className="w-full py-4 text-red-600 font-bold text-lg rounded-2xl hover:bg-red-50 transition-colors touch-target"
                  >
                    Remove this memory
                  </button>
                ) : (
                  <div className="bg-red-50 border border-red-200 p-6 rounded-3xl text-center">
                    <p className="text-red-800 font-bold text-lg mb-2">Remove memory?</p>
                    <p className="text-red-700/80 mb-6 font-medium">This will remove this memory forever.</p>
                    <div className="flex gap-4">
                      <button 
                        onClick={() => setShowDeleteConfirm(false)}
                        className="flex-1 py-4 bg-white text-smriti-text font-bold rounded-full border border-smriti-border touch-target"
                      >
                        Keep
                      </button>
                      <button 
                        onClick={handleDelete}
                        disabled={isSaving}
                        className="flex-1 py-4 bg-red-600 text-white font-bold rounded-full touch-target hover:bg-red-700 disabled:opacity-50"
                      >
                        {isSaving ? "Removing..." : "Remove"}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
            
          </div>

          <div className="flex gap-4 pt-6 border-t border-smriti-border/50 mt-auto bg-smriti-bg">
            <button 
              onClick={onClose}
              disabled={isSaving}
              className="flex-1 py-4 bg-smriti-surface text-smriti-text font-bold text-lg rounded-full border-2 border-smriti-border hover:bg-smriti-border/30 transition-colors touch-target disabled:opacity-50"
            >
              Cancel
            </button>
            <button 
              onClick={handleSave}
              disabled={isSaving || showDeleteConfirm}
              className="flex-1 py-4 bg-smriti-primary text-white font-bold text-lg rounded-full shadow-md hover:scale-[1.02] active:scale-95 transition-all touch-target disabled:opacity-50 disabled:scale-100"
            >
              {isSaving ? "Saving..." : (existingMemory ? "Save Changes" : "Save Memory")}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
