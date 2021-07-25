package com.ms.acl.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table( name = "servicos", schema = "acl")
@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Servico {

	@Id
	@Column(name = "id")
	@GeneratedValue( strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name = "servico")
	private String servico;

	@Column(name = "url")
	private String url;

	@Column(name = "flg_ativo")
	private Boolean flgAtivo;

}
