package com.example.backend.specification;

import com.example.backend.entity.Pet;
import com.example.backend.entity.PetOwnerOffer;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.JoinType;
import org.springframework.data.jpa.domain.Specification;

import java.time.LocalDate;
import java.util.List;

public class PetOwnerOfferSpecification {
    public static Specification<PetOwnerOffer> startDateAfter(LocalDate date) {
        return (root, query, criteriaBuilder) -> {
            if (date == null) {
                return criteriaBuilder.isTrue(criteriaBuilder.literal(true));
            }
            return criteriaBuilder.greaterThanOrEqualTo(root.get("startDate"), date);
        };
    }

    public static Specification<PetOwnerOffer> endDateBefore(LocalDate date) {
        return (root, query, criteriaBuilder) -> {
            if (date == null) {
                return criteriaBuilder.isTrue(criteriaBuilder.literal(true));
            }
            return criteriaBuilder.lessThanOrEqualTo(root.get("endDate"), date);
        };
    }
    public static Specification<PetOwnerOffer> petsWithTypes(List<String> petTypes) {
        return (root, query, criteriaBuilder) -> {
            if (petTypes == null || petTypes.isEmpty()) {
                return criteriaBuilder.isTrue(criteriaBuilder.literal(true));
            }
            Join<PetOwnerOffer, Pet> pets = root.join("pets", JoinType.INNER);
            return pets.get("petType").in(petTypes);
        };
    }
}