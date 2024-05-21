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
    private UserEntity reviewedUser;
    @ManyToOne
    @JoinColumn(name="author_id")
    private UserEntity author;
    public Review(){}
}
