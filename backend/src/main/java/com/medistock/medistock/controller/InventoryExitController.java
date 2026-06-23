package com.medistock.medistock.controller;

import com.medistock.medistock.entity.InventoryExit;
import com.medistock.medistock.service.InventoryExitService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/exits")
public class InventoryExitController {
    @Autowired
    private InventoryExitService inventoryExitService;

    @GetMapping
    public List<InventoryExit> getAll() {
        return inventoryExitService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<InventoryExit> getById(@PathVariable Long id) {
        return inventoryExitService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public InventoryExit create(@RequestBody InventoryExit exit) {
        return inventoryExitService.save(exit);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (inventoryExitService.findById(id).isPresent()) {
            inventoryExitService.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}
