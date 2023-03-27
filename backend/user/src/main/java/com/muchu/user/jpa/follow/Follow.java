package com.muchu.user.jpa.follow;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Follow {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "to_user")
    private Long toUser;
    @Column(name = "from_user")
    private Long fromUser;
    @Column(name = "accept")
    private String accept;


}
