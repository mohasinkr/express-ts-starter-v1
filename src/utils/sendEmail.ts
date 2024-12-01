import https from "node:https";

export const sendEmail = ({
	toAddress,
	subject,
}: {
	toAddress: string;
	subject: string;
}) => {
	const options = {
		method: "POST",
		hostname: "api.brevo.com",
		port: null,
		path: "/v3/smtp/email",
		headers: {
			accept: "application/json",
			"content-type": "application/json",
			"api-key": process.env.BREVO_KEY,
		},
	};

	const req = https.request(options, (res) => {
		const chunks: Uint8Array[] = [];

		res.on("data", (chunk) => {
			chunks.push(chunk);
		});

		res.on("end", () => {
			const body = Buffer.concat(chunks);
			console.log(body.toString());
		});
	});

	req.write(
		JSON.stringify({
			sender: { name: "Simple Auth", email: "no-reply@simple-auth.com" },
			to: [{ email: toAddress }],
			subject,
			textContent: `Here's your password reset link : `,
		}),
	);
	req.end();
};
