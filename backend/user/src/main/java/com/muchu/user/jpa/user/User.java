package com.muchu.user.jpa.user;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.sql.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    public Long getId() {
        return id;
    }

    @Column
    private String email;
    @Column
    private String password;
    @Column
    private String nickname;
    @Column
    private Date birth;
    @Column
    private Integer gender;

    public User(String email, String password, String nickname, Date birth, Integer gender) {
        this.email = email;
        this.password = password;
        this.nickname = nickname;
        this.birth = birth;
        this.gender = gender;
    }
}
