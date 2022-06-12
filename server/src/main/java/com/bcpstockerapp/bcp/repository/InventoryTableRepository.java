package com.bcpstockerapp.bcp.repository;
import com.bcpstockerapp.bcp.model.ProductTable;
import org.springframework.data.jpa.repository.JpaRepository;
import com.bcpstockerapp.bcp.model.InventoryTable;
import com.bcpstockerapp.bcp.model.prodInventoryJoin;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;

@Repository
public interface InventoryTableRepository extends JpaRepository<InventoryTable, Long> {

    @Query("select new com.bcpstockerapp.bcp.model.prodInventoryJoin(p.barcodeId, i.quantity, p.productTitle, p.foodType, p.brand, p.vegetarian, p.vegan, p.image,p.productURL, p.weight) from ProductTable p, InventoryTable i where p.barcodeId = i.barcodeId")
    public List<prodInventoryJoin> join();
    InventoryTable findByBarcodeId(String barcodeId);
    
    @Query("select i from InventoryTable i where i.barcodeId = ?#{[0]}")
    public List<InventoryTable> findMultipleOfBarcode(String id);

}
