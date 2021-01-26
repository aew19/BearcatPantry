package com.bcpstockerapp.bcp.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.bcpstockerapp.bcp.model.ProductTable;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductTableRepository extends JpaRepository<ProductTable, Long>{
    ProductTable findByBarcodeId(String barcodeId);
}
