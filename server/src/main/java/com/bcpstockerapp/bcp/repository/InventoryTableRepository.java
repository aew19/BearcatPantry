package com.bcpstockerapp.bcp.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.bcpstockerapp.bcp.model.InventoryTable;
import com.bcpstockerapp.bcp.model.prodInventoryJoin;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;

@Repository
public interface InventoryTableRepository extends JpaRepository<InventoryTable, Long> {

    @Query("select new com.bcpstockerapp.bcp.model.prodInventoryJoin(p.barcodeId, i.quantity, i.expirationDate, p.productTitle, p.foodType, p.brand, p.vegetarian, p.vegan) from ProductTable p, InventoryTable i where p.barcodeId = i.barcodeId")
    public List<prodInventoryJoin> join();
}
