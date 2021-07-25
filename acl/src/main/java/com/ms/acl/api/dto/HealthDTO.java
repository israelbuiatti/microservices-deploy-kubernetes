package com.ms.acl.api.dto;

import com.ms.acl.entity.Menu;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class HealthDTO {

	private String app = "acl";
	private String version = "1.0";
	private Boolean status = true;

}

