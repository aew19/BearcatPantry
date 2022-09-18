package com.bcpstockerapp.bcp.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.bcpstockerapp.bcp.model.ItemClass;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;

@Repository
public interface ItemClassRepository extends JpaRepository<ItemClass, Long> {
    ItemClass findByClassId(Long _id);
    ItemClass findByClassName(String _name);
    boolean existsByClassName(String _name);
}
