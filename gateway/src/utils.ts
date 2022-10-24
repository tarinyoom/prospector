export { getJSONResponse };

function getJSONResponse(responseObject: any) : Response {
	const json = JSON.stringify(responseObject, null, 2);
	return new Response (json, {
		headers: {
		  'content-type': 'application/json;charset=UTF-8',
		},
	  });
}
