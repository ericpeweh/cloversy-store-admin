// Dependencies
import React, { useMemo } from "react";

// Types
import { EmailMarketingItemDetail, EmailTemplate } from "../../interfaces";
import { AddEmailMarketingFormValues } from "../../parts/AddEmailMarketing/AddEmailMarketing";

// Styles
import { PreviewContainer, SectionTitle } from "./ResultPreview.styles";

// Components
import { Divider, Grid } from "@mui/material";

interface ResultPreviewProps {
	emailsTemplate: EmailTemplate[];
	templateId: number;
	values: AddEmailMarketingFormValues | EmailMarketingItemDetail;
	options?: {
		type?: "form" | "detail";
		showDivider?: boolean;
	};
}

const ResultPreview = ({
	emailsTemplate,
	templateId,
	values,
	options = { type: "form", showDivider: true }
}: ResultPreviewProps) => {
	const { type, showDivider } = options;

	const selectedTemplate = emailsTemplate.find(template => template.id === templateId);
	const htmlContent = selectedTemplate?.htmlContent;
	const templateParams = selectedTemplate?.params;

	const previewContent = useMemo(() => {
		// Remove params curly braces
		let content = htmlContent;

		content = content?.replace(/(\{\{params.)|(\}\})/g, "");
		content = content?.replace("full_name", "<nama konsumen>");

		if (type === "form") {
			const contentValues = values as AddEmailMarketingFormValues;

			templateParams?.forEach(param => {
				content = content?.replaceAll(
					param,
					(contentValues[param as keyof typeof contentValues] as string) || ""
				);
			});
		}

		if (type === "detail") {
			const contentValues = values as EmailMarketingItemDetail;

			templateParams?.forEach(param => {
				content = content?.replaceAll(
					param,
					(contentValues.params[param as keyof typeof contentValues.params] as string) || ""
				);
			});
		}

		return content;
	}, [htmlContent, templateParams, values, type]);

	return (
		<Grid container>
			<Grid item xs={12}>
				{showDivider && <Divider sx={{ my: 4 }} />}
				<SectionTitle>Result Preview</SectionTitle>
				<PreviewContainer>
					<iframe srcDoc={previewContent}>
						<SectionTitle>Your browser does not support iframes.</SectionTitle>
					</iframe>
				</PreviewContainer>
			</Grid>
		</Grid>
	);
};

export default ResultPreview;
