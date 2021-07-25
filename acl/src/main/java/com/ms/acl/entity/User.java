package com.ms.acl.entity;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Convert;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.springframework.data.jpa.convert.threeten.Jsr310JpaConverters;

import com.ms.acl.enums.Role;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table( name = "user", schema = "acl")
@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {

	@Id
	@Column(name = "id")
	@GeneratedValue( strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name = "username")
	private String username;
	
	@Column(name = "password")
	private String password;
	
	@Transient
	@Enumerated(EnumType.STRING)
	private Role role;
	
	@Column(name = "created_at")
	@Convert(converter = Jsr310JpaConverters.LocalDateConverter.class)
	private LocalDate createdAt;
	
	@Column(name = "updated_at")
	@Convert(converter = Jsr310JpaConverters.LocalDateConverter.class)
	private LocalDate updatedAt;
	
	@Builder.Default
	@Column(name = "flg_ativo")
	private Boolean flgAtivo = true;


}
