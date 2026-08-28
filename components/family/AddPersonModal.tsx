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

    // Validate type
    if (!file.type.startsWith("image/")) {
      setErrorMsg("Please select a valid image file.");
      return;
    }

    // Validate size (5MB)
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
    if (!name.trim()) {
      setErrorMsg("Please enter a name.");
      return;
    }

    const finalRelation = relation === "Other" ? customRelation.trim() : relation;
    if (!finalRelation) {
      setErrorMsg("Please specify the relationship.");
      return;
    }

    setIsSaving(true);
    setErrorMsg("");

    try {
      if (existingPerson?.id) {
        await familyStorage.updateFamilyMember(existingPerson.id, {
          name: name.trim(),
          relationship: finalRelation,
          photoBlob,
          useInGames: true,
        });
      } else {
        await familyStorage.addFamilyMember({
          name: name.trim(),
          relationship: finalRelation,
          photoBlob,
          useInGames: true,
        });
      }

      setShowToast(true);
      setTimeout(() => {
        setIsSaving(false);
        onClose();
      }, 1000);
      
    } catch (err) {
      console.error(err);
      setErrorMsg("Could not save person. Please try again.");
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!existingPerson?.id) return;
    setIsSaving(true);
    try {
      await familyStorage.deleteFamilyMember(existingPerson.id);
      setIsSaving(false);
      onClose();
    } catch (err) {
      console.error(err);
      setErrorMsg("Could not remove person.");
      setIsSaving(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-end justify-center md:items-center">
        {/* Backdrop */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        />

        {/* Modal */}
        <motion.div 
          initial={{ opacity: 0, y: "100%", scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: "100%", scale: 0.98 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="relative w-full max-w-lg bg-smriti-bg md:rounded-[32px] rounded-t-[32px] rounded-b-none p-6 md:p-8 shadow-2xl flex flex-col max-h-[90vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-6 border-b border-smriti-border/50 pb-4">
            <div>
              <h2 className="text-2xl font-bold text-smriti-text">
                {existingPerson ? "Edit person" : "Add someone you know"}
              </h2>
              <p className="text-sm font-medium text-smriti-muted mt-1">
                {existingPerson ? "Update their details below." : "Add a familiar face to help SMRITI remember."}
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
              ✓ {name.trim()} saved
            </div>
          )}

          {errorMsg && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-2xl mb-6 font-medium text-center">
              {errorMsg}
            </div>
          )}

          <div className="flex-1 overflow-y-auto pr-2 pb-4 flex flex-col gap-8">
            
            {/* PHOTO SECTION */}
            <div className="flex flex-col items-center">
              <input 
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                aria-label="Upload photo"
              />
              
              <div className="mb-4">
                {photoPreview ? (
                  <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-smriti-surface shadow-md">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-smriti-primary/5 border-2 border-dashed border-smriti-primary/30 flex items-center justify-center">
                     <UserCircle2 className="w-16 h-16 text-smriti-primary/30" />
                  </div>
                )}
              </div>

              <div className="flex gap-3">
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  className="px-6 py-3 bg-smriti-surface border border-smriti-border rounded-full font-bold text-smriti-text hover:bg-smriti-primary/10 hover:border-smriti-primary/30 transition-colors touch-target flex items-center gap-2"
                >
                  <ImagePlus className="w-5 h-5" />
                  {photoPreview ? "Change photo" : "Choose from device"}
                </button>
                {photoPreview && (
                  <button 
                    onClick={removePhoto}
                    className="p-3 bg-smriti-surface border border-smriti-border rounded-full font-bold text-red-500 hover:bg-red-50 transition-colors touch-target"
                    aria-label="Remove photo"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>

            {/* NAME SECTION */}
            <div>
              <label htmlFor="person-name" className="block text-lg font-bold text-smriti-text mb-2">
                Full name
              </label>
              <input 
                id="person-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter their name"
                className="w-full p-4 md:p-5 bg-smriti-surface border-2 border-smriti-border rounded-2xl text-xl text-smriti-text focus:border-smriti-primary focus:ring-4 focus:ring-smriti-primary/10 outline-none transition-all touch-target"
              />
            </div>

            {/* RELATIONSHIP SECTION */}
            <div>
              <label htmlFor="person-relation" className="block text-lg font-bold text-smriti-text mb-2">
                Relationship
              </label>
              <select
                id="person-relation"
                value={relation}
                onChange={(e) => setRelation(e.target.value)}
                className="w-full p-4 md:p-5 bg-smriti-surface border-2 border-smriti-border rounded-2xl text-xl text-smriti-text focus:border-smriti-primary outline-none transition-all touch-target appearance-none cursor-pointer"
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
                  className="w-full mt-4 p-4 md:p-5 bg-smriti-surface border-2 border-smriti-border rounded-2xl text-xl text-smriti-text focus:border-smriti-primary focus:ring-4 focus:ring-smriti-primary/10 outline-none transition-all touch-target"
                />
              )}
            </div>

            {/* DELETE SECTION (IF EDITING) */}
            {existingPerson && (
              <div className="pt-6 border-t border-smriti-border/50">
                {!showDeleteConfirm ? (
                  <button 
                    onClick={() => setShowDeleteConfirm(true)}
                    className="w-full py-4 text-red-600 font-bold text-lg rounded-2xl hover:bg-red-50 transition-colors touch-target"
                  >
                    Remove {existingPerson.name}
                  </button>
                ) : (
                  <div className="bg-red-50 border border-red-200 p-6 rounded-3xl text-center">
                    <p className="text-red-800 font-bold text-lg mb-2">Remove {existingPerson.name}?</p>
                    <p className="text-red-700/80 mb-6 font-medium">This will remove this person from your family memories.</p>
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

          {/* Action Buttons */}
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
              {isSaving ? (existingPerson ? "Saving..." : "Saving...") : (existingPerson ? "Save Changes" : "Save Person")}
            </button>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
