package com.example.backend.specification;


import com.example.backend.entity.Pet;
import com.example.backend.entity.PetSitterOffer;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.JoinType;
import org.springframework.data.jpa.domain.Specification;

import java.util.Date;
import java.util.List;

public class PetSitterOfferSpecification {

    public static Specification<PetSitterOffer> AvailableFrom(Date date) {
        return (root, query, criteriaBuilder) -> {
            if (date == null) {
                return criteriaBuilder.isTrue(criteriaBuilder.literal(true));
            }
            return criteriaBuilder.greaterThanOrEqualTo(root.get("availableFrom"), date);
        };
    }

    public static Specification<PetSitterOffer> availableUntil(Date date) {
        return (root, query, criteriaBuilder) -> {
            if (date == null) {
                return criteriaBuilder.isTrue(criteriaBuilder.literal(true));
            }
            return criteriaBuilder.lessThanOrEqualTo(root.get("availableUntil"), date);
        };
    }
    public static Specification<PetSitterOffer> petsWithTypes(List<String> petTypes) {
        return (root, query, criteriaBuilder) -> {
            if (petTypes == null || petTypes.isEmpty()) {
                return criteriaBuilder.isTrue(criteriaBuilder.literal(true));
            }
            Join<PetSitterOffer, Pet> pets = root.join("pets", JoinType.INNER);
            return pets.get("petType").in(petTypes);
        };
    }
}
