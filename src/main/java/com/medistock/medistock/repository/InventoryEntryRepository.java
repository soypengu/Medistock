package com.medistock.medistock.repository;

import com.medistock.medistock.entity.InventoryEntry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InventoryEntryRepository extends JpaRepository<InventoryEntry, Long> {
}
