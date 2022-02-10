package com.bcpstockerapp.bcp.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.bcpstockerapp.bcp.model.TransactionTable;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.time.LocalDate;

@Repository
public interface TransactionRepository extends JpaRepository<TransactionTable, Long> {
    List<TransactionTable> findByBarcodeId(String _barcodeId);
    List<TransactionTable> findByDate(LocalDate _date);
    TransactionTable findByBarcodeIdAndDate(String _barcodeId, LocalDate _date);
}
