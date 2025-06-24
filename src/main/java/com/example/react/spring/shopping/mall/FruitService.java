package com.example.react.spring.shopping.mall;

import lombok.RequiredArgsConstructor;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class FruitService {

    private final FruitRepository fruitRepository;

    public List<Fruit> selectFruitListByGroup(Integer id) {

        String queryString = "group_" + id;
        List<Fruit> result = fruitRepository.findByCategory(queryString);

        return result;
    }

    public List<Fruit> selectBestFruitListLimit() {
        List<Fruit> result = fruitRepository.bestFruitListLimit();
        return result;
    }

    public List<Fruit> selectBestFruitList() {
        List<Fruit> result = fruitRepository.bestFruitList();
        return result;
    }

    public List<Fruit> selectNewProductList() {

        List<Fruit> result = fruitRepository.newProductList();

        return result;
    }

    // 페이지네이션
    public Page<Fruit> selectAllProductList(Integer page, Integer limit) {

        Page<Fruit> result = fruitRepository.findPageBy(PageRequest.of(page, limit));

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
