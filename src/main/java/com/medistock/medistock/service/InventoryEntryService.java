package com.medistock.medistock.service;

import com.medistock.medistock.entity.InventoryEntry;
import com.medistock.medistock.entity.Medicine;
import com.medistock.medistock.repository.InventoryEntryRepository;
import com.medistock.medistock.repository.MedicineRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class InventoryEntryService {
    @Autowired
    private InventoryEntryRepository inventoryEntryRepository;

    @Autowired
    private MedicineRepository medicineRepository;

    public List<InventoryEntry> findAll() {
        return inventoryEntryRepository.findAll();
    }

    public Optional<InventoryEntry> findById(Long id) {
        return inventoryEntryRepository.findById(id);
    }

    @Transactional
    public InventoryEntry save(InventoryEntry entry) {
        Medicine medicine = entry.getMedicine();
        if (medicine != null) {
            medicine.setStock(medicine.getStock() + entry.getQuantity());
            medicineRepository.save(medicine);
        }
        return inventoryEntryRepository.save(entry);
    }

    public void deleteById(Long id) {
        inventoryEntryRepository.deleteById(id);
    }
}
