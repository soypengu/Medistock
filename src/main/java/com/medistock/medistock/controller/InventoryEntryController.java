package com.medistock.medistock.controller;

import com.medistock.medistock.entity.InventoryEntry;
import com.medistock.medistock.service.InventoryEntryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/entries")
public class InventoryEntryController {
    @Autowired
    private InventoryEntryService inventoryEntryService;

    @GetMapping
    public List<InventoryEntry> getAll() {
        return inventoryEntryService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<InventoryEntry> getById(@PathVariable Long id) {
        return inventoryEntryService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public InventoryEntry create(@RequestBody InventoryEntry entry) {
        return inventoryEntryService.save(entry);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (inventoryEntryService.findById(id).isPresent()) {
            inventoryEntryService.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}
