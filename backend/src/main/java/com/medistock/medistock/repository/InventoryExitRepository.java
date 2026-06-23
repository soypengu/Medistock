package com.medistock.medistock.repository;

import com.medistock.medistock.entity.InventoryExit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InventoryExitRepository extends JpaRepository<InventoryExit, Long> {
}
