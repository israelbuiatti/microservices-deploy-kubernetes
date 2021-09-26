package com.ms.acl.api.dto;

import com.ms.acl.entity.Menu;
import com.ms.acl.entity.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MenuDTO {

	private Long id;
	private String descricao;
	private String url;
	private String icon;

	public static MenuDTO converter(Menu menu) {

		return MenuDTO.builder()
				.id(menu.getId())
				.descricao(menu.getDescricao())
				.url(menu.getUrl())
				.icon(menu.getIcon())
				.build();

	}

}

