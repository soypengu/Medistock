package com.medistock.medistock.controller;

import com.medistock.medistock.entity.Medicine;
import com.medistock.medistock.service.MedicineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/medicines")
public class MedicineController {
    @Autowired
    private MedicineService medicineService;

    @GetMapping
    public List<Medicine> getAll() {
        return medicineService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Medicine> getById(@PathVariable Long id) {
        return medicineService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Medicine create(@RequestBody Medicine medicine) {
        return medicineService.save(medicine);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Medicine> update(@PathVariable Long id, @RequestBody Medicine medicine) {
        return medicineService.findById(id)
                .map(existing -> {
                    existing.setName(medicine.getName());
                    existing.setDescription(medicine.getDescription());
                    existing.setType(medicine.getType());
                    existing.setExpirationDate(medicine.getExpirationDate());
                    existing.setCategory(medicine.getCategory());
                    existing.setSupplier(medicine.getSupplier());
                    return ResponseEntity.ok(medicineService.save(existing));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (medicineService.findById(id).isPresent()) {
            medicineService.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}
