package com.bcpstockerapp.bcp.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.bcpstockerapp.bcp.model.OrdersTable;
import org.springframework.stereotype.Repository;

@Repository
public interface OrdersTableRepository extends JpaRepository<OrdersTable, Long>{
    OrdersTable findByOrderID(String orderID);
}