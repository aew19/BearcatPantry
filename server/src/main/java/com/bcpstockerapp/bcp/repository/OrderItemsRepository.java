package com.bcpstockerapp.bcp.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.bcpstockerapp.bcp.model.OrderItemsTable;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderItemsRepository extends JpaRepository<OrderItemsTable, Long>{
    List<OrderItemsTable> findOrderItemsTableByOrderId(Long orderId);
}
