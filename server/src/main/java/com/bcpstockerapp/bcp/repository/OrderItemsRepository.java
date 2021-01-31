package com.bcpstockerapp.bcp.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.bcpstockerapp.bcp.model.OrderItemsTable;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderItemsRepository extends JpaRepository<OrderItemsTable, Long>{
}
