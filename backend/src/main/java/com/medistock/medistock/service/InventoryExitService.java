package com.medistock.medistock.service;

import com.medistock.medistock.entity.InventoryExit;
import com.medistock.medistock.entity.Medicine;
import com.medistock.medistock.repository.InventoryExitRepository;
import com.medistock.medistock.repository.MedicineRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class InventoryExitService {
    @Autowired
    private InventoryExitRepository inventoryExitRepository;

    @Autowired
    private MedicineRepository medicineRepository;

    public List<InventoryExit> findAll() {
        return inventoryExitRepository.findAll();
    }

    public Optional<InventoryExit> findById(Long id) {
        return inventoryExitRepository.findById(id);
    }

    @Transactional
    public InventoryExit save(InventoryExit exit) {
        Medicine medicine = exit.getMedicine();
        if (medicine != null) {
            if (medicine.getStock() < exit.getQuantity()) {
                throw new RuntimeException("Stock insuficiente");
            }
            medicine.setStock(medicine.getStock() - exit.getQuantity());
            medicineRepository.save(medicine);
        }
        return inventoryExitRepository.save(exit);
    }

    public void deleteById(Long id) {
        inventoryExitRepository.deleteById(id);
    }
}
