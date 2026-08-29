"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ImagePlus, Trash2 } from "lucide-react";
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
      setErrorMsg("Please choose a photo under 5 MB.");
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
      setErrorMsg("Could not process this image. Please try another.");
    }
  };

  const removePhoto = () => {
    setPhotoBlob(null);
    if (photoPreview) URL.revokeObjectURL(photoPreview);
    setPhotoPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSave = async () => {
    if (!title.trim()) {
      setErrorMsg("Please give this memory a title.");
      return;
    }

    setIsSaving(true);
    setErrorMsg("");

    try {
      if (existingMemory && existingMemory.id) {
        await memoryStorage.updateMemory(existingMemory.id, {
          title: title.trim(),
          year: year.trim() || new Date().getFullYear().toString(),
          description: description.trim(),
          photoBlob: photoBlob,
        });
      } else {
        await memoryStorage.addMemory({
          title: title.trim(),
          year: year.trim() || new Date().getFullYear().toString(),
          description: description.trim(),
          photoBlob: photoBlob,
        });
      }
      
      setShowToast(true);
      setTimeout(() => {
        setIsSaving(false);
        onClose();
      }, 500);
    } catch (err) {
      console.error(err);
      setErrorMsg("Something went wrong while saving.");
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!existingMemory || !existingMemory.id) return;
    
    setIsSaving(true);
    try {
      await memoryStorage.deleteMemory(existingMemory.id);
      setIsSaving(false);
      onClose();
    } catch (err) {
      console.error(err);
      setErrorMsg("Failed to delete memory.");
      setIsSaving(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Modal Window - Compact & Neobrutalist */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-md bg-white neo-border neo-shadow p-5 sm:p-6 flex flex-col z-10"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b-2 border-[#1a1c1c] mb-4">
            <div>
              <h2 className="font-display-lg text-2xl font-black uppercase text-[#1a1c1c] tracking-tight">
                {existingMemory ? "Edit Memory" : "Add A Special Memory"}
              </h2>
              <p className="font-body-md text-xs text-[#434655]">
                Preserve a cherished moment, celebration, or story.
              </p>
            </div>
            <button 
              onClick={onClose}
              className="w-8 h-8 bg-white neo-border flex items-center justify-center hover:bg-[#ffe083] transition-colors cursor-pointer shrink-0 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              aria-label="Close modal"
            >
              <X className="w-5 h-5 stroke-[2.5]" />
            </button>
          </div>

          {showToast && (
            <div className="bg-[#6bff8f] text-[#002109] neo-border font-label-caps text-xs font-bold uppercase p-2 text-center mb-3">
              ✓ Memory Saved Successfully
            </div>
          )}

          {errorMsg && (
            <div className="bg-[#ffdad6] text-[#93000a] neo-border font-bold text-xs p-2.5 mb-3 text-center">
              {errorMsg}
            </div>
          )}

          <div className="flex flex-col gap-3.5">
            
            {/* COMPACT PHOTO SECTION */}
            <div className="flex items-center gap-4 bg-[#f9f9f8] neo-border p-3">
              <input 
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                aria-label="Upload photo"
              />
              
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#ffe083] neo-border shrink-0 flex items-center justify-center overflow-hidden">
                {photoPreview ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <ImagePlus className="w-8 h-8 text-[#735c00]" />
                )}
              </div>

              <div className="flex flex-col gap-1.5 flex-1">
                <button 
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-3 py-1.5 bg-white neo-border font-label-caps text-xs font-bold uppercase hover:bg-[#ffe083] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <ImagePlus className="w-3.5 h-3.5" />
                  <span>{photoPreview ? "Change Photo" : "Upload Memory Photo"}</span>
                </button>
                {photoPreview && (
                  <button 
                    type="button"
                    onClick={removePhoto}
                    className="px-3 py-1 bg-[#ffdad6] text-[#ba1a1a] neo-border font-label-caps text-[10px] font-bold uppercase hover:bg-[#ffb4ab] transition-colors flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>Remove Photo</span>
                  </button>
                )}
              </div>
            </div>

            {/* TITLE & YEAR ROW */}
            <div className="grid grid-cols-3 gap-2">
              <div className="col-span-2">
                <label htmlFor="memory-title" className="block font-label-caps text-xs font-bold uppercase text-[#1a1c1c] mb-1">
                  Title
                </label>
                <input 
                  id="memory-title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="E.g. Diwali in Jaipur"
                  className="w-full h-11 px-3 bg-white neo-border-2 font-body-md text-base text-[#1a1c1c] focus:outline-none focus:bg-[#dbe1ff]/20 focus:border-[#2563eb]"
                />
              </div>
              <div>
                <label htmlFor="memory-year" className="block font-label-caps text-xs font-bold uppercase text-[#1a1c1c] mb-1">
                  Year
                </label>
                <input 
                  id="memory-year"
                  type="text"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  placeholder="1995"
                  className="w-full h-11 px-3 bg-white neo-border-2 font-body-md text-base text-[#1a1c1c] focus:outline-none focus:bg-[#dbe1ff]/20 focus:border-[#2563eb]"
                />
              </div>
            </div>

            {/* DESCRIPTION */}
            <div>
              <label htmlFor="memory-desc" className="block font-label-caps text-xs font-bold uppercase text-[#1a1c1c] mb-1">
                Short Note / Memory Detail
              </label>
              <textarea 
                id="memory-desc"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="What happened on this day? Who was there?"
                rows={2}
                className="w-full p-2.5 bg-white neo-border-2 font-body-md text-sm text-[#1a1c1c] focus:outline-none focus:border-[#2563eb] resize-none"
              />
            </div>

            {/* DELETE OPTION (IF EDITING) */}
            {existingMemory && (
              <div className="pt-2 border-t border-[#1a1c1c]">
                {!showDeleteConfirm ? (
                  <button 
                    type="button"
                    onClick={() => setShowDeleteConfirm(true)}
                    className="w-full py-2 bg-[#ffdad6] text-[#ba1a1a] neo-border font-label-caps text-xs font-bold uppercase hover:bg-[#ffb4ab] transition-colors cursor-pointer"
                  >
                    Delete Memory
                  </button>
                ) : (
                  <div className="bg-[#ffdad6] neo-border p-3 text-center">
                    <p className="font-bold text-xs text-[#93000a] mb-2">Delete this memory?</p>
                    <div className="flex gap-2 justify-center">
                      <button 
                        type="button"
                        onClick={() => setShowDeleteConfirm(false)}
                        className="px-4 py-1.5 bg-white neo-border font-label-caps text-xs font-bold uppercase"
                      >
                        Keep
                      </button>
                      <button 
                        type="button"
                        onClick={handleDelete}
                        disabled={isSaving}
                        className="px-4 py-1.5 bg-[#ba1a1a] text-white neo-border font-label-caps text-xs font-bold uppercase"
                      >
                        {isSaving ? "Deleting..." : "Confirm Delete"}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
            
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex gap-3 pt-4 border-t-2 border-[#1a1c1c] mt-4">
            <button 
              type="button"
              onClick={onClose}
              disabled={isSaving}
              className="flex-1 h-12 bg-white text-[#1a1c1c] neo-border font-headline-lg text-sm uppercase font-black hover:bg-[#f4f4f3] transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button 
              type="button"
              onClick={handleSave}
              disabled={isSaving || showDeleteConfirm}
              className="flex-1 h-12 bg-[#2563eb] text-white neo-border shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[1px] hover:translate-x-[1px] active:translate-y-[3px] active:translate-x-[3px] active:shadow-none font-headline-lg text-sm uppercase font-black tracking-wider transition-all cursor-pointer disabled:opacity-50"
            >
              {isSaving ? "Saving..." : (existingMemory ? "Save Changes" : "Save Memory")}
            </button>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
