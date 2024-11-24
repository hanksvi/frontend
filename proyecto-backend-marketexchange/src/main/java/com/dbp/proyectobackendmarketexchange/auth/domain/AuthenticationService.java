package com.dbp.proyectobackendmarketexchange.auth.domain;


import com.dbp.proyectobackendmarketexchange.auth.dto.JwtAuthResponse;
import com.dbp.proyectobackendmarketexchange.auth.dto.LoginRequest;
import com.dbp.proyectobackendmarketexchange.auth.dto.RegisterRequest;
import com.dbp.proyectobackendmarketexchange.auth.exception.UserAlreadyExistException;
import com.dbp.proyectobackendmarketexchange.config.JwtService;
import com.dbp.proyectobackendmarketexchange.event.usuario.UsuarioCreadoEvent;
import com.dbp.proyectobackendmarketexchange.exception.InvalidUserFieldException;
import com.dbp.proyectobackendmarketexchange.usuario.domain.Role;
import com.dbp.proyectobackendmarketexchange.usuario.domain.Usuario;
import com.dbp.proyectobackendmarketexchange.usuario.domain.UsuarioService;
import com.dbp.proyectobackendmarketexchange.usuario.dto.UsuarioRequestDto;

import com.dbp.proyectobackendmarketexchange.usuario.infrastructure.UsuarioRepository;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.sql.Driver;
import java.time.LocalDateTime;
import java.time.ZonedDateTime;
import java.util.Optional;

@Service
public class AuthenticationService {

    private final UsuarioRepository userRepository;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;
    private final ModelMapper modelMapper;
    private final UsuarioService usuarioService;
    private final UsuarioRepository usuarioRepository;
    private final ApplicationEventPublisher eventPublisher;

    @Autowired
    public AuthenticationService(UsuarioService usuarioService, UsuarioRepository userRepository, JwtService jwtService, PasswordEncoder passwordEncoder, UsuarioRepository usuarioRepository, ApplicationEventPublisher eventPublisher) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
        this.passwordEncoder = passwordEncoder;
        this.modelMapper = new ModelMapper();
        this.usuarioService = usuarioService;
        this.usuarioRepository = usuarioRepository;
        this.eventPublisher = eventPublisher;
    }

    public JwtAuthResponse signin(LoginRequest req) {
        Optional<Usuario> user;
        user = userRepository.findByEmail(req.getUsername());

        if (user.isEmpty()) throw new UsernameNotFoundException("Email is not registered");

        if (!passwordEncoder.matches(req.getPassword(), user.get().getPassword()))
            throw new IllegalArgumentException("Password is incorrect");

        JwtAuthResponse response = new JwtAuthResponse();

        response.setToken(jwtService.generateToken(user.get()));
        return response;
    }

    public JwtAuthResponse signup(RegisterRequest req) {
        Optional<Usuario> user = userRepository.findByEmail(req.getEmail());
        if (user.isPresent()) {
            throw new UserAlreadyExistException("El correo electrónico ya está registrado");
        }
        if (req.getFirstName() == null || req.getLastName().isBlank()) {
            throw new InvalidUserFieldException("El nombre no puede estar vacío");
        }
        if (req.getFirstName().length() > 50) {
            throw new InvalidUserFieldException("El nombre no puede tener más de 50 caracteres");
        }

        // Validar apellido
        if (req.getLastName() == null || req.getLastName().isBlank()) {
            throw new InvalidUserFieldException("El apellido no puede estar vacío");
        }
        if (req.getLastName().length() > 50) {
            throw new InvalidUserFieldException("El apellido no puede tener más de 50 caracteres");
        }

        // Validar correo
        if (req.getEmail() == null || req.getEmail().isBlank()) {
            throw new InvalidUserFieldException("El correo no puede estar vacío");
        }
        if (!req.getEmail().matches("^[A-Za-z0-9+_.-]+@(.+)$")) {
            throw new InvalidUserFieldException("El correo no es válido");
        }

        // Validar teléfono
        if (req.getPhone() == null || req.getPhone().length() < 7 || req.getPhone().length() > 15) {
            throw new InvalidUserFieldException("El teléfono debe tener entre 7 y 15 dígitos");
        }

        // Validar contraseña
        if (req.getPassword() == null || req.getPassword().isBlank()) {
            throw new InvalidUserFieldException("La contraseña no puede estar vacía");
        }
        if (req.getPassword().length() < 8) {
            throw new InvalidUserFieldException("La contraseña debe tener al menos 8 caracteres");
        }

        // Validar dirección
        if (req.getAddress() == null || req.getAddress().isBlank()) {
            throw new InvalidUserFieldException("La dirección no puede estar vacía");
        }
        if (req.getAddress().length() > 100) {
            throw new InvalidUserFieldException("La dirección no puede tener más de 100 caracteres");
        }
        // Crear un nuevo usuario con rol USER o ADMIN dependiendo del registro
        Usuario newUser = modelMapper.map(req, Usuario.class);
        newUser.setPassword(passwordEncoder.encode(req.getPassword()));

        newUser.setFirstname(req.getFirstName());
        newUser.setLastname(req.getLastName());
        newUser.setEmail(req.getEmail());
        newUser.setAddress(req.getAddress());
        newUser.setPhone(req.getPhone());
        newUser.setPassword(passwordEncoder.encode(req.getPassword()));
        newUser.setCreatedAt(LocalDateTime.now());
        // Asignar el rol de acuerdo al campo isAdmin
        if (req.getIsAdmin()) {
            newUser.setRole(Role.ADMIN);
        } else {
            newUser.setRole(Role.USER);
        }

        // Guardar el nuevo usuario
        usuarioRepository.save(newUser);
        eventPublisher.publishEvent(new UsuarioCreadoEvent(this, newUser));



        // Generar la respuesta con el token JWT
        JwtAuthResponse response = new JwtAuthResponse();
        response.setToken(jwtService.generateToken(newUser));
        return response;


        //a
    }
}


