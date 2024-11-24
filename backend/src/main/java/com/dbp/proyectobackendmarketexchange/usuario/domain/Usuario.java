package com.dbp.proyectobackendmarketexchange.usuario.domain;

import com.dbp.proyectobackendmarketexchange.agreement.domain.Agreement;
import com.dbp.proyectobackendmarketexchange.rating.domain.Rating;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import javax.validation.constraints.NotNull;




import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.validation.constraints.Pattern;


import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;

@Getter
@Setter
@Entity
public class Usuario implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "El nombre no puede estar vacío")
    @Size(max = 50, message = "El nombre no puede tener más de 50 caracteres")
    private String firstname;

    @NotBlank(message = "El apellido no puede estar vacío")
    @Size(max = 50, message = "El apellido no puede tener más de 50 caracteres")
    private String lastname;

    @Email(message = "El correo debe ser válido")
    @NotBlank(message = "El correo no puede estar vacío")
    @Column(unique = true)
    private String email;


    @NotNull
    
    @Size(min = 7, max = 15, message = "El teléfono debe tener entre 7 y 15 dígitos")
    private String phone;

    @NotBlank(message = "La contraseña no puede estar vacía")
    @Size(min = 8, message = "La contraseña debe tener al menos 8 caracteres")
    private String password;

    @NotBlank(message = "La dirección no puede estar vacía")
    @Size(max = 100, message = "La dirección no puede tener más de 100 caracteres")
    private String address;

    @NotNull(message = "El rol no puede ser nulo")
    @Enumerated(EnumType.STRING)
    private Role role;

    @NotNull
    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    @OneToMany(mappedBy = "usuario", cascade = CascadeType.ALL)
    private List<Rating> ratingsReceived;

    @OneToMany(mappedBy = "raterUsuario", cascade = CascadeType.ALL)
    private List<Rating> ratingsGiven;

    @OneToMany(mappedBy = "initiator")
    private List<Agreement> initiatedAgreements;

    @OneToMany(mappedBy = "recipient")
    private List<Agreement> receivedAgreements;


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role.name())); // Ajusta según cómo manejas los roles
    }

    @Override
    public String getPassword() {
        return this.password;
    }

    @Override
    public String getUsername() {
        return this.email;
    }

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }
}
