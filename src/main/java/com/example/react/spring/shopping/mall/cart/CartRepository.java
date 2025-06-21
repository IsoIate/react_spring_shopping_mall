package com.example.react.spring.shopping.mall.cart;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.react.spring.shopping.mall.Fruit;

@Repository
public interface CartRepository extends JpaRepository<Cart, Integer> {
    @Query(value = "select a.fruit_id, b.member_id, b.cart_id, a.fruit_name, a.fruit_image, a.price, b.count as fruit_quantity, (a.price * b.count) as totalPrice, b.insert_date from fruit a join ( select b.cart_id, b.member_id, b.fruit_id, sum(b.fruit_quantity) as count, b.insert_date from fruit a join cart b on a.fruit_id = b.fruit_id group by cart_id, member_id, fruit_id, b.insert_date) b on a.fruit_id = b.fruit_id", nativeQuery = true)
    List<Cart> selectCartList();
}
