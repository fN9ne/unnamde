import { css } from "styled-components";
import { RuleSet } from "styled-components/dist/types";

export function setTextAndIconColor(color: string): RuleSet<object> {
	return css`
		color: ${color};

		svg.stroke path {
			stroke: ${color};
		}

		svg:not(.stroke) path {
			fill: ${color};
		}
	`;
}
