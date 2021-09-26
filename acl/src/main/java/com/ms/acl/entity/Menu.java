package com.ms.acl.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table( name = "menu", schema = "acl")
@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Menu {

	@Id
	@Column(name = "id")
	@GeneratedValue( strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name = "descricao")
	private String descricao;

	@Column(name = "url")
	private String url;

	@Column(name = "icon")
	private String icon;
	
	@Column(name = "flg_ativo")
	private Boolean flgAtivo;

}
