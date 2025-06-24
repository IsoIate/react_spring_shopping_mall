package com.example.react.spring.shopping.mall;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface FruitRepository extends JpaRepository<Fruit, Integer> {

    // 카테고리별 과일 조회 쿼리
    @Query(value = "select * from fruit where category = ?1", nativeQuery = true)
    List<Fruit> findByCategory(String queryString);

    // 메인 페이지용 신상품 과일 3개 조회
    @Query(value = "select * from fruit order by insert_date desc limit 3", nativeQuery = true)
    List<Fruit> newFruitList();

    // 베스트 상품 3개 조회 쿼리
    @Query(value = "select b.*, sum(a.sale_quantity) as total_sale_quantity from sales a join fruit b on a.fruit_id = b.fruit_id group by b.fruit_id, b.fruit_name limit 3", nativeQuery = true)
    List<Fruit> bestFruitListLimit();

    // 베스트 상품 페이지 조회 쿼리
    @Query(value = "select b.*, sum(a.sale_quantity) as total_sale_quantity from sales a join fruit b on a.fruit_id = b.fruit_id group by b.fruit_id, b.fruit_name", nativeQuery = true)
    List<Fruit> bestFruitList();

    // 신상품 조회 쿼리 (해당 달 등록된 과일 조회)
    @Query(value = "select * from fruit where date_format(insert_date, '%Y-%m') = date_format(curdate(), '%Y-%m') order by insert_date desc", nativeQuery = true)
    List<Fruit> newProductList();

    Page<Fruit> findPageBy(Pageable page);
}
