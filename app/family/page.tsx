"use client";

import { useState } from "react";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { FamilyHeader } from "@/components/family/FamilyHeader";
import { FamiliarPeopleGrid } from "@/components/family/FamiliarPeopleGrid";
import { MemoryCollection } from "@/components/family/MemoryCollection";
import { AddMemoryCTA } from "@/components/family/AddMemoryCTA";
import { AddMemoryModal } from "@/components/family/AddMemoryModal";
import { Memory } from "@/lib/db/dexie";

export default function FamilyPage() {
  const [isMemoryModalOpen, setIsMemoryModalOpen] = useState(false);
  const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null);

  const handleAddMemory = () => {
    setSelectedMemory(null);
    setIsMemoryModalOpen(true);
  };

  const handleEditMemory = (memory: Memory) => {
    setSelectedMemory(memory);
    setIsMemoryModalOpen(true);
  };

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="pt-6 md:pt-10 flex flex-col items-center">
          <FamilyHeader />
          <FamiliarPeopleGrid />
          <MemoryCollection onEditMemory={handleEditMemory} />
          <AddMemoryCTA onAddClick={handleAddMemory} />
        </div>
      </DashboardLayout>

      <AddMemoryModal 
        isOpen={isMemoryModalOpen}
        onClose={() => setIsMemoryModalOpen(false)}
        existingMemory={selectedMemory}
      />
    </ProtectedRoute>
  );
}
