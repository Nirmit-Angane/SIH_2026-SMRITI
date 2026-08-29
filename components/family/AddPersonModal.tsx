"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ImagePlus, UserCircle2, Trash2 } from "lucide-react";
import { FamilyMember } from "@/lib/db/dexie";
import { familyStorage, compressImage } from "@/lib/family/familyStorage";

interface AddPersonModalProps {
  isOpen: boolean;
  onClose: () => void;
  existingPerson?: FamilyMember | null;
}

const RELATIONSHIPS = [
  "Daughter", "Son", "Wife", "Husband", 
  "Mother", "Father", "Sister", "Brother", 
  "Granddaughter", "Grandson", "Grandmother", "Grandfather", 
  "Friend", "Caregiver", "Other"
];

export function AddPersonModal({ isOpen, onClose, existingPerson }: AddPersonModalProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [name, setName] = useState("");
  const [relation, setRelation] = useState("Daughter");
  const [customRelation, setCustomRelation] = useState("");
  const [photoBlob, setPhotoBlob] = useState<Blob | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  
  const [isSaving, setIsSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showToast, setShowToast] = useState(false);

  // Initialize form if editing
  useEffect(() => {
    if (isOpen && existingPerson) {
      setName(existingPerson.name);
      
      if (RELATIONSHIPS.includes(existingPerson.relationship)) {
        setRelation(existingPerson.relationship);
        setCustomRelation("");
      } else {
        setRelation("Other");
        setCustomRelation(existingPerson.relationship);
      }
      
      setPhotoBlob(existingPerson.photoBlob);
      if (existingPerson.photoBlob) {
        setPhotoPreview(URL.createObjectURL(existingPerson.photoBlob));
      } else {
        setPhotoPreview(null);
      }
      
      setShowDeleteConfirm(false);
      setErrorMsg("");
      setShowToast(false);
    } else if (isOpen) {
      // Reset form
      setName("");
      setRelation("Daughter");
      setCustomRelation("");
      setPhotoBlob(null);
      setPhotoPreview(null);
      setShowDeleteConfirm(false);
      setErrorMsg("");
      setShowToast(false);
    }
    
    // Cleanup ObjectURL
    return () => {
      if (photoPreview) URL.revokeObjectURL(photoPreview);
    };
  }, [isOpen, existingPerson]);

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
    if (!name.trim()) {
      setErrorMsg("Please enter their name.");
      return;
    }

    const finalRelation = relation === "Other" ? (customRelation.trim() || "Other") : relation;
    
    setIsSaving(true);
    setErrorMsg("");

    try {
      if (existingPerson && existingPerson.id) {
        await familyStorage.updateFamilyMember(existingPerson.id, {
          name: name.trim(),
          relationship: finalRelation,
          photoBlob: photoBlob,
        });
      } else {
        await familyStorage.addFamilyMember({
          name: name.trim(),
          relationship: finalRelation,
          photoBlob: photoBlob,
          useInGames: true,
        });
      }
      
      setShowToast(true);
      setTimeout(() => {
        setIsSaving(false);
        onClose();
      }, 500);
    } catch (err) {
      console.error(err);
      setErrorMsg("Something went wrong while saving. Please try again.");
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!existingPerson || !existingPerson.id) return;
    
    setIsSaving(true);
    try {
      await familyStorage.deleteFamilyMember(existingPerson.id);
      setIsSaving(false);
      onClose();
    } catch (err) {
      console.error(err);
      setErrorMsg("Failed to delete person.");
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
                {existingPerson ? "Edit Person" : "Add Someone You Know"}
              </h2>
              <p className="font-body-md text-xs text-[#434655]">
                {existingPerson ? "Update their details below." : "Add a familiar face to help SMRITI remember."}
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
              ✓ {name.trim()} Saved Successfully
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
              
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#dbe1ff] neo-border shrink-0 flex items-center justify-center overflow-hidden">
                {photoPreview ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <UserCircle2 className="w-10 h-10 text-[#00174b]" />
                )}
              </div>

              <div className="flex flex-col gap-1.5 flex-1">
                <button 
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-3 py-1.5 bg-white neo-border font-label-caps text-xs font-bold uppercase hover:bg-[#ffe083] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <ImagePlus className="w-3.5 h-3.5" />
                  <span>{photoPreview ? "Change Photo" : "Choose Photo"}</span>
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

            {/* NAME INPUT */}
            <div>
              <label htmlFor="person-name" className="block font-label-caps text-xs font-bold uppercase text-[#1a1c1c] mb-1">
                Full Name
              </label>
              <input 
                id="person-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter their full name"
                className="w-full h-11 px-3 bg-white neo-border-2 font-body-md text-base text-[#1a1c1c] focus:outline-none focus:bg-[#dbe1ff]/20 focus:border-[#2563eb]"
              />
            </div>

            {/* RELATIONSHIP SELECT */}
            <div>
              <label htmlFor="person-relation" className="block font-label-caps text-xs font-bold uppercase text-[#1a1c1c] mb-1">
                Relationship
              </label>
              <select
                id="person-relation"
                value={relation}
                onChange={(e) => setRelation(e.target.value)}
                className="w-full h-11 px-3 bg-white neo-border-2 font-body-md text-base text-[#1a1c1c] focus:outline-none focus:border-[#2563eb] cursor-pointer"
              >
                {RELATIONSHIPS.map(rel => (
                  <option key={rel} value={rel}>{rel}</option>
                ))}
              </select>

              {relation === "Other" && (
                <input 
                  type="text"
                  value={customRelation}
                  onChange={(e) => setCustomRelation(e.target.value)}
                  placeholder="E.g., Doctor, Neighbor"
                  className="w-full h-10 mt-2 px-3 bg-white neo-border-2 font-body-md text-sm text-[#1a1c1c] focus:outline-none focus:border-[#2563eb]"
                />
              )}
            </div>

            {/* DELETE OPTION (IF EDITING) */}
            {existingPerson && (
              <div className="pt-2 border-t border-[#1a1c1c]">
                {!showDeleteConfirm ? (
                  <button 
                    type="button"
                    onClick={() => setShowDeleteConfirm(true)}
                    className="w-full py-2 bg-[#ffdad6] text-[#ba1a1a] neo-border font-label-caps text-xs font-bold uppercase hover:bg-[#ffb4ab] transition-colors cursor-pointer"
                  >
                    Delete {existingPerson.name}
                  </button>
                ) : (
                  <div className="bg-[#ffdad6] neo-border p-3 text-center">
                    <p className="font-bold text-xs text-[#93000a] mb-2">Delete {existingPerson.name} from memory bank?</p>
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
              {isSaving ? "Saving..." : (existingPerson ? "Save Changes" : "Save Person")}
            </button>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
