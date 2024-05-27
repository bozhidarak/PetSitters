package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name="review")
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
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
}
