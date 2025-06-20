package com.example.react.spring.shopping.mall;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface FruitRepository extends JpaRepository<Fruit, Integer> {

    @Query(value = "select * from fruit order by insert_date desc limit 3", nativeQuery = true)
    List<Fruit> newFruitList();
}
