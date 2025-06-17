package com.example.react.spring.shopping.mall;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class FruitService {

    private final FruitRepository fruitRepository;

    public List<Fruit> selectFruitList () {
        List<Fruit> result = fruitRepository.findAll();

        return result;
    }

    public void fruitInsert(Fruit fruit, Map<String, String> data) {

        fruit.setFruitName(data.get("fruitName"));
        fruit.setPrice(Integer.valueOf(data.get("price")));
        fruit.setQuantity(Integer.valueOf(data.get("quantity")));
        fruit.setFruitImage(data.get("imgUrl"));

        fruitRepository.save(fruit);
    }
}
