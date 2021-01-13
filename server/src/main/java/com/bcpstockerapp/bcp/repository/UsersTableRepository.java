package com.bcpstockerapp.bcp.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.bcpstockerapp.bcp.model.UsersTable;
import org.springframework.stereotype.Repository;

@Repository
public interface UsersTableRepository extends JpaRepository<UsersTable, Long>{
}
