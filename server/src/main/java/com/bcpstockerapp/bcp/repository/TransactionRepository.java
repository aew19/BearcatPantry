package com.bcpstockerapp.bcp.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.bcpstockerapp.bcp.model.TransactionTable;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.time.LocalDate;
import com.bcpstockerapp.bcp.model.transactionProdJoin;

@Repository
public interface TransactionRepository extends JpaRepository<TransactionTable, Long> {

    @Query("select new com.bcpstockerapp.bcp.model.transactionProdJoin(t.date, p.barcodeId, t.quantity, t.itemsIn, p.productTitle, p.weight, p.foodType) from ProductTable p, TransactionTable t where p.barcodeId = t.barcodeId")
    public List<transactionProdJoin> join();

    @Query("select new com.bcpstockerapp.bcp.model.transactionProdJoin(t.date, p.barcodeId, t.quantity, t.itemsIn, p.productTitle, p.weight, p.foodType) from ProductTable p, TransactionTable t where p.barcodeId = t.barcodeId and t.date between ?#{[0]} and ?#{[1]}")
    public List<transactionProdJoin> dateRangeJoin(LocalDate fromDate, LocalDate toDate);
    // https://spring.io/blog/2014/07/15/spel-support-in-spring-data-jpa-query-definitions

    List<TransactionTable> findByBarcodeId(String _barcodeId);
    List<TransactionTable> findByDate(LocalDate _date);
    TransactionTable findByBarcodeIdAndDate(String _barcodeId, LocalDate _date);
}
