package com.example.react.spring.shopping.mall;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class FruitService {

    private final FruitRepository fruitRepository;

    public List<Fruit> selectFruitList() {

        List<Fruit> result = fruitRepository.findAll();

        return result;
    }

    public List<Fruit> selectNewFruitList() {

        List<Fruit> result = fruitRepository.newFruitList();

        return result;
    }

    public Optional<Fruit> selectFruitDetail(Integer id) {
        Optional<Fruit> result = fruitRepository.findById(id);

        return result;
    }

    public void fruitInsert(Fruit fruit, Map<String, String> data) {

        fruit.setFruitName(data.get("title"));
        fruit.setPrice(Integer.valueOf(data.get("price")));
        fruit.setQuantity(Integer.valueOf(data.get("quantity")));
        fruit.setUnit(data.get("unit"));
        fruit.setDetailInfo(data.get("detailInfo"));
        fruit.setFruitImage(data.get("imgUrl"));

        fruitRepository.save(fruit);
    }
}
