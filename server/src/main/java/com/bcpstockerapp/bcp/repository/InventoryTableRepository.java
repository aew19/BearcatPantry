package com.bcpstockerapp.bcp.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.bcpstockerapp.bcp.model.InventoryTable;
import org.springframework.stereotype.Repository;

@Repository
public interface InventoryTableRepository extends JpaRepository<InventoryTable, Long> {
}
