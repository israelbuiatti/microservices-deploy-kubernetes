package com.ms.acl.api.dto;

import com.ms.acl.entity.Menu;
import com.ms.acl.entity.Servico;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ServicoDTO {

	private Long id;
	private String servico;
	private String url;

	public static ServicoDTO converter(Servico servico) {

		return ServicoDTO.builder()
				.id(servico.getId())
				.servico(servico.getServico())
				.url(servico.getUrl())
				.build();

	}

}

