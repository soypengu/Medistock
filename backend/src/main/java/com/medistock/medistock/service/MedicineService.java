package com.medistock.medistock.service;

import com.medistock.medistock.entity.Medicine;
import com.medistock.medistock.repository.MedicineRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MedicineService {
    @Autowired
    private MedicineRepository medicineRepository;

    public List<Medicine> findAll() {
        return medicineRepository.findAll();
    }

    public Optional<Medicine> findById(Long id) {
        return medicineRepository.findById(id);
    }

    public Medicine save(Medicine medicine) {
        return medicineRepository.save(medicine);
    }

    public void deleteById(Long id) {
        medicineRepository.deleteById(id);
    }
}
