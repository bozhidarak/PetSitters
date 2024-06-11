package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name="review")
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Integer stars;
    private String description;
    @ManyToOne
    @JoinColumn(name="reviewed_user_id")
    private User reviewedUser;
    @ManyToOne
    @JoinColumn(name="author_id")
    private User author;
    public Review(){}
    @Override
    public String toString() {
        return "Review{" +
                "id=" + id +
                ", stars=" + stars +
                ", description='" + description + '\'' +
                ", reviewedUser=" + reviewedUser.getId() +
                ", author=" + author.getId() +
                '}';
    }
}
