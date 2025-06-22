package com.example.react.spring.shopping.mall.cart;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.example.react.spring.shopping.mall.Fruit;

@Repository
public interface CartRepository extends JpaRepository<Cart, Integer> {

    // 로그인 한 고객의 장바구니에서 과일별로 분류한 값을 조회하는 쿼리
    @Query(value = """
                    select
                        a.fruit_id,
                        b.cart_id,
                        a.fruit_name,
                        a.fruit_image,
                        a.price,
                        b.count,
                        (a.price * b.count) as total_price
                    from
                        fruit a
                    join
                        (
                            select
                                b.fruit_id, sum(b.fruit_quantity) as count, (select cart_id from cart c where c.fruit_id = f.fruit_id) as cart_id
                            from
                                fruit f
                            join
                                cart b
                                    on f.fruit_id = b.fruit_id
                            where
                                member_id = ?1
                            group by
                                fruit_id
                        ) b
                    on a.fruit_id = b.fruit_id
            """, nativeQuery = true)
    List<CartDTO> selectCartList(Integer memberId);

    @Modifying
    @Transactional
    @Query(value = """
            update
                cart
            set
                fruit_quantity = ?2
            where
                cart_id = ?1 and fruit_quantity != ?2
                        """, nativeQuery = true)
    Integer updateCartItem(Integer cartId, Integer count);

    @Modifying
    @Transactional
    @Query(value = "delete from cart where fruit_id = ?1 and member_id = ?2", nativeQuery = true)
    Integer deleteCartItem(Integer fruitId, Integer memberId);
}
